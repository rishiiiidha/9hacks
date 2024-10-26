import * as React from 'react';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Homescreen from './Home';
import ProfileScreen from './Profile';
import InsightsScreen from './Insights';
import ProjectScreen from './Projects';
import LoginScreen from './Login';
import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { Quicksand_500Medium, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Header() {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image 
                    source={require('../assets/download (1).png')}
                    style={styles.logo2}
                />
            </TouchableOpacity>
            <Text style={styles.headertext}>Asrith</Text>
            <Image 
                source={require('../assets/download.png')}
                style={styles.logo}
            />
        </View>
    );
}

function Layout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handling login
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Handling logout
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const backgroundColor = '#000';

    const renderScreens = () => (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor }}>
            <StatusBar backgroundColor={backgroundColor} style="light" />
            <Header />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveBackgroundColor: backgroundColor,
                    tabBarInactiveBackgroundColor: backgroundColor,
                    tabBarActiveTintColor: '#ffffff',
                    tabBarInactiveTintColor: '#ffffff', 
                    tabBarStyle: { height: 65, width: '100%' },
                    tabBarLabelStyle: { fontFamily: 'Poppins_500Medium', fontSize: 14 },
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Insights') {
                            iconName = focused ? 'analytics' : 'analytics-outline';
                        } else if (route.name === 'Projects') {
                            iconName = focused ? 'folder' : 'folder-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }
                        return <Ionicons name={iconName} size={28} color={'#ffffff'} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={Homescreen} />
                <Tab.Screen name="Insights" component={InsightsScreen} />
                <Tab.Screen name="Projects" component={ProjectScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </KeyboardAvoidingView>
    );

    return (
        <View style={{ flex: 1 }}>
            {isLoggedIn ? renderScreens() : <LoginScreen onLogin={handleLogin} />}
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Layout />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 102,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop:8,
        paddingTop: 35,
    },
    headertext: {
        color: '#000',
        fontSize: 18,
        marginLeft:-180,
        marginTop:4,
        fontFamily: 'Quicksand_600SemiBold',
    },
    logo: {
        width: 60,
        height: 60,
        marginTop:20,
        paddingBottom:1,
    },
    logo2: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop:10,
    },
});
