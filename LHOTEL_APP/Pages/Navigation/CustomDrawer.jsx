import React, {useContext}from "react";
import {  View,
 Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AppContext from "../../AppContext";

export default function CustomDrawer(props) {
   
    const myContext = useContext(AppContext);
    const LogOutUser =  () => {
        myContext.setUserDB({});
        myContext.SetBill({
            CustomerID: '',
            BillNumber: 0,
            BillDate: '',
            AmountOfPeople: 0,
            Breakfast: false,
            NumberOfNights: 0,
            rooms: []});
        
           props.navigation.navigate("Home")
      };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor:props.isUserConnected ? "#09143C" :"#fff"}}
      >
        {props.isUserConnected ?
             <View style={{ padding: 30 }}>
             <Text
               style={{
                 color: "#fff",
                 fontSize: 22,
                
               }}
             >
             {myContext.user.FirstName} {myContext.user.LastName}
             </Text>
           </View>
           : null
        }
       

        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {
props.isUserConnected ?
<View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => LogOutUser()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
        
            <Text
              style={{
                fontSize: 15,
              
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>:null
      }
      
    </View>
  );
}
