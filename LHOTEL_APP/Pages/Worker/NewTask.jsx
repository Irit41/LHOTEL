import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import { images } from "../../images";

const RequestType = [
 
  { label: "Room Cleaning", value: "Room Cleaning" },
  { label: "Room Service", value: "Room Service" },
  { label: "Change of towels", value: "Change of towels" },
  { label: "Refill mini bar", value: "Refill mini bar" },
];

export default function NewTask({ route, navigation }) {
  const myContext = useContext(AppContext);

  const [dropdown, setDropdown] = useState(null);
  const [flagStartTime, setFlagStartTime] = useState(false);
  const [flagEndTime, setFlagEndTime] = useState(false);
  const [employees, SetEmployees] = useState([]);
  const [startTime, SetstartTime] = useState("");

  const [taskStatus, SetTaskStatus] = useState(false);
  const [task, SetTask] = useState({
    TaskCode: null,
    EmployeeID: null,
    EmployeeName: "",
    TaskName: "",
    RoomNumber: 0,
    StartTime: moment().format("HH:mm"),
    StartDate: moment().format("YYYY-MM-DD"),
    EndTime: null,
    TaskStatus: "Open",
    Description: "",
  });

  // const GetEmployees = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   };
  //   let result = await fetch(
  //     "http://proj13.ruppin-tech.co.il/GetEmployeesBasicDetails",
  //     requestOptions
  //   );
  //   let employees = await result.json();

  //   if (employees !== null) {
  //     let array =[]
  //     employees.map(employee=> array.push({ label: employee.EmployeeName, value:  employee.EmployeeName }))
  //     SetEmployees(array);

  //     // SetLoading(true);
  //     return;
  //   }
  //   GetEmployees();

  // };
  useFocusEffect(
    React.useCallback(() => {
      SetTask({
        TaskCode: null,
        EmployeeID: -1,
        EmployeeName: null,
        TaskName: "",
        RoomNumber: 0,
        StartTime: moment().format("HH:mm"),
        StartDate: moment().format("YYYY-MM-DD"),
        EndTime: null,
        TaskStatus: "Open",
        Description: "",
      });
    }, [navigation])
  );

  // useEffect(() => {
  //   // GetEmployees();
  //   if (route.params !== undefined) {
  //     SetTask(route.params.taskDetails);
  //     SetTaskStatus(
  //       route.params.taskDetails.TaskStatus === "Open" ? true : false
  //     );
  //   }
  // }, []);

  const handelTimeStart = (time) => {
    task.StartTime = moment(time).format("HH:mm");

    setFlagStartTime(false);
  };

  const handelTimeEnd = (time) => {
    task.EndTime = moment(time).format("HH:mm");

    setFlagEndTime(false);
  };

  const HandelTaskStatus = () => {
    SetTaskStatus(!taskStatus);
    task.TaskStatus = !taskStatus ? "Open" : "Close";
  };
  // ,task.EmployeeID = employees[Name]
  const CheckValues = () => {
    return (
      /^-?\d+$/.test(task.RoomNumber) &&
      task.RoomNumber > 0 &&
      task.TaskName !== ""
    );
  };

  const AddNewTask = async () => {
   if (task.EmployeeName !== null)
    task.EmployeeID =
      myContext.employees[
        myContext.employees.findIndex(
          (obj) => obj.EmployeeName === task.EmployeeName
        )
      ].EmployeeID;
console.log(task);
    try {
      if (!CheckValues()) {
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
        alert("Task details successfully saved");
        navigation.goBack();
      }
    } catch (error) {
      alert(error);
    }
  };
  // console.log(
  //   myContext.employees.findIndex(
  //     (obj) => obj.EmployeeName === "Yoni rich"
  //   ));
  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <Text style={styles.NewTaskStyle}>New Task</Text>
      <View style={styles.DetailsContainer}>
        <View>
          <Dropdown
            style={styles.dropdown}
            data={myContext.roomServiceEmpView}
            labelField="label"
            valueField="value"
       
            placeholder="Select employee"
            value={dropdown}
            onChange={(Name) => (task.EmployeeName = Name.value)}
          />
          {/* <TextInput
            activeOutlineColor="#000"
            keyboardType="numeric"
            mode="outlined"
            label="Employee ID"
            placeholder={
              task.EmployeeID !== null ? JSON.stringify(task.EmployeeID) : ""
            }
            style={styles.TextInputStyle}
            onChangeText={(id) => (task.EmployeeID = id)}
          /> */}
        </View>
        <View>
          <TextInput
            label="Room"
            activeOutlineColor="#000"
            placeholder={
              task.RoomNumber !== 0 ? JSON.stringify(task.RoomNumber) : ""
            }
            mode="outlined"
            keyboardType="numeric"
            style={styles.TextInputStyle2}
            onChangeText={(room) => (task.RoomNumber = room)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          data={RequestType}
          labelField="label"
          valueField="value"
          placeholder="Task Request"
          value={dropdown}
          onChange={(taskName) => (task.TaskName = taskName.value)}
        />
      </View>
      <View style={styles.timeStyle}>
        <View style={styles.StartEndTimeStyle}>
          <TouchableOpacity onPress={() => setFlagStartTime(true)}>
            <Text style={{ fontSize: 18 }}>Start : {task.StartTime}</Text>
          </TouchableOpacity>
          <TextInput.Icon name="clock" size={25} style={{ paddingRight: 5 }} />
        </View>

        <View style={styles.StartEndTimeStyle}>
          <TouchableOpacity
            onPress={() => setFlagEndTime(true)}
            style={styles.Btn}
          >
            <Text style={{ fontSize: 18 }}>Until : {task.EndTime}</Text>
          </TouchableOpacity>
          <TextInput.Icon name="clock" size={25} style={{ paddingRight: 5 }} />
        </View>
      </View>
      <DateTimePickerModal
        isVisible={flagStartTime}
        mode="time"
        onConfirm={handelTimeStart}
        onCancel={() => setFlagStartTime(false)}
      />

      <DateTimePickerModal
        isVisible={flagEndTime}
        mode="time"
        onConfirm={handelTimeEnd}
        onCancel={() => setFlagEndTime(false)}
      />

      <View style={styles.CheckboxContainer}>
        <View style={styles.Checkbox}>
          <Checkbox
            label="Item"
            status={taskStatus ? "checked" : "unchecked"}
            onPress={HandelTaskStatus}
          />
          <Text style={{ fontSize: 18 }}>Should the task be performed?</Text>
        </View>
      </View>
      <View>
        {/* <Text style={{ paddingLeft: 15, top:35,zIndex:1, fontSize: 18 }}>
          Description :{" "}
        </Text> */}
        <TextInput
          label={"Description"}
          activeOutlineColor="#000"
          mode="outlined"
          style={styles.TextInputMulti}
          onChangeText={(description) => (task.Description = description)}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View
        style={{
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity style={styles.button} onPress={AddNewTask}>
          <Text style={{ fontSize: 20 }}>SAVE</Text>
          <Image style={styles.save} source={images.save} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  DetailsContainer: {
    paddingHorizontal: 5,
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: "row-reverse",
    // alignItems: "center",

    justifyContent: "space-between",
  },
  EditTaskStyle: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  NewTaskStyle: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 20,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  SumHeadLine: {
    alignItems: "center",
    textAlign: "center",
    padding: 20,
    fontSize: 20,
    textDecorationLine: "underline",
  },

  dropdown: {
    alignSelf: "flex-end",
    height: 70,
    width: 170,
    backgroundColor: "#EEEEEE",
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  container: {
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#D9E7E0",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 0.2,
    margin: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 120,
    marginBottom: 80,
  },
  Checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  CheckboxContainer: {
    marginVertical: 5,
  },
  save: {
    width: 30,
    height: 30,
  },
  timeStyle: {
    flexDirection: "row-reverse",
    alignItems: "center",

    justifyContent: "space-between",
  },
  StartEndTimeStyle: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "space-between",
    paddingLeft: 28,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  TextInputStyle: {
    marginBottom: 5,
    width: 200,

    justifyContent: "flex-end",
  },
  TextInputStyle2: {
    marginBottom: 5,
    width: 100,
  },
});
