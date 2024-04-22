import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList, Modal } from 'react-native';

import { CertificationContext } from '../contexts/CertificationContext';
import storage from "../storage";

export default function ViewAnswersScreen({ navigation, route }) {

    const data = useContext(CertificationContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState()

    const { selectedChapterIndex, wrongAnswers } = route.params;

    console.log('wrongAnswers', wrongAnswers)



    const Item = ({ item, index }) => {
        const questionWrong = wrongAnswers.find((answer) => answer === index)
        console.log('questionWrong', questionWrong)
        return (
            <View style={questionWrong !== undefined ? styles.wrongAnswerContainer : styles.answerContainer}>
                <Pressable styles={styles.pressableItem} onPress={() => handleItemClick(index)}>
                    <Text>{item.question}</Text>
                </Pressable>
            </View>
        )
    };

    const handleItemClick = (index) => {
        console.log('handling click')
        setSelectedQuestion(index)
        setModalVisible(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Chapter Answers</Text>
            </View>
            <View style={styles.answersContainer}>
                <FlatList
                    data={data.questions[selectedChapterIndex]}
                    renderItem={({ item, index }) => <Item item={item} index={index} />}
                    keyExtractor={item => item.id}
                />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.questionText}>{data.questions[selectedChapterIndex][selectedQuestion]?.question}</Text>
                        <View style={styles.questionsContainer}>
                        {
                            data.questions[selectedChapterIndex][selectedQuestion]?.answers.map((answer) =>
                                <Text style={answer.is_answer ? styles.correctAnswer : styles.genericAnswer}>
                                    {answer.answer}
                                </Text>)
                        }
                        </View>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Dismiss</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    questionsContainer: {
        // flex: 3,
        width: '100%',
        // height: '100%',
        alignItems: 'flex-start',
        // justifyContent: 'space-evenly',
        // backgroundColor: '#e3e1de',
        // paddingHorizontal: 15,
        padding: 10,
    },
    questionText: {
        fontSize: 25
    },
    correctAnswer: {
        fontSize: 20,
        backgroundColor: 'green',
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
    answersContainer: {
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
    submitButtonText: {
        fontSize: 18,
        alignItems: 'center',
        color: 'white',
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
    pressableItem: {
        width: '100%',
        height: '100%'
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
    }
});
