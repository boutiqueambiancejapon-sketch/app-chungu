import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '../../design/useColors';
import { sp } from '../../design/tokens';

const TABS = [
  { name: 'index',     icon: 'home',     iconOut: 'home-outline',     label: 'Accueil'    },
  { name: 'guide',     icon: 'map',      iconOut: 'map-outline',      label: 'Guide'      },
  { name: 'planner',   icon: 'calendar', iconOut: 'calendar-outline', label: 'Itinéraire' },
  { name: 'tools',     icon: 'build',    iconOut: 'build-outline',    label: 'Outils'     },
  { name: 'souvenirs', icon: 'camera',   iconOut: 'camera-outline',   label: 'Souvenirs'  },
] as const;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const c = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: c.surface,
          borderTopColor: c.hairline,
          paddingBottom: insets.bottom + 6,
        },
      ]}
    >
      {TABS.map((tab, i) => {
        const focused = state.index === i;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={(focused ? tab.icon : tab.iconOut) as any}
              size={22}
              color={focused ? c.terra : c.text3}
            />
            <Text
              style={[
                styles.label,
                { color: focused ? c.terra : c.text3, fontWeight: focused ? '700' : '400' },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: sp.sm + 2,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 10, letterSpacing: 0.1 },
});
