import React, { useEffect, useRef, useState } from "react";
import { View, Text, BackHandler, TextInput, FlatList, RefreshControl, Dimensions, TouchableOpacity, Image, ActivityIndicator, Keyboard, ScrollView } from "react-native";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/constants";
import Gap from "@/components/Gap";
import labelStyles from "@/constants/label-styles";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { GetCategory, GetProducts } from "@/app/services/inventory";
import { formatCurrency } from "@/app/utils/currency";
import { RootState } from "@/app/redux/store";
import { CartItem, Product } from "@/app/models/product";
import BottomSheetListing from "@/components/BottomSheetListing";
import BottomSheet from "@devvie/bottom-sheet";
import { CategoryItem } from "@/app/models/product-category";
import { addToCart, removeFromCart, updateCartItemQuantity } from "@/app/redux/CartReducer";
import DialogModal from "@/components/DialogModal";
import BarcodeScannerModal from "@/components/BarcodeScannerModal";
import { BarCodeScannerResult } from "expo-barcode-scanner";
import Toast from "react-native-toast-message";
import { GetPaymentMethods } from "@/app/services/sales";
import { Payment } from "@/app/models/payment";
import PaymentModal from "@/components/PaymentModal";
import { getData } from "@/app/utils/localstorage";
import { Shift } from "@/app/models/shift";
import { GetShiftList } from "@/app/services/shift";

interface ProductCardProps {
  item: Product;
}

