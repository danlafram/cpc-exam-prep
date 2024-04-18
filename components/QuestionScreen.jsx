import { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CertificationContext } from '../contexts/CertificationContext';

export default function QuestionScreen({ route, navigation }) {
    const { selectedChapterIndex } = route.params;

    const data = useContext(CertificationContext)

    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState(data.questions[selectedChapterIndex]);
    const [answers, setAnswers] = useState(data.questions[selectedChapterIndex][0].answers);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const [resultText, setResultText] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [explanation, setExplanation] = useState(data.questions[selectedChapterIndex][0].explanation)
    const [showExplanation, setShowExplanation] = useState(false)

    // This function handles the user clicking on an answer
    // We track the index of the anwser tracked here so we can use it to cross-check with the answers array
    // to determine if its the right answer.
    const handleAnswer = (clickedIndex) => {
        setSelectedAnswer(clickedIndex)
    }

    // This function handles the user clicking on the 'Submit' button.
    // We use the 'selectedAnswer' state to check and see if they selected the right answer,
    // then we toggle result messages accordingly.
    const handleSubmit = () => {
        if (answers[selectedAnswer]?.is_answer) {
            // Right answer
            setShowNextButton(true)
            setResultText("Correct!")
            setCorrectAnswers(correctAnswers + 1)
            setShowExplanation(true)
        } else {
            // Wrong answer
            setResultText("Oops, not quite!")
        }
    }

    // This function  handles the user clicking 'Next question'.
    // We reset all the tracking and move to the next quest.
    // When its the last question of the chapter, 
    // we show the results page and move to the next chapter or allow them to repeat the chapter
    const handleNextQuestion = () => {
        // When last question, move on to next chapter or show results page.
        setShowNextButton(false)
        setSelectedAnswer(null)
        setResultText(null)
        setShowExplanation(false)
        
        if (questions.length === questionIndex + 1) {
            // Show another screen and move to next chapter
            setAnswers(null)
            setQuestionIndex(0)
            navigation.replace('Results', {
                currentChapterIndex: selectedChapterIndex,
                correctAnswers
            })
        } else {
            setQuestionIndex(questionIndex + 1)
            setAnswers(data.questions[selectedChapterIndex][questionIndex + 1].answers)
            setExplanation(data.questions[selectedChapterIndex][questionIndex + 1].explanation)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionTrackerText}>{data?.chapters[selectedChapterIndex].name}</Text>
                <Text style={styles.questionTrackerText}>Question {questionIndex + 1} of {questions?.length ? questions?.length : 'loading...'}</Text>
                <Text style={styles.questionText}>{questions?.length ? questions[questionIndex]?.question : "loading..."}</Text>
            </View>


            {showExplanation ?
                <View style={styles.explanationContainer}><Text style={styles.explanationText}>{explanation}</Text></View>
                :
                <View style={styles.answersContainer}>
                    {answers?.length && answers.map((answer, index) =>
                        <Pressable key={index} style={index === selectedAnswer ? styles.selectedButton : styles.button} onPress={() => handleAnswer(index)}>
                            <Text style={styles.text}>{answer.answer}</Text>
                        </Pressable>
                    )}
                </View>}

            <View style={styles.resultsContainer}>
                {
                    resultText && <Text>{resultText}</Text>
                }
                {showNextButton ?
                    <Pressable style={styles.nextButton} onPress={() => handleNextQuestion()}>
                        <Text style={styles.nextButtonText}>Next Question</Text>
                    </Pressable> :
                    <Pressable disabled={selectedAnswer === null} style={styles.nextButton} onPress={() => handleSubmit()}>
                        <Text style={styles.nextButtonText}>Submit</Text>
                    </Pressable>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e1de',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    questionContainer: {
        flex: 3,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#e3e1de',
        padding: 5,
    },
    explanationContainer: {
        flex: 4,
        backgroundColor: '#f8f6f2',
        width: '90%',
        height: 'auto',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 15,
    },
    answersContainer: {
        flex: 4,
        backgroundColor: '#e3e1de',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    resultsContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e3e1de',
        width: '100%'
    },
    button: {
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#f8f6f2',
        width: '90%'
    },
    selectedButton: {
        margin: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#c6bfb8',
        width: '90%'
    },
    nextButton: {
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
    questionText: {
        fontSize: 25,
        letterSpacing: 0.50,
        color: '#01061f',
    },
    explanationText: {
        fontSize: 25,
        letterSpacing: 1.5,
        color: '#01061f',
    },
    questionTrackerText: {
        fontSize: 15,
        letterSpacing: 0.50,
        marginBottom: 10,
        color: '#01061f'
    },
    text: {
        color: '#01061f',
        fontSize: 16,
        letterSpacing: 0.50
    },
    nextButtonText: {
        fontSize: 18,
        alignItems: 'center',
        color: 'white',
    }
});
