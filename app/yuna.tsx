import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../src/store/useAppStore';
import { useColors } from '../src/design/useColors';
import { YunaAvatar } from '../src/components/yuna/YunaAvatar';
import { SMCard } from '../src/components/ui/SMCard';
import { sendToYuna, ChatMessage } from '../src/services/yunaService';
import { gradients, sp, r } from '../src/design/tokens';

const SUGGESTIONS = [
  'Que faire ce soir à Hongdae ?',
  'Un resto pas cher près de moi',
  'Comment recharger ma T-money ?',
  'Étiquette à table en Corée',
];

interface Message { id: string; role: 'user' | 'yuna'; text: string; }

export default function YunaScreen() {
  const c = useColors();
  const { isDayMode, toggleTheme } = useAppStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([{
    id: '0', role: 'yuna',
    text: "Annyeong ! 안녕 ! Il est l'heure de découvrir Séoul. Tu veux une idée pour ce soir, ou un coup de main pratique ?",
  }]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setDraft('');
    setIsTyping(true);

    const history: ChatMessage[] = [...messages, userMsg]
      .filter(m => !(m.role === 'yuna' && m.id === '0'))
      .map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));

    try {
      const reply = await sendToYuna(history);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'yuna', text: reply }]);
    } catch (e) {
      const err = e instanceof Error ? e.message : 'Erreur inconnue';
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'yuna', text: `⚠️ ${err}` }]);
    } finally {
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  return (
    <View style={[styles.root, { backgroundColor: c.bg }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8, borderBottomColor: c.hairline }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12} activeOpacity={0.7}>
          <Ionicons name="chevron-down" size={26} color={c.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <YunaAvatar size={36} />
          <View style={{ marginLeft: 10 }}>
            <Text style={[styles.yunaName, { color: c.text }]}>Yuna</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={[styles.onlineDot, { backgroundColor: c.terra }]} />
              <Text style={[styles.onlineText, { color: c.terra }]}>en ligne · à Séoul</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={toggleTheme} hitSlop={12} activeOpacity={0.7}>
          <Ionicons name={isDayMode ? 'moon' : 'sunny'} size={22} color={c.text2} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView ref={scrollRef} style={{ flex: 1 }}
        contentContainerStyle={{ padding: sp.md, gap: sp.md }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {messages.map(msg =>
          msg.role === 'user' ? (
            <View key={msg.id} style={{ alignItems: 'flex-end' }}>
              <LinearGradient colors={gradients.neon} style={styles.userBubble}>
                <Text style={styles.userText}>{msg.text}</Text>
              </LinearGradient>
            </View>
          ) : (
            <View key={msg.id} style={styles.yunaRow}>
              <YunaAvatar size={30} showRing={false} />
              <SMCard style={styles.yunaBubble} padding={0}>
                <Text style={[styles.yunaText, { color: c.text }]}>{msg.text}</Text>
              </SMCard>
            </View>
          )
        )}
        {isTyping && (
          <View style={styles.yunaRow}>
            <YunaAvatar size={30} showRing={false} />
            <SMCard style={[styles.yunaBubble, { paddingHorizontal: 20, paddingVertical: 16 }]} padding={0}>
              <ActivityIndicator size="small" color={c.text3} />
            </SMCard>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {messages.length < 3 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={{ maxHeight: 44 }}
            contentContainerStyle={{ gap: sp.sm, paddingHorizontal: sp.md, paddingVertical: 6 }}>
            {SUGGESTIONS.map(s => (
              <TouchableOpacity key={s}
                style={[styles.chip, { backgroundColor: c.surface2, borderColor: c.hairline }]}
                onPress={() => send(s)} activeOpacity={0.7}>
                <Text style={[styles.chipText, { color: c.text2 }]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <View style={[styles.inputBar, { borderTopColor: c.hairline, paddingBottom: insets.bottom + 12 }]}>
          <View style={[styles.inputWrap, { backgroundColor: c.surface2, borderColor: c.hairline }]}>
            <TextInput value={draft} onChangeText={setDraft} placeholder="Écris à Yuna…"
              placeholderTextColor={c.text3} style={[styles.input, { color: c.text }]}
              onSubmitEditing={() => send(draft)} returnKeyType="send" multiline />
          </View>
          <TouchableOpacity style={{ opacity: draft.trim() ? 1 : 0.45 }}
            onPress={() => send(draft)} disabled={!draft.trim() || isTyping} activeOpacity={0.8}>
            <LinearGradient colors={gradients.neon} style={styles.sendBtn}>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: sp.md, paddingBottom: 12, borderBottomWidth: StyleSheet.hairlineWidth },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  yunaName: { fontSize: 15, fontWeight: '700' },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5 },
  onlineText: { fontSize: 11, fontWeight: '600' },
  userBubble: { maxWidth: '78%', borderRadius: 18, borderBottomRightRadius: 5, paddingHorizontal: 15, paddingVertical: 12 },
  userText: { color: '#fff', fontSize: 14.5, lineHeight: 20 },
  yunaRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 9 },
  yunaBubble: { flex: 1, maxWidth: '78%' },
  yunaText: { fontSize: 14.5, lineHeight: 22, padding: 15 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1 },
  chipText: { fontSize: 12.5, fontWeight: '600' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: sp.md, paddingTop: 12, gap: 9, borderTopWidth: StyleSheet.hairlineWidth },
  inputWrap: { flex: 1, borderRadius: 24, borderWidth: 1, paddingHorizontal: sp.md, paddingVertical: 10, maxHeight: 120 },
  input: { fontSize: 14.5 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
});
