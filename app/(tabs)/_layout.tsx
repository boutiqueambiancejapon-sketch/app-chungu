import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { CustomTabBar } from '../../src/components/navigation/CustomTabBar';
import { DrawerProvider } from '../../src/components/navigation/DrawerContext';
import { DrawerMenu } from '../../src/components/navigation/DrawerMenu';

export default function TabsLayout() {
  return (
    <DrawerProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen name="index"     options={{ title: 'Accueil' }} />
          <Tabs.Screen name="guide"     options={{ title: 'Guide' }} />
          <Tabs.Screen name="planner"   options={{ title: 'Itinéraire' }} />
          <Tabs.Screen name="tools"     options={{ title: 'Outils' }} />
          <Tabs.Screen name="souvenirs" options={{ title: 'Souvenirs' }} />
        </Tabs>
        <DrawerMenu />
      </View>
    </DrawerProvider>
  );
}
