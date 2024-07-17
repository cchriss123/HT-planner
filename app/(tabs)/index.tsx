import {Appearance, StyleSheet, Text, View} from 'react-native';



Appearance.getColorScheme = () => 'light';



export default function HomeScreen() {
  return (
     <View style={styles.outerContainer}>
       <Text>Home Screen</Text>
     </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
  },
});
