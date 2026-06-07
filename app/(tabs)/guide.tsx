import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../src/components/ui/TopBar';
import { EyebrowText } from '../../src/components/ui/EyebrowText';
import { SMCard } from '../../src/components/ui/SMCard';
import { useDrawer } from '../../src/components/navigation/DrawerContext';
import { useAppStore } from '../../src/store/useAppStore';
import { useColors } from '../../src/design/useColors';
import { sp, r } from '../../src/design/tokens';

const CITIES = [
  { name: 'Séoul',    sub: '10 M hab. · capitale',    accent: '#D47850', tag: 'TOP'     },
  { name: 'Busan',    sub: 'Mer & street food',        accent: '#4169E1', tag: 'PLAGE'   },
  { name: 'Gyeongju', sub: 'Capitale historique',      accent: '#C99A4E', tag: 'CULTURE' },
  { name: 'Jeju',    sub: 'Île volcanique & nature',   accent: '#3CB371', tag: 'NATURE'  },
];

const NEIGHBORHOODS = [
  { name: 'Hongdae',    sub: 'Art, fêtes, jeunesse' },
  { name: 'Gangnam',    sub: 'K-pop, luxe, malls'   },
  { name: 'Insadong',   sub: 'Artisanat & tradition' },
  { name: 'Seongsu',    sub: 'Cafés & créateurs'     },
  { name: 'Itaewon',    sub: 'International & LGBTQ+'},
  { name: 'Myeongdong', sub: 'Shopping & cosmétiques'},
];

export default function GuideScreen() {
  const c = useColors();
  const { isDayMode, toggleTheme } = useAppStore();
  const { openDrawer } = useDrawer();

  return (
    <View style={[{ flex: 1, backgroundColor: c.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <TopBar place="Guide Corée" subtitle="Explore & découvre"
          onMenu={openDrawer} onTheme={toggleTheme} isDayMode={isDayMode} />
        <View style={{ paddingHorizontal: sp.md, marginBottom: sp.lg }}>
          <Text style={[styles.h1, { color: c.text }]}>Explorer</Text>
          <Text style={[styles.h1i, { color: c.terra }]}>la Corée du Sud.</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: sp.md, paddingHorizontal: sp.md }}>
            {CITIES.map(city => (
              <TouchableOpacity key={city.name} style={[styles.cityCard, { overflow: 'hidden' }]} activeOpacity={0.85}>
                <LinearGradient colors={[city.accent + 'CC', city.accent + '88']} style={StyleSheet.absoluteFillObject} />
                <View style={styles.cityTag}><Text style={styles.cityTagTxt}>{city.tag}</Text></View>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.citySub}>{city.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{ marginTop: sp.xl, paddingHorizontal: sp.md }}>
          <EyebrowText text="Quartiers de Séoul" />
          <Text style={[styles.secTitle, { color: c.text }]}>Quartier par quartier</Text>
          <View style={{ gap: sp.sm, marginTop: sp.md }}>
            {NEIGHBORHOODS.map(n => (
              <SMCard key={n.name}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.nIcon, { backgroundColor: c.terraTint }]}>
                    <Ionicons name="location" size={18} color={c.terra} />
                  </View>
                  <View style={{ marginLeft: sp.md, flex: 1 }}>
                    <Text style={[styles.nName, { color: c.text }]}>{n.name}</Text>
                    <Text style={[styles.nSub, { color: c.text3 }]}>{n.sub}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={c.text3} />
                </View>
              </SMCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 30, fontWeight: '500' },
  h1i: { fontSize: 30, fontStyle: 'italic', fontWeight: '500' },
  cityCard: { width: 160, height: 140, borderRadius: r.card, padding: sp.md, justifyContent: 'flex-end' },
  cityTag: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8 },
  cityTagTxt: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  cityName: { color: '#fff', fontSize: 18, fontWeight: '700' },
  citySub: { color: 'rgba(255,255,255,0.85)', fontSize: 11.5, marginTop: 2 },
  secTitle: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  nIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  nName: { fontSize: 15, fontWeight: '700' },
  nSub: { fontSize: 12, marginTop: 2 },
});
