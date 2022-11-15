import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
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

const RequestType = [
  {
    label: "Number Of Visitors Per Month",
    value: "NumberOfVisitorsPerMonth",
  },
  {
    label: "Amount Of Products Purchased",
    value: "AmountOfProductsPurchased",
  },
  { label: "Number Of Tasks Per Month", value: "NumberOfTasksPerMonth" },
  { label: "Product Purchase By Name", value: "ProductPurchaseByName" },
  { label: "Income And Expenses", value: "IncomeAndExpenses" },
];

export default function Reports() {
  const [loading, SetLoading] = useState(true);

  const [tableData, SetTableData] = useState([]);
  const [product, SetProduct] = useState("");
  const [dropdown, setDropdown] = useState(null);
  const [request, SetRequest] = useState(false);

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  const GetTableFromDB = async (value) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        `http://proj13.ruppin-tech.co.il/${value}`,
        requestOptions
      );
      let temp = await result.json();
      if (temp !== null) {
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
      // console.log(temp);
      if (temp !== null) {
        SetTableData([temp]);
        SetLoading(true);
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

  const CreateTableData = () => {
    return (
      <View>
        <View style={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={tableData.map((per) => Object.keys(per))[0]}
              style={styles.head}
              textStyle={styles.text}
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

  const HandelRequest = (request) => {
    SetLoading(false);
    SetRequest(request.value);
    if (request !== undefined && request.value !== "ProductPurchaseByName") {
      GetTableFromDB(request.value);
    }
    SetLoading(true);
  };

  return (
    <ScrollView>
      <View style={{ padding: 30 }}>
        <Text style={styles.HeadLine}>Reports</Text>
      </View>

      <View style={{ padding: 10 }}>
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
      </View>

      <View style={styles.items}>
        {loading ? <CreateTableData /> : <Spinner />}
      </View>

      <View style={styles.items}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  tableContainer: {
    padding: 10,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
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
    marginHorizontal:10,
  },
  head: {
    height: 60,
    backgroundColor: "#f1f8ff",
  },
  text: {
    margin: 6,
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
});
