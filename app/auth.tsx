import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { supabase } from '../src/services/supabase';
import { useColors } from '../src/design/useColors';
import { gradients, sp, r, palette } from '../src/design/tokens';
import { YunaAvatar } from '../src/components/yuna/YunaAvatar';

export default function AuthScreen() {
  const c = useColors();
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handle = async () => {
    setError(''); setSuccess('');
    if (!email || !password) { setError('Remplis tous les champs.'); return; }
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error: e } = await supabase.auth.signUp({ email, password });
        if (e) throw e;
        setSuccess('Vérifie tes emails pour confirmer ton compte !');
      } else {
        const { error: e } = await supabase.auth.signInWithPassword({ email, password });
        if (e) throw e;
        router.replace('/(tabs)');
      }
    } catch (e: any) {
      setError(e.message ?? 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#141328', '#1E1640']} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.root}>

        {/* Logo */}
        <View style={styles.top}>
          <YunaAvatar size={72} />
          <Text style={styles.appName}>Séoul Mate</Text>
          <Text style={styles.tagline}>Ton amie locale en Corée 🇰🇷</Text>
        </View>

        {/* Form */}
        <View style={[styles.card, { backgroundColor: 'rgba(255,255,255,0.06)' }]}>
          <Text style={[styles.title, { color: '#fff' }]}>
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </Text>

          <TextInput
            value={email} onChangeText={setEmail}
            placeholder="Email" placeholderTextColor="rgba(255,255,255,0.35)"
            style={[styles.input, { borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }]}
            autoCapitalize="none" keyboardType="email-address"
          />
          <TextInput
            value={password} onChangeText={setPassword}
            placeholder="Mot de passe" placeholderTextColor="rgba(255,255,255,0.35)"
            style={[styles.input, { borderColor: 'rgba(255,255,255,0.15)', color: '#fff' }]}
            secureTextEntry
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.successTxt}>{success}</Text> : null}

          <TouchableOpacity onPress={handle} disabled={loading} activeOpacity={0.85}>
            <LinearGradient colors={gradients.neon} style={styles.btn}>
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnTxt}>
                    {mode === 'login' ? 'Se connecter' : "S'inscrire"}
                  </Text>
              }
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
            style={{ marginTop: sp.md, alignItems: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              {mode === 'login' ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'center', padding: sp.lg },
  top: { alignItems: 'center', marginBottom: 40 },
  appName: { color: '#fff', fontSize: 32, fontWeight: '700', marginTop: 16 },
  tagline: { color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 6 },
  card: { borderRadius: r.lg, padding: sp.lg, gap: sp.sm },
  title: { fontSize: 20, fontWeight: '700', marginBottom: sp.sm },
  input: {
    borderWidth: 1, borderRadius: r.card,
    paddingHorizontal: sp.md, paddingVertical: 14,
    fontSize: 15, marginBottom: 4,
  },
  btn: { borderRadius: r.card, paddingVertical: 16, alignItems: 'center', marginTop: sp.sm },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: '700' },
  error: { color: '#FF6B6B', fontSize: 13, textAlign: 'center' },
  successTxt: { color: '#4CAF50', fontSize: 13, textAlign: 'center' },
});
