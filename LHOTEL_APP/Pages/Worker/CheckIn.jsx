import React, { useContext } from "react";

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, Dimensions, Animated, ScrollView, StatusBar, Switch, ImageBackground, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "../../images";

import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";

export default function CheckIn({ route, navigation }) {
  const myContext = useContext(AppContext);
  
  useFocusEffect(
    React.useCallback(() => {
      myContext.setIsUserExist(false)
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.header}>LHOTEL</Text>
      </ImageBackground>

      <View style={styles.bottomview}>
        <View style={{ paddingTop: 50 }}>
          <Text style={styles.HeadLine}>CHECK IN</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewReservation")}
            style={{
              width: "80%",
              height: 60,
              marginHorizontal: 10,
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <LinearGradient
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
              colors={["#926F34", "#DFBD69"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}>
                New reservation
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ExistingReservation")}
            style={{
              width: "80%",
              height: 60,
              marginHorizontal: 10,
              marginVertical: 20,
              alignSelf: "center",
            }}
          >
            <LinearGradient
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
              colors={["#926F34", "#DFBD69"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}>
                Existing reservation
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topview: {
    marginTop: 60,
    marginHorizontal: 24,
    backgroundColor: "gray",
    flex: 1,
    justifyContent: "space-between",
  },
  welcomemessage: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  searchbar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    height: 40,
    borderRadius: 10,
    marginBottom: 65,
  },
  circle: {
    borderRadius: 25,
    height: 50,
    width: 50,
    backgroundColor: "#fff",
  },
  welcomecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomview: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -40,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 35,
    zIndex: 1,
    fontWeight: 'bold',
    bottom: 40,
    color: 'white',
   paddingLeft:20
    // position: 'absolute',

  },
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },

});
