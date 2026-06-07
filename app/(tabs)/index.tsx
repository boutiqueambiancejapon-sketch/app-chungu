import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDrawer } from '../../src/components/navigation/DrawerContext';
import { useAppStore } from '../../src/store/useAppStore';
import { useColors } from '../../src/design/useColors';
import { YunaAvatar } from '../../src/components/yuna/YunaAvatar';
import { TopBar } from '../../src/components/ui/TopBar';
import { EyebrowText } from '../../src/components/ui/EyebrowText';
import { SMCard } from '../../src/components/ui/SMCard';
import { gradients, sp, r, palette } from '../../src/design/tokens';

const SUGGESTIONS = [
  'Que faire ce soir à Hongdae ?',
  'Un resto pas cher près de moi',
  'Comment recharger ma T-money ?',
  'Étiquette à table en Corée',
];

const TODAY_ITEMS = [
  { title: 'Marché de nuit',  sub: 'Gwangjang · street food', tag: 'CE SOIR',    accent: '#D47850' },
  { title: 'Bukchon Hanok',   sub: 'Village traditionnel',    tag: 'MATIN',      accent: '#C99A4E' },
  { title: 'Café à Seongsu', sub: 'Le « Brooklyn » de Séoul', tag: 'APRÈS-MIDI', accent: '#F0407E' },
];

const QUICK_TOOLS = [
  { icon: 'cash-outline',       label: 'Convertir', sub: 'KRW / €' },
  { icon: 'train-outline',      label: 'Métro',     sub: 'Séoul'   },
  { icon: 'chatbubble-outline', label: 'Phrases',   sub: 'FR · 한국어' },
];

