import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

import moment from "moment";


export default function ReservationCard(props) {


    let { roomType,count , pricePerNight, entryDate, exitDate, breakfast} = props

    return (
        <ScrollView>
            <View style={styles.OrderDetails}>
               
                <View >
                    <Text  style={styles.textStyle}>{roomType}  X {count}</Text>
                    <Text  style={styles.textStyle}> {moment(entryDate).format("DD/MM/YYYY")} - {moment(exitDate).format("DD/MM/YYYY")}</Text>
                
                    <Text  style={styles.textStyle}>breakfast : {breakfast ? <Text>Yes</Text> : <Text>No</Text>}</Text>
                 
                </View>
            </View>
        </ScrollView>
    )
}




const styles = StyleSheet.create({
    OrderDetails: {
        width: 350,
        backgroundColor: '#C0C0C0',
        alignSelf: 'center',
        alignItems: 'flex-end',
        padding: 20,
        margin: 5
    },
    Image: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
   textStyle:{
    fontSize: 18,
    paddingVertical:2,
  
   },
    pay: {
        textDecorationLine: 'underline',
        alignSelf: 'center',
        fontSize: 15
    }
})