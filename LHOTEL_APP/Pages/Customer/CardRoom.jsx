import {View,  Text,  StyleSheet,  Image,  Alert,  TouchableOpacity,} from "react-native";
import React from "react";
import Counter from "react-native-counters";
import { images } from "../../images";
import {  Card,  CardTitle,  CardContent,  CardAction,  CardButton,  CardImage,} from "react-native-cards";
import { useState, useEffect } from "react";

export default function CardRoom(props) {
  useEffect(() => {
    SetCount(0);
  }, []);
  let { roomType, details, count, pricePerNight } = props;

  const [counter, SetCounter] = useState(0);

  const ShowDetails = () => {
    Alert.alert(details);
  };

  const SetCount = (number) => {
    SetCounter(number);
    props.SetCount(number, roomType);
  };

  const CheakCounter = () => {
    return count >= counter;
  };
  const roomType_arr = {
    "Single room": images.single_room,
    "Double room": images.double_room,
    Suite: images.suites_room,
  };

  return (
    <View>
      <Card>
        <CardImage source={roomType_arr[roomType]} title={roomType} />

        <CardTitle subtitle={"Price per night : " + pricePerNight + " $"} />
        <CardContent text={details} />
        <View style={styles.ButtonContainer}>
          <Counter
            start={0}
            max={count + 1}
            style={styles.counter}
            onChange={SetCount.bind(this)}
          />
        </View>
        <CardAction separator={false} inColumn={false}>
          
        </CardAction>
      </Card>
      <View style={{ marginVertical: 30 }}>
        {!CheakCounter() ? (
          <Text style={styles.alerts}>
            *There are no available rooms in this amount*
          </Text>
        ) : null}
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    width: 320,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  image: {
    width: 200,
    height: 100,
  },
  RoomType: {
    textDecorationLine: "underline",
    fontSize: 20,
    paddingBottom: 20,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
  },
  alerts: {
    color: "red",
  },
});
