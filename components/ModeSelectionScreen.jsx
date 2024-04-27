import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import storage from "../storage";

export default function ModeSelectionScreen({ navigation, route }) {

    const { selectedChapterIndex } = route.params;

    const [showNextButton, setShowNextButton] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleModeSelect = (mode) => {
        setSelectedAnswer(mode)
        setShowNextButton(true)
    }

    const handleSubmit = () => {
        storage.save({
            key: `study-mode`,
            data: {
                mode: selectedAnswer
            },
            // if set to null, then it will never expire.
            expires: null
        });
        navigation.replace('Questions', {
            selectedChapterIndex,
            studyMode: selectedAnswer
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>What mode do you want to study in?</Text>
            </View>
            <View style={styles.chapterTitleContainer}>
                <Text style={styles.chapterTitleText}>Select mode:</Text>
            </View>
            <View style={styles.modesContainer}>
                <Pressable
                    style={selectedAnswer === 'study' ? styles.selectedButton : styles.button}
                    onPress={() => handleModeSelect('study')}>
                    <Text style={styles.text}>Study mode</Text>
                    <Text style={styles.descriptionText}>
                        Answers and explanations are shown after each question is answered.
                    </Text>
                </Pressable>
                <Pressable
                    style={selectedAnswer === 'exam' ? styles.selectedButton : styles.button}
                    onPress={() => handleModeSelect('exam')}>
                    <Text style={styles.text}>Exam mode</Text>
                    <Text style={styles.descriptionText}>
                        You'll only see the results of your questions at the end of each chapter.
                    </Text>
                </Pressable>
            </View>
            <View style={styles.submitContainer}>
                    <Pressable disabled={!showNextButton && selectedAnswer === null} 
                                style={!showNextButton && selectedAnswer === null ? styles.disabledButton : styles.submitButton} onPress={() => handleSubmit()}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </Pressable>
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
    modesContainer: {
        flex: 3,
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
        height: '35%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    selectedButton: {
        marginTop: 30,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#f8f6f2',
        width: '45%',
        height: '35%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#c6bfb8',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#31304d',
    },
    descriptionText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#31304d',
    },
    submitContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e3e1de',
        width: '100%'
    },
    submitButton: {
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
    disabledButton: {
        width: '90%',
        margin: 5,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        opacity: 0
    },
    submitButtonText: {
        fontSize: 18,
        alignItems: 'center',
        color: 'white',
    },
});
