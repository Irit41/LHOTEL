import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  LogBox,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import ignoreWarnings from "ignore-warnings";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-virtualized-view";
import { GrayButton, windowHeight } from "../../styles";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { ActivityIndicator } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-paper";
import { images } from "../../images";
import { areArraysEqual } from "@mui/base";

const RequestType = [
  {
    label: "Number of visitors per month",
    value: "NumberOfVisitorsPerMonth",
  },
  {
    label: "Quantity of product purchases",
    value: "AmountOfProductsPurchased",
  },
  { label: "Number of tasks per month", value: "NumberOfTasksPerMonth" },
  { label: "Product purchase by name", value: "ProductPurchaseByName" },
  { label: "Income and expenses", value: "IncomeAndExpenses" },
];

export default function Reports({ navigation }) {
  const [loading, SetLoading] = useState(true);

  const [tableData, SetTableData] = useState([]);
  const [dropdown, setDropdown] = useState(null);
  // const [request, SetRequest] = useState(false);
  const [isMainViewed, SetIsMainViewed] = useState(true);

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  const CreateTableData = () => {
    return (
      <View>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={tableData.map((per) => Object.keys(per))[0]}
              // style={styles.head}
              // textStyle={styles.text}
            />
            <Rows
              // textStyle={styles.text}
              data={tableData.map((per) => Object.values(per))}
            />
          </Table>
        </View>
      </View>
    );
  };

  // const HandelRequest = (request) => {
  //   SetLoading(false);
  //   SetRequest(request.value);
  //   if (request !== undefined && request.value !== "ProductPurchaseByName") {
  //     GetTableFromDB(request.value);
  //   }
  //   SetLoading(true);
  // };
  const ReportsMenu = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate("ReportView", {
            report: item,
          })
        }
        style={{
          backgroundColor: "#CDCDCD",
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 35,
          shadowColor: "#000",
          width: "95%",
          alignSelf: "center",
          alignItems: "center",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          height: 100,
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <Text style={{ width: "75%", fontSize: 20 }}>{item.label}</Text>
        <Image
          style={{
            width: 25,
            height: 25,

            right: 5,
          }}
          source={images.back}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingVertical: 26 }}>
      <ImageBackground
        style={{ height: windowHeight }}
        source={images.hotelback}
        blurRadius={90}
      >
        <Text style={styles.HeadLine}>Reports</Text>

        <FlatList
          data={RequestType}
          renderItem={ReportsMenu}
          keyExtarctor={(item, index) => index.toString()}
          numColumns={1}
          nestedScrollEnable={true}
        />

        {/* <View style={{ padding: 10 }}>
        <Dropdown
          style={styles.dropdown}
          data={RequestType}
          searchPlaceholder="Search"
          labelField="label"
          valueField="value"
          placeholder="Select a report to view"
          value={dropdown}
          onChange={(request) => {
            HandelRequest(request);
          }}
        />
      </View> */}
        {/* 
      <View style={styles.items}>
        {loading ? <CreateTableData /> : <Spinner />}
      </View> */}

        {/* <View style={styles.items}>
        {request === "ProductPurchaseByName" ? (
          <View>
            <Text style={styles.tableHeader}>Enter the product name</Text>
            <TextInput
              style={{ margin: 10, paddingLeft: 3,marginHorizontal:10 }}
              onChangeText={(product) => SetProduct(product)}
            ></TextInput>

            <TouchableOpacity
              style={{
                backgroundColor: "rgba(35,100,168, 0.4)",
                paddingVertical: 10,
                paddingHorizontal: 40,
                borderRadius: 5,
                 width:150,
                 marginTop:10,
                 alignSelf:'center',
                fontWeight: "500",
              }}
              onPress={GetTableProductPurchaseByName}
            >
              <Text style ={{fontSize:20}}>Search</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View> */}
      </ImageBackground>
      {/* ScrollView */}
    </View>
  );
}
export const ReportView = ({ route, navigation }) => {
  LogBox.ignoreLogs([
    "Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.",
  ]);
  let { report } = route.params;
  const [request, SetRequest] = useState(false);
  const [loading, SetLoading] = useState(true);
  const [isReportViewed, SetIsReportViewed] = useState(false);
  const [product, SetProduct] = useState("");

  const [tableData, SetTableData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      SetLoading(false);

      if (report !== undefined && report.value !== "ProductPurchaseByName") {
        GetTableFromDB();
      }
      SetLoading(true);
    }, [])
  );
  const GetTableFromDB = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        `http://proj13.ruppin-tech.co.il/${report.value}`,
        requestOptions
      );
      let temp = await result.json();
      if (temp !== null) {
        if (
          report.value === "AmountOfProductsPurchased" ||
          report.value === "ProductPurchaseByName"
        ) {
          let arr = [];
          temp.map((item) =>
            arr.push({
              Amount: item.Amount,
              Product: item.Product,
              Category: item.Category,
              Code: item.Code,
            })
          );
          temp = arr;
        }
        SetTableData(temp);

        SetLoading(true);
        return;
      }
    } catch (error) {
      alert(error);
    }
    SetLoading(true);
  };
  const GetTableProductPurchaseByName = async () => {
    if (product === "") {
      alert("Please type a product name");
      return;
    }

    try {
      SetLoading(false);
      const requestOptions = {
        method: "PUT",
        body: JSON.stringify({
          name: product,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/ProductPurchaseByName",
        requestOptions
      );
      let temp = await result.json();
      console.log(temp);
      if (temp !== null) {
        let dataObj = {
          Amount: temp.Amount,
          Product: temp.Product,
          Category: temp.Category,
          Code: temp.Code,
        };

        SetTableData([dataObj]);
        SetLoading(true);
        SetIsReportViewed(!isReportViewed);
        return;
      } else {
        SetTableData([]);
        SetLoading(true);
      }
    } catch (error) {
      alert(error);
    }
    SetLoading(true);
  };
  return (
    <View>
      {report.value === "ProductPurchaseByName" && !isReportViewed ? (
        <ImageBackground
          style={{ height: windowHeight + 50 }}
          source={images.hotelback}
          blurRadius={90}
        >
          <View
            style={{
              backgroundColor: "#CDCDCD",
              padding: 20,
              marginVertical: 8,
              marginHorizontal: 16,
              borderRadius: 35,
              shadowColor: "#000",
              width: "95%",
              alignSelf: "center",
              marginTop: "40%",

              height: 350,
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text style={styles.tableHeaderText}>Enter the product name</Text>
            <TextInput
              style={{ margin: 10, paddingLeft: 3, marginHorizontal: 10 }}
              onChangeText={(product) => SetProduct(product)}
            ></TextInput>

            <TouchableOpacity
              style={{
                // backgroundColor: "rgba(35,100,168, 0.4)",
                // paddingVertical: 10,
                marginHorizontal: 40,
                borderWidth: 0.4,
                borderRadius: 10,

                borderColor: "#000",
                marginTop: 10,
                // alignSelf: "center",
                fontWeight: "500",
              }}
              onPress={GetTableProductPurchaseByName}
            >
              <GrayButton text={"Search"} />
              {/* <Text style={{ fontSize: 20 }}>Search</Text> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <View style={{ marginTop: "15%", padding: 10 }}>
          {report.value === "ProductPurchaseByName" ? (
            <TouchableOpacity
              onPress={() => SetIsReportViewed(!isReportViewed)}
              style={{
                borderRadius: 50,
                borderColor: "#000",
                backgroundColor: "#CDCDCD",
                left: 10,
                width: 45,
                height: 45,
                // marginBottom: 15,
                justifyContent: "center",
              }}
            >
              <Image style={styles.Save} source={images.back} />
            </TouchableOpacity>
          ) : null}

          <Text
            style={{ fontSize: 25, alignSelf: "center", marginVertical: 35 }}
          >
            {report.label}
          </Text>

          <ScrollView>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={tableData.map((item) => Object.keys(item))[0]}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                // style={styles.text}
                textStyle={styles.cellText}
                data={tableData.map((item) => Object.values(item))}
              />
            </Table>
          </ScrollView>
        </View>
      )}

      {/* {request === "ProductPurchaseByName" ? (
        <View>
          <Text style={styles.tableHeader}>Enter the product name</Text>
          <TextInput
            style={{ margin: 10, paddingLeft: 3, marginHorizontal: 10 }}
            onChangeText={(product) => SetProduct(product)}
          ></TextInput>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(35,100,168, 0.4)",
              paddingVertical: 10,
              paddingHorizontal: 40,
              borderRadius: 5,
              width: 150,
              marginTop: 10,
              alignSelf: "center",
              fontWeight: "500",
            }}
            onPress={GetTableProductPurchaseByName}
          >
            <Text style={{ fontSize: 20 }}>Search</Text>
          </TouchableOpacity>
        </View>
      ) : null} */}
    </View>
  );
};
const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",

    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    justifyContent: "center",
    paddingVertical: 30,
  },
  tableContainer: {
    padding: 10,
    marginTop: 100,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    padding: 5,
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 30,
    paddingVertical: 15,
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  dropdown: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
    marginHorizontal: 10,
  },
  head: {
    height: 80,
    backgroundColor: "#f1f8ff",
  },
  text: {
    fontWeight: "500",
    fontSize: 18,
    right: 8,
  },
  cellText: {
    padding: 10,
    alignSelf: "center",
    // margin: 6,
    fontSize: 16,
  },
  button: {
    width: 50,
    alignSelf: "center",
    alignItems: "center",
  },
  save: {
    width: 50,
    height: 50,
  },
  Save: {
    // borderRadius: 50,
    width: 25,
    height: 25,
    alignSelf: "center",
  },
});
