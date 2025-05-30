import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, BackHandler } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { login } from "../../services/session";
import styles from "./styles";
import { storeData } from "../../utils/localstorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../../components/LoadingScreen";
import Gap from "../../../components/Gap";
import { isValidEmail } from "../../utils/checker";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isBusy, setIsBusy] = useState<boolean>(false);
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
    checkForm();

    // if (isValidForm) {
    //   try {
    //     setIsBusy(true);
    //     const bodyParameters = {
    //       userNameOrEmailAddress: email,
    //       password: password,
    //     };

    //     const param = JSON.stringify(bodyParameters);

    //     await login(param)
    //       .then(async (response) => {
    //         if (response != null) {
    //           await storeData("userData", response?.result);
    //           navigation.navigate("TabDashboard");
    //         }
    //       })
    //       .finally(() => setIsBusy(false));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    navigation.navigate("TabDashboard");
  };

  const checkForm = () => {
    setIsValidForm(true);
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      setIsValidForm(false);
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email.");
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
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          checkForm();
        }}
        error={!!emailError}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
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
      <LoadingScreen visible={isBusy} />
    </View>
  );
};

export default LoginScreen;
