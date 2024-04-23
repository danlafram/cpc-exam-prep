import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import storage from "../storage";
import { CertificationContext } from '../contexts/CertificationContext';

export default function SettingScreen({ route, navigation }) {

    const data = useContext(CertificationContext)


    const handleClearData = async () => {
        await storage.remove({
            key: 'chapter-progress'
        });
        await storage.remove({
            key: 'study-mode'
        });

        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Home' }
              ],
            })
          );
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Clear study data</Text>
            </View>
            <View style={styles.answersContainer}>
                <Pressable style={styles.buttonClose} onPress={() => handleClearData()}>
                    <Text style={styles.closeButtonText}>Clear study data</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    questionsContainer: {
        width: '100%',
        alignItems: 'flex-start',
        padding: 10,
    },
    questionText: {
        fontSize: 25,
    },
    correctAnswer: {
        fontSize: 20,
        backgroundColor: '#00FF7F',

    },
    genericAnswer: {
        fontSize: 16,
        backgroundColor: '#fff'
    },
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
    answersContainer: {
        paddingTop: 15,
        flex: 6,
        backgroundColor: '#e3e1de',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    titleText: {
        paddingTop: 20,
        margin: 5,
        fontSize: 30,
        color: 'white',
    },
    buttonClose: {
        margin: 5,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#31304d',
        width: '90%',
        alignItems: 'center',
        alignContent: 'center'
    },
    answerContainer: {
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 25
    },
    wrongAnswerContainer: {
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 25,
        backgroundColor: 'red'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButtonText: {
        color: "#fff"
    },
    pressableItem: {
        flexDirection: 'row'
    },
    answerIcon: {
        alignSelf: 'center',
        paddingRight: 10
    },
    questionText: {
        width: '85%',
        alignSelf: 'center',
    },
    listStyle: {
        width: '100%'
    }
});