const CashierScreen: React.FC<any> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const [qrMember, setQrMember] = useState("");
  const [isScannerShow, setIsScannerShow] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);

  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingMoreRef = useRef(false);

  const [productList, setProductList] = useState<Product[]>([]);
  const [searchItem, setSearchItem] = useState("");

  const searchItemRef = useRef(searchItem);
  const categorySheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);

  const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const selectedOutlet = useSelector((state: RootState) => state.selectedOutlet.selected);
  const [mode, setMode] = useState<"umum" | "anggota">("umum");

  const [isRemoveCartModalShow, setIsRemoveCartModalShow] = useState(false);
  const [selectedRemoveItem, setSelectedRemoveItem] = useState<CartItem>();
  const [isPaymentModalShow, setIsPaymentModalShow] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [scannedMemberName, setScannedMemberName] = useState("");

  useEffect(() => {
    searchItemRef.current = searchItem;
  }, [searchItem]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(setIsLoading(true));
      await Promise.all([fetchProducts(), getShiftList()]);
    } catch (error) {
      console.error("fetchData");
    } finally {
      setIsLoading(false);
    }
  };

  const getShiftList = async () => {
    try {
      const outletID = selectedOutlet ? selectedOutlet.id.toString() : "";
      let page = 1;
      let allItems: any[] | ((prevState: Shift[]) => Shift[]) = [];
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await GetShiftList(outletID, page.toString());
        const items = response?.items || [];

        const openItems = items.filter((item: Shift) => item.status === "open" && item.outlet_id === selectedOutlet?.id);

        if (items.length === 0) {
          hasMoreData = false;
        } else {
          allItems = [...allItems, ...openItems];
          page += 1;
        }
      }

      const _userData = await getData("userData");
      const _selectedShift = allItems.find((x: any) => Number(x?.user_open_id) === Number(_userData?.id));
      if (_selectedShift !== null) {
        _userData.shift_code = _selectedShift?.shift_code;
        setUserData(_userData);
      }
    } catch (error) {
      console.error("getShiftList error", error);
    }
  };

  const fetchProducts = async (search: string = "") => {
    try {
      dispatch(setIsLoading(true));
      setPage(1);
      setHasMore(true);

      await Promise.all([
        getProducts({
          pageNumber: 1,
          search,
          categoryID: selectedCategory?.id?.toString(),
          reset: true,
        }),
        getCategory(),
      ]);
    } catch (error) {
      console.error("fetchProducts = " + error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getProducts = async ({ pageNumber = 1, search = "", categoryID = "", reset = false }: { pageNumber?: number; search?: string; categoryID?: string; reset?: boolean }) => {
    try {
      const response = await GetProducts(pageNumber.toString(), search, categoryID !== "0" ? categoryID : "");

      const newProducts = response?.items ?? [];

      setProductList((prev) => {
        if (reset || pageNumber === 1) return newProducts;

        const existingIds = new Set(prev.map((item) => item.id));
        const merged = [...prev, ...newProducts.filter((item: Product) => !existingIds.has(item.id))];
        return merged;
      });

      setPage(pageNumber);
      setHasMore(pageNumber < response.total_page);
    } catch (error) {
      console.error("getProducts error:", error);
    }
  };

  const getCategory = async () => {
    try {
      let page = 1;
      let allItems: CategoryItem[] = [];
      let totalPages = 1;

      do {
        const response = await GetCategory(page.toString());
        allItems = allItems.concat(response.items);
        totalPages = response.total_page;
        page++;
      } while (page <= totalPages);

      const allCategory: CategoryItem = {
        id: 0,
        kategori: "All",
        kode: "0",
        status: 1,
        created_at: "",
        updated_at: "",
        keterangan: null,
      };

      const updatedItems = [allCategory, ...allItems];

      setCategoryList(updatedItems);
      setSelectedCategory(updatedItems[0]);
    } catch (error) {
      console.error("getCategory = " + error);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMoreRef.current || !hasMore || isLoading) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      await getProducts({
        pageNumber: page + 1,
        search: searchItemRef.current,
        categoryID: selectedCategory?.id?.toString(),
      });
    } catch (error) {
      console.error("load more error:", error);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchProducts();
  };

  const onDecreaseItem = (item: CartItem) => {
    try {
      if (item.quantity > 1) {
        dispatch(updateCartItemQuantity({ kode: item.kode, quantity: item.quantity - 1 }));
      } else {
        setSelectedRemoveItem(item);
        setIsRemoveCartModalShow(true);
      }
    } catch (error) {
      console.error("onDecreaseItem : " + error);
    }
  };

  const onRemoveCartItem = () => {
    try {
      if (selectedRemoveItem) {
        dispatch(removeFromCart(selectedRemoveItem.kode));
      }
    } catch (error) {
      console.error("onRemoveCartItem : " + error);
    } finally {
      setIsRemoveCartModalShow(false);
    }
  };

  const onScannerResult = (result: BarCodeScannerResult) => {
    try {
      dispatch(setIsLoading(true));
      const qr = result?.data;
      if (qr !== null) {
        const _qr = JSON.parse(qr);
        setScannedMemberName(_qr?.name);
        setQrMember(_qr?.id);
      } else {
        Toast.show({
          text1: "Error",
          text2: "QR Invalid!",
          type: "error",
        });
      }
    } catch (error) {
      console.error("onScannerResult : " + error);
    } finally {
      setIsScannerShow(false);
      dispatch(setIsLoading(false));
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.foto }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.item}</Text>
        <Text style={styles.itemPrice}>{formatCurrency(item.harga_jual)}</Text>
      </View>
      <Gap width={5} />
      <View style={styles.itemActions}>
        <TouchableOpacity onPress={() => onDecreaseItem(item)}>
          <Ionicons name="remove-circle-outline" size={24} color="gray" />
        </TouchableOpacity>

        <Gap width={8} />
        <Text style={[labelStyles.smallDarkLabel400, styles.centerVerticalText]}>{item.quantity}</Text>
        <Gap width={8} />

        <TouchableOpacity onPress={() => dispatch(addToCart(item))}>
          <Ionicons name="add-circle-outline" size={24} color="gray" />
        </TouchableOpacity>

        <Gap width={8} />

        <TouchableOpacity
          onPress={() => {
            setSelectedRemoveItem(item);
            setIsRemoveCartModalShow(true);
          }}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => dispatch(addToCart(item))}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item?.foto }} style={styles.productImage} resizeMode="contain" />
        </View>
        <Gap width={screenWidth * 0.02} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={[labelStyles.smallDarkLabel700, { textAlign: "center" }]} numberOfLines={2}>
              {item?.item}
            </Text>
            <Text style={labelStyles.smallDarkLabel600} numberOfLines={1}>
              {item?.harga_beli != null ? formatCurrency(item?.harga_jual) : ""}
            </Text>
          </View>
          <Text style={labelStyles.smallDarkLabel400}>{item.deskripsi}</Text>
          <Gap height={8} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="logo-dropbox" size={15} color={colors.dark} />
            <Gap width={7} />
            <Text style={[labelStyles.smallDarkLabel400, styles.centerVerticalText]}>Stok: {item.jml_min} PCS</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ flexDirection: "row", paddingHorizontal: 20, flex: 1 }}>
        {/* Left Side */}
        <View style={{ flex: 0.6 }}>
          <View style={{ flexDirection: "row" }}>
            {/* Search field */}
            <View style={styles.searchFieldContainer}>
              <Ionicons name="search" size={15} color={colors.dark} />
              <TextInput style={styles.searchField} value={searchItem} onChangeText={(text) => setSearchItem(text)} placeholder="Search" placeholderTextColor={"#96BBD9"} />
            </View>
            <Gap width={14} />
            <TouchableOpacity style={styles.searchBtn} onPress={async () => await fetchProducts(searchItemRef.current)}>
              <Text style={labelStyles.smallLightLabel700}>Search</Text>
            </TouchableOpacity>
          </View>

          <Gap height={14} />

          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <TouchableOpacity style={styles.categoryWrapper} onPress={() => categorySheetRef?.current?.open()}>
              <Text style={labelStyles.tinyDarkLabel400}>Category : {selectedCategory?.kategori}</Text>
            </TouchableOpacity>
          </View>

          <Gap height={14} />

          <View style={{ flex: 1 }}>
            {productList.length > 0 && (
              <>
                <FlatList
                  data={productList}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={1}
                  renderItem={({ item }) => <ProductCard item={item} />}
                  refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.3}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={7}
                  showsVerticalScrollIndicator={false}
                />
                {loadingMore ? (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator size="small" color={colors.primary} />
                  </View>
                ) : null}
              </>
            )}
          </View>

          {productList.length <= 0 && !isLoading && (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
              <Ionicons name="cloud-offline" color={colors.gray7} size={screenHeight * 0.1} />
              <Gap height={10} />
              <Text style={labelStyles.normalDarkLabel400}>Tidak ada data</Text>
            </View>
          )}
        </View>

        <Gap width={screenWidth * 0.02} />

        {/* Right Side */}
        <View style={{ flex: 0.4, paddingHorizontal: 10 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            {/* Cashier */}
            <Text style={labelStyles.normalDarkLabel700}>Kasir</Text>
            <Gap height={5} />
            <View style={styles.outletDropdown}>
              <Text>{userData?.first_name}</Text>
            </View>

            <Gap height={10} />

            {/* Outlet */}
            <Text style={labelStyles.normalDarkLabel700}>Outlet</Text>
            <Gap height={5} />
            <View style={styles.outletDropdown}>
              <Text>{selectedOutlet?.nama}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.dark} />
            </View>

            <Gap height={10} />

            {/* Mode Toggle */}
            <View style={styles.modeToggle}>
              <TouchableOpacity style={[styles.modeButton, mode === "umum" && styles.modeActiveBlue]} onPress={() => setMode("umum")}>
                <Text style={[styles.modeText, mode === "umum" && styles.modeTextActive]}>Umum</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modeButton, mode === "anggota" && styles.modeActiveGreen]} onPress={() => setMode("anggota")}>
                <Text style={[styles.modeText, mode === "anggota" && styles.modeTextActive]}>Anggota</Text>
              </TouchableOpacity>
            </View>

            <Gap height={10} />

            {/* Anggota Extra Input */}
            {mode === "anggota" && (
              <View style={styles.qrSection}>
                <Text style={labelStyles.smallDarkLabel600}>Scan QR Code Anggota</Text>
                {scannedMemberName.length > 0 && (
                  <>
                    <Gap height={5} />
                    <Text style={labelStyles.smallDarkLabel400}>{scannedMemberName}</Text>
                  </>
                )}
                <View style={styles.qrInputWrapper}>
                  <TextInput
                    style={styles.qrInput}
                    placeholder="Scan QR code atau ketik nomor kartu"
                    placeholderTextColor={colors.gray6}
                    value={qrMember}
                    onChangeText={(text) => {
                      setScannedMemberName("");
                      setQrMember(text);
                    }}
                  />
                  {/* <TouchableOpacity style={styles.qrIcon} onPress={() => setIsScannerShow(true)}>
                    <Ionicons name="camera" size={20} color={colors.dark} />
                  </TouchableOpacity> */}
                  <TouchableOpacity style={styles.qrIcon} onPress={() => setIsScannerShow(true)}>
                    <Ionicons name="qr-code" size={20} color={colors.dark} />
                  </TouchableOpacity>
                </View>
                <Text style={labelStyles.tinyDarkLabel400}>Scan QR code atau ketik nomor kartu anggota</Text>
              </View>
            )}

            {/* Cart Section */}
            <View style={styles.cartBox}>
              <View style={styles.cartHeader}>
                <Text style={labelStyles.smallLightLabel700}>Keranjang Belanja</Text>
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.items.length}</Text>
                  <Ionicons name="cart" size={14} color={colors.light} />
                </View>
              </View>

              {cart.items.length <= 0 ? (
                <View style={styles.cartEmpty}>
                  <Ionicons name="cart-outline" size={40} color={colors.gray4} />
                  <Gap height={5} />
                  <Text style={labelStyles.smallDarkLabel400}>Keranjang belanja kosong</Text>
                </View>
              ) : (
                cart.items.map((item, index) => <View key={index}>{renderItem({ item })}</View>)
              )}

              <View style={styles.cartSummary}>
                <View style={styles.summaryRow}>
                  <Text>DPP (Dasar Pengenaan Pajak):</Text>
                  <Text>{formatCurrency(cart.priceBeforeTax)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text>PPN (11%):</Text>
                  <Text>{formatCurrency(cart.tax)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={{ fontWeight: "700" }}>Total:</Text>
                  <Text style={{ fontWeight: "700" }}>{formatCurrency(cart.totalPrice)}</Text>
                </View>
              </View>
            </View>

            {/* Buttons */}
            <TouchableOpacity style={styles.payButton} onPress={() => setIsPaymentModalShow(true)} disabled={cart?.items?.length <= 0}>
              <Ionicons name="card" size={16} color={colors.light} />
              <Text style={styles.payButtonText}>Bayar</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.draftButton}>
              <Ionicons name="list" size={16} color={colors.light} />
              <Text style={styles.draftButtonText}>Daftar Draft</Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
      </View>

      <BottomSheetListing
        sheetRef={categorySheetRef}
        title={"Category"}
        isSearchQuery={false}
        listItem={categoryList}
        itemKey={["kategori"]}
        onSelectItem={async (item) => {
          try {
            categorySheetRef.current.close();

            dispatch(setIsLoading(true));

            setSearchItem("");
            setSelectedCategory(item);
            setProductList([]);
            setPage(1);
            setHasMore(true);

            await getProducts({
              pageNumber: 1,
              categoryID: item.id.toString(),
              reset: true,
            });
          } catch (error) {
            console.error("categorySheetRef : " + error);
          } finally {
            dispatch(setIsLoading(false));
          }
        }}
      />

      <DialogModal
        modalVisibility={isRemoveCartModalShow}
        numberOption={2}
        onClose={() => setIsRemoveCartModalShow(false)}
        isCloseButton={false}
        title={"Remove confirmation"}
        desc={`Anda yakin ingin menghapus item ini?`}
        button1Text={"Remove"}
        onPressButton1={() => onRemoveCartItem()}
        button2Text={"Cancel"}
        onPressButton2={() => setIsRemoveCartModalShow(false)}
      />

      <BarcodeScannerModal visible={isScannerShow} onClose={() => setIsScannerShow(false)} onScanResult={onScannerResult} />

      <PaymentModal visible={isPaymentModalShow} onClose={() => setIsPaymentModalShow(false)} customerID={qrMember} shiftCode={userData?.shift_code} />
    </View>
  );
};

export default CashierScreen;
