import React, { useContext,useReducer  } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import CustomerHome from "../Customer/CustomerHome";
import Login from "../Customer/Login";
import Registration from "../Customer/Registration";
import Booking from "../Customer/Booking";
import SaveRoom from "../Customer/SaveRoom";
import Payment from "../Customer/Payment";
import ConfirmationPage from "../Customer/ConfirmationPage";
import Credit from "../Credit";
import AppContext from "../../AppContext";
import RoomService from "../Customer/RoomService";
import Products from "../Customer/Products";
import Bill from "../Customer/Bill";
import CustomDrawer from "./CustomDrawer";
 import Rooms from "../../Rooms";
// import { useFocusEffect } from "@react-navigation/native";
const drawer = createDrawerNavigator();

export default function Drawer() {
  const myContext = useContext(AppContext);
  const user = myContext.user;
  const bill = myContext.bill;
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  let isUserConnected = JSON.stringify(user) !== "{}";
  let isAtHotel = myContext.bill.CustomerID !== "";
  // console.log(isAtHotel);
  useFocusEffect(
    React.useCallback(() => {
      FetchCustomerReservationFromDB()
      // console.log(myContext.bill);
     }, [isUserConnected])
  );
  // isUserConnected || isAtHotel
  const FetchCustomerReservationFromDB = async () => {
    if (user.CustomerID !== undefined) {
      try {
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify({
            id: user.CustomerID,
          }),
          headers: { "Content-Type": "application/json" },
        };
        let result = await fetch(
          "http://proj13.ruppin-tech.co.il/GetOccupiedRoomsByCustomerId",
          requestOptions
        );
        let customerReservation = await result.json();
        // console.log(JSON.stringify(user))
        if (customerReservation.length !== 0) {
       
          bill.CustomerType = customerReservation[0].CustomerType;
          bill.EntryDate = customerReservation[0].EntryDate;
          bill.ExitDate = customerReservation[0].ExitDate;
          bill.FirstName = customerReservation[0].FirstName;
          bill.LastName = customerReservation[0].LastName;
          bill.Mail = customerReservation[0].Mail;
          bill.PhoneNumber = customerReservation[0].PhoneNumber;
          bill.CustomerID = customerReservation[0].CustomerID;
          bill.BillNumber = customerReservation[0].BillNumber;
          bill.BillDate = customerReservation[0].BillDate;
          bill.AmountOfPeople = customerReservation[0].AmountOfPeople;
          bill.Breakfast = customerReservation[0].Breakfast;
          bill.NumberOfNights = customerReservation[0].NumberOfNights;
          bill.AmountOfPeople = customerReservation[0].AmountOfPeople;
          if (bill.rooms.length === 0)
            customerReservation.map((room) =>
              bill.rooms.push({
                RoomNumber: room.RoomNumber,
                PricePerNight: room.PricePerNight,
              })
            );
            forceUpdate();
     
        }

      } catch (error) {
        alert(error);
      }
    }
   
  };

 

  return (
    <NavigationContainer independent={true}>
      <drawer.Navigator initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} isUserConnected={isUserConnected} />}
      >
        <drawer.Screen
          name="Home"
          component={CustomerHome}
          options={{
            headerShown: false
            // headerTitle: " ",
            // headerTintColor: "white",
            // headerStyle: {
            //   backgroundColor: "#000",
            // },
          }}
        />

        <drawer.Screen
          name="Login"
          component={Login}
          options={{
            drawerItemStyle: isUserConnected ? { display: "none" }:{} ,
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Registration"
          component={Registration}
          options={{
            drawerItemStyle: isUserConnected ? { display: "none" }: {}  ,
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* <drawer.Screen
          name="LogOut"
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerMode: 'none',
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        /> */}
        {/* {JSON.stringify(myContext.user) !== '{}'? 
        (<drawer.Screen
          name="Booking"
          component={Booking}
        />) : null} */}
        <drawer.Screen
          name="Booking"
          component={Booking}
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* drawerItemStyle: isUserConnected ?  {}:  { display: "none" }, */}
        <drawer.Screen
          name="Room Service"
          component={RoomService}
          options={{
            drawerItemStyle: isAtHotel ? {} : { display: "none" },
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        {/* isUserConnected */}
        <drawer.Screen
          name="Products"
          component={Products}
          options={{
            drawerItemStyle: { display: "none" },
            // drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Bill"
          component={Bill}
          options={{
            headerTitle: " ",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Credit"
          component={Credit}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
                <drawer.Screen
          name="Rooms"
          component={Rooms}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="SaveRoom"
          component={SaveRoom}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="Payment"
          component={Payment}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <drawer.Screen
          name="ConfirmationPage"
          component={ConfirmationPage}
          options={{
            drawerItemStyle: { display: "none" },
            headerTitle: "",
            headerTintColor: "white",
            headerMode: "none",
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
      </drawer.Navigator>
    </NavigationContainer>
  );
}
