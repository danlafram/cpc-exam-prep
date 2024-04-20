import { useContext, useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import { CertificationContext } from '../contexts/CertificationContext';
import storage from "../storage";

const fontAwesome5Icons = [
  "list",
  "pencil-ruler",
  "hospital-symbol",
  "receipt",
  "money-bill",
  "file-code"
]


export default function HomeScreen({ navigation }) {

  const isFocused = useIsFocused();
  const data = useContext(CertificationContext)
  const [chapterProgress, setChapterProgress] = useState([])

  useEffect(() => {
    // storage.remove({
    //   key: 'chapter-progress'
    // }).then(() => console.log('done'));
    storage.load({
      key: 'chapter-progress',
      // autoSync: true
    }).then((data) => {
      setChapterProgress(data.chapterProgressArray)
    }).catch((e) => console.log(e))
  }, [isFocused])

  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Certified Medical Biller Training</Text>
        <Text style={styles.subTitleText}>Use these questions to prep for your certification exam</Text>
      </View>
      <View style={styles.chapterTitleContainer}>
        <Text style={styles.chapterTitleText}>Chapters</Text>
      </View>
      <View style={styles.chaptersContainer}>
        {
          data?.chapters?.length && data?.chapters.map((chapter, index) =>
            <Pressable
              key={chapter.id}
              style={styles.button}
              onPress={() => navigation.navigate('Questions', {
              selectedChapterIndex: index,
            })}>
              <FontAwesome5 name={fontAwesome5Icons[index]} size={26} color="black" />
              <Text style={styles.text}>{chapter.name}</Text>
              <Text style={styles.progressText}>
                {chapterProgress.length && chapterProgress[index] !== null ? <Text>{chapterProgress[index] ?? 0}/{data.questions[index].length} completed</Text> : null}
              </Text>
            </Pressable>
          )
        }
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
  titleContainer: {
    padding: 10,
    flex: 1,
    width: '100%',
    backgroundColor: '#31304d',
    justifyContent: 'space-evenly'
  },
  chapterTitleContainer: {
    padding: 10,
    backgroundColor: '#e3e1de',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 35,
  },
  chapterTitleText: {
    fontSize: 25
  },
  chaptersContainer: {
    flex: 3,
    backgroundColor: '#e3e1de',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  titleText: {
    paddingTop: 20,
    margin: 5,
    fontSize: 30,
    color: 'white',
  },
  subTitleText: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#f8f6f2',
    width: '45%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#31304d',
  },
  progressText: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#31304d',
  }
});
