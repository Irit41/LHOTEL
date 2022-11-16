import React, { useEffect, useState, useContext } from "react";
import Customer from "../Class/Customer";
import Reservation from "../Class/Reservation";
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Alert, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import { Divider, Text } from "react-native-paper";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import AppContext from "../../AppContext";
import { GrayButton,BlueButton } from "../../styles";



export default function ShortCheckIn({ navigation }) {
  // { route, navigation }
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
// console.log(roomsReservation);
  // let { roomsReservationReservation } = route.params;

  // const curr = currReservation[0];
  // console.log(curr);

  //   const CalcCost = () => {
  //     let total = 0
  //     // if (roomsReservation.BillNumber === undefined) {

  //     // }

  //     roomsReservation.rooms.map((room) => {
  //       total+= room.PricePerNight

  //         });

  //         // useEffect(() => { GetCardsByRole(); 
  //         // }, []);

  // console.log(roomsReservation.rooms);

  //     // if (roomsReservation.BillNumber === undefined) {
  //     //   let rooms_costs = [
  //     //     { type: "Single", cost: 100, amount: roomsReservation.CounterSingle },
  //     //     { type: "Double", cost: 300, amount: roomsReservation.CounterDouble },
  //     //     { type: "Suite", cost: 500, amount: roomsReservation.CounterSuite },
  //     //   ];
  //     //   rooms_costs.map((room) => {
  //     //     room.cost = room.cost * room.amount;
  //     //   });
  //     //   rooms_costs.forEach((element) => {
  //     //     total += element.cost;
  //     //   });
  //     // } else {
  //     //   for (let i = 0; i < currReservation.length; i++) {
  //     //     total += currReservation[i].PricePerNight;
  //     //   }
  //     // }

  //     return total;
  //   };



  const ReservationCard = () => {
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
          Room : {item.RoomNumber}
        </Text>
      </>
    );

    return (
      <View
        style={{
          marginHorizontal: 10,
          paddingTop: 10,
          height: 200 + (Math.ceil(roomsReservation.rooms.length / 3) - 1) * 25,
        }}
      >
        <View style={styles.Details}>
          <Text style={{ fontSize: 16 }}>
            {moment(
              roomsReservation.BillDate === undefined
                ? new Date()
                : new Date(roomsReservation.BillDate)
            ).format("DD.MM.YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {roomsReservation.BillNumber === undefined
              ? null
              : "No : " + roomsReservation.BillNumber}
          </Text>
        </View>
        <View style={{ paddingTop: 10, alignSelf: "flex-end" }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            <Image style={styles.icon} source={images.calendar} />
            {" " +
              moment(new Date(roomsReservation.EntryDate))
                .format("DD.MM.YYYY")
                .split(".")[0] +
              " - " +
              moment(new Date(roomsReservation.ExitDate)).format(
                "DD.MM.YYYY"
              )}{" "}
            (
            {moment(roomsReservation.ExitDate).diff(
              moment(roomsReservation.EntryDate),
              "days"
            )}{" "}
            nights)
          </Text>
          <Text
            style={{
              color: "#888",
              paddingHorizontal: 5,
              paddingTop: 10,
              fontSize: 17,
              alignSelf: "flex-end",
            }}
          >
            {roomsReservation.AmountOfPeople} adults
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              marginRight: 5,
            }}
          >
            {roomsReservation.rooms.length === 0 ? null : (
              <FlatList
                data={roomsReservation.rooms}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
            )}
          </View>
        </View>
      </View>
    );
  };
  // פונצקיה לביצוע צ'ק אין ללקוח שלא קיים לו משתמש במערכת
  const CheckIn_Without_Existing_User = async () => {
    var Hashes = require("jshashes");
    let SHA1Pass = new Hashes.SHA1().b64_hmac(roomsReservation.CustomerID, roomsReservation.CustomerID);
    let SHA1Card = new Hashes.SHA1().b64_hmac(
      roomsReservation.CustomerID,
      roomsReservation.CreditCardNumber
    );
    try {
      let newCustomer = {
        // יצירת אובייקט מסוג לקוח
        className: Customer,
        fields: {
          CustomerID: roomsReservation.CustomerID,
          CustomerType: roomsReservation.CustomerType,
          FirstName: roomsReservation.FirstName,
          LastName: roomsReservation.LastName,
          Mail: roomsReservation.Mail,
          Password: SHA1Pass,
          PhoneNumber: roomsReservation.PhoneNumber,
          CardHolderName: roomsReservation.CardHolderName,
          CreditCardNumber: SHA1Card,
          CreditCardDate: roomsReservation.CreditCardDate,
          ThreeDigit: roomsReservation.ThreeDigit,
          EmployeeID: roomsReservation.EmployeeID,
          AmountOfPeople: roomsReservation.AmountOfPeople,
          Breakfast: roomsReservation.Breakfast,
          CounterSingle: roomsReservation.CounterSingle,
          CounterDouble: roomsReservation.CounterDouble,
          CounterSuite: roomsReservation.CounterSuite,
          ExitDate: roomsReservation.ExitDate,
          EntryDate: roomsReservation.EntryDate,
        },
      };

      let theCustomer = JSON.stringify(newCustomer.fields);

      const requestOptions = {
        method: "POST",
        body: theCustomer,
        headers: { "Content-Type": "application/json" },
      };

      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/CheckIn_Without_Existing_User",
        requestOptions
      );
      let reservationResult = await result.json();
      if (reservationResult) {
        // console.log(reservationResult);
        alert("You have checked in successfully !");
      }
      navigation.navigate("CheckIn");
    } catch (error) {
      alert(error);
    }
  };
  const CheckIn_With_Existing_User = async () => {
    try {
      let reservation = {
        // יצירת אובייקט מסוג לקוח
        className: Reservation,
        fields: {
          CustomerID: roomsReservation.CustomerID,
          Breakfast: roomsReservation.Breakfast,
          CardHolderName: roomsReservation.CardHolderName,
          CreditCardNumber: roomsReservation.CreditCardNumber,
          CreditCardDate: roomsReservation.CreditCardDate,
          ThreeDigit: roomsReservation.ThreeDigit,
          AmountOfPeople: roomsReservation.AmountOfPeople,
          EmployeeID: roomsReservation.EmployeeID,
          CounterSingle: roomsReservation.CounterSingle,
          CounterDouble: roomsReservation.CounterDouble,
          CounterSuite: roomsReservation.CounterSuite,
          ExitDate: roomsReservation.ExitDate,
          EntryDate: roomsReservation.EntryDate,
        },
      };

      const requestOptions = {
        method: "POST",
        body: JSON.stringify(reservation.fields),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/CheckIn_With_Existing_User",
        requestOptions
      );
      let customerResult = await result.json();
      if (customerResult) {
        // console.log(customerResult);
        alert("You have checked in successfully !");
      }
      navigation.navigate("CheckIn");
    } catch (error) {
      alert(error);
    }
  };
  const CheckInWithExistingReservation = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
          id: roomsReservation.CustomerID,
          Entry_Date: roomsReservation.EntryDate,
        }),
        headers: { "Content-Type": "application/json" },
      };
      // console.log( roomsReservation.EntryDate);
      // console.log(requestOptions.body);
      let result = await fetch("http://proj13.ruppin-tech.co.il/CheckIn", requestOptions);
      let customerResult = await result.json();
      if (customerResult !== null) {
        // console.log(customerResult);
        alert("You have checked in successfully !");
      }
      navigation.navigate("CheckIn");
    } catch (error) {
      alert(error);
    }
  };
  // console.log(roomsReservation.rooms);
  // console.log(myContext.isUserExist);
  const DeleteReservationRequest = () => {
    Alert.alert("Delete",
      "The reservation will be permanently deleted",
      [
        { text: 'Ok', onPress: () => { DeleteReservation() } },
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel",
        },

        // {text: 'Ok', onPress: () => DeleteReservation()},
        // {text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel'},
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () =>
      //     Alert.alert(
      //       "This alert was dismissed by tapping outside of the alert dialog."
      //     ),
      // }
    );
  }
  const DeleteReservation = async () => {

    try {
      const requestOptions = {
        method: 'DELETE',
        body: JSON.stringify({
          id: roomsReservation.CustomerID
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      // console.log(requestOptions.body);
      let result = await fetch('http://proj13.ruppin-tech.co.il/DeleteReservation', requestOptions);
      if (result) {
        alert("Task details successfully saved")
        navigation.goBack()
      }
    } catch (error) {
      alert(error)
    }

  }


  const CheckIn = () => {
   
    if (roomsReservation.BillNumber !== undefined) CheckInWithExistingReservation();
    else if (myContext.isUserExist) CheckIn_With_Existing_User();
    else CheckIn_Without_Existing_User();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={images.hotelback}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "80%",
          }}
        />
        <View
          style={[
            {
              position: "absolute",
              bottom: "5%",
              left: "5%",
              right: "5%",
              borderRadius: 15,

              backgroundColor: "#fff",
            },
            styles.shadow,
          ]}
        >
          <ReservationCard />
        </View>

        <View
          style={{
            position: "absolute",
            flexDirection: "row",
          }}
        ></View>
      </View>

      <View style={{ flex: 1.5 }}>
        <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
          <Text
            style={{ fontSize: 20, paddingBottom: 20, alignSelf: "flex-end" }}
          >
            Customer's details{" "}
          </Text>

          <View style={styles.containerTaskDedtails}>
            <View style={styles.Details}>
              <Text
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  fontSize: 18,
                  // alignSelf: "flex-end",
                }}
              >
                Type : {roomsReservation.CustomerType}
              </Text>
              <Text
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  fontSize: 18,
                  // alignSelf: "flex-end",
                }}
              >
                ID : {roomsReservation.CustomerID}
              </Text>
            </View>
            <View style={styles.Details}>
              <Text style={{ fontSize: 18 }}>{roomsReservation.Mail}</Text>
              <Text style={{ fontSize: 18 }}>
                {roomsReservation.FirstName + " " + roomsReservation.LastName}
              </Text>
            </View>
            <View style={styles.Details}>
              {/* <Text style = {{paddingHorizontal:5,paddingVertical:5,fontSize:18 ,alignSelf:'flex-end'}}>5421******</Text> */}
              {/* <Icon name="card" size={25} color="#a8a9ad" /> */}
            </View>
            <Text style={{ padding: 10, fontSize: 18, alignSelf: "flex-end" }}>
              {" "}
              <Icon name="call" size={20} color="#a8a9ad" />
              {roomsReservation.PhoneNumber}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={{ flex: 0.5, paddingHorizontal: 10 }}>

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>

          <TouchableOpacity
            style={{width: 150, height: "60%", marginHorizontal: 10 }}
            //   onPress={() => SaveReservationToDB()}
            onPress={() => CheckIn()}
          >
            {/* <LinearGradient
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
              colors={["#46aeff", "#5884ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            > */}
                  <BlueButton text={"CHECK IN"}/>
              {/* <Text style={{ color: "#fff" }}>CHECK IN NOW</Text> */}
            {/* </LinearGradient> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 150, height: "60%", marginHorizontal: 10 }}
            onPress={() => DeleteReservationRequest()}

          >
            <GrayButton text={"DELETE"}/>
            {/* <LinearGradient
              style={[
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                },
              ]}
              // colors={["#edf0fc", "#d6dfff"]}
              colors={["#888", "#CDCDCD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "#fff" }}>DELETE RESERVATION</Text>
            </LinearGradient> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,

    // padding: 20,
  },

  containerTaskDedtails: {
    borderColor: "black",
    borderWidth: 1,
  },

  Details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
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
});