import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function JournalEntryItem({ entry, onPress }) {
  return (
    <Pressable onPress={() => onPress?.(entry)}>
      <View style={styles.item}>
        <Text style={styles.date}>{entry.date}</Text>
        <Text numberOfLines={4} style={styles.text}>{entry.text || ''}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#1e2a4a' },
  date: { color: '#9ca3af', marginBottom: 6, fontSize: 12 },
  text: { color: '#e5e7eb', fontSize: 15, lineHeight: 20 }
}); 