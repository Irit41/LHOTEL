import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";
import React, { useState, useContext } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator } from "react-native";
import AppContext from "../../AppContext";
import moment from "moment/moment";
import { images } from "../../images";
import BillHistoryCard from "./BillHistoryCard";
import { ScrollView } from "react-native-virtualized-view";
import { useFocusEffect } from "@react-navigation/native";
import { DatesPattern } from "../../styles";

export default function Bill() {
  const [tableData, SetTableData] = useState(null);
  const [loading, SetLoading] = useState(true);
  const [isDataExists, SetIsDataExists] = useState(false);
  const [request, SetRequest] = useState("");
  const myContext = useContext(AppContext);
  const user = myContext.user;

  const bills = [
    { label: "Reservation", value: "GetReservedRoomsByCustomerId" },
    { label: "Room Resit", value: "GetRoomResit" },
    { label: "Previous Reservationes", value: "GetAllCustomersHistory" },
  ];
  useFocusEffect(
    React.useCallback(() => {
      SetIsDataExists(false);
    }, [])
  );

  const FetchTableFromDB = async (request) => {
    try {
      SetLoading(false);
      SetRequest(request);
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
          id: user.CustomerID,
        }),
        headers: { "Content-Type": "application/json" },
      };
      // console.log(request);
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/" + request,
        requestOptions
      );
      let temp = await result.json();
      // console.log(temp);
      SetTableData(temp);
      temp!== null && temp.length !== 0 
        ? SetIsDataExists(!isDataExists)
        : alert("The requested information does not exist");

      SetLoading(true);
      // SetFlag(!flag)
    } catch (error) {
      alert(error);
    }
    SetLoading(true);
  };

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  const BilldHistoryData = () => {
    let billNumbers = [];
    tableData.map(function (per) {
      if (
        billNumbers.find((number) => number.BillNumber === per.BillNumber) ===
        undefined
      ) {
        let bill = {
          BillNumber: per.BillNumber,
          BillDate: moment(per.BillDate).format("DD/MM/YYYY"),
          EntryDate: moment(per.EntryDate).format("DD/MM/YYYY"),
          ExitDate: moment(per.ExitDate).format("DD/MM/YYYY"),
        };
        billNumbers.push(bill);
      }
    });

    let tempData = [];
    for (let index = 0; index < billNumbers.length; index++) {
      let temp = tableData
        .filter((per) => per.BillNumber === billNumbers[index].BillNumber)
        .map(
          ({
            RoomNumber,
            RoomType,
            PricePerNight,
            AmountOfPeople,
            Breakfast,
            EntryDate,
            ExitDate,
            NumberOfNights,
            PaymentMethod,
          }) => ({
            RoomNumber,
            RoomType,
            PricePerNight,
            AmountOfPeople,
            Breakfast,
            EntryDate,
            ExitDate,
            NumberOfNights,
            PaymentMethod,
          })
        );

      tempData.push({
        BillNumber: billNumbers[index].BillNumber,
        BillDate: billNumbers[index].BillDate,
        EntryDate: billNumbers[index].EntryDate,
        ExitDate: billNumbers[index].ExitDate,
        SumTotal: temp.reduce(function (prev, current) {
          return current.PricePerNight * current.NumberOfNights + prev;
        }, 0),
        BillDetailes: temp,
      });
    }

    return tempData;
  };
 
  const ResitCard = () => {
  // console.log(tableData);
    let listRooms = tableData.map((room, index) =>
      room.ProductCode === 8 ? (
        <View
          key={index}
          style={{
            paddingHorizontal: 10,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.cardText}>Room : {room.RoomNumber}</Text>
          <Text style={styles.cardText}>{room.RoomType}</Text>
          <Text style={styles.cardText}>{room.PricePerNight} $ </Text>
        </View>
      ) : null
    );

    let listProducts = tableData.map((room, index) =>
      room.ProductCode !== 8 ? (
        <View
          key={index}
          style={{
            paddingHorizontal: 10,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.cardText}>{room.RoomType}</Text>
          <Text style={styles.cardText}>x {room.NumberOfNights}</Text>
          <Text style={styles.cardText}>{room.PricePerNight} $ </Text>

        </View>
      ) : null
    );
console.log(tableData);
    let sumTotal = tableData.reduce(function (prev, current) {
      return current.PricePerNight * current.NumberOfNights + prev;
    }, 0);
   
    return (
      <View style={styles.CardStyle}>
        <View style={{ padding: 10 }}>
         
          
            
            <DatesPattern img={false} EntryDate ={tableData[0].EntryDate} ExitDate ={tableData[0].ExitDate}/>

           
{
  tableData[0].Breakfest? <Text style={{paddingTop:15,fontSize:17}}>* Includes breakfast  </Text>:null
}
          
        </View>
        <View>
          <Text style={styles.listCardStyle}>Rooms</Text>
          {listRooms}
        </View>
{
  listProducts.length>1&& listRooms.length<2?  <Text style={styles.listCardStyle}>Products</Text>:null
}
        {/* <Text style={styles.listCardStyle}>Products</Text> */}
        <View style={{ padding: 10 }}>
          {listProducts}
          <Text style={{ fontSize: 25 }}>Sum Total: {sumTotal} $</Text>
        
        </View>

        <View></View>
      </View>
    );
  };

  const DeleteReservationFromDB = async () => {
    try {
      SetLoading(false);
      const requestOptions = {
        method: "DELETE",
        body: JSON.stringify({
          id: user.CustomerID,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/DeleteReservation",
        requestOptions
      );
      let temp = await result.json();
   
      if (temp) {
        alert("Your room reservation has been cancelled");
        SetTableData(null);
        SetLoading(true);
        SetIsDataExists(!isDataExists)
      }
    } catch (error) {
      alert(error);
    }
    SetLoading(true);
  };

  const DeleteReservation = () => {
    return Alert.alert("order", "Are you sure you want to cancel your order?", [
      {
        text: "Yes",
        onPress: () => {
          DeleteReservationFromDB();

        },
      },
      { text: "No" },
    ]);
  };
  const ReservationCard = () => {
  
    return (
      <View style={styles.CardStyle}>
        <View style={{padding:10}}>

        
        <Text style={styles.topCardText}>
         ID: {tableData[0].CustomerID}
        </Text>
        <Text style={styles.topCardText}>
          Name : {tableData[0].FirstName} {tableData[0].LastName}
        </Text>
        <Text style={styles.topCardText}>
       {moment(tableData[0].EntryDate).format("DD/MM/YYYY")} -{" "}
          {moment(tableData[0].ExitDate).format("DD/MM/YYYY")}
        </Text>
       
        <Text style={styles.topCardText}>
          Adults : {tableData[0].AmountOfPeople}
        </Text>
        <Text style={styles.topCardText}>Email : {tableData[0].Mail}</Text>
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <TouchableOpacity
            style={styles.deleteBTN}
            onPress={() => DeleteReservation()}
          >
            <Image style={styles.icon} source={images.trashCan} />
            <Text style={{fontSize:18}}>Delete Reservation</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  };

  const CreateCard = () => {
    if (tableData !== null && tableData.length > 0) {
      let temp = null;
      switch (request) {
        case "GetReservedRoomsByCustomerId":
          temp = ReservationCard();
          break;
        case "GetRoomResit":
          temp = ResitCard();
          break;
        case "GetAllCustomersHistory":
          let data = BilldHistoryData();
          temp = data.map((bill, index) => (
            <BillHistoryCard
              key={index}
              BillNumber={bill.BillNumber}
              BillDate={bill.BillDate}
              EntryDate={bill.EntryDate}
              ExitDate={bill.ExitDate}
              SumTotal={bill.SumTotal}
              BillDetailes={bill.BillDetailes}
            />
          ));
          break;
        default:
          break;
      }
      return (
        <View >
          <View>
          <TouchableOpacity
            onPress={() => SetIsDataExists(!isDataExists)}
            style={{
              padding: 15,
              borderRadius: 50,
              borderColor:'#000',
              borderWidth:0.4,
              width:50,
              height:50,
              marginBottom:15,
              left: 5,
           
            }}
          >
            <Image style={styles.Save} source={images.back} />
          </TouchableOpacity>
          </View>
         
          {temp}
        </View>
      );
      // temp;
    } else return null;
  };
  const BillTypeCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          FetchTableFromDB(item.value);
        }}
        style={styles.backgroundImageContainer}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={images.hotelback}
        ></ImageBackground>

        <View style={styles.virtualTag}>
          <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      {!isDataExists ?
        <Text style={styles.HeadLine}>Bill</Text>:null
      }
      {user.FirstName === undefined ? (
        <View style={{ alignSelf: "center", padding: 10, paddingTop: 60 }}>
          <Text>A user must be logged in to view the requested tables</Text>
        </View>
      ) : (
        <View style={styles.DropdownContainer}>
          {isDataExists ? (
            <CreateCard />
          ) : (
            <FlatList
              data={bills}
              renderItem={BillTypeCard}
              keyExtarctor={(item, index) => index.toString()}
              numColumns={1}
            />
          )}

       
        </View>
      )}

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  backgroundImageContainer: {
    elevation: 20,
    marginHorizontal: 10,
    marginVertical: 80,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    width: 250,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  listCardStyle: {
    backgroundColor: "#09143C",
    fontSize: 25,
    color: "#fff",
    marginBottom: 20,
    marginTop:10,
    textAlign: "center",
  },
  header: {
    paddingVertical: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  virtualTag: {
    top: -35,
    width: 150,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: "#926F34",
    justifyContent: "center",
    alignItems: "center",
  },
  DropdownContainer: {
    padding: 20,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  tableContainer: {
    padding: 10,
  },
  head: {
    height: 60,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
  },
  icon: {
   width:30,
   height:30
  },
  save: {
    // backgroundColor: "#CDCDCD",
    padding: 15,
    borderRadius: 50,

    position: "absolute",
    // top:5,
    left: 5,
    // borderWidth: 0.2,
    zIndex: 2,
  },
  Save: {
    width: 20,
    height: 20,
  },
  deleteBTN: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e6443a",
    borderRadius: 5,
    borderWidth: 2,
  },
  CardStyle: {
    backgroundColor: "#CDCDCD",
    // padding: 10,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
  },
  cardText: {
    paddingBottom: 10,
    width: 130,
    fontSize: 16,
  },
  topCardText: {
    paddingBottom: 10,

    fontSize: 16,
  },
  detailsBill: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 5,
  },
});
