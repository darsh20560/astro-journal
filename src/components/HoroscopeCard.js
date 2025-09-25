import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function HoroscopeCard({ data, loading, error, fromCache }) {
  return (
    <View style={styles.card}>
      {loading ? (
        <View style={styles.center}> 
          <ActivityIndicator color="#a78bfa" />
          <Text style={styles.muted}>Loading horoscope...</Text>
        </View>
      ) : error && !data ? (
        <View style={styles.center}>
          <Text style={styles.error}>Couldn't load horoscope. You're offline or the service failed.</Text>
        </View>
      ) : data ? (
        <>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.desc}>{data.description || data.message || ''}</Text>
          <View style={styles.row}>
            {data.mood ? <Text style={styles.chip}>Mood: {data.mood}</Text> : null}
            {data.color ? <Text style={styles.chip}>Color: {data.color}</Text> : null}
            {fromCache ? <Text style={styles.cache}>Offline</Text> : null}
          </View>
        </>
      ) : (
        <Text style={styles.muted}>No data.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#0f162c', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#1e2a4a' },
  title: { color: '#f5f7ff', fontSize: 18, fontWeight: '600', marginBottom: 8 },
  desc: { color: '#d7dbf8', fontSize: 16, lineHeight: 22 },
  chip: { color: '#c7b5ff', marginRight: 12, marginTop: 12 },
  cache: { color: '#9ca3af', marginTop: 12 },
  muted: { color: '#9ca3af', marginTop: 8 },
  error: { color: '#fca5a5', textAlign: 'center' },
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap' }
}); 