export default function HomeScreen() {
  const c = useColors();
  const { isDayMode, toggleTheme } = useAppStore();
  const { openDrawer } = useDrawer();
  const router = useRouter();

  return (
    <View style={[styles.root, { backgroundColor: c.bg }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        <TopBar
          place="Séoul" subtitle={isDayMode ? '14:20 · 24° ensoleilé' : '21:40 · 18° clair'}
          onMenu={openDrawer} onTheme={toggleTheme} isDayMode={isDayMode}
        />

        {/* Greeting */}
        <View style={{ paddingHorizontal: sp.md, marginBottom: sp.lg }}>
          <Text style={[styles.greetingKo, { color: c.text3 }]}>
            안녕하세요 · Annyeonghaseyo
          </Text>
          <Text style={[styles.greetingMain, { color: c.text }]}>
            {isDayMode ? 'Bonjour Mathias,' : 'Bonsoir Mathias,'}
          </Text>
          <Text style={[styles.greetingItalic, { color: c.terra }]}>
            {isDayMode ? 'on explore quoi ?' : 'prêt pour ce soir ?'}
          </Text>
        </View>

        {/* Yuna Bar */}
        <TouchableOpacity style={{ paddingHorizontal: sp.md, marginBottom: sp.md }}
          onPress={() => router.push('/yuna')} activeOpacity={0.85}>
          <SMCard style={{ overflow: 'hidden' }} padding={0}>
            <LinearGradient colors={gradients.neonSoft}
              style={[styles.yunaBarInner, { borderRadius: r.card }]}>
              <YunaAvatar size={46} />
              <View style={{ flex: 1, marginLeft: sp.md }}>
                <Text style={[styles.yunaName, { color: c.text }]}>Demande à Yuna</Text>
                <Text style={[styles.yunaSub, { color: c.text3 }]}>Ton amie locale, jour & nuit</Text>
              </View>
              <View style={[styles.neonBtn, { backgroundColor: palette.neonRose }]}>
                <Ionicons name="mic" size={18} color="#fff" />
              </View>
            </LinearGradient>
          </SMCard>
        </TouchableOpacity>

        {/* Suggestion chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: sp.lg }}>
          <View style={{ flexDirection: 'row', gap: sp.sm, paddingHorizontal: sp.md }}>
            {SUGGESTIONS.map(s => (
              <TouchableOpacity key={s}
                style={[styles.chip, { backgroundColor: c.surface2, borderColor: c.hairline }]}
                onPress={() => router.push('/yuna')} activeOpacity={0.7}>
                <Text style={[styles.chipText, { color: c.text2 }]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Trip progress */}
        <SMCard style={{ marginHorizontal: sp.md, overflow: 'hidden', marginBottom: sp.xl }} padding={0}>
          <View style={{ flexDirection: 'row' }}>
            <LinearGradient colors={gradients.terra} style={styles.tripImg} />
            <View style={styles.tripInfo}>
              <EyebrowText text="TON VOYAGE · JOUR 2 / 6" color={c.terra} />
              <Text style={[styles.tripTitle, { color: c.text }]}>Corée — Printemps 2026</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <View style={[styles.dot, { backgroundColor: c.gold }]} />
                <Text style={[styles.tripNext, { color: c.text2 }]} numberOfLines={1}>
                  Prochaine : Palais Gyeongbokgung
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.progressBg, { backgroundColor: c.surface3 }]}>
            <LinearGradient colors={gradients.neon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: '34%' }]} />
          </View>
        </SMCard>

        {/* Today section */}
        <View style={{ marginBottom: sp.xl }}>
          <View style={[styles.sectionHeader, { paddingHorizontal: sp.md, marginBottom: sp.md }]}>
            <View>
              <EyebrowText text="Pour toi, maintenant" />
              <Text style={[styles.sectionTitle, { color: c.text }]}>Aujourd'hui</Text>
            </View>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Text style={[{ fontSize: 13, fontWeight: '700', color: c.terra }]}>Tout voir</Text>
              <Ionicons name="chevron-forward" size={12} color={c.terra} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: sp.md, paddingHorizontal: sp.md }}>
              {TODAY_ITEMS.map(item => (
                <View key={item.title} style={styles.todayCard}>
                  <LinearGradient colors={[item.accent + '99', item.accent]}
                    style={StyleSheet.absoluteFillObject} />
                  <View style={styles.todayTag}>
                    <Text style={styles.todayTagText}>{item.tag}</Text>
                  </View>
                  <View style={styles.todayInfo}>
                    <Text style={styles.todayTitle}>{item.title}</Text>
                    <Text style={styles.todaySub}>{item.sub}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick tools */}
        <View style={{ flexDirection: 'row', gap: sp.sm, paddingHorizontal: sp.md, marginBottom: sp.xl }}>
          {QUICK_TOOLS.map(tool => (
            <SMCard key={tool.label} style={{ flex: 1 }}>
              <View style={[styles.toolIcon, { backgroundColor: c.terraTint }]}>
                <Ionicons name={tool.icon as any} size={18} color={c.terraDeep} />
              </View>
              <Text style={[styles.toolLabel, { color: c.text }]}>{tool.label}</Text>
              <Text style={[styles.toolSub, { color: c.text3 }]}>{tool.sub}</Text>
            </SMCard>
          ))}
        </View>

        {/* Editorial card */}
        <View style={[styles.editorial, { marginHorizontal: sp.md }]}>
          <LinearGradient colors={gradients.night} style={StyleSheet.absoluteFillObject} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.75)']}
            style={StyleSheet.absoluteFillObject} />
          <View style={{ padding: sp.lg }}>
            <EyebrowText text="Le dossier Chingu" color="rgba(255,255,255,0.85)" />
            <Text style={styles.editorialTitle}>{'48 h à Busan, entre\nmer & marchés'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: sp.sm }}>
              <Text style={styles.editorialLink}>Lire le guide</Text>
              <Ionicons name="arrow-forward" size={13} color="#fff" />
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  greetingKo: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6 },
  greetingMain: { fontSize: 32, fontWeight: '500' },
  greetingItalic: { fontSize: 32, fontStyle: 'italic', fontWeight: '500' },
  yunaBarInner: { flexDirection: 'row', alignItems: 'center', padding: sp.md, height: 76 },
  yunaName: { fontSize: 15, fontWeight: '700', marginBottom: 3 },
  yunaSub: { fontSize: 13 },
  neonBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  chip: { paddingHorizontal: sp.md, paddingVertical: 9, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: '600' },
  tripImg: { width: 108, height: 108 },
  tripInfo: { flex: 1, padding: 14, justifyContent: 'center' },
  tripTitle: { fontSize: 15, fontWeight: '700', marginTop: 3 },
  tripNext: { fontSize: 12.5, flex: 1 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  progressBg: { height: 4 },
  progressFill: { height: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginTop: 3 },
  todayCard: { width: 200, height: 155, borderRadius: r.card, overflow: 'hidden', justifyContent: 'flex-end' },
  todayTag: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.35)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  todayTagText: { color: '#fff', fontSize: 9.5, fontWeight: '800', letterSpacing: 0.5 },
  todayInfo: { padding: sp.md },
  todayTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  todaySub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  toolIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  toolLabel: { fontSize: 13.5, fontWeight: '700' },
  toolSub: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3, marginTop: 2 },
  editorial: { height: 215, borderRadius: r.lg, overflow: 'hidden', justifyContent: 'flex-end' },
  editorialTitle: { color: '#fff', fontSize: 24, fontWeight: '500', marginTop: 8, lineHeight: 30 },
  editorialLink: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
