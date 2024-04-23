import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, FlatList, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



import { CertificationContext } from '../contexts/CertificationContext';

export default function ViewAnswersScreen({ route }) {

    const data = useContext(CertificationContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)

    const { selectedChapterIndex, wrongAnswers } = route.params;



    const Item = ({ item, index }) => {
        const questionWrong = wrongAnswers.find((answer) => answer === index)
        return (
            <View style={styles.answerContainer}>
                <Pressable style={styles.pressableItem} onPress={() => handleItemClick(index)}>
                    {questionWrong !== undefined ? <Feather style={styles.answerIcon} name="x-circle" size={24} color="red" /> : <FontAwesome5 style={styles.answerIcon} name="check" size={24} color="green" />}
                    <Text style={styles.questionText}>{item.question}</Text>
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
                    style={styles.listStyle}
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
                                    <Text key={answer.id} style={answer.is_answer ? styles.correctAnswer : styles.genericAnswer}>
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
