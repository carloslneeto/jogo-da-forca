import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HangmanFigure from './components/HangmanFigure';
import Keyboard from './components/Keyboard';
import { WORDS } from './constants/words';

const MAX_ATTEMPTS = 6;

export default function App() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongLetters([]);
    setGameStatus('playing');
  };

  const handleLetterPress = (letter) => {
    if (gameStatus !== 'playing') return;

    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

    if (word.includes(letter)) {
      const updatedGuesses = [...guessedLetters, letter];
      setGuessedLetters(updatedGuesses);

      const isWin = word.split('').every((l) => updatedGuesses.includes(l));
      if (isWin) setGameStatus('won');
    } else {
      const updatedWrong = [...wrongLetters, letter];
      setWrongLetters(updatedWrong);

      if (updatedWrong.length >= MAX_ATTEMPTS) {
        setGameStatus('lost');
      }
    }
  };

  const renderWord = () => {
    return word.split('').map((letter, index) => (
      <Text key={index} style={styles.letter}>
        {guessedLetters.includes(letter) || gameStatus !== 'playing' ? letter : '_'}
      </Text>
    ));
  };

  const renderMessage = () => {
    if (gameStatus === 'won') {
      return <Text style={styles.message}>🎉 Parabéns! Você venceu! Palavra: {word}</Text>;
    } else if (gameStatus === 'lost') {
      return <Text style={styles.message}>😢 Fim de jogo! A palavra era: {word}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Forca</Text>
      <HangmanFigure errors={wrongLetters.length} />
      <View style={styles.wordContainer}>{renderWord()}</View>
      <Text style={styles.attempts}>Tentativas restantes: {MAX_ATTEMPTS - wrongLetters.length}</Text>
      <Text style={styles.triedLetters}>
        Letras incorretas: {wrongLetters.join(' ')}
      </Text>
      <Keyboard onKeyPress={handleLetterPress} disabled={gameStatus !== 'playing'} />
      {renderMessage()}
      <TouchableOpacity style={styles.button} onPress={startNewGame}>
        <Text style={styles.buttonText}>🔄 Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', alignItems: 'center', padding: 20, paddingTop: 60 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  wordContainer: { flexDirection: 'row', marginVertical: 20 },
  letter: { fontSize: 32, marginHorizontal: 5, borderBottomWidth: 2, width: 30, textAlign: 'center' },
  attempts: { fontSize: 16, marginBottom: 10 },
  triedLetters: { fontSize: 16, marginBottom: 20 },
  message: { fontSize: 20, fontWeight: 'bold', marginVertical: 15, color: '#333' },
  button: { marginTop: 20, backgroundColor: '#2563EB', padding: 10, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});
