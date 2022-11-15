import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import Navbar from './Navbar'
import CarouselImages from './CarouselImages'
import Bar from '../Pic/bar.jpg'
import Events from '../Pic/events.jpg'
import Spa from '../Pic/spa.jpg'
import Lobi from '../Pic/lobi.jpg'
import Back from '../Pic/backround.jpg'



import { Platform,StatusBar} from 'react-native';


export default function Homepage({ navigation }) {

  
    const fullAddress = "חדרה"
    const url = Platform.select({
        ios: `maps:0,0?q=${fullAddress}`,
        android: `geo:0,0?q=${fullAddress}`,
    })



    return (
        <ScrollView><StatusBar style="light" backgroundColor="#000000" />
       
            <View>
                <Navbar navigation={navigation} />
            </View>
            <Image source={Back} />
            <Text style={styles.Text}>DETAILS ABOUT THE HOTEL</Text>
            <View style={styles.ButtonContainer}>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('mailto:maor100maor@example.com')}
                    title="support@example.com">
                    <Text style={styles.buttonText}>EMAIL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('tel:052-6211881')}>
                    <Text  style={styles.buttonText}>CALL</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(url)}>
                    <Text  style={styles.buttonText}>ADDRESS</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis

                </Text>
            </View>
            <Text style={styles.Text}>POPULERS ROOMS</Text>
            <CarouselImages />
           
            
            <Text style={styles.Text}>ACTIVITES</Text>

            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingTop: 10 }}>
                <Image style={styles.Image} source={Bar} />
                <Image style={styles.Image} source={Events} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ paddingRight: 75 }}>BAR</Text>
                <Text style={{ paddingLeft: 75 }}>EVENTS</Text>
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between', paddingTop: 10 }}>
                <Image style={styles.Image} source={Spa} />
                <Image style={styles.Image} source={Lobi} />
            </View>
            <View style={{ flex: 2, flexDirection: "row", justifyContent: 'space-between' }}>
                <Text style={{ paddingRight: 75 }}>SPA</Text>
                <Text style={{ paddingLeft: 75 }}>LOBI</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain',
        padding: 5
    },
    Text: {
        backgroundColor: 'black',
        color: 'white',
        fontWeight: "bold",
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
    },
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        justifyContent: 'space-between'
    },
    button:
    {
      
        padding:10, 
       
    
    },
    buttonText:{
        fontSize:20,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

    },
    buttonRooms: {
        flex: 1,
        backgroundColor: 'gray',
        alignItems: 'center',
        padding: 10,
    },
    user_Name:
    {
        backgroundColor: 'black',
        alignItems: 'center',
        textAlign: 'center',
    },
    innerText: {
        color: 'white',
        padding: 5
    }
});  
