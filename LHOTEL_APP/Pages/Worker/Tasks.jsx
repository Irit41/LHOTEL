import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext ,useReducer,useEffect} from "react";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator } from "react-native";
import TasksCard from "./TasksCard";
import moment from "moment";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { images } from "../../images";
import { Dimensions } from "react-native";
import { Searchbar } from "react-native-paper";
export default function Tasks(props) {
  const myContext = useContext(AppContext);
  const myEmployee = myContext.employee;
  const [dropdown, setDropdown] = useState(null);
  const [tasks, SetTasks] = useState([]);
  const [tasksDisplay, SetTasksDisplay] = useState([]);
  const [taskToMarkAsDone, SetTaskToMarkAsDone] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     GetEmployees();
  //     if (myEmployee.Description === "Manager") GetAllTasksFromDB();
  //     else GetTasksByID();
  //   }, [props])
  // );
  // props
 
  useEffect(() => {
    // GetEmployees();
    if (myEmployee.Description === "Manager") GetAllTasksFromDB();
    else GetTasksByID();

  }, [props.route.name || navigation])
  
  // // console.log(tasks);
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
  //     let array =[ { label: "Select employee", value: null }]
  //     myContext.SetEmployees(employees);
  //     employees.map(employee=> array.push({ label: employee.EmployeeName, value:  employee.EmployeeName }))

  //     myContext.SetRoomServiceEmpView(array);

  //     // SetLoading(true);
  //     return;
  //   }
  //   GetEmployees();

  // };

  const GetTasksByID = async () => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          id: myEmployee.EmployeeID,
        }),
        headers: { "Content-Type": "application/json" },
      };
      console.log(requestOptions.body);
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetTaskById",
        requestOptions
      );
      let temp = await result.json();
     
      if (temp !== null) {
        SetTasks(temp);
        HandelRequest(temp);
    

        SetLoading(true);
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };

  const GetAllTasksFromDB = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetAllTasks",
        requestOptions
      );
      let temp = await result.json();
      //  console.log(temp);
      if (temp !== null) {

        SetTasks(temp);
        HandelRequest(temp);
        // forceUpdate();
        SetLoading(true);
   

      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };
// console.log(tasks);
  const EditTaskDetails = (taskcode) => {
    let taskDetails = tasks.filter((task) => task.TaskCode === taskcode)[0];
    props.navigation.navigate("EditTasks", { taskDetails: taskDetails });
  };

  const HandelRequest = (allTasks) => {
    // console.log(tasks);
    let listTemp = null;
    switch (props.route.name) {
      case "All Tasks":
        listTemp = allTasks;
        break;
      case "Today's Tasks":
        listTemp = allTasks.filter(
          (task) =>
            moment(task.StartDate).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD")
        );
        break;
      case "Open Tasks":
        listTemp = allTasks.filter((task) => task.TaskStatus === "Open");
        break;
     
      default:
        return;
    }

    SetTasksDisplay(listTemp);
  };

  const MarkTaskAsDone = (taskCode) => {
    let newArrayTasks = tasksDisplay.filter(
      (task) => task.TaskCode === taskCode
    )[0];
    let temp = [...taskToMarkAsDone, newArrayTasks];
    SetTaskToMarkAsDone(temp);
  };

  const RemoveFromCheck = (taskCode) => {
    let newArrayTasks = taskToMarkAsDone.filter(
      (task) => task.TaskCode !== taskCode
    );
    SetTaskToMarkAsDone(newArrayTasks);
  };

  // const DeleteTask = async (taskCode) => {
  //   try {
  //     SetLoading(false);
  //     const requestOptions = {
  //       method: "DELETE",
  //       body: JSON.stringify({
  //         task_code: taskCode,
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     };
  //     // console.log(requestOptions.body);
  //     let result = await fetch("http://proj13.ruppin-tech.co.il/DeleteTask", requestOptions);
  //     let temp = await result.json();
  //     // console.log(temp);
  //     if (temp) {
  //       SetLoading(true);
  //       GetAllTasksFromDB();
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  //   SetLoading(true);
  // };

  const CloseTask = async () => {
    try {
      if (taskToMarkAsDone.length === 0) {
        alert("No tasks have been selected for execution");
        return;
      }
      SetLoading(false);
      let counter = 0;
      let endTime = moment().format("HH:mm");
      for (let index = 0; index < taskToMarkAsDone.length; index++) {
        // console.log(taskToMarkAsDone[index]);
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify({
            task_code: taskToMarkAsDone[index].TaskCode,
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
          counter++;
          // GetAllTasksFromDB()
        }
      }
      // console.log(counter > 1);
      if (counter > 1) {
        alert("All selected tasks have been successfully closed");
        GetAllTasksFromDB();
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
    SetLoading(true);
  };

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );
  let tasksList = tasksDisplay.map((task) => (
    <TasksCard
      key={task.TaskCode}
      TaskCode={task.TaskCode}
      EmployeeID={task.EmployeeID}
      EmployeeName={task.EmployeeName}
      TaskName={task.TaskName}
      RoomNumber={task.RoomNumber}
      StartDate={moment(task.StartDate).format("DD/MM/YYYY")}
      StartTime={task.StartTime}
      EndTime={task.EndTime}
      TaskStatus={task.TaskStatus}
      Description={task.Description}
      EditTaskDetails={EditTaskDetails}
      MarkTaskAsDone={MarkTaskAsDone}
      RemoveFromCheck={RemoveFromCheck}
      // DeleteTask={DeleteTask}
    />
  ));
 

  return (
    <View>
      {tasksDisplay.length > 5 ? (
        <Searchbar
          style={styles.searchbar}
          placeholder="search by name ..."
       
          value={"search"}
        />
      ) : null}

      <ScrollView style={{ marginBottom: tasksDisplay.length > 5 ? 90 : 0 }}>
        <View style={styles.items}>{loading ? tasksList : <Spinner />}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  searchbar: {
    position: "absolute",
    bottom: 30,
    // left: 20,
    width: "96%",

    alignSelf: "center",

    backgroundColor: "#CDCDCD",

    borderRadius: 12,
    zIndex: 2,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  container: {
    padding: 10,
  },
  Plus: {
    width: 30,
    height: 30,
  },
  SaveContainer: {
    alignItems: "center",
    padding: 10,
    position: "absolute",
    zIndex: 2,
    width: 100,
  },
  Save: {
    backgroundColor: "#D9E7E0",
    padding: 10,
    borderRadius: 50,
    width: 70,
    position: "absolute",
    bottom: 75,
    left: 30,
    borderWidth: 2,
    zIndex: 2,
  },
  save: {
    alignSelf: "center",
    width: 30,
    height: 25,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

