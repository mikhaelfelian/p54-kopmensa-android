import React, { useEffect, useRef, useState } from "react";
import { View, Image, TouchableOpacity, BackHandler } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Login } from "../../services/session";
import styles from "./styles";
import { storeData } from "../../utils/localstorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Gap from "../../../components/Gap";
import { useDispatch } from "react-redux";
import { toUrlEncoded } from "@/app/utils/converter";
import { setIsLoading } from "@/app/redux/LoadingReducer";
import Toast from "react-native-toast-message";
import labelStyles from "@/constants/label-styles";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { GetOutlets } from "@/app/services/inventory";
import BottomSheet from "@devvie/bottom-sheet";
import BottomSheetListing from "@/components/BottomSheetListing";
import { OutletItem } from "@/app/models/outlet";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [selectedOutlet, setSelectedOutlet] = useState<OutletItem>();
  const [outletList, setOutletList] = useState<OutletItem[]>([]);
  const outletSheetRef = useRef<React.ElementRef<typeof BottomSheet>>(null);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  useEffect(() => {
    getOutlets();
  }, []);

  const handleLogin = async () => {
    try {
      checkForm();

      if (isValidForm) {
        const _param = {
          user: emailOrUsername,
          pass: password,
          outlet: selectedOutlet?.id,
        };
        const param = toUrlEncoded(_param);

        dispatch(setIsLoading(true));
        await Login(param)
          .then(async (response) => {
            if (response != null && response?.token != null && response?.data != null) {
              await storeData("authToken", response?.token);
              await storeData("userData", response?.data).then(() => navigation.navigate("TabDashboard"));
            } else {
              Toast.show({
                text1: "Login failed!",
                text2: "Please try again later.",
                type: "error",
              });
            }
          })
          .catch((error) => {
            console.log("Error Response:", error.response.data);
            Toast.show({
              text1: "Login failed!",
              text2: error.response.data ?? "Please try again later.",
              type: "error",
            });
          });
      }
    } catch (error) {
      console.error("handleLogin : " + error);
      Toast.show({
        text1: "Login failed!",
        text2: "Please try again later.",
        type: "error",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const getOutlets = async () => {
    try {
      dispatch(setIsLoading(true));

      let page = "1";
      let perPage = "10";

      await GetOutlets(page, perPage).then((response) => {
        setOutletList(response?.outlets ?? []);
      });
    } catch (error) {
      console.error("getOutlets : ", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const checkForm = () => {
    setIsValidForm(true);
    setEmailOrUsernameError("");
    setPasswordError("");

    if (!emailOrUsername) {
      setEmailOrUsernameError("Email or Username is required.");
      setIsValidForm(false);
    }

    if (!password) {
      setPasswordError("Password is required.");
      setIsValidForm(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
      <TextInput
        label="Email"
        mode="outlined"
        value={emailOrUsername}
        style={{ zIndex: 0 }}
        onChangeText={(text) => {
          setEmailOrUsername(text);
          checkForm();
        }}
        error={!!emailOrUsernameError}
      />
      {emailOrUsernameError ? <Text style={styles.errorText}>{emailOrUsernameError}</Text> : null}
      <Gap height={10} />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        style={{ zIndex: 0 }}
        onChangeText={(text) => {
          setPassword(text);
          checkForm();
        }}
        error={!!passwordError}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Gap height={14} />
      <TouchableOpacity style={styles.outletWrapper} onPress={() => outletSheetRef.current.open()}>
        <Text style={labelStyles.normalGray4Label500}>{selectedOutlet != null ? selectedOutlet?.nama : "Select Outlet"}</Text>
        <FontAwesome6 name={"sort-down"} color={colors.gray4} size={20} />
      </TouchableOpacity>
      <Gap height={20} />
      <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={handleLogin}>
        Login
      </Button>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <BottomSheetListing
        sheetRef={outletSheetRef}
        title={"Outlets"}
        isSearchQuery={false}
        listItem={outletList}
        itemKey={["nama"]}
        onSelectItem={async (item) => {
          setSelectedOutlet(item);
          outletSheetRef.current.close();
        }}
      />
    </View>
  );
};

export default LoginScreen;
