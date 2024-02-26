import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image, TextInput, Alert } from "react-native";
import { Color, FontSize, FontFamily, Border } from "./GlobalStyles";
import { useNavigation } from "@react-navigation/native";

// Import userData from your JSON file
import userData from "./userData.json";

console.disableYellowBox = true;


const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currUser, setCurrUser] = useState(null); // State variable to store current user's username

  const handleLogin = () => {
    const user = userData.find((user) => user.email === email && user.password === password);
    if (user) {
      console.log('Logged in user:', user);
      navigation.navigate('Home');
    } else {
      console.error('Login error: Invalid credentials');
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  };
  

  return (
    <View style={styles.login}>
      <View style={styles.loginWith}>
        <Image
          style={[styles.googleButtonIcon, styles.buttonLayout]}
          contentFit="cover"
          source={require("./assets/google-button.png")}
        />
        <View style={[styles.facebookButton, styles.buttonLayout]}>
          <View style={[styles.facebookButtonChild, styles.childBorder]} />
          <Image
            style={styles.facebookIcIcon}
            contentFit="cover"
            source={require("./assets/facebook-ic.png")}
          />
        </View>
        <View style={[styles.appleButton, styles.buttonLayout]}>
          <View style={[styles.facebookButtonChild, styles.childBorder]} />
          <Image
            style={styles.facebookIcIcon}
            contentFit="cover"
            source={require("./assets/cibapple.png")}
          />
        </View>
        <View style={styles.loginWith1}>
          <Text style={[styles.orLoginWith, styles.orLoginWithPosition]}>
            Or Login with
          </Text>
          <View style={[styles.loginWithChild, styles.loginPosition]} />
          <View style={[styles.loginWithItem, styles.loginPosition]} />
        </View>
      </View>
      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <View style={[styles.loginButtonChild, styles.childPosition]} />
        <Text style={[styles.login1, styles.login1Typo]}>Login</Text>
      </Pressable>
      <Text style={[styles.forgotPassword, styles.orLoginWithTypo]}>
        Forgot Password?
      </Text>
      <View style={styles.enterYourPasswordInput}>
        <View
          style={[styles.enterYourPasswordInputChild, styles.enterChildBorder]}
        />
        <Image
          style={[styles.fluenteye20FilledIcon, styles.rightSidePosition]}
          contentFit="cover"
          source={require("./assets/fluenteye20filled.png")}
        />
        <TextInput
          style={[styles.enterYourPassword, styles.enterTypo]}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.enterYourEmailInput}>
        <View
          style={[styles.enterYourEmailInputChild, styles.enterChildBorder]}
        />
        <TextInput
          style={[styles.enterYourEmail, styles.enterTypo]}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
      </View>
      <View style={styles.text}>
        <Text style={[styles.welcomeBackGlad, styles.registerNowTypo]}>
          Welcome back! Glad to see you Again!
        </Text>
      </View>
      <Pressable
        style={[styles.back, styles.backLayout]}
        onPress={() => navigation.navigate("Opening")}
      >
        <View style={[styles.backChild, styles.backLayout]} />
        <Image
          style={styles.backArrowIcon}
          contentFit="cover"
          source={require("./assets/back-arrow.png")}
        />
      </Pressable>
      <Text style={[styles.dontHaveAnContainer, styles.login1Typo]}>
        <Text style={styles.dontHaveAn}>{`Don’t have an account? `}</Text>
        <Text style={[styles.registerNow, styles.registerNowTypo]}>
          Signup Now
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    rightSidePosition: {
        top: 17,
        position: "absolute",
      },
      buttonLayout: {
        width: 105,
        height: 56,
      },
      childBorder: {
        borderWidth: 1,
        borderColor: Color.colorAliceblue,
        borderStyle: "solid",
        left: 0,
        top: 0,
        backgroundColor: Color.white,
      },
      orLoginWithPosition: {
        textAlign: "center",
        top: 0,
        left: 152,
        position: "absolute",
      },
      loginPosition: {
        height: 1,
        borderTopWidth: 1,
        top: 9,
        borderColor: Color.colorAliceblue,
        borderStyle: "solid",
        position: "relative",
      },
      childPosition: {
        left: "0%",
        bottom: "0%",
        right: "0%",
        top: "0%",
        height: "100%",
        width: "100%",
      },
      login1Typo: {
        textAlign: "center",
        fontSize: FontSize.size_mini,
        position: "absolute",
      },
      orLoginWithTypo: {
        color: Color.darkGray,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.urbanistSemiBold,
        fontWeight: "600",
      },
      enterChildBorder: {
        backgroundColor: Color.colorWhitesmoke,
        borderWidth: 1,
        borderColor: Color.colorAliceblue,
        borderStyle: "solid",
        borderRadius: Border.br_5xs,
        position: "absolute",
      },
      enterTypo: {
        color: Color.gray,
        lineHeight: 19,
        fontFamily: FontFamily.urbanistMedium,
        fontWeight: "500",
        fontSize: FontSize.size_mini,
        textAlign: "left",
        position: "absolute",
      },
      registerNowTypo: {
        fontFamily: FontFamily.urbanistBold,
        fontWeight: "700",
      },
      backLayout: {
        height: 41,
        width: 41,
        position: "absolute",
      },
      batteryIcon: {
        right: 0,
        width: 24,
        height: 11,
        top: 0,
        position: "absolute",
      },
      wifiIcon: {
        width: 15,
        height: 11,
      },
      mobileSignalIcon: {
        width: 17,
        height: 11,
      },
      recordingIndicatorIcon: {
        top: -9,
        right: 56,
        width: 6,
        height: 6,
        display: "none",
        position: "absolute",
      },
      rightSide: {
        right: 15,
        width: 67,
        height: 11,
      },
      leftSideIcon: {
        top: 12,
        left: 20,
        width: 54,
        height: 21,
        position: "absolute",
      },
      statusBar: {
        right: 1,
        height: 44,
        left: 0,
        top: 0,
        position: "absolute",
        overflow: "hidden",
      },
      googleButtonIcon: {
        left: 149,
        height: 56,
        top: 39,
        width: 105,
        position: "absolute",
      },
      facebookButtonChild: {
        borderRadius: Border.br_5xs,
        position: "absolute",
        height: 56,
        width: 105,
      },
      facebookIcIcon: {
        top: 15,
        left: 37,
        width: 26,
        height: 26,
        position: "absolute",
        overflow: "hidden",
      },
      facebookButton: {
        height: 56,
        top: 39,
        width: 105,
        position: "absolute",
        left: 23,
      },
      appleButton: {
        left: 272,
        height: 56,
        top: 39,
        width: 105,
        position: "absolute",
      },
      orLoginWith: {
        left: 124,
        color: Color.darkGray,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.urbanistSemiBold,
        fontWeight: "600",
      },
      loginWithChild: {
        width: 140,
        left: 0,
      },
      loginWithItem: {
        left: 253,
        width: 148,
      },
      loginWith1: {
        height: 17,
        width: 331,
        left: 0,
        top: 0,
        position: "absolute",
      },
      loginWith: {
        top: 585,
        height: 95,
        width: 331,
        left: 14,
        position: "absolute",
      },
      loginButtonChild: {
        backgroundColor: Color.dark,
        borderRadius: Border.br_5xs,
        position: "absolute",
      },
      login1: {
        top: 19,
        left: 174,
        color: Color.white,
        fontFamily: FontFamily.urbanistSemiBold,
        fontWeight: "600",
        textAlign: "center",
        fontSize: FontSize.size_mini,
      },
      loginButton: {
        height: "7%",
        width: "91.94%",
        top: 490,
        right: "4.17%",
        bottom: "23.75%",
        left: "3.89%",
        position: "absolute",
      },
      forgotPassword: {
        top: 440,
        left: 285,
        textAlign: "right",
        position: "absolute",
      },
      enterYourPasswordInputChild: {
        height: 56,
        width: 331,
        left: 0,
        top: 0,
      },
      fluenteye20FilledIcon: {
        left: 293,
        width: 22,
        height: 22,
        overflow: "hidden",
      },
      enterYourPassword: {
        top: 18,
        left: 18,
      },
      enterYourPasswordInput: {
        top: 356,
        height: 56,
        width: 331,
        left: 50,
        position: "absolute",
      },
      enterYourEmailInputChild: {
        left: "0%",
        bottom: "0%",
        right: "0%",
        top: "0%",
        height: "100%",
        width: "100%",
      },
      enterYourEmail: {
        top: "32.14%",
        left: "5.44%",
      },
      enterYourEmailInput: {
        top: 285,
        height: 56,
        width: 331,
        left: 50,
        position: "absolute",
      },
      welcomeBackGlad: {
        fontSize: 30,
        letterSpacing: -0.3,
        lineHeight: 39,
        width: 340,
        color: Color.dark,
        textAlign: "left",
        top: 0,
        position: "absolute",
        left: 0,
      },
      text: {
        top: 130,
        right: 20,
        height: 100,
        left: 30,
        position: "absolute",
      },
      backChild: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Color.colorAliceblue,
        borderStyle: "solid",
        left: 0,
        top: 0,
        backgroundColor: Color.white,
      },
      backArrowIcon: {
        height: "46.34%",
        width: "46.34%",
        top: "26.83%",
        right: "29.27%",
        bottom: "26.83%",
        left: "24.39%",
        maxWidth: "100%",
        maxHeight: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      back: {
        top: 15,
        left: 14,
      },
      dontHaveAn: {
        color: Color.dark,
        fontFamily: FontFamily.urbanistMedium,
        fontWeight: "500",
      },
      registerNow: {
        color: "#35c2c1",
      },
      dontHaveAnContainer: {
        marginLeft: -127,
        top: 738,
        left: "50%",
        letterSpacing: 0.2,
        lineHeight: 21,
      },
      login: {
        flex: 1,
        height: 800,
        overflow: "hidden",
        width: "100%",
        backgroundColor: Color.white,
      },
});


export default Login;