import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import Counter from "react-native-counters";

export default function ProductsCards(props) {
  let { id, name, price } = props;
  const [start, SetStart] = useState(0);

  // console.log(id);
  const AddAmount = (id, amount) => {
    SetStart(amount);
    // console.log(id +" --- " + amount);
    props.AddAmount(id, amount);
  };

  return (
    <View>
      <View style={styles.textStyle}>
        <Text
          style={{
            color: "#2e2f30",
            fontSize: 15,
            paddingLeft: 5,
            width:80
          }}
         
        >
          {name}
        </Text>
        <View style={{ width: 40, alignItems: "flex-start" }}>
          <Text style={{ color: "#2e2f30", fontSize: 15 }}>{price} $</Text>
        </View>

        <View style={styles.counterStyle}>
          <Counter
            initial={start}
            start={start}
            max={5}
            style={styles.counterStyle}
            onChange={(amount) => AddAmount(id, amount)}
          />
        </View>
      </View>
    </View>

    // <View style={styles.card}>

    //         <View style={styles.layout}>
    //             <Text style={{alignSelf:'flex-end',padding:3,fontSize:16,fontWeight:'400'}}>{name} </Text>
    //             <Text style={{alignSelf:'flex-end',padding:5}}> $ {price}</Text>
    //         </View>

    //     <View style={styles.counterStyle}>
    //         <Counter
    //             initial={start}
    //             start={start}
    //             max={5}
    //             style={styles.counterStyle}
    //             // onChange={(count) => {SetCount.bind(this)}}
    //             onChange={(amount) => AddAmount( id,amount)}
    //         />
    //     </View>

    //     {/* <Text>{price}</Text>
    //     <Text>{amountTaken}</Text> */}

    // </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 60,
    height: 100,
    marginRight: 20,
  },
  textStyle: {
    //  flex: 3,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10.5,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  priceStyle: {
    // backgroundColor: "#ddd",
    width: 40,
    alignItems: "flex-start",
    //  marginRight: 33,
  },
  counterStyle: {
    //    flex: 2,
    // flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerStyle: {
    flex: 1,
    elevation: 2,

    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    // borderColor: "#e2e2e2",
  },
  footerContainerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    // borderColor: "#e2e2e2",
  },
  buttonContainerStyle: {
    // flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15,
  },
  // closeButtonStyle: {
  //   backgroundColor: "#7f8c8d",
  //   padding: 10,
  //   paddingRight: 30,
  //   paddingLeft: 30,
  //   borderRadius: 3,
  // },
  checkoutButtonStyle: {
    backgroundColor: "#f39c12",
    padding: 10,
    // textAlign:'center',
    // paddingRight: 60,
    // paddingLeft: 60,
    // justifyContent: "center",
    borderRadius: 3,
  },
  totalContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //   imageStyle: {
  //     width: 60,
  //     height: 100,
  //     marginRight: 50,
  //   },
  //   card: {
  //     backgroundColor: "rgba(35,100,168, 0.1)",
  //     // borderColor: 'black',

  //     borderBottomWidth: 0.4,
  //     //   bborderWidth: 0.2,
  //     padding: 10,
  //     flex: 1,
  //     flexDirection: "row-reverse",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //   },
  //   layout: {
  //     // flex: 1,
  //     flexDirection: "column",
  //     // justifyContent: "space-between",
  //     // alignItems: "center",
  //   },
  //   counterStyle: {
  //     flex: 2,
  //     flexDirection: "row",
  //     // justifyContent: "flex-end",
  //     alignItems: "center",
  //   },
});
