import { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CertificationContext } from '../contexts/CertificationContext';
import { Entypo } from '@expo/vector-icons';

export default function EndOfChapterScreen({ route, navigation }) {
  const { currentChapterIndex, correctAnswers } = route.params;

  const data = useContext(CertificationContext)

  // Navigate to the next chapter.
  // NOTE: Use replace here to reset the state of the new screen.
  const handleNextChapter = () => {
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
      <View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Results</Text>
          <Entypo style={styles.icon} name="trophy" size={60} color="#31304d" />
          <Text style={styles.subTitleText}>Congrats! You just completed the {data.chapters[currentChapterIndex].name} chapter.</Text>
          <Text style={styles.subTitleText}>{correctAnswers}/{data.questions[currentChapterIndex].length} correct answers.</Text>
        </View>
        {/* <View style={styles.graphicContainer}>
          
        </View> */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.nextButton} onPress={() => handleNextChapter()}>
            <Text style={styles.nextText}>Next Chapter</Text>
          </Pressable>
          <Pressable style={styles.redoButton} onPress={() => handleRedoChapter()}>
            <Text style={styles.redoText}>Redo chapter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31304d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    paddingVertical: 25,
    backgroundColor: '#f3f0ea',
    width: '90%',
    borderRadius: 10,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  actionsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly'
  },
  titleText: {
    textAlign: 'center',
    paddingTop: 20,
    margin: 5,
    fontSize: 30
  },
  subTitleText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 10
  },
  nextButton: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#31304d',
    width: '40%'
  },
  redoButton: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    width: '40%'
  },
  nextText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#fff',
  },
  redoText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#393c4e'
  }
});
