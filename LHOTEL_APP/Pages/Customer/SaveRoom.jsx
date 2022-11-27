import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import CardRoom from "./CardRoom";
import AppContext from "../../AppContext";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import { BlueButton, Spinner } from "../../styles";

export default function 
SaveRoom({route,navigation }) {
  const myContext = useContext(AppContext);
  // let { rooms_flags } = navigation.route.params;
  const user = myContext.user;
  const roomsReservation = myContext.roomsReservation;
  const [loading, SetLoading] = useState(false);
  const [arrRoomsData, SetArrRoomsData] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const GoToLogin = () => {
    setModalVisible(!isModalVisible);
    navigation.navigate("Login");
  };
  useFocusEffect(
    React.useCallback(() => {
      SetLoading(false);
      FetchData();
      roomsReservation.CounterSingle = 0;
      roomsReservation.CounterDouble = 0;
      roomsReservation.CounterSuite = 0;
      // return () => {
      //   roomsReservation.CounterSingle = 0;
      //   roomsReservation.CounterDouble = 0;
      //   roomsReservation.CounterSuite = 0;
      // };
    }, [route.params!== undefined?route.params:navigation])
  );


  const FetchData = async () => {

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetAvailableRooms", requestOptions);
    let rooms = await result.json();

    if (rooms !== null) {
      JSON.stringify(myContext.employee) !== "{}" ? SetArrRoomsData(rooms):
      BilldData(rooms);
      SetLoading(true);
      return;
    }
    FetchData();
  };

  const BilldData = (rooms) => {
    let array = [];
  let   { rooms_flags } =  route.params
  
  // let  rooms_flags=[]
   
    for (const [key, value] of Object.entries(rooms_flags)) {
      if (value) {
        let room = rooms.filter((room) => room.RoomType === key);
        if (room[0] !== undefined) {
          
          room = room[0];
          if(roomsReservation.Breakfast)room.PricePerNight+=70; 
          array.push(room);
        }
      }
    }
    SetArrRoomsData(array);
  };



  const isValidParams = () => {
    return !(
      roomsReservation.CounterSingle === 0 &&
      roomsReservation.CounterDouble === 0 &&
      roomsReservation.CounterSuite === 0
    );
  };

  const GoToPayment = () => {
    if (!isValidParams()) {
      alert("Some fields are not filled in Properly");
      return;
    }

    if (Object.keys(user).length === 0) {
      toggleModal();
      return;
    }

    let rooms_amounts = {
      "Single room": roomsReservation.CounterSingle,
      "Double room": roomsReservation.CounterDouble,
      Suite: roomsReservation.CounterSuite,
    };

   
    let the_data = [];
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i < arrRoomsData.length; i++) {
        if (arrRoomsData[i].RoomType === key) {
          if (arrRoomsData[i].Amount < value) {
            Alert.alert("Some fields are not filled in Properly");
            return;
          }
          let room_temp = {
            type: arrRoomsData[i].RoomType,
            count: value,
            details: arrRoomsData[i].Details,
            pricePerNight: arrRoomsData[i].PricePerNight,
          };
          the_data.push(room_temp);
        }
      }
    }
    // let sum = 0
    let sumTotal = the_data.reduce(function (prev, current) {
      return current.pricePerNight * current.count +prev ;
    }, 0);
    sumTotal*= roomsReservation.NumberOfNights

    roomsReservation.totalSum = sumTotal
    navigation.navigate("Credit", { the_data: the_data });
  };
  const SetCount = (number, roomType) => {
    switch (roomType) {
      case "Single room":
        roomsReservation.CounterSingle = number;
        break;
      case "Double room":
        roomsReservation.CounterDouble = number;
        break;
      case "Suite":
        roomsReservation.CounterSuite = number;
        break;
    }
  };
// console.log(arrRoomsData);
 let roomsList = arrRoomsData.map((room, index) => (
    <CardRoom
      key={index}
      SetCount={SetCount}
      roomType={room.RoomType}
      details={room.Details}
      pricePerNight={room.PricePerNight}
      count={room.Amount}
    />
  ));

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>LHotel Rooms</Text>

      <Modal isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#90A9A4",
            width: "90%",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#fff",
            marginVertical: 150,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              paddingVertical: 50,
              width: 180,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            Please log in to continue placing the order
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingVertical: 50,
            }}
          >
            <Button title="go to login" onPress={GoToLogin} />
            <Button title="cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <View>{loading ? roomsList : <Spinner/>}</View>
      {
           JSON.stringify(myContext.employee) === "{}"? <View style={styles.save}>
           {loading ? (
             <TouchableOpacity style={{width:150,alignSelf:'center'}} onPress={GoToPayment}>
               <BlueButton text={"Save"} />
             </TouchableOpacity>
           ) : null}
         </View>:null
      }
     
    </ScrollView>
  );
}
// const Spinner = () => (
//   <View style={[styles.container, styles.horizontal]}>
//     <ActivityIndicator size="large" />
//   </View>
// );

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  save: {
    paddingBottom: 30,
    paddingTop: 20,
    width: 100,
    alignSelf: "center",
  },
  button: {
    flex: 1,
    width: 100,
    backgroundColor: "rgba(35,100,168, 0.4)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
