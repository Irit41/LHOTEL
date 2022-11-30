import {
  Animated,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
} from "react-native";
import AppContext from "../../AppContext";
import React, { useState, useContext, useReducer, useEffect } from "react";
import moment from "moment";

import { useTheme } from "@react-navigation/native";
import { useCardAnimation } from "@react-navigation/native-stack";
import TasksCard from "./TasksCard";

export default function ModalScreen(props) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const myContext = useContext(AppContext);
  //   console.log(myContext.allTasks);
  const SearchTask = () => {
    let { search } = props.route.params;
    setSearch(search);

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
            EditTaskDetails={[]}
          />
        </View>
      );
    } else
      return (
        <View style={{ height: 270 }}>
          <Text>"no task have this number "</Text>
        </View>
      );

    // if (task.length > 0) {
    //   SetTasksDisplay(task);
    // } else {
    //   SetTasksDisplay(currentTasks);
    // }
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
        // onPress={navigation.goBack}
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
        {/* <Button
            title="Okay"
            color={colors.primary}
            style={{ alignSelf: 'flex-end' }}
            onPress={()=>props.navigation.goBack()}
          /> */}
      </Animated.View>
    </View>
  );
}
