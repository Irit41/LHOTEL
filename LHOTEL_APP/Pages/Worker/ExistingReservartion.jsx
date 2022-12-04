import React, { useContext, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import moment from "moment";

import { useFocusEffect } from "@react-navigation/native";
import AppContext from "../../AppContext";

export default function ExistingReservation({ route, navigation }) {


  const [id, setId] = useState("");
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  useFocusEffect(
    React.useCallback(() => {
      (roomsReservation.CustomerID = ""),
        (roomsReservation.CustomerType = 1),
        (roomsReservation.FirstName = ""),
        (roomsReservation.LastName = ""),
        (roomsReservation.Mail = ""),
        (roomsReservation.PhoneNumber = ""),
        (roomsReservation.CardHolderName = ""),
        (roomsReservation.CreditCardNumber = ""),
        (roomsReservation.CreditCardDate = ""),
        (roomsReservation.ThreeDigit = ""),
        (roomsReservation.AmountOfPeople = 1),
        (roomsReservation.EmployeeID = -1),
        (roomsReservation.CounterSingle = 0),
        (roomsReservation.CounterDouble = 0),
        (roomsReservation.CounterSuite = 0),
        (roomsReservation.EntryDate = moment().toDate()),
        (roomsReservation.ExitDate = moment().add(1, "days").toDate()),
        (roomsReservation.Breakfast = false),
        (roomsReservation.NumberOfNights = 0),
        (roomsReservation.totalSum = 0),
        (roomsReservation.rooms = []);
    }, [])
  );

  const ReservationCheck = async () => {
    if (id !== "") {
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetReservedRoomsByCustomerId",
        requestOptions
      );
      let currReservation = await result.json();
    
      if (currReservation.length !== 0) {
        roomsReservation.AmountOfPeople = currReservation[0].AmountOfPeople;
        roomsReservation.BillDate = currReservation[0].BillDate;
        roomsReservation.BillNumber = currReservation[0].BillNumber;
        roomsReservation.Breakfast = currReservation[0].Breakfast;
        roomsReservation.CustomerID = currReservation[0].CustomerID;
        roomsReservation.CustomerType = currReservation[0].CustomerType;
        roomsReservation.EntryDate = currReservation[0].EntryDate;
        roomsReservation.ExitDate = currReservation[0].ExitDate;
        roomsReservation.FirstName = currReservation[0].FirstName;
        roomsReservation.LastName = currReservation[0].LastName;
        roomsReservation.Mail = currReservation[0].Mail;
        roomsReservation.PhoneNumber = currReservation[0].PhoneNumber;
     
        if (currReservation.length > 1) {
          currReservation.map((room) =>
        
            roomsReservation.rooms.push({
              RoomNumber: room.RoomNumber,
              PricePerNight: room.PricePerNight,
            })
          );
        }else {
          roomsReservation.rooms.push({
            RoomNumber: currReservation[0].RoomNumber,
            PricePerNight:currReservation[0].PricePerNight,
          })
        }
  //  console.log(roomsReservation.rooms);

         navigation.navigate("ShortCheckIn")
      } else alert("No matching Reservation for the ID you entered");
    } else alert("No matching Reservation for the ID you entered");
  };
  return (
    <View style={styles.container}>
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
        <View style={{ paddingTop: 80 }}>
          <Text
            style={{ alignSelf: "center", fontWeight: "bold", fontSize: 25 }}
          >
            Enter customer's ID
          </Text>

          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(id) => setId(id)}
            value={id}
          />

          <TouchableOpacity
            onPress={() => ReservationCheck()}
            style={{
              width: "70%",
              height: 60,
              marginHorizontal: 10,
              marginVertical: 20,
              alignSelf: "center",
              borderRadius: 25,
              shadowOpacity: 0.3,
              shadowRadius: 25,
              elevation: 5,
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
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: "bold",
    bottom: 40,
    color: "white",
    paddingLeft: 20,
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 50,
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    shadowColor: "grey",

    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "orange",
    alignSelf: "center",
    width: 210,
    paddingHorizontal: 50,
    paddingVertical: 20,

    borderRadius: 10,
  },
  textButton: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
