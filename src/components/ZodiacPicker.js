import React, { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import { ZODIAC_SIGNS, useSettings } from '../context/SettingsContext';

export default function ZodiacPicker() {
  const { selectedSign, setSelectedSign } = useSettings();
  const [open, setOpen] = useState(false);

  const items = useMemo(() => ZODIAC_SIGNS.map(s => ({ key: s, label: s.charAt(0).toUpperCase() + s.slice(1) })), []);

  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.buttonText}>{items.find(i => i.key === selectedSign)?.label}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={items}
              keyExtractor={(i) => i.key}
              renderItem={({ item }) => (
                <Pressable
                  onPress={async () => {
                    await setSelectedSign(item.key);
                    setOpen(false);
                  }}
                  style={[styles.item, item.key === selectedSign && styles.itemActive]}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { },
  button: { backgroundColor: '#1b2342', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  buttonText: { color: '#f5f7ff', fontSize: 16 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  sheet: { backgroundColor: '#0f162c', borderRadius: 12, paddingVertical: 8, maxHeight: '70%' },
  item: { paddingVertical: 14, paddingHorizontal: 18 },
  itemActive: { backgroundColor: '#1b2342' },
  itemText: { color: '#f5f7ff', fontSize: 16 }
}); 