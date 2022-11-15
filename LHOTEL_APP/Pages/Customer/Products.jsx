import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../../images";
import { useState, useEffect, useContext } from "react";
import Counter from "react-native-counters";
import AppContext from "../../AppContext";
import { BlueButton } from "../../styles";
import { useFocusEffect } from "@react-navigation/native";

const ProductsArr = [
  { ProductCode: 1, ProductDec: "Coca cola", Price: 15, Amount: 0 },
  { ProductCode: 2, ProductDec: "Vodka", Price: 35, Amount: 0 },
  { ProductCode: 3, ProductDec: "Bamba", Price: 20, Amount: 0 },
  { ProductCode: 4, ProductDec: "Doritos", Price: 20, Amount: 0 },
  { ProductCode: 5, ProductDec: "Sprite", Price: 15, Amount: 0 },
  { ProductCode: 6, ProductDec: "Whiskey", Price: 45, Amount: 0 },
  { ProductCode: 7, ProductDec: "Chips", Price: 20, Amount: 0 },
];

export default function Products({ RoomNumber, SetRequest, navigation }) {
  const myContext = useContext(AppContext);
  const [totalSum, SetTotalSum] = useState(0);
  const [start, SetStart] = useState(0);
  const [showBox, setShowBox] = useState(true);
  const [errorWhileBuyProducts, setErrorWhileBuyProducts] = useState(false);

  const [goodsCount, SetGoodsCount] = useState(0);

  // useEffect(() => {
  //   SetTotalSum(0);
  //   SetGoodsCount(0);
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      SetTotalSum(0);
      SetGoodsCount(0);
      SetStart(0);
      RestCount();
      setErrorWhileBuyProducts(false);
    }, [])
  );

  const cancel = () => {
    SetRequest("");
    SetTotalSum(0);
    SetGoodsCount(0);
    SetStart(0);
    RestCount();
    setErrorWhileBuyProducts(false);
  };
  const showConfirmDialog = () => {
    return Alert.alert(
      "order",
      "Are you sure you want to  add the selected products to your account?",
      [
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
            AddChargeToDB();
            // console.log(errorWhileBuyProducts);
            // if (errorWhileBuyProducts) {
            //   alert("The purchase has not been made");
            //   return;
            // } else {
            //   alert("The purchase was successfully registered");

            //   cancel();
            // }
          },
        },

        {
          text: "No",
        },
      ]
    );
  };

  const ChargeToDB = async (selectedItem) => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          CustomerID: myContext.bill.CustomerID,
          RoomNumber: RoomNumber,
          ProductDec: selectedItem.ProductDec,
          Amount: selectedItem.Amount,
          PaymentMethod: "Credit",
        }),

        headers: { "Content-Type": "application/json" },
      };

      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/AddCharge",
        requestOptions
      );
      let temp = await result.json();
      if (!temp) {
        // alert("The purchase has not been made");
        setErrorWhileBuyProducts(true);
        return;
      }
    } catch (error) {
      alert(error);
    }
  };
  const AddChargeToDB = () => {
    // if (errorWhileBuyProducts) {
    //   alert("The purchase has not been made");
    //   return;
    // } else {
    //   alert("The purchase was successfully registered");

    //   cancel();
    // }
    if (RoomNumber === 0) {
      alert("Please select room");

      return;
    }
    let selectedItems = [];
    ProductsArr.map((selectedItem) => {
      if (selectedItem.Amount !== 0) selectedItems.push(selectedItem);
    });
    selectedItems.map((selectedItem) => ChargeToDB(selectedItem));
    RestCount();

    if (errorWhileBuyProducts || selectedItems.length === 0) {
      alert("The purchase has not been made");
      cancel();
    } else {
      alert("The purchase was successfully registered");

      SetRequest("");    }
    // alert("The purchase was successfully registered");
    //     navigation.goBack();
  };

  const RestCount = () => {
    for (let i = 0; i < ProductsArr.length; i++) {
      ProductsArr[i].Amount = 0;
    }
  };

  const Calculate_Final_Amount = () => {
    let sum = 0;
    let goodsCounter = 0;
    for (let i = 0; i < ProductsArr.length; i++) {
      let Price = ProductsArr[i].Price;
      let Amount = ProductsArr[i].Amount;
      let tempToatal = Amount * Price;
      goodsCounter += Amount;
      sum += tempToatal;
    }

    SetTotalSum(sum);
    SetGoodsCount(goodsCounter);
  };

  const GetItem = ({ item, index }) => {
    return (
      <View
        style={
          index + 1 === ProductsArr.length
            ? styles.lastItemStyle
            : styles.containerStyle
        }
      >
        <View style={styles.textStyle}>
          <Text
            style={{
              color: "#2e2f30",
              fontSize: 15,
              paddingLeft: 5,
              paddingTop: 35,
            }}
          >
            {item.ProductDec}
          </Text>
          <View style={styles.priceStyle}>
            <Text style={{ color: "#2e2f30", fontSize: 15 }}>
              ${item.Price}
            </Text>
          </View>
        </View>

        <View style={styles.counterStyle}>
          <Counter
            initial={start}
            start={start}
            max={5}
            style={styles.counterStyle}
            onChange={(count) => {
              (item.Amount = count), Calculate_Final_Amount();
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.headerStyle}>
        <TouchableOpacity onPress={cancel}>
          <Icon name="ios-close" size={35} color="#a8a9ad" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20 }}>Mini Bar</Text>
      </View>
      <FlatList
        data={ProductsArr}
        renderItem={GetItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
      <View style={styles.footerContainerStyle}>
        <TotalComponent totalSum={totalSum} goodsCount={goodsCount} />
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            style={styles.checkoutButtonStyle}
            onPress={() => showConfirmDialog()}
          >
            <BlueButton text={"ORDER"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const TotalComponent = ({ totalSum, goodsCount }) => {
  return (
    <View style={styles.totalContainerStyle}>
      <View style={styles.goodsStyle}>
        <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
        <Text>{goodsCount} goods</Text>
      </View>

      <View style={styles.totalContainerStyle}>
        <Text>Total - ${totalSum} </Text>
      </View>
    </View>
  );
};

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
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 40,
    alignItems: "center",
    marginTop: 13,

    borderRadius: 3,
  },
  counterStyle: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerStyle: {
    flex: 1,
    elevation: 2,
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    // paddingLeft: 15,
    // paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  footerContainerStyle: {
    flex: 1,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
  },
  buttonContainerStyle: {
    justifyContent: "center",
    paddingTop: 15,
  },

  checkoutButtonStyle: {
    // backgroundColor: "#f39c12",
    padding: 10,

    borderRadius: 3,
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
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
