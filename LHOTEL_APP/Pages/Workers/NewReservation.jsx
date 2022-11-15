import React, { useReducer, useState, useContext } from "react";
import Room from "../Class/Room";
import Dates from "../../Dates";

import AppContext from "../../AppContext";
import CardRoom from "../Customer/CardRoom";
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
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../../images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
// import { TextInput } from "react-native-paper";
import moment from "moment";
import SaveRoom from "../Customer/SaveRoom";

export default function NewReservation({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const myContext = useContext(AppContext);
  const roomsReservation = myContext.roomsReservation;
  const [arrRoomsData, SetArrRoomsData] = useState([]);
  const [IDCheck, setIDCheck] = useState("");
  // const [flagEnrty, setFlagEntry] = useState(false);
  // const [flagExit, setFlagExit] = useState(false);
  // const [isEntryModalOpened, SetIsEntryModalOpened] = useState(false);
  // const [isExitModalOpened, SetIsExitModalOpened] = useState(false);
  // const [numberOfNights, setNumberOfNights] = useState(1);
  const [breakfast, setBreakfast] = useState(false);

  // const handleConfirmEnteryDate = (date) => {
  //   roomsReservation.EntryDate = date;
  //   setFlagEntry(false);
  //   SetIsEntryModalOpened(true);
  // };

  // const handleConfirmExitDate = (date) => {
  //   roomsReservation.ExitDate = date;
  //   setFlagExit(false);
  //   SetIsExitModalOpened(true);
  //   // hideDatePickerExit();
  // };

  const handleOk = () => {
    setVisible(false);
    GetDBCustomerById();
  };

  useFocusEffect(
    React.useCallback(() => {
     
      setIDCheck("");
      
      return () => {
        
    //     setFlagEntry(false);
    //     setFlagExit(false);
    //  SetIsEntryModalOpened(false);
    //  SetIsExitModalOpened(false);
      
      };
    }, [navigation])
  );

  const GetDBCustomerById = async () => {
    // פונקציה אסינכרונית לטובת קבלת נתוני משתמש לפי ת.ז המתקבל במידה וקיים
    //  ומילוי אוטומטי שלהם בטופס הזמנה חדשה

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        Customer_ID: IDCheck,
      }),
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      "http://proj13.ruppin-tech.co.il/GetDBCustomerById",
      requestOptions
    );
    let user = await result.json();
    if (user !== null) {
      roomsReservation.CustomerID = IDCheck;
      roomsReservation.Mail = user.Mail;
      roomsReservation.FirstName = user.FirstName;
      roomsReservation.LastName = user.LastName;
      roomsReservation.PhoneNumber = user.PhoneNumber;
      forceUpdate();
      myContext.setIsUserExist(true); //עדכון סטטוס משתמש אם קיים בסטייט הגלובאלי
    }
  };

  const isValidParams = () => {
    return (
      !(
        roomsReservation.CounterSingle === 0 &&
        roomsReservation.CounterDouble === 0 &&
        roomsReservation.CounterSuite === 0
      ) &&
      roomsReservation.AmountOfPeople > 0 &&
      roomsReservation.AmountOfPeople <= 10 &&
      !(
        roomsReservation.CustomerID === "" ||
        roomsReservation.Mail === "" ||
        roomsReservation.FirstName === "" ||
        roomsReservation.LastName === "" ||
        roomsReservation.PhoneNumber === ""||
        roomsReservation.NumberOfNights===0
      )
    );
  };

  const ConfirmInformation = () => {
    if (!isValidParams()) {
      alert("Some fields are not filled in Properly");
      return;
    }

    // roomsReservation.NumberOfNights = numberOfNights;
    roomsReservation.Breakfast = breakfast;
    let rooms_amounts = {
      "Single room": roomsReservation.CounterSingle,
      "Double room": roomsReservation.CounterDouble,
      Suite: roomsReservation.CounterSuite,
    };

    let sum = 0;
    for (const [key, value] of Object.entries(rooms_amounts)) {
      for (let i = 0; i < arrRoomsData.length; i++) {
        if (arrRoomsData[i].RoomType === key) {
          if (arrRoomsData[i].count < value) {
            Alert.alert("Some fields are not filled in Properly");
            return;
          }
          let pricePerNight = arrRoomsData[i].PricePerNight;
          let count = value;
          let tempToatal = pricePerNight * count;
          sum += tempToatal;
          if (roomsReservation.Breakfast) sum += 70 * count;
        }
      }
    }

    roomsReservation.totalSum = sum;
  
    console.log(roomsReservation.NumberOfNights);
    navigation.navigate("Credit");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      />

      <View style={styles.bottomview}>
        <Text
          style={{
            paddingTop: 40,
            paddingLeft: 35,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          New reservation
        </Text>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Text style={styles.underLineText}>User exists ?</Text>
        </TouchableOpacity>

        <Dialog.Container visible={visible}>
          <Dialog.Description>Enter customer's ID</Dialog.Description>
          <Dialog.Input
            keyboardType="numeric"
            onChangeText={(id) => setIDCheck(id)}
          />
          <View style={{ flexDirection: "row" }}>
            <Dialog.Button
              style={{ paddingHorizontal: 20 }}
              label="Ok"
              onPress={handleOk}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                setVisible(false);
              }}
              // onPress={() => {
              //   setVisible(false), SetIsExitModalOpened(false);
              // }}
            />
          </View>
        </Dialog.Container>

        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 20,
            paddingTop: 10,
          }}
        >
          <ScrollView>
            <Dates/>
            <SaveRoom navigation={navigation} route={" "}/>
            

            <View style={styles.switchContainer}>
              <Switch
                onValueChange={() => {
                  setBreakfast(!breakfast);
                }}
                value={breakfast}
              />
              <Text style={{ fontSize: 18 }}>Include breakfast?</Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Customer Details</Text>
              <Text style={styles.Text}>ID : </Text>
              <TextInput
                style={styles.TextInput}
                label="Customer ID"
                mode="outlined"
                activeOutlineColor="#000"
                placeholder={
                  roomsReservation.CustomerID === ""
                    ? " "
                    : roomsReservation.CustomerID
                }
                keyboardType="numeric"
                onChangeText={(text) => (roomsReservation.CustomerID = text)}
              />
              <Text style={styles.Text}>First Name : </Text>
              <TextInput
                style={styles.TextInput}
                label="First Name"
                mode="outlined"
                activeOutlineColor="#000"
                placeholder={
                  roomsReservation.FirstName === ""
                    ? " "
                    : roomsReservation.FirstName
                }
                onChangeText={(text) => (roomsReservation.FirstName = text)}
              />
              <Text style={styles.Text}>Last Name : </Text>
              <TextInput
                style={styles.TextInput}
                label="Last Name"
                mode="outlined"
                activeOutlineColor="#000"
                placeholder={
                  roomsReservation.LastName === ""
                    ? " "
                    : roomsReservation.LastName
                }
                onChangeText={(text) => (roomsReservation.LastName = text)}
              />
              <Text style={styles.Text}>Email : </Text>
              <TextInput
                style={styles.TextInput}
                label="Email"
                mode="outlined"
                activeOutlineColor="#000"
                placeholder={
                  roomsReservation.Mail === "" ? " " : roomsReservation.Mail
                }
                autoCapitalize="none"
                onChangeText={(text) => (roomsReservation.Mail = text)}
              />
              <Text style={styles.Text}>Phone Number : </Text>
              <TextInput
                style={styles.TextInput}
                label="Phone Number"
                mode="outlined"
                activeOutlineColor="#000"
                placeholder={
                  roomsReservation.PhoneNumber === ""
                    ? " "
                    : roomsReservation.PhoneNumber
                }
                keyboardType="numeric"
                onChangeText={(text) => (roomsReservation.PhoneNumber = text)}
              />
              <TouchableOpacity
                onPress={() => ConfirmInformation()}
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
                  <Text
                    style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}
                  >
                    CONTINUE
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomview: {
    flex: 11,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -40,
  },

  textInput: {
    height: 50,
    margin: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 15,
  },

  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },

 

  Sum: {
    fontSize: 25,
    alignSelf: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 20,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
  alerts: {
    color: "red",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 8,
    borderWidth: 0.2,
    padding: 15,
    marginBottom: 20,
  },

  label: {
    padding: 20,
  },

  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
  },

  RadioCheckbox: {
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 2,
    padding: 10,
  },

  Checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  TextInput: {
    height: 50,
    marginVertical: 2,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 0.4,

    borderRadius: 8,
  },
 

  Text: {
    marginTop: 10,
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
  },
  icon: {
    width: 30,
    height: 30,

    padding: 20,
  },
  text: {
    height: 50,

    paddingTop: 17,
    paddingLeft: 10,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },

  underLineText: {
    paddingLeft: 40,
    paddingTop: 20,
    fontSize: 22,
    textDecorationLine: "underline",
    color: "black",
    fontWeight: "bold",
  },
});
