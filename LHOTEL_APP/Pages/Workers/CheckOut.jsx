import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Divider } from "react-native-paper";
import { images } from "../../images";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { Searchbar } from "react-native-paper";
import AppContext from "../../AppContext";

import { TextInput } from "react-native-paper";
const numColumns = 2;

export default function CheckOut() {
  const [DBreservationItems, SetDBReservationItems] = useState([]);
  const [reservationItems, setReservationItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  useEffect(() => {
    FetchData();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); 
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); 
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const FetchData = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      "http://proj13.ruppin-tech.co.il/GetBookedRooms",
      requestOptions
    );
    let rooms = await result.json();
    if (rooms !== null) {
      
      let roomsData = BilldReservationItemsData(rooms);
     
      setReservationItems(roomsData);
      SetDBReservationItems(roomsData);
      return;
    }
    FetchData();
  };
  const renderItem = ({ item }) => (
   
    <>
      <Divider
        style={{
          width: 2,
          height: "70%",
          marginRight: 10,
          alignSelf: "center",
        }}
      />

      <Text
        style={{
          fontSize: 17,
          paddingHorizontal: 5,
          marginRight: 10,
          paddingBottom: 5,
        }}
      >
        Room : {item}
      </Text>
    </>
  );

  const BilldReservationItemsData = (data) => {
    // console.log(data);

    let temp = [];
    for (let index = 0; index < data.length; index++) {
      let object = temp.filter(
        (per) => per.CustomerID === data[index].CustomerID
      );
      if (object.length === 0) {
        temp.push(data[index]);
      } else {
        if (object[0].RoomNumber.length === undefined) {
          let rooms = [object[0].RoomNumber, data[index]["RoomNumber"]];
          object[0].RoomNumber = rooms;
        } else {
          // console.log(data[index].RoomNumber);
          object[0].RoomNumber.push(data[index].RoomNumber);
        }
      }
    }
    return temp;
  };

  const SerchReservation = (value) => {
  
    setSearch(value);
    let occupiedReservation = reservationItems.filter(
      (reservation) => reservation.CustomerID == value
    );
   
    if (occupiedReservation.length > 0) {
      setReservationItems(occupiedReservation);
    } else {
      setReservationItems(DBreservationItems);
    }
  };

  const CheckOutCard = ({ item, index }) => {
    return (
      <View >
        <View style={styles.Details}>
          <Text style={{ fontSize: 16 }}>
            {moment(item.BillDate).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>No : {item.BillNumber}</Text>
        </View>
        <View style={styles.containerTaskDedtails}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Icon name="person" size={18} style={{ padding: 4 }}>
              {" "}
              {item.AmountOfPeople}
            </Icon>
            <Text style={{ padding: 10, fontSize: 18 }}>
              ID : {item.CustomerID}
            </Text>
          </View>

          <Text style={{ padding: 10, alignSelf: "flex-end", fontSize: 18 }}>
            FROM : {moment(item.EntryDate).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ padding: 10, alignSelf: "flex-end", fontSize: 18 }}>
            TO : {moment(item.ExitDate).format("DD.MM.YYYY")}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            {item.RoomNumber.length === undefined ? (
              <Text
                style={{
                  fontSize: 17,
                  paddingHorizontal: 5,
                  marginRight: 10,
                  paddingBottom: 5,
                }}
              >
                {" "}
                Room : {item.RoomNumber}
              </Text>
            ) : (
              <FlatList
                data={item.RoomNumber}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
            )}

          
          </View>

          <View style={styles.BTNContainer}>
            <TouchableOpacity
              style={styles.LogoutBtn}
              onPress={() => Checkout(item.CustomerID, item.ExitDate)}
            >
              <Text style={{ color: "black" }}>Check out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const Checkout = async (CustomerID, ExitDate) => {
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({
        id: CustomerID,
        Exit_Date: ExitDate,
      }),
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      "http://proj13.ruppin-tech.co.il/CheckOut",
      requestOptions
    );
    let rooms = await result.json();
    if (rooms) {
      alert("You have successfully checked out !!!");
      FetchData();
      return;
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.topview}>
          <Text style={styles.HeadLine}>CHECK OUT</Text>

          <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            onChangeText={SerchReservation}
            value={search}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.SearchbarContainer}>
          
          <View style={{ paddingHorizontal:  5 ,paddingTop: isKeyboardVisible? 40:5}}>
            <FlatList
              data={reservationItems}
              renderItem={CheckOutCard}
              keyExtarctor={(item, index) => index.toString()}
              numColumns={1}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  topview: {


    flex: 1,
  
  },
  welcomemessage: {
    color: "#888",
    fontSize: 35,
    fontWeight: "bold",
  },
  searchbar: {

    backgroundColor: "#CDCDCD",
    
    alignSelf: "center",
    width: "95%",
    borderRadius: 50,
    zIndex: 2,
    marginTop: 5,
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
  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: numColumns,
    flex: 1,
    margin: 10,
  },
  itemText: {
    color: "black",
    fontSize: 20,
  },
  Image: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: "contain",
    padding: 5,
  },
  Text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    textDecorationLine: "underline",
    textAlign: "right",
    paddingLeft: 30,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    textShadowRadius: 10,
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
  container: {
    flex: 1,
   
  },
  containerTaskDedtails: {
    borderColor: "black",
    borderWidth: 1,
 
  },

  Details: {
   
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    padding: 5,
  },
  BTNImages: {
    width: 30,
    height: 30,
  },
  BTNContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },

  item: {
    backgroundColor: "rgba(35,100,168, 0.2)",
    alignItems: "center",
    justifyContent: "center",

    height: numColumns,
    flex: 1,
    margin: 10,
  },
  SearchbarContainer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginHorizontal: 2,
    paddingTop: 30,
  },
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 40,
    color: "#fff",
    paddingBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  LogoutBtn: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
});
