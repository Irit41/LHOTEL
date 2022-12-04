import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { images } from "../../images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";
import Counter from "react-native-counters";

const Roles = [
  { label: "General", value: "General" },
  { label: "Manager", value: "Manager" },
  { label: "Receptionist", value: "Receptionist" },
  { label: "Room service", value: "Room service" },
];

export default function AddEmployee({ navigation }) {
  const [flagDate, setFlagDate] = useState(false);

  const [id, SetId] = useState("");
  const [name, SetName] = useState("");
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [date, SetDate] = useState(new Date());
  const [description, SetDescription] = useState("General");
  const [hourlyWage, SetHourlyWage] = useState(30);
  const [address, SetAddress] = useState("");

  const ShowDate = () => {
    setFlagDate(true);
  };

  const HideDate = () => {
    setFlagDate(false);
  };

  const HandelDate = (date) => {
 
    SetDate(date);
    HideDate();
  };

  const CheckValues = () => {
    if (
      id === "" ||
      name === "" ||
      phoneNumber === "" ||
      date === "" ||
      address === ""
    )
      return false;
    else return true;
  };

  const AddEmployeeToDB = async (employee) => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(employee),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch("http://proj13.ruppin-tech.co.il/AddNewEmployee", requestOptions);
      if (result) {
        alert("The employee was saved successfully");
        navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  };

  const Print = () => {
    if (CheckValues()) {
      let employee = {
        EmployeeID: id,
        EmployeeName: name,
        PhoneNumber: phoneNumber,
        BirthDate: date,
        Description: description,
        HourlyWage: hourlyWage,
        Address: address,
      };
      AddEmployeeToDB(employee);
    } else alert("Some fields are not filled in correctly");
  };

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>New Employee</Text>

      <View style={styles.label}>
        <Text>Employee ID</Text>
        <TextInput
          keyboardType="numeric"

          style={styles.TextInput}
          onChangeText={(id) => SetId(id)}
        ></TextInput>
        {id === "" ? (
          <View>
            <Text style={{ color: "red" }}>* Required field</Text>
          </View>
        ) : null}

        <Text style={{ paddingTop: 10 }}>Full Name  (Only English letters)</Text>
        <TextInput style={styles.TextInput} onChangeText={(name) => SetName(name)}></TextInput>

        <Text style={{ paddingTop: 10 }}>Phone Number</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          onChangeText={(phone) => SetPhoneNumber(phone)}
        >
          
        </TextInput>

        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity style={styles.input} onPress={ShowDate}>
            <View style={styles.ButtonContainer}>
              <Text>{" Birth date : " + moment(date).format("DD/MM/YYYY")}</Text>
              <Image
                style={{ width: 30, height: 30 }}
                source={images.calendar}
              />
            </View>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={flagDate}
            mode="date"
            onConfirm={HandelDate}
            onCancel={HideDate}
          />
        </View>
        <Text style={{ paddingTop: 10 }}>Address  (Only English letters)</Text>
        <TextInput
          placeholder="City, street , house number ..."
          style={styles.TextInput}
          onChangeText={(address) => SetAddress(address)}
        ></TextInput>

        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            data={Roles}
            labelField="label"
            valueField="value"
            placeholder={"Role"}
            onChange={(role) => {
              SetDescription(role.value);
            }}
          />
        </View>
        <View style={{ height: 10 }}></View>
        <View style={styles.counterStyle}>
          <Counter
            initial={30}
            start={30}
            onChange={(count) => {
              SetHourlyWage(count);
            }}
          />
          <Text>Hourly Wage </Text>
        </View>



        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 20,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={Print}>
            <Image style={styles.save} source={images.save} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  label: {
    flex: 2,
    padding: 20,
  },

  TextInput: {
    flexDirection: "row",
    borderColor: "black",
    borderRadius: 3,
    borderWidth: 0.6,
    height: 50,
    marginTop: 2,
    padding: 10,
  },
  input: {
    height: 70,
    marginVertical: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderWidth: 0.6,
    justifyContent: "center",
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  amount: {
    flex: 1,
    flexDirection: "row",
  },
  goodsStyle: {
    flexDirection: "row-reverse",
    paddingTop: 10,
  },
  button: {
    backgroundColor: "rgba(35,100,168, 0.4)",
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  save: {
    width: 30,
    height: 30,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  counterStyle: {
    flex: 1,
    flexDirection: "row",
   
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 0.6,
    borderColor: "black",
    borderRadius: 3,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    
  },
});
