import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import AppContext from "../../AppContext";

import React, { useState, useContext } from "react";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from "react-native-paper";
import moment from "moment";
import { useEffect } from "react";
import { images } from "../../images";
import Modal from "react-native-modal";
import { windowHeight } from "../../styles";
import { FloatingMenu } from "react-native-floating-action-menu";
const RequestType = [
  { label: "Room Cleaning", value: "Room Cleaning" },
  { label: "Room Service", value: "Room Service" },
  { label: "Change towels", value: "Change towels" },
  { label: "Refill mini bar", value: "Refill mini bar" },
];

export default function EditTasks({ route, navigation }) {
  const myContext = useContext(AppContext);
  const [dropdown, setDropdown] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  // const [Status, setStatus] = useState("");

  const [flagStartTime, setFlagStartTime] = useState(false);
  const [flagEndTime, setFlagEndTime] = useState(false);
  const [taskStatus, SetTaskStatus] = useState(false);
  const [isMenuOpen, SetIsMenuOpen] = useState(false);
  const [description, SetDescription] = useState("");
  const [workerNotes, SetWorkerNotes] = useState("");

  
  // const windowHeight = Dimensions.get("window").height;
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

  const toggleNotesModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleStatusModal = () => {
    setStatusModalVisible(!isStatusModalVisible);
  };

  useEffect(() => {
    if (route.params !== undefined) {
      SetTask(route.params.taskDetails);
      // console.log(task);
      SetWorkerNotes("");
      // SetTaskStatus(
      //   route.params.taskDetails.TaskStatus === "Open" ? true : false
      // );
    }
  }, [navigation]);

  const handelTimeStart = (time) => {
    task.StartTime = moment(time).format("HH:mm");

    setFlagStartTime(false);
  };

  const handelTimeEnd = (time) => {
    task.EndTime = moment(time).format("HH:mm");

    setFlagEndTime(false);
  };

  // const HandelTaskStatus = () => {
  //   SetTaskStatus(!taskStatus);
  //   task.TaskStatus = !taskStatus ? "Open" : "Close";
  // };

  const CheckValues = () => {
    return (
      /^-?\d+$/.test(task.RoomNumber) &&
      task.RoomNumber > 0 &&
      task.TaskName !== ""
    );
  };

  const AlterTask = async () => {
    if (task.EmployeeName !== null && task.EmployeeID === -1)
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
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/AlterTask",
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
  const CloseTask = async () => {
    try {
      if (task.TaskStatus === 'Open') {
        alert("A proper closing status must be selected");
        return;
      }
      // SetLoading(false);
      
      let endTime = moment().format("HH:mm");
     
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify({
            Task_Status:task.TaskStatus,
            task_code: task.TaskCode,
            end_time: endTime,
          }),
          headers: { "Content-Type": "application/json" },
        };
        // console.log(requestOptions.body);
        let result = await fetch(
          "http://proj13.ruppin-tech.co.il/CloseTask",
          requestOptions
        );
        let temp = await result.json();
        if (temp) {
          alert("The task was successfully closed");
        
         navigation.goBack();
        }
      

    } catch (error) {
      alert(error);
      // SetLoading(true);
    }
    // SetLoading(true);
  };

  const DeleteTask = async () => {
    try {
      // SetLoading(false);
      const requestOptions = {
        method: "DELETE",
        body: JSON.stringify({
          task_code: task.TaskCode,
        }),
        headers: { "Content-Type": "application/json" },
      };
      // console.log(requestOptions.body);
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/DeleteTask",
        requestOptions
      );
      let temp = await result.json();
      // console.log(temp);
      if (temp) {
        alert("Task successfully deleted");

      navigation.goBack();
        // SetLoading(true);
        // GetAllTasksFromDB();
      }
    } catch (error) {
      alert(error);
    }
    // SetLoading(true);
  };
  const items = [
    {
      label: "Delete task",
      img: <Image style={styles.save} source={images.trashCan} />,
    },
    {
      label: "Update status",
      img: <Image style={styles.save} source={images.check} />,
    },
    {
      label: "Save changes",
      img: <Image style={styles.save} source={images.save} />,
    },
  ];
  const handleItemPress = (item) => {
    switch (item.label) {
      case "Save changes":
        AlterTask();
        break;
      case "Delete task":
        DeleteTask();
        break;
      case "Update status":
        toggleStatusModal();
        break;
      default:
        break;
    }
  };

  const ItemIcons = (item) => {
    return item.img;

    //     return(
    //       item.img;
    // {/* <Image style={styles.save} source={images.save} /> */}
    //     )
  };
  // console.log(task);
  return (
    <View style={{ height: windowHeight }}>
      <FloatingMenu
        renderItemIcon={ItemIcons}
        buttonWidth={60}
        innerWidth={52}
        position={"bottom-left"}
        backgroundDownColor={"rgba(35,100,168, 0.2)"}
        items={items}
        isOpen={isMenuOpen}
        onMenuToggle={() => SetIsMenuOpen(!isMenuOpen)}
        onItemPress={handleItemPress}
      />
      <ScrollView style={{ marginTop: 20 }}>
        <Text style={styles.EditTaskStyle}>Edit Task</Text>
        <Text style={styles.SumHeadLine}>No : {task.TaskCode}</Text>
        <View style={styles.DetailsContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, top: 30, zIndex: 2, left: -7 }}>
              Room{" "}
            </Text>
            <TextInput
              placeholder={
                task.RoomNumber !== 0 ? JSON.stringify(task.RoomNumber) : ""
              }
              mode="outlined"
              keyboardType="numeric"
              style={styles.TextInputStyle2}
              onChangeText={(room) => (task.RoomNumber = room)}
            />
          </View>
          <View>
            <Dropdown
              style={styles.dropdown}
              data={RequestType}
              labelField="label"
              valueField="value"
              placeholder="Task Request"
              value={task.TaskName}
              onChange={(taskName) => (task.TaskName = taskName.value)}
            />

            {/* <Text style={{ fontSize: 18 }}>Employee ID :</Text>
            <TextInput
              placeholder={
                task.EmployeeID !== null ? JSON.stringify(task.EmployeeID) : ""
              }
              mode="outlined"
              keyboardType="numeric"
              style={styles.TextInputStyle}
              onChangeText={(id) => (task.EmployeeID = id)}
            /> */}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 25,
            marginBottom: 35,
          }}
        >
          <Dropdown
            style={styles.dropdown}
            data={myContext.roomServiceEmpView}
            labelField="label"
            valueField="value"
            placeholder={task.EmployeeName}
            value={task.EmployeeName}
            onChange={(Name) => (task.EmployeeName = Name.value)}
          />
           <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              justifyContent: "center",
              padding: 15,
              backgroundColor: "#EEEEEE",
              borderRadius: 22,
            }}
            onPress={() => toggleNotesModal()}
          >
            {task.Description !== null ? (
              <Badge
                status="primary"
                value={"1"}
                containerStyle={{ position: "absolute", top: -4, left: -2 }}
              />
            ) : null}
            <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>Notes</Text>
            <Image style={styles.save} source={images.tasks} />
          </TouchableOpacity>
      
         
        </View>

        <View style={styles.timeStyle}>
          <View style={styles.StartEndTimeStyle}>
            <TouchableOpacity onPress={() => setFlagStartTime(true)}>
              <Text style={{ fontSize: 18 }}>Start : {task.StartTime}</Text>
            </TouchableOpacity>
            <TextInput.Icon
              name="clock"
              size={25}
              style={{ paddingRight: 5 }}
            />
          </View>

          <View style={styles.StartEndTimeStyle}>
            <TouchableOpacity
              onPress={() => setFlagEndTime(true)}
              style={styles.Btn}
            >
              <Text style={{ fontSize: 18 }}>Until : {task.EndTime}</Text>
            </TouchableOpacity>
            <TextInput.Icon
              name="clock"
              size={25}
              style={{ paddingRight: 5 }}
            />

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
 {
            workerNotes ==="" ? <Text style={{ fontSize: 18, padding: 20, fontWeight: "bold" }}>
            Status : {task.TaskStatus.split('|')[0]}
          </Text>:
      <TouchableOpacity  style ={{ paddingVertical: 25,paddingHorizontal:5,
        backgroundColor: "#EEEEEE",
        borderRadius: 22,}}onPress={() => alert(workerNotes)}>
         <Badge
                status="primary"
            
                containerStyle={{ position: "absolute", top: 5, left: 0 }}
              />
      <Text style={{ fontSize: 18 , paddingRight: 21, fontWeight: "bold"}}> Status  :  {task.TaskStatus.split('|')[0]}</Text>
    </TouchableOpacity>
          }
    
       
        <Modal isVisible={isStatusModalVisible}>
          <View
            style={{
              // flex: 1,
              backgroundColor: "#C0C0C0",
              width: "90%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff",
              marginVertical: 50,
              // height:250,
              alignSelf: "center",
            }}
          >
            <View style={{ flexDirection: "row-reverse" }}>
              <Text style={{ fontSize: 18, padding: 20, fontWeight: "bold" }}>
                Status :{" "}
              </Text>
              <Dropdown
                style={styles.dropdownStatus}
                data={[
                  { value: "Completed" },
                  { value: "Partially completed" },
                  { value: "Not completed" },
                ]}
                labelField="value"
                valueField="value"
                placeholder={task.TaskStatus.split('|')[0]}
                value={taskStatus}
                onChange={(taskStatus) => SetTaskStatus(taskStatus.value)}
              />
            </View>
            {taskStatus !== "Completed" ? (
              <TextInput
                activeOutlineColor="#000"
                mode="outlined"
                placeholder={task.TaskStatus.split('|')[1]}
                style={styles.TextInputMulti}
               onChangeText={(text) => SetWorkerNotes(text)}
                multiline={true}
                numberOfLines={4}
              />
            ) : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingVertical: 20,
              }}
            >
              <Button
                title="Save"
                color="#1E3F99"
                onPress={() => {
                  toggleStatusModal(), task.TaskStatus = taskStatus,
                  task.TaskStatus += workerNotes!==""? '|'+ workerNotes:workerNotes,
                  CloseTask()
                }}
              />
              <Button
                title="cancel"
                color="#888"
                onPress={() => toggleStatusModal()}
              />
            </View>
          </View>
        </Modal>

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              // flex: 1,
              backgroundColor: "#C0C0C0",
              width: "90%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff",
              marginVertical: 100,
              // height:250,
              alignSelf: "center",
            }}
          >
            <TextInput
              activeOutlineColor="#000"
              mode="outlined"
              placeholder={task.Description || ""}
              style={styles.TextInputMulti}
              onChangeText={(description) => SetDescription(description)}
              multiline={true}
              numberOfLines={4}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingVertical: 20,
              }}
            >
              <Button
                title="Save notes"
                color="#1E3F99"
                onPress={() => {
                  toggleNotesModal(), (task.Description = description);
                }}
              />
              <Button
                title="cancel"
                color="#888"
                onPress={() => toggleNotesModal()}
              />
            </View>
          </View>
        </Modal>

        <View
          style={{
            alignSelf: "center",
          }}
        >
          {/* <TouchableOpacity onPress={DeleteTask}>
                        <Image style={styles.BTNImages} source={images.trashCan} />
                    </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.button}
            onPress={AlterTask}
          >
            <Text style={{ fontSize: 20 }}>SAVE</Text>
            <Image style={styles.save} source={images.save} />
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 40,
    // paddingBottom: 30,
    // textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 20,
    // textDecorationLine: "underline",
  },
  DetailsContainer: {
    paddingHorizontal: 24,
    justifyContent: "center",

    paddingVertical: 20,
    flexDirection: "row-reverse",
    alignItems: "center",

    justifyContent: "space-between",
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
    marginVertical: 15,
  },
  save: {
    width: 30,
    height: 30,
  },
  dropdownStatus: {
    alignSelf: "flex-end",
    height: 70,
    width: 200,

    borderRadius: 22,
    paddingHorizontal: 8,
  },
  timeStyle: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 25,
  },
  StartEndTimeStyle: {
    flexDirection: "row-reverse",
    alignItems: "center",

    justifyContent: "space-between",
    paddingLeft: 35,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  TextInputStyle: {
    marginBottom: 5,
    width: 200,
    height: 45,
    justifyContent: "flex-end",
  },
  TextInputMulti: {
    // marginBottom: 5,
    margin: 5,
    // width:200,
    // alignSelf:'flex-end'
  },
  TextInputStyle2: {
    width: 120,
    height: 50,
  },
  BTNImages: {
    width: 25,
    height: 25,
  },
});
