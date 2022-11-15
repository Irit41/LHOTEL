import { View, Text, StyleSheet ,Image,  TouchableOpacity,
} from "react-native";
import React from "react";
import moment from "moment/moment";
import { images } from "../../images";

export default function BillHistoryCard(props) {
  let { BillNumber, BillDate, EntryDate, ExitDate, SumTotal, BillDetailes } =
    props;

  return (
    <View   style={{margin:10}}>
        
      <View style={styles.CardStyle}>

        <View style={styles.detailsBill}>
          <Text style={styles.topCardText}>Bill Number : {BillNumber}</Text>
          <Text style={styles.topCardText}>{BillDate}</Text>
        </View>

        <View style={styles.detailsBill}>
          <Text style={styles.topCardText}>
            Dates : {EntryDate} - {ExitDate}
          </Text>
    
        </View>

        {BillDetailes.map((bill,index) =>
          bill.RoomType !== "Single room" &&
          bill.RoomType !== "Double room" &&
          bill.RoomType !== "Suite" ? (
            <View key = {index}>
              {bill.NumberOfNights!==0 ? 
 <View style={styles.detailsBill}>
              
 <Text>{bill.RoomType}</Text>
 <Text>X {bill.NumberOfNights}</Text>
 <Text>{bill.PricePerNight} $</Text>
</View>:null
              }
             
            </View>
          ) : (
            <View key = {index}>
             
              <View style={styles.detailsBill}>
                <Text style={{ paddingRight: 10 }}>
                  Room : {bill.RoomNumber}
                </Text>
                <Text>{bill.RoomType}</Text>
                <Text>{bill.PricePerNight} $ </Text>
              </View>
            </View>
          )
        )}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 25,
              paddingVertical: 10,
              textDecorationLine: "underline",
            }}
          >
            Sum Total: {SumTotal} $
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width:130,
    fontSize: 16,
  },
  topCardText: {
    paddingBottom: 10,
  
    fontSize: 16,
  },
  detailsBill: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    paddingBottom: 5,
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
});
