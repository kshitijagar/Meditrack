import React, { useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "./GlobalStyles";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000); // Change 2000 to the desired duration in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require("./assets/splashscreen.png")}
      >
        <Text style={styles.infectionTracker}>Infection Tracker</Text>
        <Text style={styles.description}>
          A free to use app to track diseases around you and get consultations
          from doctors near you
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infectionTracker: {
    fontSize: 48,
    lineHeight: 51,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.white,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    fontFamily: FontFamily.interRegular,
    color: Color.white,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default SplashScreen;
