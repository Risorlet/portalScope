import React, { useState } from "react";
import axios from "axios";
import { 
    SafeAreaView, 
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Pressable
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, SHADOWS, SIZES, FONT } from '../../constants';

const logo = require("../../assets/icons/portalscope.png");

const Login = () => {

    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const options = {
        method: "POST",
        url: "http://localhost:8080/portalscope/users/login",

        data: {
            email: userId,
            password: userPassword
        }
    }

    const handleLogin = async () => {

        try {
            const response = await axios.request(options);
            console.log(response.data);
            router.push({
                pathname:'/home/[id]',
                params: {
                    id: response.data.id,
                    name: response.data.firstName
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{headerShadowVisible: false, headerTitle: "", headerLeft: ()=>(<></>)}}/>

            <Image style={styles.image} source={logo} resizeMode='contain' />
            <Text style={styles.headingText}>Welcome to portalScope!</Text>

            <KeyboardAvoidingView style={styles.inputView}>
                <TextInput style={styles.inputField} placeholder='Email' autoCorrect={false} autoCapitalize='none' value={userId} onChangeText={(userId) => setUserId(userId)}/>
                <TextInput style={styles.inputField} placeholder='Password' secureTextEntry autoCorrect={false} autoCapitalize='none' value={userPassword} onChangeText={(userPassword) => setUserPassword(userPassword)} />
            </KeyboardAvoidingView>

            <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.textBasic('#FFFFFF',SIZES.medium+2)}>Login</Text>
            </Pressable>

            <View style={styles.footer}>
                <Text style={styles.textBasic('black',SIZES.medium)}>Don't have an account?</Text>
                <Pressable style={{padding:5}} onPress={() => {router.push('/login/signUp')}}>
                    <Text style={styles.textBasic('#9066ee',SIZES.small)}>Signup</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#FFFFFF',
        padding:SIZES.medium,
        alignItems:'center'
    },
    image: {
        marginTop:50,
        marginBottom:-40,
        height:200,
    },
    headingText: {
        fontSize: SIZES.xLarge,
        fontFamily: FONT.medium,
        color: '#545454',
        paddingBottom:SIZES.large,
        textAlign:'center'
    },
    textBasic: (textColor, textSize) => ({
        fontSize:textSize,
        fontFamily: FONT.bold,
        color:textColor
    }),
    inputView: {
        paddingVertical:SIZES.medium,
        marginTop:30,
        width:'100%'
    },
    inputField: {
        fontFamily: FONT.regular,
        padding:SIZES.medium,
        marginBottom:10,
        borderWidth:1,
        borderColor:'black',
        borderRadius:50,
        
    },
    loginButton: {
        backgroundColor: "#7accb8",
        alignItems: 'center',
        borderRadius: 50,
        padding:SIZES.large,
        width:'40%'
    },
    footer: {
        backgroundColor:'white',
        alignItems:'center',
        width:'100%',
        marginTop:'auto',
        paddingBottom:15
    }
});

export default Login;