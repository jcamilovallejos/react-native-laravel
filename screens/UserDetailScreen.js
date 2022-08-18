import React, {useEffect, useState} from 'react'
import {View, Text, ScrollView, TextInput, StyleSheet, ActivityIndicator, Button, Alert} from 'react-native'
import axios from 'axios'

const UserDetailScreen = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const userId = props.route.params.userId
    const [loading, setLoading] = useState(false)


    const deleteUser = () => {
        axios.delete('http://192.168.1.2:8000/api/users/'+userId)
        .then(res => {
            props.navigation.navigate('UserList')
        })
        .catch(err => {
            console.error(err); 
        })
    }

    const openConformationAlert = () => {
        Alert.alert('Remove the user', 'Are you sure?',[
            {text: 'Yes', onPress: () => deleteUser()},
            {text: 'No', onPress: () => {return}}
        ])
    }


    useEffect(() => {

        axios.get('http://192.168.1.2:8000/api/users/'+userId)
        .then(res => {
            setName(res.data.name) 
            setEmail(res.data.email) 
            setPhone(String(res.data.id))
            setLoading(true)
        })
        .catch(err => {
            console.error(err); 
        })

    },[])

    if (!loading) {
        return (
            <View>
                <ActivityIndicator></ActivityIndicator>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Name user' value={name}></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Email user' value={email}></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput keyboardType='numeric' placeholder='Phone user' value={phone}></TextInput>
            </View>
            <View>
                <Button color="#E37399" title="Delete user" onPress={() => openConformationAlert()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:35
    },
    inputGroup:{
        flex:1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default UserDetailScreen