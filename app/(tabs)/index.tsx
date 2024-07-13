import {StyleSheet, Text} from 'react-native';



// Appearance.getColorScheme = () => 'light';



export default function HomeScreen() {
  return (
      <Text>Home</Text>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
