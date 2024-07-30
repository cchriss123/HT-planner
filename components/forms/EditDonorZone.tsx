// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { DonorZone, useAppState } from "@/state/Store";
// import FormStyles from "@/components/forms/styles/FormStyles";
//
//
//
// interface EditDonorZoneProps {
//     zones: DonorZone[];
//     zone: DonorZone;
// }
//
// interface EditZoneArgs {
//     name: string;
//     caliber: string;
//     fuPerCm2: string;
//     hairsPerCm2: string;
//     area: string;
//     desiredCoverageValue: string;
//     // zones: DonorZone[];
// }
//
// function EditDonorZone({zones, zone}: EditDonorZoneProps) {
//
//     const [name, setName] = React.useState(zone.name);
//     const [caliber, setCaliber] = React.useState(zone.caliber.toString());
//     const [fuPerCm2, setFuPerCm2] = React.useState(zone.fuPerCm2.toString());
//     const [hairsPerCm2, setHairsPerCm2] = React.useState(zone.hairPerCm2.toString());
//     const [area, setArea] = React.useState(zone.area.toString());
//     const { calculateDonorZoneValues } = useAppState();
//     const [desiredCoverageValue, setDesiredCoverageValue] = React.useState(zone.desiredCoverageValue.toString());
//     const [message, setMessage] = React.useState('');
//     const replaceCommaWithDot = (value: string) => value.replace(',', '.');
//
//     const {styles, theme} = FormStyles();
//
//
//
//
//
// }
//
//
//
//
//
//
//
//
