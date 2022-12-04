import {
 
  ScrollView,
  StyleSheet,


} from "react-native";
import React, { useState, useContext, useEffect } from "react";

import TasksCard from "./TasksCard";
import moment from "moment";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";

import { Spinner } from "../../styles";
export default function Tasks(props) {
  const myContext = useContext(AppContext);
  const myEmployee = myContext.employee;

  const [tasks, SetTasks] = useState([]);


  const [tasksDisplay, SetTasksDisplay] = useState([]);

  const [loading, SetLoading] = useState(false);
  const [search, setSearch] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      if (myEmployee.Description === "Manager") GetAllTasksFromDB();
      else GetTasksByID();
      if (props.route.name === "Tasks") {
        let { search } = props.route.params;

     
      }
    }, [props.route.name])
  );
  useEffect(() => {
    GetEmployees();
  }, []);

  const GetEmployees = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      "http://proj13.ruppin-tech.co.il/GetEmployeesBasicDetails",
      requestOptions
    );
    let employees = await result.json();

    if (employees !== null) {
      let array = [{ label: "Select employee", value: null }];
      myContext.SetEmployees(employees);
      employees.map((employee) =>
        array.push({
          label: employee.EmployeeName,
          value: employee.EmployeeName,
        })
      );

      myContext.SetRoomServiceEmpView(array);

      return;
    }
    GetEmployees();
  };
 
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
        myContext.SetAllTasks(temp);
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

      if (temp !== null) {
        myContext.SetAllTasks(temp);
        SetTasks(temp);
        HandelRequest(temp);

        SetLoading(true);
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };

  const EditTaskDetails = (taskcode) => {
    let taskDetails = tasks.filter((task) => task.TaskCode === taskcode)[0];
    props.navigation.navigate("EditTasks", { taskDetails: taskDetails });
  };

  const HandelRequest = (allTasks) => {
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

  return (
    <ScrollView style={Styles.items}>
      {loading ? (
        tasksDisplay.map((task) => (
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
          />
        ))
      ) : (
        <Spinner />
      )}
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
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
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 95,
    right: 20,
    borderWidth: 2,
    zIndex: 2,
  },
  save: {
    alignSelf: "center",
    width: 25,
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
