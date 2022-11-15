import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState,useContext} from "react";

import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment";
import { images } from "../../images";
import Products from "./Products";
import { ScrollView } from "react-native-virtualized-view";
import { useFocusEffect } from "@react-navigation/native";
import AppContext from "../../AppContext";

const RequestType = [
  { label: "Room Cleaning", value: "Room Cleaning" },
  { label: "Room Service", value: "Room Service" },
  { label: "Change of towels", value: "Change of towels" },
  { label: "Refill mini bar", value: "Refill mini bar" },
  { label: "Product purchase", value: "Product purchase" },
];

export default function RoomService({ navigation }) {
  const myContext = useContext(AppContext);


  const [request, SetRequest] = useState("");
  const [room, SetRoom] = useState(0);
 
  const [flagTime, setFlagTime] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");

  const [isDisplayDate, setShow] = useState(false);

  const [task, SetTask] = useState({
    TaskCode: null,
    EmployeeID: -1,
    EmployeeName: null,
    RoomNumber: 0,
    StartDate: moment().format("YYYY-MM-DD"),
    StartTime: moment().format("HH:mm"),
    EndTime: null,
    TaskStatus: "Open",
    Description: "",
  });

  const bill = myContext.bill;

  const Rooms = bill.rooms.map((room) => {
    return {
      label: JSON.stringify(room.RoomNumber),
      value: JSON.stringify(room.RoomNumber),
    };
  });

  
 
  useFocusEffect(
    React.useCallback(() => {
      SetRequest("");
      SetRoom(0);
      SetTask({
        TaskCode: null,
        EmployeeID: -1,
        EmployeeName: null,
        TaskName: "",
        RoomNumber: 0,
        StartDate: moment().format("YYYY-MM-DD"),
        StartTime: moment().format("HH:mm"),
        EndTime: null,
        TaskStatus: "Open",
        Description: "",
      });
    }, [])
  );


  
  const hideTime = () => {
    setFlagTime(false);
  };

  const showTime = () => {
    setFlagTime(true);
  };

  const handleTime = (time) => {
    task.StartTime = moment(time).format("HH:mm");

    setTime(task.StartTime);
    hideTime();
  };


  const SaveOrder = async () => {
    try {
      if (room === 0 || request === "") {
        alert("The fields are not filled correctly");
        return;
      }
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      };
    
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/AddNewTask",
        requestOptions
      );
     
      if (result) {
        alert("details successfully saved");
        navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>LHotel Room Service</Text>
      <View style={styles.label}>
        <View style={styles.container}>
          <Dropdown
            style={styles.dropdown}
            data={Rooms}
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            placeholder="Room Number"
           // task.RoomNumber
            value={room}
            onChange={(room) => {
              task.RoomNumber = room.value;
              SetRoom(room.value);
            }}
          />
        </View>
        <View>
          {room === 0 ? (
            <Text style={styles.alerts}>*Must select room* </Text>
          ) : null}
        </View>

        <View style={styles.ProdutsStyle}>
          {request === "Product purchase" ? (
            <View>
              <Products
                navigation={navigation}
                RoomNumber={task.RoomNumber}
                SetRequest={SetRequest}
              />
            </View>
          ) : (
            <View>
              <View style={styles.container}>
                <Dropdown
                  style={styles.dropdown}
                  data={RequestType}
                  // search
                  labelField="label"
                  valueField="value"
                  placeholder="Request type"
                 // task.TaskName
                  value={request}
                  onChange={(request) => {
                    SetRequest(request.value), (task.TaskName = request.value);
                  }}
                />
              </View>
              <View>
                {request === "" ? (
                  <Text style={styles.alerts}>*Must select request type* </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.input}
                onPress={()=> setShow(!isDisplayDate)}
              >
                <View style={styles.ButtonContainer}>
                  <Text style={styles.text}>
                    {selectedDate === ""
                      ? "select date"
                      : moment(new Date(selectedDate)).format("DD/MM/YYYY")}
                  </Text>
                  <Image style={styles.icon} source={images.calendar} />
                </View>
              </TouchableOpacity>

              {isDisplayDate && (
                <DatePicker
                  options={{
                    backgroundColor: "rgb(202, 232, 228)",
                    mainColor: "#000",
                  }}
                  mode="calendar"
                  minuteInterval={30}
                  style={{ borderRadius: 10 }}
                  current={moment().format("YYYY-MM-DD").toString()}
                  minimumDate={moment(bill.EntryDate)
                    .format("YYYY-MM-DD")
                    .toString()}
                  maximumDate={moment(bill.ExitDate)
                    .format("YYYY-MM-DD")
                    .toString()}
                  onSelectedChange={(date) => {
                    (task.StartDate = moment().format("YYYY-MM-DD")),
                      setSelectedDate(date),
                      setShow(!isDisplayDate);
                  }}
                />
              )}
              <View style={styles.timeStyle}>
                <TouchableOpacity onPress={showTime} style={styles.Btn}>
                  <TextInput.Icon
                    name="clock"
                    size={25}
                    style={{ paddingRight: 5 }}
                  />
                  <Text style={{ fontSize: 18 }}>{"Time  " + time}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={flagTime}
                  mode="time"
                  onConfirm={handleTime}
                  onCancel={hideTime}
                />
              </View>
              <Text style={styles.Text}>Description </Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(desc) => (task.Description = desc)}
                />
              </View>

             
                <TouchableOpacity>
                  <Text style={styles.button} onPress={() => SaveOrder()}>
                    ORDER
                  </Text>
                </TouchableOpacity>
            
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  textAreaContainer: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  Btn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 40,
  },
  label: {
    flex: 2,
    padding: 20,
  },

  dropdown: {
    marginTop: 20,
  },
  alerts: {
    color: "red",
  },

  button: {
    backgroundColor: "rgba(35,100,168, 0.4)",
    paddingVertical: 15,
    padding: 40,
    borderRadius: 5,
marginVertical:40,
alignSelf:'center',
    fontWeight: "500",
  },
  input: {
    height: 50,
    marginTop: 15,
    margin: 5,
    borderWidth: 0.2,
  },
  icon: {
    width: 30,
    height: 30,

    padding: 20,
  },
  text: {
    height: 50,
    paddingTop: 17,
    paddingLeft: 10,
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },

  timeStyle: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
