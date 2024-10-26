import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Button, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install this package

export default function InsightsScreen() {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [monthData, setMonthData] = useState('');
    const [loading, setLoading] = useState(false);

    const months = ['September', 'November', 'January'];

    // Function to fetch data for the selected month from the API
    const fetchMonthData = async (month) => {
        setLoading(true);
        try {
            // Hardcoded data for August
            if (month === 'September') {
                const hardcodedData = {
                    review: "Have a increasing learning curve, maintain that and also...",
                    performance: 3,
                    date: "13-09-2024",
                };
                setMonthData(hardcodedData);
            } else {
                // Fetch data for other months
                const response = await fetch(`https://example.com/api/data?month=${month}`);
                if (response.ok) {
                    const data = await response.json();
                    setMonthData(data.details);
                } else {
                    setMonthData({ review: 'No data available for this month.', performance: 0 });
                }
            }
        } catch (error) {
            console.error('Error fetching month data:', error);
            setMonthData({ review: 'Failed to retrieve data. Please try again later.', performance: 0 });
        } finally {
            setLoading(false);
        }
    };

    // Trigger the data fetch when a month is selected
    const handleMonthPress = (month) => {
        setSelectedMonth(month);
        setModalVisible(true);
        fetchMonthData(month);
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, index) => (
            <FontAwesome key={index} name="star" size={20} color={index < count ? '#FFD700' : '#ccc'} />
        ));
    };

    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {months.map((month, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.monthCard, selectedMonth === month && styles.selectedMonthCard]} 
                        onPress={() => handleMonthPress(month)}
                    >
                        <Text style={[styles.monthText, selectedMonth === month && styles.selectedMonthText]}>
                            {month}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedMonth}'s CheckIn</Text>
                        {loading ? (
                            <ActivityIndicator size="large" color="#000" />
                        ) : (
                            <>
                                {selectedMonth === 'September' ? (
                                    <>
                                        <Text style={styles.modalText}>Review: {monthData.review}</Text>
                                        <Text style={styles.modalText}>Performance: {renderStars(monthData.performance)}</Text>
                                        <Text style={styles.modalText}>Date: {monthData.date}</Text>
                                    </>
                                ) : (
                                    <Text style={styles.modalText}>{monthData.review}</Text>
                                )}
                            </>
                        )}
                        <Button 
                            title="Close" 
                            onPress={() => setModalVisible(false)} 
                            color="#000"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    monthCard: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    selectedMonthCard: {
        backgroundColor: '#000', 
    },
    monthText: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'Poppins_500Medium',
    },
    selectedMonthText: {
        color: '#fff', 
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'Poppins_500Medium',
        color: '#000',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    button:{
      borderRadius:10,
    }
});
