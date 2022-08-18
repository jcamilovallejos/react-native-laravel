import React, {useEffect, useState} from 'react'
import {View, Text, Button, ScrollView} from 'react-native'
import axios from 'axios'
import { ListItem, Avatar } from 'react-native-elements'


const UserList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(()=>{
        const unsubscribe = props.navigation.addListener('focus', () => {
            axios.get('http://192.168.1.2:8000/api/users')
            .then(res => {
                console.log(res.data)
                let data = res.data
                setUsers(data)
            })
            .catch(err => {
                console.error(err); 
            })
        });

        return unsubscribe

    },[])


    return (
        <ScrollView>
            <Button 
                title='Create user' 
                onPress={() => props.navigation.navigate('CreateUserScreen')} />


            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserDetailScreen',{userId: user.id}) }>
                            <ListItem.Chevron />
                            <Avatar source={{uri:"https://thumbs.dreamstime.com/b/icono-masculino-del-avatar-en-estilo-plano-icono-masculino-del-usuario-avatar-del-hombre-de-la-historieta-91462914.jpg"}} ></Avatar>
                            <ListItem.Content>
                                <ListItem.Title>
                                    {user.name}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    {user.email}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }

        </ScrollView>
    )
}

export default UserList