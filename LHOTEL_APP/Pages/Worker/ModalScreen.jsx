import {
  Animated,
  View,
  Text,
  Pressable,
 StyleSheet,
} from "react-native";
import AppContext from "../../AppContext";
import React, { useContext} from "react";
import moment from "moment";
import { useTheme } from "@react-navigation/native";
import { useCardAnimation } from "@react-navigation/native-stack";
import TasksCard from "./TasksCard";

export default function ModalScreen(props) {
  const { colors } = useTheme();
  const myContext = useContext(AppContext);

  const SearchTask = () => {
    let { search } = props.route.params;
 
    const EditTaskDetails = (taskcode) => {
      let taskDetails = myContext.allTasks.filter(
        (task) => task.TaskCode === taskcode
      )[0];
      props.navigation.navigate("EditTasks", { taskDetails: taskDetails });
    };
    let task = myContext.allTasks.filter(
      (currtask) => currtask.TaskCode == search
    );

  
    if (task.length === 1) {
      task = task[0];
      return (
        <View style={{ height: 270 }}>
          <TasksCard
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
        </View>
      );
    } else
      return (
        <View style={{ height: 270 }}>
          <Text style={{ textAlign: "center" ,paddingVertical:100,fontSize:20,paddingHorizontal:50}}>
            There is no task with the task number you entered
          </Text>
        </View>
      );

   
  };

  return (
    <View
      style={{
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        ]}
   
      />
      <Animated.View
        style={{
          padding: 16,
          width: "90%",
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
        }}
      >
        <SearchTask style={{ height: 650 }} />
    
      </Animated.View>
    </View>
  );
}
