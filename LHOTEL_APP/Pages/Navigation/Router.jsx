import React, { useState, useContext } from "react";
import Home from "../Home";
import Drawer from "./Drawer";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import Tasks from "../Worker/Tasks";
import Registration from "../Customer/Registration";
import ConfirmationPage from "../Customer/ConfirmationPage";
import CustomerHome from "../Customer/CustomerHome";
import WorkerMenu from "../Worker/WorkerMenu";
import { Searchbar } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditTasks from "../Worker/EditTasks";
import NewTask from "../Worker/NewTask";
import Shift from "../Worker/Shift";
import AddCharge from "../Worker/AddCharge";
import CheckIn from "../Worker/CheckIn";
import CheckOut from "../Worker/CheckOut";
import EmployeesManagement from "../Worker/EmployeesManagement";
import UpdateDetails from "../Worker/UpdateDetails";
import ExistingReservation from "../Worker/ExistingReservartion";
import ShortCheckIn from "../Worker/ShortCheckIn";
import NewReservation from "../Worker/NewReservation";
import AddEmployee from "../Worker/AddEmployee";
import Credit from "../Credit";
import Products from "../Customer/Products";
import AppContext from "../../AppContext";
import Reports, { ReportView } from "../Worker/Reports";
import { Button, Icon } from "react-native-elements";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ModalScreen from "../Worker/ModalScreen";

const Stack = createNativeStackNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function Router() {
  const [showSearch, SetShowSearch] = useState(false);
  const [isSearchIconPressed, SetIsSearchIconPressed] = useState(false);
  const [text, SetText] = useState(" ");
  
  const myContext = useContext(AppContext);

const SearchText=(data)=>{
if(data==="" )SetShowSearch(false)
SetText(data)

}

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tasks"
          component={Tasks}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="WorkerMenu"
          component={WorkerMenu}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="CustomerHome"
          component={CustomerHome}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="ConfirmationPage"
          component={ConfirmationPage}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="EditTasks"
          component={EditTasks}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="NewTask"
          component={NewTask}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="Shift"
          component={Shift}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="AddCharge"
          component={AddCharge}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="CheckIn"
          component={CheckIn}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="CheckOut"
          component={CheckOut}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="EmployeesManagement"
          component={EmployeesManagement}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="UpdateDetails"
          component={UpdateDetails}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="NewReservation"
          component={NewReservation}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="ShortCheckIn"
          component={ShortCheckIn}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="ExistingReservation"
          component={ExistingReservation}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="AddEmployee"
          component={AddEmployee}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="Credit"
          component={Credit}
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{ headerShown: myContext.isIos }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{ headerShown: myContext.isIos }}
        />
         <Stack.Screen
    name="ModalScreen"
    component={ModalScreen}
    options={{ presentation: 'transparentModal' , headerShown: false}}
  
  />

        <Stack.Screen
          name="Top"
          children={createTopTabs}
          options={({ navigation }) => ({
            headerTitle: "",
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Icon
                  name="addfile"
                  type="antdesign"
                  size={27}
                  color="#fff"
                  style={{ paddingLeft: 15 }}
                  onPress={() => navigation.navigate("NewTask")}
                />
                {showSearch ? (
                  <Searchbar
                  // onIconPress: () =>(console.log("fdgdg")),
                  onIconPress={()=> navigation.navigate("ModalScreen",{search:text})}
                  // onEndEditing ={()=>console.log("ggggg")}
                  onChangeText={(text) => SearchText(text) }
                    style={{
                      position: "absolute",
                      width: 250,
                      left: 55,
                      alignSelf: "center",

                      backgroundColor: "#CDCDCD",

                      borderRadius: 12,
                      zIndex: 2,
                    }}
                    placeholder="search by task number ..."
                    value={text}
                  />
                ) : (
                  <Icon
                    name="search"
                    size={29}
                    color="#fff"
                    style={{ paddingHorizontal: 20 }}
                    onPress={() => SetShowSearch(!showSearch)}
                  />
                )}
               
              </View>
            ),
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          })}
        />

        <Stack.Screen
          name="ReportView"
          component={ReportView}
          options={{ headerShown: myContext.isIos }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const createTopTabs = (props) => {
  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen name="All Tasks" component={Tasks} />
      <MaterialTopTabs.Screen name="Today's Tasks" component={Tasks} />
      <MaterialTopTabs.Screen name="Open Tasks" component={Tasks} />
      {/* <MaterialTopTabs.Screen name="Task Form" component={NewTask} /> */}
    </MaterialTopTabs.Navigator>
  );
};
