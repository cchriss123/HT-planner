import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppState, Zone } from '@/state/ZoneState';

export interface DropdownComponentProps {
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone | null) => void;
}

export function DropdownComponent({selectedZone, setSelectedZone}: DropdownComponentProps) {
  const zoneState = useAppState();
  const zones = zoneState.zones;

  function renderItem(zone: Zone) {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{zone.name}</Text>
        {zone === selectedZone && (
            <AntDesign
                style={styles.icon}
                color="black"
                name="check"
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
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder="Select zone"
          value={selectedZone}

          onChange={z => setSelectedZone(zones.find(zone => zone === z) || null)}
          renderItem={renderItem}
      />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: '100%',
    elevation: 2,
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
