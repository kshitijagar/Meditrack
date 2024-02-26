import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View , Linking} from "react-native"; // Correct import statement
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { FontFamily, Color, Border, FontSize } from "./GlobalStyles";
import { useState, useEffect } from "react";
import axios from 'axios';
const Home = () => {
  const navigation = useNavigation();

  const [topHeadlines, setTopHeadlines] = useState([]);
  const [headline1, setHeadline1] = useState("");
  const [headline2, setHeadline2] = useState("");
  const goToChatScreen = () => {
    navigation.navigate('Chat'); // Assuming 'Chat' is the name of the screen you want to navigate to
  };
  
  useEffect(() => {
    // Function to fetch top headlines from News API
    const fetchTopHeadlines = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?q=disease&apiKey=api_key'
        );
        // Check if there are articles returned
        if (response.data.articles && response.data.articles.length > 0) {
          // Extract top 2 headlines from the response and store them in separate variables
          const topArticles = response.data.articles.slice(0, 2);
          setHeadline1(topArticles[0]);
          setHeadline2(topArticles[1]);

        } else {
          console.error('No articles found in the response');
        }
      } catch (error) {
        console.error('Error fetching top headlines:', error);
      }
    };
  
    fetchTopHeadlines(); // Call the function when the component mounts
  }, []);

  const goToMapScreen = () => {
    navigation.navigate('Map');
  };
  return (
    <View style={styles.home}>
      <TouchableOpacity onPress={goToMapScreen}>
        <Image
          style={styles.homeChild}
          contentFit="cover"
          source={require("./assets/ellipse-1.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToMapScreen}>
        <Image
          style={styles.mapsIcon}
          contentFit="cover"
          source={require("./assets/maps.png")}
        />
      </TouchableOpacity>
      <Image
        style={[styles.homeIcon, styles.homeIconPosition]}
        contentFit="cover"
        source={require("./assets/home.png")}
      />
      <TouchableOpacity onPress={goToChatScreen}>
        <Image
          style={styles.chatIcon}
          contentFit="cover"
          source={require("./assets/chat.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.clickHereTo, styles.helloTypo]}>
        Click here to talk to our AI chat bot!
      </Text>
      <TouchableOpacity onPress={() => { Linking.openURL(headline1.url) }}>

        <View style={[styles.news1, styles.newsLayout]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { Linking.openURL(headline2.url) }}>
        <View style={[styles.news2, styles.newsLayout]} />
      </TouchableOpacity>
      <Text style={[styles.hello, styles.helloLayout]}>Hello,</Text>
      <Text style={[styles.johnJacob, styles.johnJacobTypo]}>
        Guest
      </Text>
      <Image
        style={[styles.homeInner, styles.johnJacobPosition]}
        contentFit="cover"
        source={require("./assets/line-4.png")}
      />
      <View style={[styles.searchbox, styles.searchboxLayout]} />
      <Text style={[styles.yourDailyMedbits, styles.searchboxLayout]}>
        Your Daily MedBits:
      </Text>
      <Text style={[styles.searchForA, styles.helloTypo]}>
        Search for a hospital or a Doctor
      </Text>
      <Image
        style={styles.lineIcon}
        contentFit="cover"
        source={require("./assets/line-5.png")}
      />
      <TouchableOpacity onPress={() => Linking.openURL('https://news.google.com/topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-US&gl=US&ceid=US%3Aen')}>
        <Text style={[styles.seeMoreNews, styles.helloTypo]}>
          See more news articles here
        </Text>
      </TouchableOpacity>

      <Text style={[styles.strokeIsA, styles.strokeIsATypo]}>
        {headline1.title}
      </Text>
      <Image
        style={[styles.art1Icon, styles.art1IconPosition]}
        contentFit="cover"
        source={{ uri: headline1.urlToImage }}
      />
      <Text style={[styles.heartDiseaseWhy, styles.art2IconPosition]}>
      {headline2.title} 
      </Text>
      <Image
        style={[styles.profileicon, styles.homeIconPosition]}
        contentFit="cover"
        source={require("./assets/profileicon.png")}
      />
      <Image
        style={styles.profileimgIcon}
        contentFit="cover"
        source={require("./assets/profileimg.png")}
      />
      <Image
        style={styles.searchicon}
        contentFit="cover"
        source={require("./assets/searchicon.png")}
      />
      <Image
        style={[styles.art2Icon, styles.art2IconPosition]}
        contentFit="cover"
        source={{ uri: headline2.urlToImage }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeIconPosition: {
    height: 54,
    top: 823,
    position: "absolute",
  },
  helloTypo: {
    alignItems: "flex-end",
    display: "flex",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
    position: "absolute",
  },
  newsLayout: {
    height: 150,
    backgroundColor: Color.colorCornflowerblue,
    borderRadius: Border.br_mini,
    width: 340,
    position: "absolute",
  },
  helloLayout: {
    lineHeight: 28,
    fontSize: FontSize.size_3xl,
  },
  johnJacobTypo: {
    color: Color.colorBlack,
    alignItems: "flex-end",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
  },
  johnJacobPosition: {
    left: 58,
    position: "absolute",
  },
  searchboxLayout: {
    height: 45,
    position: "absolute",
  },
  strokeIsATypo: {
    width: 180,
    lineHeight: 23,
    fontSize: FontSize.size_lg,
    left: 180,
    height: 140,
    color: Color.colorBlack,
    alignItems: "flex-end",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
  },
  art1IconPosition: {
    top: 320,
    position: "absolute",
  },
  art2IconPosition: {
    top: 489,
    position: "absolute",
  },
  homeChild: {
    marginLeft: -30,
    top: 787,
    left: "51.3%",
    width: 60,
    height: 60,
    position: "absolute",
  },
  mapsIcon: {
    top: 792,
    left: 190,
    width: 54,
    height: 51,
    position: "absolute",
  },
  homeItem: {
    top: 816,
    left: 24,
    width: 384,
    maxHeight: "100%",
    position: "absolute",
  },
  homeIcon: {
    left: 73,
    width: 51,
  },
  chatIcon: {
    top: 723,
    left: 331,
    width: 70,
    height: 77,
    position: "absolute",
  },
  clickHereTo: {
    top: 660,
    left: 330,
    fontSize: FontSize.size_mini,
    lineHeight: 15,
    color: "#838383",
    width: 82,
    height: 60,
    textAlign: "left",
    display: "flex",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
  },
  news1: {
    top: 303,
    left: 39,
    height: 140,
    backgroundColor: Color.colorCornflowerblue,
    borderRadius: Border.br_mini,
  },
  news2: {
    top: 471,
    left: 41,
  },
  hello: {
    top: 37,
    left: 30,
    color: "#6c6c6c",
    width: 57,
    height: 32,
    alignItems: "flex-end",
    display: "flex",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
    position: "absolute",
    textAlign: "left",
  },
  johnJacob: {
    top: 80,
    fontSize: 34,
    lineHeight: 35,
    width: 200,
    left: 25,
    position: "absolute",
    height: 39,
  },
  homeInner: {
    top: 137,
    width: 309,
    maxHeight: "100%",
  },
  searchbox: {
    top: 159,
    borderRadius: 20,
    backgroundColor: "#f5f3f3",
    borderStyle: "solid",
    borderColor: Color.colorBlack,
    borderWidth: 1,
    width: 345,
    height: 45,
    left: 39,
  },
  yourDailyMedbits: {
    top: 249,
    left: 49,
    width: 184,
    color: Color.colorBlack,
    alignItems: "flex-end",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
    lineHeight: 23,
    fontSize: FontSize.size_3xl,
  },
  searchForA: {
    top: 174,
    left: 87,
    fontSize: 12,
    lineHeight: 15,
    color: "#787878",
    width: 200,
    height: 15,
    textAlign: "left",
    display: "flex",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
  },
  lineIcon: {
    top: 229,
    left: 152,
    width: 137,
    height: 2,
    position: "absolute",
  },
  seeMoreNews: {
    top: 645,
    left: 42,
    fontSize: FontSize.size_sm,
    lineHeight: 18,
    color: "#0501d1",
    textAlign: "center",
    justifyContent: "center",
    width: 105,
    height: 37,
    display: "flex",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
  },
  strokeIsA: {
    height: 116,
    top: 313,
    position: "absolute",
  },
  art1Icon: {
    left: 51,
    width: 114,
    height: 116,
  },
  heartDiseaseWhy: {
    height: 136,
    width: 143,
    lineHeight: 23,
    fontSize: FontSize.size_lg,
    left: 180,
    color: Color.colorBlack,
    alignItems: "flex-end",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.urbanistMedium,
    fontWeight: "500",
  },
  profileicon: {
    left: 300,
    width: 48,
  },
  profileimgIcon: {
    top: 22,
    left: 300,
    width: 93,
    height: 93,
    position: "absolute",
  },
  searchicon: {
    top: 162,
    left: 45,
    width: 40,
    height: 40,
    position: "absolute",
  },
  art2Icon: {
    left: 52,
    height: 109,
    width: 114,
  },
  home: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default Home;