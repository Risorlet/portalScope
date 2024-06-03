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
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { COLORS, SHADOWS, SIZES, FONT } from '../../constants';
import DropdownAlert, 
{
    DropdownAlertData,
    DropdownAlertType,
} from 'react-native-dropdownalert';

const logo = require("../../assets/icons/portalscope.png");
let alert = (DropdownAlertData) => new Promise<DropdownAlertData>(res => res);

const Login = () => {

    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const options = {
        method: "POST",
        url: "http://192.168.49.252:8080/portalscope/users/login",

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
            if (error.response.status == 404){
                alert({
                    type: DropdownAlertType.Error,
                    title: 'Error',
                    message: 'No user found with the email entered.',
                });
            } else if (error.response.status == 401) {
                alert({
                    type: DropdownAlertType.Error,
                    title: 'Error',
                    message: 'Incorrect password entered.',
                });
            } else {
                alert({
                    type: DropdownAlertType.Error,
                    title: 'Error',
                    message: 'Something went wrong!',
                });
            }
        }
    }
    

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: false
                }}
            />
            <Image 
                style = {{
                    height: 150,
                    width: 150,
                    marginLeft:'auto',
                    marginRight:'auto',
                    top: 15
                }} 
                source={logo}
            />
            <Text style={styles.headingText}>Welcome to portalScope!</Text>

            <KeyboardAvoidingView>
                <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter your email address'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                                onChangeText={(email) => setUserId(email)}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Password</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordHidden}
                                style={{
                                    width: "100%"
                                }}
                                onChangeText={(pass) => setUserPassword(pass)}
                            />

                            <Pressable
                                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordHidden == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </Pressable>
                        </View>
                    </View>
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
            <DropdownAlert alert={func => (alert = func)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'#FFFFFF',
        padding: SIZES.medium,
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
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: "#7accb8",
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#7accb8",
        marginTop: 10
    },
    footer: {
        backgroundColor:'white',
        alignItems:'center',
        width:'100%',
        paddingBottom:15,
        marginTop: 'auto'
    }
});

export default Login;