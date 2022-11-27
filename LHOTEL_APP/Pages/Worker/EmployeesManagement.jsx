import { View, Text, StyleSheet, ScrollView, Keyboard, Image, ImageBackground, StatusBar, Alert, TouchableOpacity, } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Searchbar } from "react-native-paper";
import EMCard from "./EMCard";
import { ActivityIndicator } from "react-native";
import { images } from "../../images";
import AppContext from "../../AppContext";
import { Spinner } from "../../styles";


export default function EmployeesManagement({ navigation }) {
  const [DBemployees, SetDBEmployees] = useState([]);
  const [employees, SetEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, SetLoading] = useState(false);
  const myContext = useContext(AppContext);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    GetDBEmployees();
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



  const GetDBEmployees = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch("http://proj13.ruppin-tech.co.il/GetAllEmployees", requestOptions);
      let temp = await result.json();
      if (temp !== null) {
        SetDBEmployees(temp.filter((employee) => employee.EmployeeID !== -1));
        SetEmployees(temp.filter((employee) => employee.EmployeeID !== -1));
        SetLoading(true);
        return;
      } else GetDBEmployees();
    } catch (error) {
      alert(error);
    }
  };

  const SerchEmployee = (value) => {
    setSearch(value);
    let employee = DBemployees.filter(
      (employee) => employee.EmployeeName === value
    );
    if (employee.length > 0) {
      SetEmployees(employee);
    } else {
      SetEmployees(DBemployees);
    }
  };

  const DeleteEmployeeFromDB = async (id) => {
    try {
      SetLoading(false);
      const requestOptions = {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
        headers: { "Content-Type": "application/json" },
      };

      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/DeleteEmployeeById",
        requestOptions
      );
      let temp = await result.json();
      if (temp) {
        SetLoading(true);
        alert("The employee was successfully deleted");
        GetDBEmployees();
      } else {
      }
    } catch (error) {
      alert(error);
    }
  };

  const DeleteEmployee = (value) => {
    return Alert.alert(
      "Deleting an employee",
      "Are you sure you want to delete the employee from the system?",
      [
        {
          text: "Yes",
          onPress: () => {
            let employee = employees.filter(
              (employee) => employee.EmployeeID === value
            )[0].EmployeeID;
            DeleteEmployeeFromDB(employee);
            
          },
        },
        { text: "No" },
      ]
    );
  };

  const EditDetails = (value) => {
    let employee = employees.filter(
      (employee) => employee.EmployeeID === value
    )[0];
    navigation.navigate("UpdateDetails", { employee: employee });
  };


  // const Spinner = () => (
  //   <View style={[styles.container, styles.horizontal]}>
  //     <ActivityIndicator size="large" />
  //   </View>
  // );

  let listEmployees = employees.map((item) => (
    <EMCard
      key={item.EmployeeID}
      EmployeeID={item.EmployeeID}
      Description={item.Description}
      EmployeeName={item.EmployeeName}
      PhoneNumber={item.PhoneNumber}
      BirthDate={item.BirthDate}
      HourlyWage={item.HourlyWage}
      Address={item.Address}
      EmployeeCode={item.EmployeeCode}
      DeleteEmployee={DeleteEmployee}
      EditDetails={EditDetails}
    />
  ));

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Searchbar
        style={styles.searchbar}
        placeholder="search by name ..."
        onChangeText={SerchEmployee}
        value={search}
      />

      <TouchableOpacity style={styles.circle} onPress={() => navigation.navigate("AddEmployee")}>
        <Image style={styles.circleImg} source={images.plus} />
      </TouchableOpacity>
      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "flex-end",
        }}
      >

        <View style={styles.topview}>
          <Text style={styles.HeadLine}>Employees Management</Text>

        </View>
       

        <View style={styles.Empcontainer}>

          <ScrollView style={{ paddingHorizontal: 5, marginBottom: 100 }} >
            {loading ? listEmployees : <Spinner />}
          </ScrollView>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 70,
    color: "#fff",
    paddingBottom: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,

  },
  topview: {
   

    flex: 1,
   
  },
  Empcontainer: {
    flex: 3.5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginHorizontal: 2,
    paddingTop: 30,
  },
  searchbar: {

    position: 'absolute',
    bottom: 30,
    left: 20,
    width: "70%",




   
    backgroundColor: "#CDCDCD",

    borderRadius: 50,
    zIndex: 2,

    

  },
  circle: {
    backgroundColor: "#CDCDCD",
    padding: 15,
    borderRadius: 50,

    position: 'absolute',
    bottom: 25,
    right: 20,
   
    zIndex: 8,
  },
  circleImg: {
    width: 25,
    height: 25
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 10,
   
    marginBottom: 20,
  },
  itemLeft: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  details: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 5,
   
  },
  BTNContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  BTNImages: {
    width: 30,
    height: 30,
  },
  button: {
    padding: 10,
    backgroundColor: "#C0C0C0",
    borderRadius: 10,
  },
});
