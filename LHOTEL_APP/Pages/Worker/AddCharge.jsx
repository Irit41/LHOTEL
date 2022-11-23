import {
  View,
  Animated,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState,useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import ProductsCards from "./ProductsCards";
import { LinearGradient } from "expo-linear-gradient";

import { images } from "../../images";
import Icon from "react-native-vector-icons/Ionicons";
const Products = [
  { ProductCode: 1, ProductDec: "Coca cola", Price: 15, Amount: 0 },
  { ProductCode: 2, ProductDec: "Vodka", Price: 35, Amount: 0 },
  { ProductCode: 3, ProductDec: "Bamba", Price: 20, Amount: 0 },
  { ProductCode: 4, ProductDec: "Doritos", Price: 20, Amount: 0 },
  { ProductCode: 5, ProductDec: "Sprite", Price: 15, Amount: 0 },
  { ProductCode: 6, ProductDec: "Whiskey", Price: 45, Amount: 0 },
  { ProductCode: 7, ProductDec: "Chips", Price: 20, Amount: 0 },
];

export default function AddCharge({ navigation }) {
  const [goodsCount, SetGoodsCount] = useState(0);

  const [dropdownData, SetDropdownData] = useState(null);
  const [sumTotal, SetSumTotal] = useState(0);
  const [id, SetId] = useState(-1);
  const [room_Number, SetRoom_Number] = useState(-1);
  const [payment, SetPayment] = useState("");
  const [productsToAdd, SetProductsToAdd] = useState([]);
  const [closeState, setCloseState] = useState(new Animated.Value(3));

  const [flag, SetFlag] = useState(false);

  const AddAmount = (id, amount) => {
    let product = productsToAdd.filter((prod) => prod.ProductCode === id);
    if (product.length === 0) {
      product = Products.filter((prod) => prod.ProductCode === id)[0];
      product.Amount = amount;
      let temp = [...productsToAdd, product];
      SetProductsToAdd(temp);
    } else {
      product = productsToAdd.filter((prod) => prod.ProductCode === id)[0];
      product.Amount = amount;
    }
    Cal_Sum();
  };
  useEffect(() => {
      SetRoom_Number(-1);
      // SetId(-1);
      SetPayment("");

      SetSumTotal(0);
      SetProductsToAdd([]);
      SetGoodsCount(0);
    }, [!flag]);
  
  // useFocusEffect(
  //   React.useCallback(() => {
  //     SetRoom_Number(-1);
  //     SetId(-1);
  //     SetPayment("");

  //     SetSumTotal(0);
  //     SetProductsToAdd([]);
  //     SetGoodsCount(0);
  //   }, [flag])
  // );
  const Cal_Sum = () => {
    let sum = 0;
    let goodsCounter = 0;
    for (let index = 0; index < Products.length; index++) {
      sum += Products[index].Amount * Products[index].Price;
      goodsCounter += Products[index].Amount;
    }
    SetGoodsCount(goodsCounter);
    SetSumTotal(sum);
  };

  const BilldDropdownData = (rooms) => {
    let temp = [];
    for (let index = 0; index < rooms.length; index++) {
      temp.push({
        label: JSON.stringify(rooms[index].RoomNumber),
        value: JSON.stringify(rooms[index].RoomNumber),
      });
    }
    SetDropdownData(temp);
  };

  const FindCustomerRoomByID = async () => {
    try {
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/FindCustomerReservations",
        requestOptions
      );
      let temp = await result.json();
      if (temp !== null && temp.length > 0) {
        // console.log(temp[0]);
        if (temp[0].RoomStatus === "Reserved") {
          alert("There is no customer in the hotel with this ID number");
          return;
        } else BilldDropdownData(temp);
        doAnimation(closeState, 9, 500);
        SetFlag(!flag);
      } else alert("There is no customer in the hotel with this ID number");
    } catch (error) {
      alert(error);
    }
  };

  const doAnimation = (btn, val, timer) => {
    Animated.timing(btn, {
      toValue: val,
      duration: timer,
      useNativeDriver: false,
    }).start();
  };
console.log(id);
  const AddChargeToDB = async () => {
    try {
      let counter = 0;
      for (let index = 0; index < productsToAdd.length; index++) {
        if (productsToAdd[index].Amount > 0) {
          const requestOptions = {
            method: "POST",
            body: JSON.stringify({
              CustomerID: Number(id),
              RoomNumber: room_Number,
              ProductDec: productsToAdd[index].ProductDec,
              Amount: productsToAdd[index].Amount,
              PaymentMethod: payment,
            }),
            headers: { "Content-Type": "application/json" },
          };
          let result = await fetch(
            "http://proj13.ruppin-tech.co.il/AddCharge",
            requestOptions
          );
          let temp = await result.json();
          if (temp) {
            counter++;
          }
        }
      }
      if (counter > 0) {
        alert("The purchase was successfully registered");
        navigation.goBack();
      } else {
        alert("The purchase has not been made");
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };

  const isValidInputs = () => {
    console.log("id"+id);
    console.log("room_Number"+room_Number);
    console.log("productsToAdd.length"+productsToAdd.length);
    console.log("payment"+payment);
    if (
      id !== -1 &&
      room_Number !== -1 &&
      productsToAdd.length > 0 &&
      payment !== ""
    )
      return true;
    else return false;
  };

  const SavePurchase = () => {
    if (isValidInputs()) {
      return Alert.alert(
        "order",
        "Are you sure you want to  add the selected products to your account?",
        [
          {
            text: "Yes",
            onPress: () => {
              AddChargeToDB();
            },
          },
          {
            text: "No",
          },
        ]
      );
    } else {
      alert("The format is not filled correctly");
    }
  };

  let listOfProducts = Products.map((product) => (
    <ProductsCards
      key={product.ProductCode}
      id={product.ProductCode}
      image={product.image}
      name={product.ProductDec}
      price={product.Price}
      amountTaken={product.Amount}
      AddAmount={AddAmount}
    />
  ));

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />

      <ImageBackground
        source={images.hotelback}
        resizeMode="cover"
        style={{
          flex: 2,
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.header}>LHOTEL</Text>
      </ImageBackground>

      {!flag ? (
        <Animated.View
          style={{
            flex: closeState,
            //  , flex: 4,
            backgroundColor: "#fff",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginTop: -40,
          }}
        >
          <View style={{ paddingTop: 40 }}>
            <Text style={styles.HeadLine}>Add Charge</Text>

            <TextInput
              style={styles.input}
              label="Customer ID"
              mode="outlined"
              activeOutlineColor="#000"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(id) => SetId(id)}
            />

            <TouchableOpacity
              onPress={() => {
                FindCustomerRoomByID();
              }}
              style={{
                width: "70%",
                height: 60,
                marginHorizontal: 10,
                marginVertical: 20,
                alignSelf: "center",
                borderRadius: 25,
                shadowOpacity: 0.3,
                shadowRadius: 25,
                elevation: 5,
              }}
            >
              <LinearGradient
                style={[
                  {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  },
                ]}
                colors={["#926F34", "#DFBD69"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={{ color: "#000", fontSize: 25, fontWeight: "bold" }}
                >
                  Search
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            flex: closeState,

            backgroundColor: "#fff",

            marginTop: -40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              SetFlag(!flag), SetId(-1), doAnimation(closeState, 3, 500);
            }}
            style={styles.save}
          >
            <Image style={styles.Save} source={images.back} />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <Dropdown
                style={styles.dropdown1}
                data={dropdownData}
                labelField="label"
                valueField="value"
                placeholder="Room"
                onChange={(room) => SetRoom_Number(room.value)}
              />

              <Dropdown
                style={styles.dropdown2}
                data={[
                  { label: "Charge the room", value: "Credit" },
                  { label: "Immediate Cash Pay", value: "Cash" },
                ]}
                // search
                searchPlaceholder="Search"
                labelField="label"
                valueField="value"
                placeholder="Payment Method"
                value={payment}
                onChange={(method) => {
                  SetPayment(method.value);
                }}
              />
            </View>

            {dropdownData !== null ? (
              <View>
                <View>
                  <View
                    style={{
                      height: 400,
                      borderRadius: 5,
                      borderWidth: 0.4,
                      marginTop: 10,
                    }}
                  >
                    {listOfProducts}
                  </View>
                </View>
                <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
                  <View style={styles.totalContainerStyle}>
                    <View style={styles.goodsStyle}>
                      <Icon
                        name="ios-cart"
                        size={25}
                        style={{ marginRight: 8 }}
                      />
                      <Text style={{ fontSize: 16 }}>{goodsCount} goods</Text>
                    </View>
                    <View style={styles.totalContainerStyle}>
                      <Text style={{ fontSize: 16 }}>Total - {sumTotal} $</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={SavePurchase}>
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 40,
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
    padding: 10,
    marginBottom: 3,
  },
  dropdown1: {
    marginRight: 22,
    width: "22%",
  },
  dropdown2: {
    marginVertical: 20,
    paddingLeft: 70,
    width: "66%",
  },
  amount: {
    flex: 1,
    flexDirection: "row",
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "rgba(35,100,168, 0.4)",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    width: "98%",
    borderBottomWidth: 0.2,
    margin: 5,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",

    marginBottom: 80,
  },
  save: {
    backgroundColor: "#CDCDCD",
    padding: 15,
    borderRadius: 50,

    position: "absolute",
    top: 15,
    left: 20,
    zIndex: 2,
  },
  Save: {
    width: 15,
    height: 15,
  },
  SearchID: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
  },

  bottomview: {
    flex: 4,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 35,
    zIndex: 1,
    fontWeight: "bold",
    bottom: 40,
    color: "white",
    paddingLeft: 20,
  },
  input: {
    marginHorizontal: 30,
    marginVertical: 30,

    fontSize: 18,
    fontWeight: "500",
  },

  textButton: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
  },
});
