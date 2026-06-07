import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TopBar } from '../../src/components/ui/TopBar';
import { EyebrowText } from '../../src/components/ui/EyebrowText';
import { SMCard } from '../../src/components/ui/SMCard';
import { useDrawer } from '../../src/components/navigation/DrawerContext';
import { useAppStore } from '../../src/store/useAppStore';
import { useColors } from '../../src/design/useColors';
import { gradients, sp, r } from '../../src/design/tokens';

const MEMORIES = [
  { id: '1', title: 'Gyeongbokgung',    date: "Aujourd'hui · 10:23", accent: '#C99A4E' },
  { id: '2', title: 'Marché Gwangjang', date: 'Hier · 13:05',        accent: '#D47850' },
  { id: '3', title: 'Hangang Park',      date: 'Hier · 18:30',        accent: '#3CB371' },
];

export default function SouvenirsScreen() {
  const c = useColors();
  const { isDayMode, toggleTheme } = useAppStore();
  const { openDrawer } = useDrawer();

  return (
    <View style={[{ flex: 1, backgroundColor: c.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <TopBar place="Souvenirs" subtitle="Tes moments en Corée"
          onMenu={openDrawer} onTheme={toggleTheme} isDayMode={isDayMode} />
        <View style={{ paddingHorizontal: sp.md, marginBottom: sp.lg }}>
          <Text style={[styles.h1, { color: c.text }]}>Tes souvenirs,</Text>
          <Text style={[styles.h1i, { color: c.terra }]}>ton voyage.</Text>
        </View>

        {/* CTA */}
        <TouchableOpacity style={{ marginHorizontal: sp.md, marginBottom: sp.xl }} activeOpacity={0.85}>
          <LinearGradient colors={gradients.neonSoft}
            style={[styles.cta, { borderColor: c.hairlineStrong }]}>
            <View style={[styles.ctaIcon, { backgroundColor: c.surface2 }]}>
              <Ionicons name="camera" size={26} color={c.terra} />
            </View>
            <Text style={[styles.ctaTitle, { color: c.text }]}>Ajouter un souvenir</Text>
            <Text style={[styles.ctaSub, { color: c.text3 }]}>Photo, note ou lieu</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Memories */}
        <View style={{ paddingHorizontal: sp.md }}>
          <EyebrowText text="Récents" />
          <Text style={[styles.secTitle, { color: c.text }]}>Tes derniers moments</Text>
          <View style={{ gap: sp.sm, marginTop: sp.md }}>
            {MEMORIES.map(m => (
              <SMCard key={m.id}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: sp.md }}>
                  <LinearGradient colors={[m.accent, m.accent + '88']} style={styles.thumb} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.mTitle, { color: c.text }]}>{m.title}</Text>
                    <Text style={[styles.mDate, { color: c.text3 }]}>{m.date}</Text>
                  </View>
                  <Ionicons name="heart-outline" size={20} color={c.text3} />
                </View>
              </SMCard>
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={{ marginTop: sp.xl, paddingHorizontal: sp.md }}>
          <EyebrowText text="Ton voyage en chiffres" />
          <View style={{ flexDirection: 'row', gap: sp.sm, marginTop: sp.md }}>
            {[{ n: '12', l: 'Photos' }, { n: '5', l: 'Lieux visités' }, { n: '3', l: 'Jours restants' }].map(s => (
              <SMCard key={s.l} style={{ flex: 1, alignItems: 'center' }}>
                <Text style={[styles.statN, { color: c.terra }]}>{s.n}</Text>
                <Text style={[styles.statL, { color: c.text3 }]}>{s.l}</Text>
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
  cta: { borderRadius: r.card, borderWidth: 1, alignItems: 'center', padding: sp.xl },
  ctaIcon: { width: 64, height: 64, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: sp.md },
  ctaTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  ctaSub: { fontSize: 13 },
  secTitle: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  thumb: { width: 56, height: 56, borderRadius: 14 },
  mTitle: { fontSize: 15, fontWeight: '700' },
  mDate: { fontSize: 12, marginTop: 2 },
  statN: { fontSize: 28, fontWeight: '800' },
  statL: { fontSize: 12, marginTop: 2, textAlign: 'center' },
});
