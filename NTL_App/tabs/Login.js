import * as React from "react";
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; 
    }

    const handleLogin = () => {
        // Hardcoded credentials for now
        const validUsername = "a";
        const validPassword = "123";
        const validUsername2 = "b";
        const validPassword2 = "123";

        if (username === validUsername||validUsername2 && password === validPassword||validPassword2) {
            setError('');
            Alert.alert("Login Successful");
            onLogin();  
        } else {
            setError('Invalid username or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#000' style="light" />
            <View style={styles.header}>
                <Text style={styles.NTL}>Next Tech Lab</Text>
            </View>

            <View style={styles.card}>
                <Image source={require('../assets/download.png')} style={styles.img}/>
                <Text style={styles.headerText}>Login</Text>
                
                <TextInput
                    style={styles.input} 
                    placeholder="Email"
                    value={username}
                    onChangeText={setUsername}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'colomn',
        paddingHorizontal: 40,
        backgroundColor: '#000',
        width:'100%',
    },
    card:{
        backgroundColor: '#FFFFFF',
        padding: 60,
        flexDirection: 'column',
        alignItems: 'center',        
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 50,
        borderColor: '#000',
        borderWidth:1,
        marginTop:20,
        // width: '100%',
    },
    headerText: {
        fontSize: 28,
        fontFamily:'Poppins_600SemiBold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
        paddingTop:20,
    },
    NTL:{
        color:'#ffffff',
        fontSize: 25,
        fontFamily:'Poppins_600SemiBold',
        marginTop:12,
        marginLeft:20,
    },
    input: {
        width:'100%',
        height: 45,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 15,
        alignContent:'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
    },
    button: {
        height:'13%',
        width:'75%',
        alignItems:'center',
        backgroundColor:'#000',
        padding:10,
        marginTop:15,
        borderRadius:10,
    },
    buttonText: {
        color:'#ffffff',
        fontFamily:'Poppins_600SemiBold',
        fontSize:18,
        alignItems:'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        textAlign: 'center',
    },
    img:{
        // width: 200,
        // height: 200,
        // borderRadius: 75,
        minWidth:120,
        maxWidth:120,
        minHeight:120,
        maxHeight:120,
    },
    header: {
        height: 115,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 32,
        marginLeft:60,
    },
    headertext: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Quicksand_600SemiBold',
    },
    logo: {
        width: 55,
        height: 55,
    },
});