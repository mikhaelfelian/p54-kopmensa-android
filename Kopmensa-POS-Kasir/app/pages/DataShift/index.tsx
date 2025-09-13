import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { Shift } from "@/app/models/shift";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import { GetShiftList } from "@/app/services/shift";
import { RootState } from "@/app/redux/store";
import { dateParser } from "@/app/utils/dates";
import { formatCurrency } from "@/app/utils/currency";
import { colors } from "@/constants/constants";

const DataShiftScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedOutlet = useSelector((state: RootState) => state.selectedOutlet.selected);

  const [shiftList, setShiftList] = useState<Shift[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    fetchInitialShifts();
  }, []);

  const fetchInitialShifts = async () => {
    try {
      dispatch(setIsLoading(true));
      setPage(1);
      setHasMore(true);
      await getShiftList(1, true);
    } catch (error) {
      console.error("fetchInitialShifts", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getShiftList = async (pageNumber: number, reset = false) => {
    try {
      const outletID = selectedOutlet ? selectedOutlet.id.toString() : "";
      const response = await GetShiftList(outletID, pageNumber.toString());

      const newShifts = response?.items ?? [];

      setShiftList((prev) => {
        if (reset || pageNumber === 1) return newShifts;

        const existingIds = new Set(prev.map((item) => item.id));
        const merged = [...prev, ...newShifts.filter((item: Shift) => !existingIds.has(item.id))];
        return merged;
      });

      setPage(pageNumber);
      setHasMore(pageNumber < response.total_page);
    } catch (error) {
      console.error("getShiftList error", error);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMoreRef.current || !hasMore) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      await getShiftList(page + 1);
    } catch (error) {
      console.error("handleLoadMore error", error);
    } finally {
      setLoadingMore(false);
      loadingMoreRef.current = false;
    }
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={styles.headerText}>Kode Shift</Text>
      <Text style={styles.headerText}>Outlet</Text>
      <Text style={styles.headerText}>User Buka</Text>
      <Text style={styles.headerText}>Waktu Mulai</Text>
      <Text style={styles.headerText}>Waktu Selesai</Text>
      <Text style={styles.headerText}>Status</Text>
      <Text style={styles.headerText}>Uang Modal</Text>
      <Text style={styles.headerText}>Aksi</Text>
    </View>
  );

  const renderItem = ({ item }: { item: Shift }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.shift_code}</Text>
      <Text style={styles.cell}>{item.outlet_name}</Text>
      <Text style={styles.cell}>{item.user_open_name}</Text>
      <Text style={styles.cell}>{dateParser(item.start_at, "DD-MM-YYYY HH:mm")}</Text>
      <Text style={styles.cell}>{item.end_at ? dateParser(item.end_at, "DD-MM-YYYY HH:mm") : "-"}</Text>

      <View style={styles.cell}>
        <View style={[styles.badge, item.status === "open" ? styles.badgeOpen : styles.badgeClosed]}>
          <Text style={styles.badgeText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
        </View>
      </View>

      <Text style={styles.cell}>{formatCurrency(item.open_float)}</Text>

      <View style={[styles.cell, styles.actionContainer]}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#00BCD4" }]} onPress={() => navigation.navigate("DetailShiftScreen", item)}>
          <FontAwesome name="eye" size={16} color="#fff" />
        </TouchableOpacity>
        {item.status === "open" && (
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: item.status === "open" ? "#FFC107" : "#4CAF50" }]} onPress={() => (item.status === "open" ? navigation.navigate("CloseShiftScreen", item) : {})}>
            <FontAwesome name="stop" size={16} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("OpenShiftScreen")}>
        <Text style={styles.addBtnText}>+ Buka Shift Baru</Text>
      </TouchableOpacity>

      <FlatList
        data={shiftList}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={false} onRefresh={fetchInitialShifts} />}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loadingMore ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator size="small" color={colors.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default DataShiftScreen;
