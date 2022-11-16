import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { images } from '../../images';
import moment from 'moment/moment';

export default function EMCard(props) {


    let { EmployeeID, Description, EmployeeName, PhoneNumber,
        BirthDate, HourlyWage, Address, EmployeeCode } = props


    const DeleteEmployee = () => {
        props.DeleteEmployee(EmployeeID);
    }

    const EditDetails = () =>{
        props.EditDetails(EmployeeID);
    }


    return (
        <View style={styles.card}>
            
            <Text style={styles.textStyle} >Employee Code: {EmployeeCode}</Text>
            <View style={styles.details}>
                <Text style={styles.textStyle} >Name : {EmployeeName}</Text>
                <Text style={styles.textStyle} >ID : {EmployeeID}</Text>
            </View>
            <View style={styles.details}>
          
                <Text style={styles.textStyle}  >Phone : {PhoneNumber}</Text>
                <Text style={styles.textStyle} >Role : {Description}</Text>
            </View>

            <View style={styles.details}>
            <Text style={{paddingLeft:5,fontSize:16}}>Hourly : {HourlyWage}$</Text>
                <Text style={styles.textStyle}  >Birth Date : {moment(BirthDate).format('DD/MM/YYYY')}</Text>
            
               
            </View>
         

           

                <Text style ={{padding:5,fontSize:16}}>Address: {Address}</Text>
    

            <View style={styles.BTNContainer}>
                <TouchableOpacity onPress={EditDetails}>
                    <Image style={styles.BTNImages} source={images.edit} />
                </TouchableOpacity>
                <TouchableOpacity onPress={DeleteEmployee}>
                    <Image style={styles.BTNImages} source={images.trashCan} />
                </TouchableOpacity>
                
            </View>
          

        </View>
    )
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderBottomWidth:1
       
    },
    textStyle:{
        fontSize:16,
    },
    itemLeft: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
    },
    details: {
        flexDirection: "row",
    
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 5

    },
    BTNContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    BTNImages: {
        width: 25,
        height: 25,
    },
})