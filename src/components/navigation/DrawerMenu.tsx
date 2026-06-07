import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Animated,
  Pressable, StyleSheet, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDrawer } from './DrawerContext';
import { useAppStore } from '../../store/useAppStore';
import { useColors } from '../../design/useColors';
import { gradients, sp, r } from '../../design/tokens';

const DRAWER_WIDTH = Math.min(Dimensions.get('window').width * 0.82, 330);

const NAV_ITEMS = [
  { icon: 'home',     label: 'Accueil',        route: '/(tabs)/' },
  { icon: 'map',      label: 'Guide Corée',    route: '/(tabs)/guide' },
  { icon: 'calendar', label: 'Mon itinéraire', route: '/(tabs)/planner' },
  { icon: 'build',    label: 'Outils',          route: '/(tabs)/tools' },
  { icon: 'camera',   label: 'Souvenirs',       route: '/(tabs)/souvenirs' },
] as const;

export function DrawerMenu() {
  const { isOpen, closeDrawer } = useDrawer();
  const { isDayMode, toggleTheme } = useAppStore();
  const c = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: isOpen ? 0 : -DRAWER_WIDTH,
        damping: 20, stiffness: 200, useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 250, useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      <Animated.View style={[styles.scrim, { opacity: overlayOpacity }]}>
        <Pressable style={StyleSheet.absoluteFillObject} onPress={closeDrawer} />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          { width: DRAWER_WIDTH, backgroundColor: c.bg, borderRightColor: c.hairline,
            transform: [{ translateX }] },
        ]}
      >
        {/* Profile header */}
        <LinearGradient colors={gradients.neonSoft}
          style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <LinearGradient colors={gradients.neon} style={styles.avatarRing}>
            <View style={[styles.avatarInner, { backgroundColor: c.surface3 }]}>
              <Text style={[styles.avatarLetter, { color: c.text }]}>M</Text>
            </View>
          </LinearGradient>
          <View style={{ marginLeft: sp.md }}>
            <Text style={[styles.userName, { color: c.text }]}>Mathias</Text>
            <Text style={[styles.userSub, { color: c.text3 }]}>Voyageur · 1er voyage</Text>
          </View>
        </LinearGradient>

        {/* Navigation */}
        <View style={styles.nav}>
          {NAV_ITEMS.map(item => (
            <TouchableOpacity key={item.route} style={[styles.navItem, { borderRadius: r.md }]}
              onPress={() => { router.push(item.route as any); closeDrawer(); }} activeOpacity={0.7}>
              <Ionicons name={item.icon as any} size={20} color={c.text2} style={{ width: 26 }} />
              <Text style={[styles.navLabel, { color: c.text }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <View style={[styles.divider, { backgroundColor: c.hairline }]} />

          <TouchableOpacity style={[styles.navItem, { borderRadius: r.md }]} onPress={toggleTheme} activeOpacity={0.7}>
            <Ionicons name={isDayMode ? 'moon' : 'sunny'} size={20} color={c.text2} style={{ width: 26 }} />
            <Text style={[styles.navLabel, { color: c.text }]}>
              {isDayMode ? 'Mode nuit' : 'Mode jour'}
            </Text>
            <Text style={[styles.navBadge, { color: c.terra }]}>
              {isDayMode ? 'Seoul by night' : 'Hanji'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Premium card */}
        <View style={styles.premiumWrap}>
          <LinearGradient colors={gradients.neon} style={styles.premiumCard}>
            <View style={styles.premiumCircle} />
            <View style={styles.premiumRow}>
              <Ionicons name="star" size={16} color="#fff" />
              <Text style={styles.premiumTitle}>Chingu+</Text>
            </View>
            <Text style={styles.premiumBody}>
              Yuna illimitée, guides hors-ligne & itinéraires multi-villes.
            </Text>
            <TouchableOpacity style={styles.premiumBtn} activeOpacity={0.85}>
              <Text style={[styles.premiumBtnText, { color: '#8B45D6' }]}>
                Essayer · 1 mois offert
              </Text>
            </TouchableOpacity>
            <Text style={styles.premiumFine}>puis 4,99 €/mois · sans engagement</Text>
          </LinearGradient>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  panel: { position: 'absolute', top: 0, bottom: 0, left: 0, borderRightWidth: StyleSheet.hairlineWidth },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp.md, paddingBottom: sp.lg },
  avatarRing: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  avatarInner: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { fontSize: 20, fontWeight: '700' },
  userName: { fontSize: 17, fontWeight: '700' },
  userSub: { fontSize: 12, marginTop: 2 },
  nav: { flex: 1, paddingHorizontal: sp.sm, paddingTop: sp.sm },
  navItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp.md, paddingVertical: 13, gap: sp.md },
  navLabel: { fontSize: 15.5, fontWeight: '600', flex: 1 },
  navBadge: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
  divider: { height: 1, marginVertical: sp.sm, marginHorizontal: sp.sm },
  premiumWrap: { padding: sp.md, paddingBottom: sp.lg },
  premiumCard: { borderRadius: r.lg, padding: sp.md, overflow: 'hidden' },
  premiumCircle: { position: 'absolute', width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.12)', top: -20, right: 20 },
  premiumRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: sp.sm },
  premiumTitle: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.3 },
  premiumBody: { color: 'rgba(255,255,255,0.92)', fontSize: 12.5, lineHeight: 18, marginBottom: sp.md },
  premiumBtn: { backgroundColor: '#fff', borderRadius: 20, paddingVertical: 11, alignItems: 'center', marginBottom: 8 },
  premiumBtnText: { fontSize: 14, fontWeight: '700' },
  premiumFine: { color: 'rgba(255,255,255,0.75)', fontSize: 10, textAlign: 'center' },
});
