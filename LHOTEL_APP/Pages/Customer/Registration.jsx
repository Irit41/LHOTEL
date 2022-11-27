import { View, Text, StyleSheet, TextInput, Button, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { User } from '../Class/User'
import { ActivityIndicator } from "react-native";
import { Spinner } from '../../styles';


export default function Registration({ navigation }) {

    const [loading, SetLoading] = useState(true)
    const [id, setId] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_Password, setRe_Password] = useState('')
    const [phone, setPhone] = useState('')


    const CheackFields = () => {
        if (password.length < 9 || password !== re_Password || id.length !== 9 || first_name.length == 0 ||
             last_name.length == 0 || !email.includes('@gmail.com') || phone.length < 3){
            Alert.alert("Data entry error")
            return false
        }
        else {
            return true
        }}

        
    // const Spinner = () => (
    //     <View style={[styles.container, styles.horizontal]}>
    //         <ActivityIndicator size="large" />
    //     </View>
    // );


    const Save_User = async () => {
        try {
            if (CheackFields()) {
                SetLoading(false)
                let user = CreateUser()
                user = JSON.stringify(user.fields)
              
                const requestOptions = {
                    method: 'POST',
                    body: user,
                    headers: { 'Content-Type': 'application/json' }
                };
                let result = await fetch('http://proj13.ruppin-tech.co.il/AddNewCustomer', requestOptions);
                if (result) {
                    SetLoading(true)
                    alert("User successfully added")
                    navigation.navigate('Login')
                }
            }
        } catch (error) {
            alert(error)
        }
        SetLoading(true)
    }



    const CreateUser = () => { // פונצקיה היוצרת אובייקט חדש מסוג משתמש ומחזירה אותו 
        var Hashes = require('jshashes')
        let SHA1 = new Hashes.SHA1().b64_hmac(id, password) // הצפנת סיסמת משתמש לפי מפתח ת.ז שלו והשמה במשתנה 

 

        //  יצירת אובייקט מהמחלקה "יוזר" אשר יכיל את כול פרטי המשתמש
        let user = {
            className: User,
            fields: {
                CustomerID: id,
                FirstName: first_name,
                LastName: last_name,
                Mail: email,
                Password: SHA1,
                PhoneNumber: phone
            }
        }
        return user
    }



    const Delete = () => {
        setId('')
        setFirst_name('')
        setLast_name('')
        setEmail('')
        setPassword('')
        setRe_Password('')
        setPhone('')
    }



    return (
        <ScrollView>
            <Text style={styles.HeadLine}>Registration</Text>
            <View >
                {loading ? null : <Spinner/>}
            </View>
            <View style={styles.label}>

                <TextInput value={id} keyboardType='numeric' placeholder="User's ID" style={styles.TextInput}
                    onChangeText={(id) => setId(id)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={first_name} placeholder='First Name' style={styles.TextInput}
                    onChangeText={(first_name) => setFirst_name(first_name)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={last_name} placeholder='Last Name' style={styles.TextInput}
                    onChangeText={(last_name) => setLast_name(last_name)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={email} keyboardType='email-address' placeholder='Email @gmail.com' style={styles.TextInput}
                    onChangeText={(email) => setEmail(email)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={password} placeholder='Password, 9 or more letters' style={styles.TextInput} secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={re_Password} placeholder='Re-Password, 9 or more letters' secureTextEntry={true} style={styles.TextInput}
                    onChangeText={(re_Password) => setRe_Password(re_Password)}></TextInput>
                <View style={{ height: 10 }}></View>

                <TextInput value={phone} keyboardType='numeric' placeholder='Phone Number' style={styles.TextInput}
                    onChangeText={(phone) => setPhone(phone)}></TextInput>

            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity>
                    <Text style={styles.button} onPress={Delete} >DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.button2} onPress={Save_User} >SUBMIT</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    HeadLine: {
        fontSize: 40,
        fontWeight: "bold",
        paddingTop: 20,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",


    },
    label: {
        flex: 2,
        padding: 20,
    },
    TextInput: {
        height: 50,
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderWidth: 1.3,
    
        borderRadius: 5,
      
    },
    container: {
        flex: 1,
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 20,
        
    },
    button:
    {
        backgroundColor: '#C0C0C0',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,

    },
    button2:
    {
        backgroundColor: 'rgba(35,100,168, 0.4)',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        
        fontWeight:'500'
    },
});