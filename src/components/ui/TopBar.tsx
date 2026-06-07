import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../design/useColors';
import { sp } from '../../design/tokens';

interface Props {
  place: string;
  subtitle: string;
  onMenu: () => void;
  onTheme: () => void;
  isDayMode: boolean;
}

export function TopBar({ place, subtitle, onMenu, onTheme, isDayMode }: Props) {
  const c = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity onPress={onMenu} hitSlop={12} activeOpacity={0.7}>
        <Ionicons name="menu" size={26} color={c.text} />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text style={[styles.place, { color: c.text }]}>{place}</Text>
        <Text style={[styles.subtitle, { color: c.text3 }]}>{subtitle}</Text>
      </View>
      <TouchableOpacity onPress={onTheme} hitSlop={12} activeOpacity={0.7}>
        <Ionicons name={isDayMode ? 'moon' : 'sunny'} size={22} color={c.text2} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sp.md,
    paddingBottom: sp.md,
  },
  center: { flex: 1, alignItems: 'center' },
  place: { fontSize: 15, fontWeight: '700' },
  subtitle: { fontSize: 11, fontWeight: '500', marginTop: 1 },
});
