import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSettings } from '../context/SettingsContext';
import { useHoroscope } from '../hooks/useHoroscope';
import ZodiacPicker from '../components/ZodiacPicker';
import HoroscopeCard from '../components/HoroscopeCard';

function formatToday() {
  const d = new Date();
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export default function HomeScreen() {
  const nav = useNavigation();
  const { selectedSign } = useSettings();
  const { data, loading, error, fromCache } = useHoroscope(selectedSign);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.date}>{formatToday()}</Text>
      <View style={styles.headerRow}>
        <ZodiacPicker />
        <Pressable style={styles.writeButton} onPress={() => nav.navigate('Journal')}> 
          <Text style={styles.writeButtonText}>Write Journal</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Horoscope</Text>
        <HoroscopeCard data={data} loading={loading} error={error} fromCache={fromCache} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b1020' },
  container: { padding: 16 },
  date: { color: '#e5e7eb', fontSize: 18, marginBottom: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  writeButton: { backgroundColor: '#a78bfa', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  writeButtonText: { color: '#0b1020', fontWeight: '700' },
  section: { marginTop: 8 },
  sectionTitle: { color: '#c7b5ff', fontSize: 16, marginBottom: 8 }
}); 