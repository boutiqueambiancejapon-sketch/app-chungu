import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../src/components/ui/TopBar';
import { EyebrowText } from '../../src/components/ui/EyebrowText';
import { SMCard } from '../../src/components/ui/SMCard';
import { useDrawer } from '../../src/components/navigation/DrawerContext';
import { useAppStore } from '../../src/store/useAppStore';
import { useColors } from '../../src/design/useColors';
import { sp, r } from '../../src/design/tokens';

const EUR_TO_KRW = 1452;

const PHRASES = [
  { fr: 'Bonjour',                    kr: '안녕하세요', ro: 'annyeonghaseyo' },
  { fr: 'Merci',                       kr: '감사합니다',  ro: 'gamsahamnida'  },
  { fr: "L'addition s'il vous plaît", kr: '계산서 주세요', ro: 'gyesanseo juseyo' },
  { fr: 'C’était délicieux',            kr: '잘 먹었습니다', ro: 'jal meogeotseumnida' },
  { fr: 'À l’aide !',                   kr: '도와주세요!',  ro: 'dowajuseyo'    },
];

const EXTRAS = [
  { icon: 'partly-sunny',   label: 'Météo 7 j',  sub: 'Séoul · 24°'       },
  { icon: 'shirt-outline',  label: 'Tailles',     sub: 'FR ↔ KR'           },
  { icon: 'medical-outline',label: 'Urgences',    sub: '112 · 119'         },
  { icon: 'wifi',           label: 'eSIM & wifi', sub: 'Rester connecté'   },
];

export default function ToolsScreen() {
  const c = useColors();
  const { isDayMode, toggleTheme } = useAppStore();
  const { openDrawer } = useDrawer();
  const [eur, setEur] = useState('20');
  const krw = Math.round((parseFloat(eur) || 0) * EUR_TO_KRW);
  const fmt = (n: number) => n.toLocaleString('fr-FR');

  return (
    <View style={[{ flex: 1, backgroundColor: c.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="interactive"
        contentContainerStyle={{ paddingBottom: 110 }}>
        <TopBar place="Outils" subtitle="Ta boîte à malice"
          onMenu={openDrawer} onTheme={toggleTheme} isDayMode={isDayMode} />
        <View style={{ paddingHorizontal: sp.md, marginBottom: sp.lg }}>
          <Text style={[styles.h1, { color: c.text }]}>Le pratique,</Text>
          <Text style={[styles.h1i, { color: c.terra }]}>sans prise de tête.</Text>
        </View>

        {/* Converter */}
        <SMCard style={{ marginHorizontal: sp.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: sp.md }}>
            <Text style={[styles.cardTitle, { color: c.text }]}>Convertisseur</Text>
            <Text style={[{ fontSize: 12, fontWeight: '600', color: c.text3 }]}>1 € ≈ {fmt(EUR_TO_KRW)} ₩</Text>
          </View>
          <View style={[styles.inputRow, { backgroundColor: c.surface2, borderColor: c.hairline }]}>
            <Text style={[styles.sym, { color: c.terra }]}>€</Text>
            <TextInput value={eur} onChangeText={setEur} keyboardType="decimal-pad"
              style={[styles.inp, { color: c.text }]} placeholder="0" placeholderTextColor={c.text3} />
            <Text style={[styles.code, { color: c.text3 }]}>EUR</Text>
          </View>
          <View style={{ alignItems: 'center', marginVertical: sp.sm }}>
            <Ionicons name="swap-vertical" size={22} color={c.text3} />
          </View>
          <View style={[styles.resRow, { backgroundColor: c.terraTint }]}>
            <Text style={[styles.sym, { color: c.terraDeep }]}>₩</Text>
            <Text style={[styles.resVal, { color: c.terraDeep }]}>{fmt(krw)}</Text>
            <Text style={[styles.code, { color: c.terraDeep }]}>KRW</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: sp.sm, marginTop: sp.md }}>
            {['10', '20', '50', '100'].map(v => (
              <TouchableOpacity key={v} onPress={() => setEur(v)} activeOpacity={0.7}
                style={[styles.qBtn, { backgroundColor: eur === v ? c.text : c.surface2, borderColor: c.hairline }]}>
                <Text style={[styles.qBtnTxt, { color: eur === v ? c.bg : c.text2 }]}>{v} €</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SMCard>

        {/* Phrases */}
        <View style={{ marginTop: sp.xl, paddingHorizontal: sp.md }}>
          <EyebrowText text="Se faire comprendre" />
          <Text style={[styles.secTitle, { color: c.text }]}>Phrases coréennes</Text>
          <View style={{ gap: sp.sm, marginTop: sp.md }}>
            {PHRASES.map(p => (
              <SMCard key={p.kr}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <EyebrowText text={p.fr} />
                    <Text style={[styles.korean, { color: c.text }]}>{p.kr}</Text>
                    <Text style={[styles.romaji, { color: c.text3 }]}>{p.ro}</Text>
                  </View>
                  <TouchableOpacity style={[styles.playBtn, { backgroundColor: c.terraTint, borderColor: c.hairline }]} activeOpacity={0.7}>
                    <Ionicons name="play" size={14} color={c.terra} />
                  </TouchableOpacity>
                </View>
              </SMCard>
            ))}
          </View>
        </View>

        {/* Extras */}
        <View style={{ marginTop: sp.xl, paddingHorizontal: sp.md }}>
          <EyebrowText text="Autres outils" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: sp.sm, marginTop: sp.md }}>
            {EXTRAS.map(e => (
              <SMCard key={e.label} style={{ width: '47%' }}>
                <View style={[styles.eIcon, { backgroundColor: c.goldTint }]}>
                  <Ionicons name={e.icon as any} size={20} color={c.goldDeep} />
                </View>
                <Text style={[styles.eLabel, { color: c.text }]}>{e.label}</Text>
                <Text style={[styles.eSub, { color: c.text3 }]}>{e.sub}</Text>
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
  cardTitle: { fontSize: 16, fontWeight: '700' },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: r.md, borderWidth: 1, paddingHorizontal: sp.md, paddingVertical: 14 },
  sym: { fontSize: 20, fontWeight: '800', marginRight: 8 },
  inp: { flex: 1, fontSize: 22, fontWeight: '700' },
  code: { fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  resRow: { flexDirection: 'row', alignItems: 'center', borderRadius: r.md, paddingHorizontal: sp.md, paddingVertical: 14 },
  resVal: { flex: 1, fontSize: 22, fontWeight: '800' },
  qBtn: { flex: 1, borderRadius: 20, borderWidth: 1, paddingVertical: 9, alignItems: 'center' },
  qBtnTxt: { fontSize: 13, fontWeight: '600' },
  secTitle: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  korean: { fontSize: 18, fontWeight: '700', marginTop: 4 },
  romaji: { fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  playBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  eIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  eLabel: { fontSize: 14.5, fontWeight: '700' },
  eSub: { fontSize: 11, marginTop: 2 },
});
