import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Keyboard({ onKeyPress, disabled }) {
  return (
    <View style={styles.container}>
      {ALPHABET.map((letter) => (
        <TouchableOpacity
          key={letter}
          style={[styles.key, disabled && styles.disabledKey]}
          onPress={() => !disabled && onKeyPress(letter)}
          disabled={disabled}
        >
          <Text style={styles.keyText}>{letter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 340,
  },
  key: {
    backgroundColor: '#E5E7EB',
    margin: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  keyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledKey: {
    backgroundColor: '#D1D5DB',
  },
});
