import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../../constants/Color';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from "../../components/common/Buttons/Button";
import { Stack, useRouter } from "expo-router";
import axios from 'axios';
import { ScrollView } from 'react-native-web';

const logo = require("../../assets/icons/portalscope.png")

const Signup = () => {
    const router = useRouter();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword,setUserPassword] = useState("");

    const options = {
        method: "POST",
        url: "http://localhost:8080/portalscope/users/register",

        data: {
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
            password: userPassword,
            isAdmin: false
        }
    };

    const handleSignUp = async () => {
        if(!isChecked){
            alert("You didn't agree with our terms and conditions!");
        } else {
            try {
                const response = await axios.request(options);
                if(response.status === 201) {
                    setRegistered(true);
                } else {
                    setRegistered(false);
                }
                console.log(response.data);
                console.log(registered);
                if(registered) {
                    router.push({
                        pathname:'/home/[id]',
                        params: {
                            id: response.data.id,
                            name: response.data.firstName
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerTitle: "Create New Account"
                }}
            />
            <ScrollView>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                
                <Image 
                    style = {{
                        height: 150,
                        width: 150,
                        marginLeft:'auto',
                        marginRight:'auto'
                    }} 
                    source={logo}
                />
                <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign:'center',
                        color: COLORS.black,
                        marginTop:-20
                    }}
                >portalScope</Text>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginTop: 12,
                        marginBottom: -5,
                        color: COLORS.black
                    }}>
                        Register with us!
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>First Name</Text>

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
                            placeholder='Enter your first name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text) => setFirstName(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Last Name</Text>

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
                            placeholder='Enter your last name'
                            placeholderTextColor={COLORS.black}
                            keyboardType='default'
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(text) => setLastName(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

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
                            onChangeText={(email) => setUserEmail(email)}
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
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            onChangeText={(pass) => setUserPassword(pass)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? "#7accb8" : undefined}
                    />

                    <Text>I aggree to the terms and conditions</Text>
                </View>

                <Button
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                    color = "#7accb8"
                    onPress = {handleSignUp}
                />

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account?</Text>
                    <Pressable
                        onPress={() => router.push('/login/login')}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: "#7accb8",
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Login</Text>
                    </Pressable>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Signup