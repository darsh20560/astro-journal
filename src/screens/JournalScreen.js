import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { useJournal } from '../hooks/useJournal';
import JournalEntryItem from '../components/JournalEntryItem';

export default function JournalScreen() {
  const { selectedSign } = useSettings();
  const { text, setText, loading, list, submit } = useJournal(selectedSign);

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Add a Thought ({selectedSign.charAt(0).toUpperCase() + selectedSign.slice(1)})</Text>
        <TextInput
          style={styles.input}
          placeholder="Write your thought..."
          placeholderTextColor="#6b7280"
          multiline
          value={text}
          onChangeText={setText}
        />
        <Pressable style={[styles.submitBtn, !text.trim() && styles.submitBtnDisabled]} onPress={submit} disabled={!text.trim()}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
        <View style={styles.divider} />
        <Text style={styles.heading}>Previous Entries</Text>
        {loading ? (
          <Text style={styles.muted}>Loading...</Text>
        ) : list.length === 0 ? (
          <Text style={styles.muted}>No entries yet. Add your first thought.</Text>
        ) : (
          <View style={styles.list}>
            {list.map((e) => (
              <JournalEntryItem key={e.id} entry={e} />
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0b1020' },
  container: { padding: 16 },
  heading: { color: '#c7b5ff', fontSize: 16, marginBottom: 8 },
  input: { color: '#f5f7ff', backgroundColor: '#0f162c', borderRadius: 12, padding: 12, minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: '#1e2a4a' },
  submitBtn: { alignSelf: 'flex-end', backgroundColor: '#a78bfa', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, marginTop: 10 },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: { color: '#0b1020', fontWeight: '700' },
  divider: { height: 16 },
  list: { },
  muted: { color: '#9ca3af' }
}); 