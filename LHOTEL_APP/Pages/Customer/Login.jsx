import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { ActivityIndicator } from "react-native";
import AppContext from "../../AppContext";
import { TextInput } from "react-native-paper";
import { BlueButton, Spinner } from "../../styles";
import { useFocusEffect } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, SetLoading] = useState(true);

  const myContext = useContext(AppContext);

  const FetchUserFromDB = async (hashPassword) => {
    try {
      SetLoading(false);
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          id: id,
          password: hashPassword,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetCustomerByMailAndPassword",
        requestOptions
      );
      let user = await result.json();

      if (user !== null) {
        SetLoading(true);
        myContext.setUserDB(user);
        navigation.navigate("Home");
        return;
      } else {
        alert("There is no registered user in the system");
      }
    } catch (error) {
      alert(error);
    }

    SetLoading(true);
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setID("");
        setPassword("");
      };
    }, [])
  );

  const LogIn = () => {
    if (id.length != 0 && password.length != 0) {
      var Hashes = require("jshashes");
      let hashPassword = new Hashes.SHA1().b64_hmac(id, password); // הצפנת סיסמת משתמש לפי מפתח ת.ז שלו והשמה במשתנה
      FetchUserFromDB(hashPassword);
    } else {
      Alert.alert("No such user exists in the system");
    }
  };

  return (
    <View>
      <Text style={styles.HeadLine}>Login</Text>
      <View style={{ paddingTop: 10 }}>{loading ? null : <Spinner />}</View>
      <View style={{ marginHorizontal: 20 }}>
        <TextInput
          label="ID"
          activeOutlineColor="#000"
          left={<TextInput.Icon name="account" />}
          keyboardType="numeric"
          mode="outlined"
          style={{ marginHorizontal: 10, marginVertical: 20, paddingLeft: 3 }}
          onChangeText={(id) => setID(id)}
          value={id}
        />

        <TextInput
          label="Password"
          activeOutlineColor="#000"
          left={<TextInput.Icon name="lock" />}
          keyboardType="numeric"
          mode="outlined"
          style={{ marginHorizontal: 10, marginVertical: 20, paddingLeft: 3 }}
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={() => LogIn()}>
          <BlueButton text={"SUBMIT"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  label: {
    padding: 20,
  },
  TextInput: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 20,
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  ButtonContainer: {
    marginTop: 20,
    padding: 30,
  },
  button: {
    backgroundColor: "#C0C0C0",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  button2: {},
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
