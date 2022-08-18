import React, {useState} from 'react'
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native'
import axios from 'axios'

const CreateUserScreen = (props) => {

    const [state, setState] = useState({
        name: '', 
        email: '',
        phone: ''
    })

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const saveNewUser = async () => {
        if(state.name === '' || state.email === ''){
            alert('Please complete all data')
            return
        }else{

            axios.post('http://192.168.1.2:8000/api/users',{
                name: state.name, 
                email: state.email,
                password: state.phone
            })
            .then(res => {
                props.navigation.navigate('UserList')
            })
            .catch(err => {
                if(err.response !== undefined){
                    if(err.response.data.errors)
                    setState({
                        name: state.name, 
                        email: '',
                        phone: state.phone
                    })
                    alert('Email already taken')
                }else{
                    alert("The server is disconnected in this moment")
                }
            })

        }
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Name user' 
                onChangeText={(value) => handleChangeText('name',value)}></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Email user' value={state.email}
                onChangeText={(value) => handleChangeText('email',value)}></TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Phone user' 
                onChangeText={(value) => handleChangeText('phone',value)}></TextInput>
            </View>
            <View>
                <Button title="Save user" onPress={saveNewUser} />
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

export default CreateUserScreen