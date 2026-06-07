import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette } from '../../design/tokens';

interface Props {
  size?: number;
  showRing?: boolean;
}

export function YunaAvatar({ size = 40, showRing = true }: Props) {
  const innerSize = showRing ? size - 4 : size;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {showRing && (
        <LinearGradient
          colors={gradients.neon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.ring, { width: size, height: size, borderRadius: size / 2 }]}
        />
      )}
      <LinearGradient
        colors={[palette.night.terra, '#6B1840']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.inner,
          {
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            position: showRing ? 'absolute' : 'relative',
          },
        ]}
      >
        <Text style={[styles.letter, { fontSize: size * 0.38 }]}>유</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    shadowColor: palette.neonRose,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
  },
  inner: { alignItems: 'center', justifyContent: 'center' },
  letter: { color: '#fff', fontWeight: '700' },
});
