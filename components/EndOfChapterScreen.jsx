import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CertificationContext } from '../contexts/CertificationContext';

export default function EndOfChapterScreen({ route, navigation }) {
  const { currentChapterIndex, results } = route.params;

  const data = useContext(CertificationContext)

  // Navigate to the next chapter.
  // NOTE: Use replace here to reset the state of the new screen.
  const handleNextChapter = () => {
    console.log('currentChapterIndex', currentChapterIndex)
    console.log('currentChapterIndex + 1', currentChapterIndex + 1)
    navigation.replace('Questions', {
      selectedChapterIndex: currentChapterIndex + 1,
    })
  }

  // Reset the chapter to redo.
  // NOTE: Use replace here to reset the state of the new screen.
  const handleRedoChapter = () => {
    navigation.replace('Questions', {
      selectedChapterIndex: currentChapterIndex,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Congrats! You just completed a chapter</Text>
        <Text style={styles.subTitleText}>TODO: Add results here.</Text>
      </View>
      <View style={styles.actionsContainer}>
        <Pressable style={styles.button} onPress={() => handleNextChapter()}>
          <Text style={styles.text}>Next Chapter</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleRedoChapter()}>
          <Text style={styles.text}>Redo chapter</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    padding: 10,
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
    justifyContent: 'space-evenly'
  },
  actionsContainer: {
    flex: 3,
    backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly'
  },
  titleText: {
    paddingTop: 20,
    margin: 5,
    fontSize: 30
  },
  subTitleText: {
    fontSize: 20
  },
  button: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    width: '50%'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
