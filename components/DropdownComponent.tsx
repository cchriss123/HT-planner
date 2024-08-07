import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppState, DonorZone } from '@/state/Store';

export interface DropdownComponentProps {
  selectedZone: DonorZone | null;
  setSelectedZone: (zone: DonorZone | null) => void;
}

export function DropdownComponent({selectedZone, setSelectedZone}: DropdownComponentProps) {
  const zoneState = useAppState();
  const zones = zoneState.donorZones;

  function renderItem(zone: DonorZone) {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{zone.ip}</Text>
        {zone === selectedZone && (
            <AntDesign
                style={styles.icon}
                color="black"
                ip="check"
                size={20}
            />
        )}
      </View>
    );
  }

  return (
      <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={zones}
          maxHeight={400}
          labelField="ip"
          valueField="ip"
          placeholder="Select zone"
          value={selectedZone}

          onChange={z => setSelectedZone(zones.find(zone => zone === z) || null)}
          renderItem={renderItem}
      />
  );
}

const styles = StyleSheet.create({
  dropdown: {

    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    width: '100%',
    elevation: 5,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
