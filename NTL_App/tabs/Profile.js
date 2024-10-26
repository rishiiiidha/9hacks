import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SettingsScreen({ onLogout }) {
    // Mock data for demonstration
    const userData = {
        full_name: "Asrith",
        role: "Associate",
        lab: "Norman Lab",
    };

    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Logout Cancelled'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await onLogout(); 
                        } catch (error) {
                            console.error('Error during logout:', error);
                        }
                    },
                },
            ],
            { cancelable: false } 
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={require('../assets/userimageNTL.jpg')} style={styles.img} />
                <Text style={styles.name}>{userData.full_name}</Text>
                <Text style={styles.mail}>{userData.role}</Text>
                <Text style={styles.mail}>{userData.lab}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.item} onPress={handleLogout}>
                    <Icon name="logout" size={22} color="#000" style={styles.icon} />
                    <Text style={styles.itemtext}>LogOut</Text>
                    <Icon name="chevron-right" style={styles.right} size={22} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor:'#ffffff'
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',        
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20,
        width: '90%',
        fontFamily: 'Poppins_500Medium',
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Poppins_500Medium',
    },
    mail: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Poppins_500Medium',
    },
    icon: {
        marginRight: 20,
        color: '#000',
        alignItems: 'center',
        paddingBottom: 5,
    },
    item: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
        padding: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignContent:'flex-end',
    },
    itemtext: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        flex: 1,
        fontFamily: 'Poppins_500Medium',
    }
});