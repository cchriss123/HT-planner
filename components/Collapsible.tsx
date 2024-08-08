import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const backgroundColor = theme === 'light' ? Colors.light.solidBackground : Colors.dark.solidBackground;

  return (
      <ThemedView style={[styles.container, { backgroundColor }]}>
        <TouchableOpacity
            style={[styles.heading, { backgroundColor }]}
            onPress={() => setIsOpen((value) => !value)}
            activeOpacity={0.8}>
          <Ionicons
              name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
              size={18}
              color={theme === 'light' ? Colors.light.neutralGrey : Colors.dark.neutralGrey}
          />
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </TouchableOpacity>
        {isOpen &&
            <ThemedView style={[styles.content, { backgroundColor }]}>
              {children}
            </ThemedView>}
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
  },
  content: {
    marginTop: 6,
    padding: 10,
  },
});
