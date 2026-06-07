import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useColors } from '../../design/useColors';
import { r, sp } from '../../design/tokens';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export function SMCard({ children, style, padding = sp.md }: Props) {
  const c = useColors();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: c.surface, borderColor: c.hairline, padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: r.card,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
});
