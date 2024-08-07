import Ionicons from "@expo/vector-icons/Ionicons";
import {Colors} from "@/constants/Colors";
import React, { useState, useRef, useEffect } from 'react';
import {Appearance, StyleSheet, Text, TouchableOpacity, View, FlatList, Image} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import { useAppState, Zone, DonorZone, RecipientZone } from "@/state/Store";
import AddZone from "@/components/forms/AddZone";
import EditDonorZone from "@/components/forms/EditZone";
import logoImg from '@/assets/images/logo.png';
import FontAwesome from "@expo/vector-icons/FontAwesome";



export default function IndexMenu() {

    const colorScheme = Appearance.getColorScheme();
    const styles = createStyles(colorScheme);
    const globalState = useAppState();


    return (
        <View>
            <TouchableOpacity
                style={styles.buttonReset}
                onPress={() => {
                    globalState.setDonorZones([]);
                    globalState.setRecipientZones([]);
                }


                }>
                <Ionicons name="refresh" size={24} color="white" />
                <Text style={styles.buttonText}>Reset Zones</Text>
            </TouchableOpacity>
        </View>

    );




}

function createStyles(colorScheme: "light" | "dark" | null | undefined) {
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return StyleSheet.create({
        buttonReset: {
            backgroundColor: colors.primaryBlue,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 5,
            margin: 5,
        },
        buttonText: {
            color: 'white',
            fontSize: 16,
            marginLeft: 5,
        },
    });
}