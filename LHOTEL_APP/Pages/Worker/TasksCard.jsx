import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper';
import { images } from '../../images';
import { fontSize } from '@mui/system';



export default function TasksCard(props) {


    let { TaskCode, EmployeeID,EmployeeName, TaskName, RoomNumber, StartDate, StartTime,
        EndTime, TaskStatus, Description } = props


    const [flag, SetFlag] = useState(false)

    const EditTaskDetails = (TaskCode) =>{
        props.EditTaskDetails(TaskCode)
    }

    // console.log(flag);
    // const DeleteTask = (TaskCode) => {
    //     props.DeleteTask(TaskCode)
    // }


    const MarkTaskAsDone = () =>{
        SetFlag(!flag)
        if(!flag === true)
            props.MarkTaskAsDone(TaskCode)
        else
            props.RemoveFromCheck(TaskCode)
    }
   
    return (
        <View style={{ backgroundColor: TaskStatus==='Open'? 'rgba(35,100,168, 0.4)': '#C0C0C0',
        borderBottomColor: 'black',
        borderRadius: 5,
        margin: 10,}}>
            <View style={styles.Details}>
          
            <Text>{StartDate}</Text>
                <Text>No: {TaskCode}</Text>
            </View>

            <View style={styles.containerTaskDedtails}>
                <View style={styles.Details}>
                    <Text style={{fontWeight:'bold'}}>Room : {RoomNumber}</Text>
                    <Text style={{fontWeight:'bold'}}>Task : {TaskName}</Text>
                   
                </View>

                <View style={styles.Details}>
                <Text>Status: {TaskStatus}</Text>
                    <Text style={{fontWeight: EmployeeID === -1 ? 'bold':'400',color: EmployeeID === -1 ? 'red':'black'}}>Name : {EmployeeName}</Text>
                </View>

                <View style={styles.Details}>
                    {EndTime === null ? <Text>End Time : </Text> : <Text>End Time : {EndTime}</Text>}
                    <Text>Start Time : {StartTime}</Text>
                </View>
                <Text style={{ padding: 5 }}>Description : {Description}</Text>

                <View style={styles.BTNContainer}>

                    <TouchableOpacity onPress={() => EditTaskDetails(TaskCode)}>
                        <Image style={styles.BTNImages} source={images.edit} />
                    </TouchableOpacity>
                    {/* <View style={styles.Checkbox}>
                        {TaskStatus === "Open" ?
                            <Checkbox label="Item" status={flag ? 'checked' : 'unchecked'}
                                onPress={MarkTaskAsDone} />
                            : null}
                    </View> */}
                    {/* <TouchableOpacity onPress={() => DeleteTask(TaskCode)}>
                        <Image style={styles.BTNImages} source={images.trashCan} />
                    </TouchableOpacity> */}


                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 5,
        backgroundColor: '#D9E7E2',
        borderBottomColor: 'black',
        borderRadius: 5,
        margin: 10,
        

    },
    containerTaskDedtails: {
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'white',
   
    },

    Details: {
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
    BTNContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    }

})
