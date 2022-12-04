import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { CreditCardInput } from "react-native-credit-card-input-view";
import AppContext from "../AppContext";


export default function Credit({ route, navigation }) {


  const myContext = useContext(AppContext);
  const isEmploeeConncted = JSON.stringify(myContext.employee) !== "{}";
  const roomsReservation = myContext.roomsReservation
  const user = myContext.user

  const [form, SetForm] = useState({});


  const onChange = (form) => {
  

    SetForm(form);
  };

 
  const SaveRoomReservation = async () => {
  
    try {
      let { the_data } = route.params;
      var Hashes = require('jshashes')

     
      let SHA1Card = new Hashes.SHA1().b64_hmac(user.CustomerID, roomsReservation.CreditCardNumber)
 
      roomsReservation.CustomerID = user.CustomerID
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          CustomerID: user.CustomerID,
          CardHolderName: roomsReservation.CardHolderName,
          CreditCardDate: roomsReservation.CreditCardDate,
          ThreeDigit: roomsReservation.ThreeDigit,
          CreditCardNumber: SHA1Card,
          EmployeeID: roomsReservation.EmployeeID,
          CounterSingle: roomsReservation.CounterSingle,
          CounterDouble: roomsReservation.CounterDouble,
          CounterSuite: roomsReservation.CounterSuite,
          EntryDate: roomsReservation.EntryDate,
          ExitDate: roomsReservation.ExitDate,
          AmountOfPeople: roomsReservation.AmountOfPeople,
          Breakfast: roomsReservation.Breakfast
        }),
        headers: { "Content-Type": "application/json" },
      };
      console.log(requestOptions.body);

      let result = await fetch("http://proj13.ruppin-tech.co.il/SaveRoomReservation", requestOptions);
      let customerResult = await result.json();
      if (customerResult)
        navigation.navigate("ConfirmationPage", {
          the_data: the_data,
        });

    } catch (error) {
      alert(error);
    }

  };


  const ConfirmInformation = () => {
    if (!form.valid) {
      alert("Incorrect credit card details")
      return
    }
    roomsReservation.EmployeeID = isEmploeeConncted ? myContext.employee.EmployeeID : -1;
    roomsReservation.CardHolderName = form.values.name;
    roomsReservation.CreditCardNumber = form.values.number.replace(/ /g, "");
    roomsReservation.CreditCardDate = form.values.expiry;
    roomsReservation.ThreeDigit = form.values.cvc;
   
    isEmploeeConncted ? navigation.navigate("ShortCheckIn") : SaveRoomReservation();

  };

  return (
    <View>

      <Text style={styles.HeadLine}>Total to pay: {roomsReservation.totalSum}$</Text>

      <View style={styles.styleCard}>
        <CreditCardInput
          requiresName={true}
          allowScroll={true}
          autoFocus={true}
          cardScale={0.4}
          keyboardType="numeric"
          onChange={onChange}
          useVertical={true}
        />

      </View>

      <View style={styles.footerStyle} >
 
        <TouchableOpacity
          style={styles.footerButtonTwo}
          onPress={() => ConfirmInformation()}
        >
          <Text style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 60,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",

  },

  TextInput: {
    flexDirection: "row",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    height: 50,
    padding: 10,
  },
  styleCard: {
    paddingTop: 5,

  },

  footerStyle: {
    flexDirection: "row",
    
    justifyContent: "space-between",
    paddingTop: 560,
    alignSelf: 'center',
    position: "absolute",
  },

  footerButtonOne: {
    backgroundColor: "#656255",

    // padding: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },

  footerButtonTwo: {
    backgroundColor: "#556B2F",
    marginHorizontal: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
});