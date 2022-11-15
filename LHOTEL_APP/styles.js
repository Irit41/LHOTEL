
import React, { useEffect, useState, useContext } from "react";

import AppContext from "./AppContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import {
    ImageBackground,
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Switch,
    TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "./images";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog";
// import { TextInput } from "react-native-paper";
import moment from "moment";

export const BlueButton = ({ text }) => (
    <LinearGradient
        style={[
            {
             
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
            },
        ]}
        colors={["#91BAD6", "#1E3F99"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1.5 }}
    >
        <Text
            style={{ color: "#000", fontSize: 20, fontWeight: "bold", paddingHorizontal: 25, paddingVertical: 10 }}
        >
            {text}
        </Text>
    </LinearGradient>


);


export const GrayButton = ({ text }) => (
    <LinearGradient
        style={[
            {
              
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
            },
        ]}
        // colors={["#edf0fc", "#d6dfff"]}
        colors={["#888", "#CDCDCD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
    >
        <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold", paddingHorizontal: 25, paddingVertical: 10 }}>{text}</Text>
    </LinearGradient>

);




