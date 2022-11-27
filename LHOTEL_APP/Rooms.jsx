import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { ActivityIndicator } from "react-native";

import AppContext from './AppContext';
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import CardRoom from "./Pages/Customer/CardRoom";
import { Spinner } from "./styles";

export default function Rooms({navigation, childFunc}) {


  const myContext = useContext(AppContext);
  const user = myContext.user
  const roomsReservation = myContext.roomsReservation
  const [counterSingle, SetCounterSingle] = useState(0);
  const [counterDouble, SetCounterDouble] = useState(0);
  const [counterSuite, SetCounterSuite] = useState(0);
  // roomsReservation.CounterSingle = 0 
        // roomsReservation.CounterDouble = 0 
        // roomsReservation.CounterSuite = 0
        // roomsReservation.totalSum = 0

  const [loading, SetLoading] = useState(false);
  const [arrRoomsData, SetArrRoomsData] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     childFunc.current = GoToPayment  }, [])

 
  useFocusEffect(
    React.useCallback(() => {
      SetLoading(false)
      FetchData()
      childFunc.current = GoToPayment
      return () => {
        // roomsReservation.CounterSingle = 0 
        // roomsReservation.CounterDouble = 0 
        // roomsReservation.CounterSuite = 0
        // roomsReservation.totalSum = 0

       
      };
    }, [myContext.rooms_flags])
  );

 

  const FetchData = async () => {

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch("http://proj13.ruppin-tech.co.il/GetAvailableRooms", requestOptions);
    let rooms = await result.json();
    if (rooms !== null) {
        
      BilldData(rooms);
      SetLoading(true);
      return;
    }
    FetchData();
  };

  const BilldData = (rooms) => {
    let array = [];
    // console.log(myContext.rooms_flags);
    for (const [key, value] of Object.entries(myContext.rooms_flags)) {
      if (value) {
        let room = rooms.filter((room) => room.RoomType === key);
        if (room[0] !== undefined) {
          room = room[0];
          array.push(room);
        }
      }
    }
    
    SetArrRoomsData(array);
  };


  // console.log(rooms_flags)

//   const isValidParams = () => {
//     let temp = Object.values(rooms_flags)
//    return ((temp[0] && roomsReservation.CounterSingle === 0)&&
//       (temp[1] && roomsReservation.CounterDouble === 0) &&
//       (temp[2] && roomsReservation.CounterSuite === 0)) 
  
   
 
//   }

const isValidParams = () => {
    return (
      !(
        roomsReservation.CounterSingle === 0 &&
        roomsReservation.CounterDouble === 0 &&
        roomsReservation.CounterSuite === 0
      ) 
    );
  };

  const GoToPayment = () => {

    // if (isValidParams()) {
    //   alert("Some fields are not filled in Properly")
    //   return
    // }
    if (!isValidParams()) {
        alert("Some fields are not filled in Properly");
        return;
      }
      

    // if (Object.keys(user).length === 0) {
    //   toggleModal()
    //   return
    // }

    let rooms_amounts = {
        "Single room": counterSingle,
      "Double room": counterDouble,
      "Suite":counterSuite,
    //   "Single room": roomsReservation.CounterSingle,
    //   "Double room": roomsReservation.CounterDouble,
    //   "Suite": roomsReservation.CounterSuite,
    };
   


    let the_data = [];
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i < arrRoomsData.length; i++) {
        if (arrRoomsData[i].RoomType === key &&value!==0) {
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
//    console.log(the_data);
    let sum = 0
    for (let i = 0; i < the_data.length; i++) {
      let pricePerNight = the_data[i].pricePerNight;
      let count = the_data[i].count;
      let tempToatal = pricePerNight * count

      sum += tempToatal;
      if (roomsReservation.Breakfast) sum += 70 * count
    }

    roomsReservation.totalSum = sum
   console.log(sum);
    //  navigation.navigate("Credit", { the_data: the_data ,totalSum:sum});
  };
 
// const calc =()=>{
    
// }

  const SetCount = (number, roomType) => {
    switch (roomType) {
      case "Single room":
        {
            SetCounterSingle(number)
            roomsReservation.CounterSingle = number
        }
        
        break;
      case "Double room":
        {
            SetCounterDouble(number)
           roomsReservation.CounterDouble = number
        }
       
        break;
      case "Suite":
        {
            SetCounterSuite(number)
            roomsReservation.CounterSuite = number

        }
        break;
    }
  };


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
    <View>
      <Text style={styles.HeadLine}>Choose a room</Text>
{loading ? roomsList : <Spinner />}

     
    </View>
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