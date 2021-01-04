import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';
import QuizzHeader from './QuizzHeader';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';

function QuizzComponent(props) {
    const { qsn, checkCorrect, answered, handleClose ,totalQsn,currQsn,title} = props
    Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
        playThroughEarpieceAndroid: true
    });
    // const sound = new Audio.Sound();
    const status = {
        shouldPlay: false
    };
    // sound.loadAsync({ uri: qsn.quesContent.audioPath }, status, false)
    const playSound = async() => {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: qsn.quesContent.audioPath }, status, false);
        const sts =await sound.playAsync();
        setTimeout(() => {
            sound.unloadAsync();
        },sts.playableDurationMillis)
    }

    // React.useEffect(() => {
    //     if (qsn.questionType === "AUD_TO_TRANS" || qsn.questionType === "AUD_TO_WORD") {
    //         if (sound._loaded) {
    //             playSound()
    //         }
    //     }
    // },[])
    return (
        <React.Fragment>
            <QuizzHeader   {...props} title={title} handleClose={handleClose}/>
            <View style={styles.mainView}>                
                                <View style={styles.qsnView}>
                                        <View style={{flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                                                <Text style={{...styles.qsnText,fontSize:hp('2.5%'),color:"#47705e"}}>{qsn.question}</Text>
                                                <Text style={{ ...styles.qsnText,fontSize:hp('2.1%'),color:"#47705e"}}>{currQsn}/{totalQsn}</Text>
                                        </View>
                                        {
                                        qsn.questionType === 'WORD_TO_TRANS' ?
                                            (<Text style={styles.qsnText}>{qsn.quesContent.word}</Text>)
                                            : qsn.questionType === 'AUD_TO_TRANS' ?
                                                (
                                                    <Icon
                                                        name="volume-up"
                                                        type="font-awesome"
                                                        size={60}
                                                        onPress={playSound}
                                                        />
                                                ) :
                                                qsn.questionType === 'AUD_TO_WORD' ?
                                                (
                                                    <Icon
                                                        name="volume-up"
                                                        type="font-awesome"
                                                        size={60}
                                                        // color=""
                                                        onPress ={playSound}
                                                        />
                                                ) :
                                                    qsn.questionType === 'TRANS_TO_WORD' ?
                                                            (<Text style={styles.qsnText}>{qsn.quesContent.transcript}</Text>)
                                                    : null    
                                        }
                                </View>
                                
                                    
                                <View style={styles.optionView}>
                                    
                                    {
                                        qsn.questionType === 'WORD_TO_TRANS' ?
                                            (
                                                <>
                                                    <OptionButton
                                                        option={qsn.option1.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option1.contentId}
                                                    />
                                                    <OptionButton
                                                        option={qsn.option2.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option2.contentId}
                                                    />
                                                    <OptionButton
                                                        option={qsn.option3.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option3.contentId}
                                                    />
                                                    <OptionButton
                                                        option={qsn.option4.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option4.contentId}
                                                    />
                                                </>    
                                            ) : qsn.questionType === 'AUD_TO_TRANS' ?
                                            (
                                                <>
                                                    <OptionButton
                                                        option={qsn.option1.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option1.contentId}
                                                    />
                                                    <OptionButton
                                                        option={qsn.option2.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option2.contentId}
                                                    />
                                                    <OptionButton
                                                        option={qsn.option3.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option3.contentId}
                                                    />
                                                    <OptionButton
                                                        option={qsn.option4.transcript}
                                                        checkCorrect={checkCorrect}
                                                        answered={answered}
                                                        qsnId={qsn.quesContent.contentId}
                                                        contentId={qsn.option4.contentId}
                                                    />
                                                    
                                                </>    
                                                ) : qsn.questionType === 'AUD_TO_WORD' ?
                                                    
                                                (
                                                    <>
                                                        <OptionButton
                                                            option={qsn.option1.word}
                                                            checkCorrect={checkCorrect}
                                                            answered={answered}
                                                            qsnId={qsn.quesContent.contentId}
                                                            contentId={qsn.option1.contentId}
                                                        />
                                                        <OptionButton
                                                            option={qsn.option2.word}
                                                            checkCorrect={checkCorrect}
                                                            answered={answered}
                                                            qsnId={qsn.quesContent.contentId}
                                                            contentId={qsn.option2.contentId}
                                                        />
                                                        <OptionButton
                                                            option={qsn.option3.word}
                                                            checkCorrect={checkCorrect}
                                                            answered={answered}
                                                            qsnId={qsn.quesContent.contentId}
                                                            contentId={qsn.option3.contentId}
                                                        />
                                                        <OptionButton
                                                            option={qsn.option4.word}
                                                            checkCorrect={checkCorrect}
                                                            answered={answered}
                                                            qsnId={qsn.quesContent.contentId}
                                                            contentId={qsn.option4.contentId}
                                                        />
                                                        
                                                    </>    
                                                    ) :
                                                    qsn.questionType === 'TRANS_TO_WORD' ?
                                                    (
                                                        <>
                                                            <OptionButton
                                                                option={qsn.option1.word}
                                                                checkCorrect={checkCorrect}
                                                                answered={answered}
                                                                qsnId={qsn.quesContent.contentId}
                                                                contentId={qsn.option1.contentId}
                                                            />
                                                            <OptionButton
                                                                option={qsn.option2.word}
                                                                checkCorrect={checkCorrect}
                                                                answered={answered}
                                                                qsnId={qsn.quesContent.contentId}
                                                                contentId={qsn.option2.contentId}
                                                            />
                                                            <OptionButton
                                                                option={qsn.option3.word}
                                                                checkCorrect={checkCorrect}
                                                                answered={answered}
                                                                qsnId={qsn.quesContent.contentId}
                                                                contentId={qsn.option3.contentId}
                                                            />
                                                            <OptionButton
                                                                option={qsn.option4.word}
                                                                checkCorrect={checkCorrect}
                                                                answered={answered}
                                                                qsnId={qsn.quesContent.contentId}
                                                                contentId={qsn.option4.contentId}
                                                            />
                                                        </>    
                                                        ):null
                                                
                                    } 
                                </View>   
            </View>
        </React.Fragment>
    )
}


export default QuizzComponent;

const OptionButton = (props) => {
    const {answered,qsnId,contentId,option,checkCorrect} =props
    return (
        <TouchableOpacity style={contentId === qsnId && answered ===qsnId ?
            styles.Correctoption : contentId === answered ?
                styles.WrongOption :styles.option
        }
             onPress={() =>checkCorrect(contentId,qsnId)}
        >
                <Text style={styles.optionText}>
                    {option}
                </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        // padding: 20,
        flex: 1,
        width: wp("100%"),
        alignItems:'center',
        backgroundColor:"#ebebeb"
    },
    qsnView: {
        paddingRight: wp('2%'),
        paddingLeft: wp("2%"),
        justifyContent:"space-evenly",
        alignItems: "center",
        width: wp("100%"),
        height:hp("25%")
    
    },
    qsnText: {
        margin:wp('2%'),
        fontSize: hp('5%'),
        fontWeight: "bold",
        color: "#f51b81",
    },
    optionView: {
        marginTop: hp("2%"),
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap:"wrap",
        width: wp("90%"),
        height: hp("70%"),
        borderRadius:20,
    },
    Correctoption: {
        width: "48%",
        height: "40%",
        justifyContent: "center",
        alignItems:"center",
        marginTop: "2%",
        backgroundColor: "#77a87f",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 25,
    },
    WrongOption: {
        width: "48%",
        height: "40%",
        justifyContent: "center",
        alignItems:"center",
        marginTop: "2%",
        backgroundColor: "#db7769",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 25,
    },
    option: {
        width: "48%",
        height: "40%",
        justifyContent: "center",
        alignItems:"center",
        marginTop: "2%",
        borderWidth: 2,
        borderColor:"white",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 25,
    },
    optionText: {
        fontSize: hp("2.5%"),
        color: "#0c789c",
        textAlign:"center"
    }
})