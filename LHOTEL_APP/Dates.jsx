import React, { useEffect, useState, useContext } from "react";

import AppContext from "./AppContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Switch,

} from "react-native";

import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "./images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
// import { TextInput } from "react-native-paper";
import moment from "moment";
export default function Dates() {
  const [flagEnrty, setFlagEntry] = useState(false);
  const [flagExit, setFlagExit] = useState(false);
  const [isEntryModalOpened, SetIsEntryModalOpened] = useState(false);
  const [isExitModalOpened, SetIsExitModalOpened] = useState(false);
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [amountOfPeople, setAmountOfPeople] = useState(0);
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  const handleConfirmEnteryDate = (date) => {
    roomsReservation.EntryDate = date;
    // roomsReservation.NumberOfNights = numberOfNights;
    setFlagEntry(false);
    SetIsEntryModalOpened(true);
  };
// console.log( roomsReservation.NumberOfNights);
  const handleConfirmExitDate = (date) => {
    roomsReservation.ExitDate = date;
  //  roomsReservation.NumberOfNights = numberOfNights;
    setFlagExit(false);
    SetIsExitModalOpened(true);
    // hideDatePickerExit();zxereg
  };
  useEffect(() => {
    if (
      moment(roomsReservation.EntryDate).isBefore(moment(), "day") ||
      moment(roomsReservation.ExitDate).isSame(
        roomsReservation.EntryDate,
        "day"
      ) ||
      moment(roomsReservation.ExitDate).isBefore(
        roomsReservation.EntryDate,
        "day"
      )
    ) {
      setNumberOfNights(0);
      roomsReservation.NumberOfNights = 0
      return;
    }
    else if (!isEntryModalOpened && isExitModalOpened) {
      roomsReservation.NumberOfNights =
      (
        moment(roomsReservation.ExitDate).diff(
          moment(roomsReservation.EntryDate),
          "days"
        ) + 1
      );
      setNumberOfNights(roomsReservation.NumberOfNights);
      return;
    }
    else roomsReservation.NumberOfNights =
    (
      moment(roomsReservation.ExitDate).diff(
        moment(roomsReservation.EntryDate),
        "days"
      )
      
    );
    setNumberOfNights(roomsReservation.NumberOfNights);
  });






//   useEffect(() => {
//     if (
//       moment(roomsReservation.EntryDate).isBefore(moment(), "day") ||
//       moment(roomsReservation.ExitDate).isSame(
//         roomsReservation.EntryDate,
//         "day"
//       ) ||
//       moment(roomsReservation.ExitDate).isBefore(
//         roomsReservation.EntryDate,
//         "day"
//       )
//     ) {
//       setNumberOfNights(0);
//       roomsReservation.NumberOfNights = numberOfNights;
//       return;
//     }
//     else if (!isEntryModalOpened && isExitModalOpened) {
//       setNumberOfNights(
//         moment(roomsReservation.ExitDate).diff(
//           moment(roomsReservation.EntryDate),
//           "days"
//         ) + 1
//       );
//       return;
//     }
//     else roomsReservation.NumberOfNights = numberOfNights;(
//       moment(roomsReservation.ExitDate).diff(
//         moment(roomsReservation.EntryDate),
//         "days"
//       )
//     );
//  roomsReservation.NumberOfNights = numberOfNights;
//  console.log(roomsReservation.NumberOfNights);
//   });
  useFocusEffect(
    React.useCallback(() => {
      roomsReservation.EntryDate = moment().toDate();
      roomsReservation.ExitDate = moment().add(1, "days").toDate();
      setFlagEntry(false);
      setFlagExit(false);
      SetIsEntryModalOpened(false);
      SetIsExitModalOpened(false);
      //  roomsReservation.NumberOfNights = numberOfNights;
      // setNumberOfNights(1);
      return () => {
        // setFlagEntry(false);
        // setFlagExit(false);
        // SetIsEntryModalOpened(false);
        // SetIsExitModalOpened(false);
        // setNumberOfNights(1);

  // roomsReservation.AmountOfPeople = 0;
  setAmountOfPeople(0);
      };
    }, [])
  );
  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={() => setFlagEntry(true)}>
        <View style={styles.ButtonContainer}>
          <Text style={styles.text}>
            {"FROM :  " +
              moment(roomsReservation.EntryDate).format("DD/MM/YYYY")}
          </Text>

          <Image style={styles.icon} source={images.calendar} />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={flagEnrty}
        mode="date"
        onConfirm={handleConfirmEnteryDate}
        onCancel={() => {
          setFlagEntry(false), SetIsEntryModalOpened(true);
        }}
      />

      <TouchableOpacity style={styles.input} onPress={() => setFlagExit(true)}>
        <View style={styles.ButtonContainer}>
          <Text style={styles.text}>
            {"TO : " +
              moment(roomsReservation.ExitDate).format("DD/MM/YYYY")}
          </Text>

          <Image style={styles.icon} source={images.calendar} />
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={flagExit}
        mode="date"
        onConfirm={handleConfirmExitDate}
        onCancel={() => {
          setFlagExit(false), SetIsExitModalOpened(true);
        }}
      />
      <View style={styles.ButtonContainer2}>

          <TextInput
          style={{width:120,height:45}}
          label="Adults"
        
          mode="outlined"
          activeOutlineColor="#000"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(amount) => {setAmountOfPeople(amount),roomsReservation.AmountOfPeople = amount}}
        />
        {numberOfNights === 0 ? (
                <Text style={styles.alerts}>*The dates are incorrect* </Text>
              ) : (
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 18 }}>
                    <Icon name="moon" size={25} color="#a8a9ad">
                      {" " + numberOfNights}
                    </Icon>
                  </Text>
                </View>
              )}
          
         </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 35,
    fontWeight: "bold",
    paddingTop: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    height: 50,

    // margin: 3,
    paddingTop: 17,
    paddingLeft: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  icon: {
    width: 50,
    height: 50,
  },

  button: {
    backgroundColor: "#C0C0C0",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  button2: {
    backgroundColor: "rgba(35,100,168, 0.4)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,

    fontWeight: "500",
  },
  RadioCheckbox: {
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },

  Checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  Text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  alerts: {
    color: "red",
    paddingVertical: 5,
  },
  input: {
    height: 50,
    margin: 12,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  textInput: {
    margin: 10,

    fontSize: 18,
    fontWeight: "500",
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  ButtonContainer2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal:12
  },
});
