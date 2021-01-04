import React from 'react';
import {Alert,Text} from 'react-native';
import QuizzComponent from '../Components/QuizzComponent';
import { quizScore } from '../environment';
import AssesmentOverOverlay from '../Components/AssesmentOverOverlay'
import { connect } from 'react-redux';
// import {getQuizzData} from '../actions/index'
function LevelAssesment(props) {
    // console.log("quizz state", props.quizzState.CONTENT)
    const {quizzState,userProgress} =props
    const [index, setIndex] = React.useState(0);
    const [questionData,setQuestionData] = React.useState({...quizzState.CONTENT[index]})
    const [answered, setAnswered] = React.useState(null);
    const [points, setPoints] = React.useState(0);
    const [isGameOver, setGameOver] = React.useState(false);
    const totalQsn = quizzState.CONTENT.length
    const [currQsn, setCurrQsn] = React.useState(1);
    // const [languageCompleted,setLanguageCompleted] = React.useState(false);
    
    const checkCorrect = (answerId,qsnId) => {
        setAnswered(answerId);
        if (answerId === qsnId) {
            setPoints(points+quizScore)
        }
        setTimeout(() => {
            handleNext()
            
        },800)
    }

    const handleNext = () => {
        setIndex(index + 1)
        setCurrQsn(currQsn+1)
        setAnswered(false)
    }

    React.useEffect(() => {
        if (quizzState.CONTENT[index]) {
            setQuestionData({...quizzState.CONTENT[index]})
        }
        else {
            setGameOver(true)
        }
    },[index])
    const handleClose = () => {
        
        Alert.alert(
            "Alert",
            "Do you wish to exit the quizz ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log('canceled'),
                    style:"cancel"
                },
                {
                    text: "Yes",
                    onPress: handleExit,
                    style:"default"
                },
                
            ],
            {cancelable:true}
        )
        
    }
    const handleExit = () => {
        setIndex(0);
        setCurrQsn(1);
        setPoints(0);
        // setGameOver(false)
        props.navigation.navigate('UserHome');
    }
    return (
        <React.Fragment> 
            {
                isGameOver ?
                <AssesmentOverOverlay
                    points={points}
                    isGameOver={isGameOver}
                    setGameOver={setGameOver}
                    setPoints={setPoints}
                    setCurrQsn={setCurrQsn}
                
                    {...props}
                    /> : (
                        <QuizzComponent
                        {...props}
                        title="Assesment"
                        qsn={questionData}
                        checkCorrect={checkCorrect}
                        answered={answered}
                        handleClose={handleClose}
                        totalQsn={totalQsn}
                        currQsn={currQsn}
                 />       
                )
            }
            
            
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        quizzState:state.assesmentData,
        userProgress:state.userProgress
    }
}

export default connect(mapStateToProps,null)(LevelAssesment);

