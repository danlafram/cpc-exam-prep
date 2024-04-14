import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import axios from 'axios';
import { CertificationContext } from '../contexts/CertificationContext';

// TODO: move chapters, questions to top level context
export default function HomeScreen({ navigation }) {

  const data = useContext(CertificationContext)

  // console.log('data', data?.questions[0])

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Certified Medical Biller Training</Text>
        <Text style={styles.subTitleText}>Use these questions to prep for your certification exam</Text>
      </View>
      <View style={styles.chaptersContainer}>
        {
          data?.chapters?.length && data?.chapters.map((chapter, index) =>
            <Pressable style={styles.button} key={index}
              onPress={() => navigation.navigate('Questions', {
                selectedChapterIndex: index,
                // chapters: data.chapters,
                // questions: data.questions[index] // This is probably wrong. Use context here.
              })}
            >
              <Text style={styles.text}>{chapter.name}</Text>
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
  chaptersContainer: {
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
