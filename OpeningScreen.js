import React from "react";
import { StyleSheet, View, Text, ImageBackground, StatusBar, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "./GlobalStyles";

const OpeningScreen = () => {
  const navigation = useNavigation();

  const handleTouch = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pressable style={styles.background} onPress={handleTouch}>
        <ImageBackground
          style={styles.backgroundImage}
          resizeMode="cover"
          source={require("./assets/splashscreen.png")}
        >
          <Text style={styles.infectionTracker}>Disease Tracker</Text>
          <Text style={styles.description}>
            A free-to-use app to track diseases around you and get consultations
            from doctors near you
          </Text>
          <Text style={styles.continue}>
            tap Anywhere to continue...
          </Text>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infectionTracker: {
    top: 293,
    fontSize: 56,
    lineHeight: 58,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    width: 222,
    left: "47%",
    marginLeft: -148,
    color: Color.white,
    position: "absolute",
  },
  description: {
    top: 430,
    fontSize: 17,
    fontFamily: FontFamily.interRegular,
    width: 227,
    height: 98,
    left: "49%",
    marginLeft: -148,
    color: Color.white,
    position: "absolute",
  },
  continue: {
    color: Color.white,
    top: 280,
  },
});

export default OpeningScreen;
