import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useColors } from '../../design/useColors';

interface Props {
  text: string;
  color?: string;
}

export function EyebrowText({ text, color }: Props) {
  const c = useColors();
  return (
    <Text style={[styles.base, { color: color ?? c.text3 }]}>
      {text.toUpperCase()}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
