import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { isPhone } from '@/constants/DeviceType';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const colors = theme === 'light' ? Colors.light : Colors.dark;
  const styles = createStyles(colors);

  return (
      <ThemedView style={[styles.container, { borderColor: colors.solidBackground }]}>
        <TouchableOpacity
            style={[styles.heading, { backgroundColor: colors.solidBackground }]}
            onPress={() => setIsOpen((value) => !value)}
            activeOpacity={0.8}>
          <Ionicons
              name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
              size={isPhone ? 18 : 22}
              color={theme === 'light' ? Colors.light.neutralGrey : Colors.dark.neutralGrey}
          />
          <ThemedText type="defaultSemiBold" style={styles.title}>{title}</ThemedText>
        </TouchableOpacity>
        {isOpen && (
            <ThemedView style={[styles.content, { backgroundColor: colors.solidBackground }]}>
              {children}
            </ThemedView>
        )}
      </ThemedView>
  );
}

function createStyles(colors: {
  themedGrey: string;
  primaryText: string;
  solidBackground: string;
  secondaryBlue: string;
  neutralGrey: string;
  softBackground: string;
  primaryBlue: string
}) {
  return StyleSheet.create({
    container: {
      borderRadius: 12,
      marginVertical: 10,
      overflow: 'hidden',
      backgroundColor: colors.solidBackground,
      borderWidth: 1,
      borderColor: colors.themedGrey,
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      padding: 10,
    },
    title: {
      fontSize: isPhone ? 16 : 20,
      color: colors.primaryText,
    },
    content: {
      marginTop: 6,
      padding: 10,
    },
  });
}
