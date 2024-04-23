import { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CertificationContext } from '../contexts/CertificationContext';
import { Entypo } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient'

import storage from "../storage";

export default function EndOfChapterScreen({ route, navigation }) {
  const { currentChapterIndex, correctAnswers, studyMode, wrongAnswers } = route.params;

  const data = useContext(CertificationContext)

  // Navigate to the next chapter.
  // NOTE: Use replace here to reset the state of the new screen.
  const handleNextChapter = () => {
    navigation.replace('Questions', {
      selectedChapterIndex: currentChapterIndex + 1,
      studyMode
    })
  }

  // Reset the chapter to redo.
  // NOTE: Use replace here to reset the state of the new screen.
  const handleRedoChapter = () => {
    storage.load({
      key: 'chapter-progress',
      autoSync: true
    }).then((data) => {
      chapterProgressArray = data.chapterProgressArray
      chapterProgressArray[currentChapterIndex] = 0
      storage.save({
        key: `chapter-progress`,
        data: {
          chapterProgressArray
        },
        // if set to null, then it will never expire.
        expires: null
      }).then(() => {
        navigation.replace('Questions', {
          selectedChapterIndex: currentChapterIndex,
          studyMode
        })
      });
    }).catch((e) => console.log(e))
  }

  const handleViewAnswers = () => {
    navigation.navigate('Answers', {
      selectedChapterIndex: currentChapterIndex,
      wrongAnswers
    })
  }

  return (
    <LinearGradient
      colors={['#31304d', '#f3f0ea']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Results</Text>
          <Entypo style={styles.icon} name="trophy" size={60} color="#31304d" />
          <Text style={styles.subTitleText}>Congrats! You just completed the {data.chapters[currentChapterIndex].name} chapter.</Text>
          {studyMode === 'exam' &&
            <Text style={styles.subTitleText}>{correctAnswers}/{data.questions[currentChapterIndex].length} correct answers.</Text>
          }
        </View>
        <View style={styles.actionsContainer}>
          <Pressable style={styles.nextButton} onPress={() => handleNextChapter()}>
            <Text style={styles.nextText}>Next Chapter</Text>
          </Pressable>
          <Pressable style={styles.redoButton} onPress={() => handleRedoChapter()}>
            <Text style={styles.redoText}>Redo chapter</Text>
          </Pressable>
        </View>
        <View style={styles.viewAnswerContainer}>
        <Pressable style={styles.nextButton} onPress={() => handleViewAnswers()}>
            <Text style={styles.nextText}>View Answers</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#31304d',
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
  },
  viewAnswerContainer: {
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-evenly'
  }
});
