import React, { useEffect, useState } from "react";
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

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

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

  const handleLogin = async () => {
    try {
      checkForm();

      if (isValidForm) {
        const _param = {
          user: emailOrUsername,
          pass: password,
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
        onChangeText={(text) => {
          setPassword(text);
          checkForm();
        }}
        error={!!passwordError}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Gap height={16} />
      <Button mode="contained" style={styles.button} labelStyle={styles.buttonText} onPress={handleLogin}>
        Login
      </Button>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
