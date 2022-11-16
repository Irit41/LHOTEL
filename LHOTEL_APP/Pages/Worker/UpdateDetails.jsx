import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { TextInput } from "react-native-paper";
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Counter from "react-native-counters";
import { images } from '../../images';


const Roles = [
    { label: "General", value: "General" },
    { label: "Manager", value: "Manager" },
    { label: "Receptionist", value: "Receptionist" },
    { label: "Room service", value: "Room service" },
];

export default function UpdateDetails({ route, navigation }) {

    const [dropdown, setDropdown] = useState(null);
    const [flagDate, setFlagDate] = useState(false)

    let { employee } = route.params


    const showDate = () => {
        setFlagDate(true);
    };
    const hideDate = () => {
        setFlagDate(false);
    };
    const handleDate = (date) => {
        let dateString = moment(date).format('YYYY-MM-DD')
        // setFlagDate(date)
        // console.log(dateString);
        employee.BirthDate = dateString
        hideDate()
    };

    const CheckDetails = () => {
        if (employee.EmployeeName !== "" && employee.HourlyWage > 0 && employee.PhoneNumber !== "")
            return true
        else
            return false
    }

    // console.log(JSON.stringify(employee));


    const SaveEmployeeToDB = async () => {
        // navigation.goBack()
        try {
            const requestOptions = {
                method: 'PUT',
                body: JSON.stringify(employee),
                headers: { 'Content-Type': 'application/json' }
            };
            // console.log(requestOptions.body);
            let result = await fetch('http://proj13.ruppin-tech.co.il/AlterEmployeeById', requestOptions);
            if (result) {
                alert("Employee details have been saved successfully")
                navigation.goBack()
            }
        } catch (error) {
            alert(error)
        }

    }



    const SaveUser = () => {
        // console.log(employee);

        if (CheckDetails()) {
            return Alert.alert(
                "Saving employee details",
                "Are you sure these are the details for the employee?",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            // employee.Birth_Date = moment(employee.Birth_Date).format('YYYY-MM-DD')
                            SaveEmployeeToDB()
                        },
                    },
                    { text: "No", },
                ]
            );
        }

    }
    // console.log(employee);


    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Update Details</Text>
            <View style={styles.DetailsContainer}>
                <View>
                    <Text style={{
                        alignSelf: "center", paddingBottom: 10, textDecorationLine: 'underline',fontSize:18,
                    }}>Employee ID : {employee.EmployeeID}</Text>
                </View>
                <View>
                    <Text > Full Name :</Text>
                    <TextInput
                        // label={employee.EmployeeName}
                        placeholder={employee.EmployeeName}
                   
                        mode="outlined"
                     
                        onChangeText={(name) => employee.EmployeeName = name}
                    />
                </View>
                <View style ={{paddingTop:10}}>
                    <Text >Phone Number :</Text>
                    <TextInput
                        // label={JSON.stringify(employee.PhoneNumber)}
                        placeholder={employee.PhoneNumber}
       
                        keyboardType='numeric'
                        mode="outlined"
                       
                        onChangeText={(number) => employee.PhoneNumber = number}
                    />
                </View>
                <View style ={{paddingTop:10}}>
                    <Text style={{ paddingLeft: 5 }}>Address :</Text>
                    <TextInput
                        // label={JSON.stringify(employee.Address)}
                        placeholder={employee.Address}
                      
                        mode="outlined"
                        
                        onChangeText={(address) => employee.Address = address}
                    />
                </View>
               
              

                <View>
                    <DateTimePickerModal
                        isVisible={flagDate}
                        mode="date"
                        onConfirm={handleDate}
                        onCancel={hideDate} />
                     <TouchableOpacity style={styles.input} onPress={showDate}>
            <View style={styles.ButtonContainer}>
              <Text>{" Birth Date : " + moment(employee.BirthDate).format('DD/MM/YYYY')}</Text>

              <Image
                style={{ width: 30, height: 30 }}
                source={images.calendar}
              />
            </View>
          </TouchableOpacity>
        
                </View>
                <View style={styles.counterStyle}>
                    <Counter
                        initial={employee.HourlyWage}
                        start={employee.HourlyWage}
                        onChange={(count) => { employee.HourlyWage = count }}
                    />
                    <Text style={{ paddingRight: 10 }}>Hourly Wage : </Text>
                </View>
                <View style={styles.container}>
                    <Dropdown
                        style={styles.dropdown}
                        data={Roles}
                        searchPlaceholder="Search"
                        labelField="label"
                        valueField="value"
                        placeholder="Role Description"
                        value={dropdown}
                        onChange={role => { employee.Description = role.value }}
                    />
                </View>

                

            

                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 20,
                }}>
                    <TouchableOpacity style={styles.button} onPress={SaveUser}>
                        <Image style={styles.save} source={images.save} />
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 40,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        
    },
    SumHeadLine: {
        fontSize: 15,
        alignItems: "center",
        textAlign: "center",
        padding: 20,
      
    },
    DetailsContainer: {
        paddingHorizontal: 24,
        justifyContent: "center",
        paddingTop: 10
    },
    container: {
        paddingBottom: 15,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    button:
    {
        backgroundColor: "rgba(35,100,168, 0.4)",
        padding: 15,
        borderRadius: 10,
        margin: 5,

    },
    save: {
        width: 30,
        height: 30
    },
    counterStyle: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        // borderColor:"black",
        // borderWidth:1,
    },
    input: {
        height: 70,
        marginVertical: 10,
        paddingVertical: 30,
        paddingHorizontal: 10,
        borderWidth: 0.6,
        justifyContent: "center",
      },
      ButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        // paddingHorizontal:70,
        // paddingVertical:90,
      },

})