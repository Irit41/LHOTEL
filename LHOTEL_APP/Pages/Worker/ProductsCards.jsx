import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import Counter from "react-native-counters";

export default function ProductsCards(props) {
  let { id, name, price } = props;
  const [start, SetStart] = useState(0);


  const AddAmount = (id, amount) => {
    SetStart(amount);

    props.AddAmount(id, amount);
  };

  return (
    <View>
      <View style={styles.textStyle}>
        <Text
          style={{
            color: "#2e2f30",
            fontSize: 15,
            paddingLeft: 5,
            width:80
          }}
         
        >
          {name}
        </Text>
        <View style={{ width: 40, alignItems: "flex-start" }}>
          <Text style={{ color: "#2e2f30", fontSize: 15 }}>{price} $</Text>
        </View>

        <View style={styles.counterStyle}>
          <Counter
            initial={start}
            start={start}
            max={5}
            style={styles.counterStyle}
            onChange={(amount) => AddAmount(id, amount)}
          />
        </View>
      </View>
    </View>

  
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 60,
    height: 100,
    marginRight: 20,
  },
  textStyle: {
  
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10.5,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  priceStyle: {

    width: 40,
    alignItems: "flex-start",
   
  },
  counterStyle: {

    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerStyle: {
    flex: 1,
    elevation: 2,

    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
 
  },
  footerContainerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,

  },
  buttonContainerStyle: {
  
    justifyContent: "center",
    paddingTop: 15,
  },
 
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
 
    borderRadius: 3,
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  
});
