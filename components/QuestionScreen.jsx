import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CertificationContext } from '../contexts/CertificationContext';

// TODO: move chapters, questions to top level context
export default function QuestionScreen({ route, navigation }) {
    const { selectedChapterIndex } = route.params;

    const data = useContext(CertificationContext)

    const [chapter, setChapter] = useState(data.chapters[selectedChapterIndex]);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState(data.questions[selectedChapterIndex]);
    const [answers, setAnswers] = useState(data.questions[selectedChapterIndex][0].answers);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const [resultText, setResultText] = useState(null);
    const [results, setResults] = useState({});

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
        // TODO: Logic here not to increment if last question of the chapter.
        // When last question, move on to next chapter or show results page.
        setShowNextButton(false)
        setSelectedAnswer(null)
        setResultText(null)
        if(questions.length === questionIndex + 1){
            // Show another screen and move to next chapter
            setAnswers(null)
            setQuestionIndex(0)
            navigation.navigate('Results', {
                currentChapterIndex: selectedChapterIndex,
                results
            })
        } else {
            setQuestionIndex(questionIndex + 1)
            setAnswers(data.questions[selectedChapterIndex][questionIndex + 1].answers)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionTrackerText}>Question {questionIndex + 1} of {questions?.length ? questions?.length : 'loading...'}</Text>
                <Text style={styles.questionText}>{questions?.length ? questions[questionIndex]?.question : "loading..."}</Text>
            </View>


            <View style={styles.answersContainer}>
                {answers?.length && answers.map((answer, index) =>
                    <Pressable key={index} style={styles.button} onPress={() => handleAnswer(index)}>
                        <Text style={styles.text}>{answer.answer}</Text>
                    </Pressable>
                )}
            </View>

            <View style={styles.resultsContainer}>
                {/* TODO: Add text feedback with success or 'oops' wrong answer etc. */}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        padding: 5,
    },
    answersContainer: {
        flex: 3,
        backgroundColor: 'red',
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    resultsContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'red',
        width: '100%'
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
        width: '90%'
    },
    nextButton: {
        margin: 5,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        width: '50%'
    },
    questionText: {
        fontSize: 25,
    },
    questionTrackerText: {
        fontSize: 15,
        marginBottom: 10,
    },
    text: {
        fontSize: 15,
        letterSpacing: 0.25,
        color: 'white',
    },
    nextButtonText: {
        alignItems: 'center',
        color: 'black',
    }
});
