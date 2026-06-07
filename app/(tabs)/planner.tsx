import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../src/components/ui/TopBar';
import { EyebrowText } from '../../src/components/ui/EyebrowText';
import { SMCard } from '../../src/components/ui/SMCard';
import { useDrawer } from '../../src/components/navigation/DrawerContext';
import { useAppStore } from '../../src/store/useAppStore';
import { useColors } from '../../src/design/useColors';
import { sp, r } from '../../src/design/tokens';

const ACTS = [
  { id: 'gyeong',    title: 'Palais Gyeongbokgung',  sub: 'Culture · 2 h',                 slot: 'Matin',      accent: '#C99A4E' },
  { id: 'bukchon',   title: 'Village Bukchon Hanok', sub: 'Balade · 1 h 30',               slot: 'Matin',      accent: '#D47850' },
  { id: 'gwangjang', title: 'Marché de Gwangjang',   sub: 'Street food · 1 h',             slot: 'Midi',       accent: '#D47850' },
  { id: 'seongsu',   title: 'Cafés de Seongsu',      sub: 'Détente · 2 h',                  slot: 'Après-midi', accent: '#F0407E' },
  { id: 'namsan',    title: 'N Seoul Tower',          sub: 'Panorama · coucher de soleil',  slot: 'Soir',       accent: '#8B45D6' },
  { id: 'hongdae',   title: 'Soirée à Hongdae',       sub: 'Vie nocturne · live',          slot: 'Soir',       accent: '#F0407E' },
];

const ORDER: Record<string, number> = { Matin: 0, Midi: 1, 'Après-midi': 2, Soir: 3 };

export default function PlannerScreen() {
  const c = useColors();
  const { isDayMode, toggleTheme } = useAppStore();
  const { openDrawer } = useDrawer();
  const [sel, setSel] = useState(new Set(['gyeong', 'gwangjang', 'seongsu', 'namsan']));

  const toggle = (id: string) => setSel(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const chosen = ACTS.filter(a => sel.has(a.id)).sort((a, b) => (ORDER[a.slot] ?? 0) - (ORDER[b.slot] ?? 0));

  return (
    <View style={[{ flex: 1, backgroundColor: c.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <TopBar place="Itinéraire" subtitle="Compose ta journée"
          onMenu={openDrawer} onTheme={toggleTheme} isDayMode={isDayMode} />
        <View style={{ paddingHorizontal: sp.md, marginBottom: sp.lg }}>
          <Text style={[styles.h1, { color: c.text }]}>Coche tes envies,</Text>
          <Text style={[styles.h1i, { color: c.terra }]}>je planifie le reste.</Text>
        </View>
        <View style={{ paddingHorizontal: sp.md, gap: sp.sm }}>
          {ACTS.map(a => {
            const active = sel.has(a.id);
            return (
              <TouchableOpacity key={a.id} onPress={() => toggle(a.id)} activeOpacity={0.8}>
                <SMCard style={[{ flexDirection: 'row', alignItems: 'center' }, active && { borderColor: a.accent }]}>
                  <View style={[styles.dot, { backgroundColor: active ? a.accent : c.surface3 }]}>
                    {active && <Ionicons name="checkmark" size={14} color="#fff" />}
                  </View>
                  <View style={{ flex: 1, marginLeft: sp.md }}>
                    <Text style={[styles.aTitle, { color: c.text }]}>{a.title}</Text>
                    <Text style={[styles.aSub, { color: c.text3 }]}>{a.sub}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: c.surface2 }]}>
                    <Text style={[styles.badgeTxt, { color: c.text3 }]}>{a.slot}</Text>
                  </View>
                </SMCard>
              </TouchableOpacity>
            );
          })}
        </View>
        {chosen.length > 0 && (
          <View style={{ marginTop: sp.xl, paddingHorizontal: sp.md }}>
            <EyebrowText text="Ta journée" />
            <Text style={[styles.secTitle, { color: c.text }]}>Ton programme</Text>
            <View style={{ marginTop: sp.md, gap: sp.sm }}>
              {chosen.map((a, i) => (
                <View key={a.id} style={{ flexDirection: 'row', gap: sp.md }}>
                  <View style={{ alignItems: 'center', width: 16, paddingTop: 18 }}>
                    <View style={[styles.tDot, { backgroundColor: a.accent }]} />
                    {i < chosen.length - 1 && <View style={[styles.tLine, { backgroundColor: c.hairline }]} />}
                  </View>
                  <SMCard style={{ flex: 1 }}>
                    <EyebrowText text={a.slot} color={a.accent} />
                    <Text style={[styles.aTitle, { color: c.text, marginTop: 3 }]}>{a.title}</Text>
                    <Text style={[styles.aSub, { color: c.text3 }]}>{a.sub}</Text>
                  </SMCard>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 30, fontWeight: '500' },
  h1i: { fontSize: 30, fontStyle: 'italic', fontWeight: '500' },
  dot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  aTitle: { fontSize: 15, fontWeight: '700' },
  aSub: { fontSize: 12, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  badgeTxt: { fontSize: 11, fontWeight: '600' },
  secTitle: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  tDot: { width: 12, height: 12, borderRadius: 6 },
  tLine: { flex: 1, width: 2, marginTop: 4 },
});
