import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CertificationContext } from '../contexts/CertificationContext';

export default function HomeScreen({ navigation }) {

  const data = useContext(CertificationContext)

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
    backgroundColor: '#31304d',
    justifyContent: 'space-evenly'
  },
  chapterTitleContainer: {
    padding: 10,
    backgroundColor: '#f0ece5',
    width: '100%',
    alignItems: 'center'
  },
  chapterTitleText: {
    fontSize: 25,
    // fontWeight: 'bold'
  },
  chaptersContainer: {
    flex: 3,
    backgroundColor: '#f0ece5',
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
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#31304d',
  }
});
