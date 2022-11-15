import React,{useContext} from "react";
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppContext from "../../AppContext";

import { ScrollView } from "react-native-virtualized-view";

import { Divider } from "react-native-paper";
import CarouselImages from "./CarouselImages";
import { images } from "../../images";
import { Icon } from "react-native-elements";
const { width } = Dimensions.get("screen");
const fullAddress = "חדרה";
const url = Platform.select({
  ios: `maps:0,0?q=${fullAddress}`,
  android: `geo:0,0?q=${fullAddress}`,
});
const activities = [
  { name: "spa", img: images.spa },
  { name: "children's playroom", img: images.lobi },
  { name: " bar", img: images.bar },
  { name: "events", img: images.events },
];



export default function CustomerHome({ navigation }) {

  




  return (
    <View style={{ backgroundColor: "#000" }}>
      <TouchableOpacity style={styles.icon}>
        <Icon
          name="west"
          size={40}
          type="material"
          color="#fff"
          onPress={() => navigation.toggleDrawer()}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <ImageBackground
          source={images.fadeloby}
          resizeMode="stretch"
          style={{
            height: 650,
            justifyContent: "flex-end",
          }}
        >
          <Text style={styles.header}>LHOTEL</Text>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL("mailto:maor100maor@example.com")}
              title="support@example.com"
            >
              <Text style={styles.buttonText}>EMAIL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL("tel:052-6211881")}
            >
              <Text style={styles.buttonText}>CALL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL(url)}
            >
              <Text style={styles.buttonText}>ADDRESS</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={{ width: "80%", alignSelf: "center" }}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Our resort-like LHotel embodies modern City and its unique culture.
            On one side, the shimmering sea glistens in the sun; on the other, a
            dynamic metropolis buzzes with life. We'll show you the City from a whole new perspective.
          </Text>
        </View>
        <Divider
          style={{
            height: 0.2,
            width: "50%",
            alignSelf: "center",
            backgroundColor: "white",
            marginTop: 25,
            marginBottom: 5,
          }}
        />
        <Text style={styles.Text}>POPULERS ROOMS</Text>
        <CarouselImages />

        <Text style={styles.Text2}>ACTIVITES</Text>

        <View>
          <FlatList
            data={activities}
            renderItem={ActivityCard}
            keyExtarctor={(item, index) => index.toString()}
            numColumns={1}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const ActivityCard = ({ item, index }) => {
  // console.log(item);
  return (
    <View key={index} style={styles.backgroundImageContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={item.img}
      ></ImageBackground>

      {/* Virtual Tag View */}
      <View style={styles.virtualTag}>
        <Text style={{ color: "#fff", fontSize: 16 }}>{item.name}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 10,
    marginVertical: 80,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    width: 250,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    paddingVertical: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerBtn: {
    height: 50,
    width: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  virtualTag: {
    top: -20,
    width: 120,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 20,
    backgroundColor: "#09143C",
    justifyContent: "center",
    alignItems: "center",
  },
  interiorImage: {
    width: width / 3 - 20,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  footer: {
    height: 70,
    backgroundColor: "yellow",
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  bookNowBtn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  detailsContainer: { flex: 1, paddingHorizontal: 20, marginTop: 40 },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: "#888" },

  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  header: {
    paddingBottom: 10,
    fontSize: 40,
    textAlign: "center",
    textShadowColor: "#B59410",

    textShadowOffset: { width: -1, height: 1 },
    color: "#fff",
    textShadowRadius: 10,
  },
  Text: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
    marginBottom: 10,
    paddingHorizontal: 50,
  },
  Text2: {
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
    marginTop: 80,
    paddingHorizontal: 50,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 30,
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: -1, height: 1 },
    color: "#fff",
    textShadowRadius: 10,
  },
  icon: {
    position: "absolute",
    top: 50,
    left: 30,

    zIndex: 2,
  },
  buttonRooms: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    padding: 10,
  },
  user_Name: {
    backgroundColor: "black",
    alignItems: "center",
    textAlign: "center",
  },
  innerText: {
    color: "white",
    padding: 5,
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    color: "white",
    backgroundColor: "black",
  },
  LogoutBtn: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});
