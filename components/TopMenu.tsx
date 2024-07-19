import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TopMenu = () => {
    return (
        <View style={styles.topContainer}>
            <View style={{ borderColor: 'black', width: '60%', alignItems: 'center' }}>
                <Text>Menu Placeholder</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
        paddingHorizontal: '5%',
    },
    addMenuIcon: {
        fontSize: 50,
        color: 'grey',
    },
    editMenuIcon: {
        fontSize: 50,
        color: 'grey',
    },
    iconActive: {
        color: 'blue', // Change this to your active color
    },
});

export default TopMenu;
