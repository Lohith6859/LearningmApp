import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import {updateUserProgess} from '../actions/index'
import { connect } from 'react-redux';
import { progressPercent } from '../environment';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';
function AssesmentOverOverlay(props) {
    const { isGameOver, points, userProg, levelsData,setGameOver,setPoints,setCurrQsn} = props
    const [cleared,setcleared] = React.useState(false)
    const [allLevelCompleted,setAllLveleCompleted] =React.useState(false)
    let maxScore
    let currLevelIndex
    let currlevlSlNo;
    let maxLevlId;
    //to get level maxscore and current level index
    levelsData.CONTENT.forEach((level,i) => {
        if (level.levelId === userProg.CONTENT.currLevelId) {
            maxScore = level.levelMaxScore
            currLevelIndex = i
            currlevlSlNo =level.levelSerialNo
        }
        //get the last level
        if (!level.levelId + 1) {
            maxLevlId = level.levelId
        }
    })

    React.useEffect(() => {
        if (maxScore * progressPercent <= userProg.CONTENT.userScore + points ) {
            setcleared(true)
            if (userProg.CONTENT.currLevelId === maxLevlId) {
                setAllLveleCompleted(true);
            }
        }
    },[])
    
    const [visible, setVisible] = React.useState(isGameOver);
    const handleYes = () => {
        // console.log(cleared)
        if (cleared) {
            // console.log("here")

            props.updateUserProg({
                ...userProg.CONTENT,
                completedWords:0,
                levelSerialNo:currlevlSlNo,
                userScore:userProg.CONTENT.userScore + points,
                currLevelId: levelsData.CONTENT[currLevelIndex + 1].levelId,
                isCurLvlAsgnTkn: "Y",
                isLvlAsntComplt:"Y"
            })

        }
        else {
            props.updateUserProg({
                ...userProg.CONTENT,
                isCurLvlAsgnTkn: "Y",
                isLvlAsntComplt:"N"
            })
        }
        setVisible(false)
        setGameOver(false)
        setPoints(0);
        setCurrQsn(1)
       props.navigation.navigate('UserHome')
    }

    return (
        
            <Overlay
                isVisible={visible}
                overlayStyle={styles.overLayView}
            >
                <React.Fragment>
                <View style={{flexGrow:0.5,justifyContent:"space-around"}}>
                    {
                        allLevelCompleted?
                        (
                            <Image
                            style={styles.tinyLogo}
                            source={require("../assets/congratsImg.png")}
                            />
                        ):(
                            <>
                               <Image
                                style={styles.tinyLogo}
                                source={require("../assets/gameover.jpg")}  
                                />
                                <Text style={{...styles.textStyle,fontSize:35,}}>
                                    {points} points 
                                </Text>
                                    { 
                                        cleared ?
                                        (
                                            <Text style={{...styles.textStyle,fontSize:20,color:"#67a35f"}}>
                                                You have unlocked the {"\n"}next level congrats  !!
                                            </Text>
                                        ) :
                                        (
                                            <Text style={{...styles.textStyle,fontSize:20,color:"#f25633",}}>
                                                Retake the assement to {"\n"}unlock next level !
                                            </Text>
                                        )         
                                 }
                            </>
                        )
                    }
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Ok"
                        onPress={handleYes}
                        titleStyle={{fontSize:20}}
                        buttonStyle={{backgroundColor:"#41abd1"}}
                        containerStyle={styles.containerStyle}
                    />
                </View>
                </React.Fragment>
            </Overlay>
        
    )
}


const mapDispatchToProps = (dispatch) => ({
    updateUserProg:(data) => dispatch(updateUserProgess(data)),
})

const mapStateToProps = (state) => {
    return {
        levelsData: state.levelsData,
        userProg:state.userProgress
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AssesmentOverOverlay);

const styles = StyleSheet.create({
    overLayView: {
        backgroundColor:"white",
        width: "80%",
        height: "50%",
        justifyContent:"space-around"
    },
    tinyLogo: {
        height: "30%",
        width: "100%",
        borderRadius:10
    },
    textStyle: {
        fontSize: 25,
        fontWeight:"bold",
        textAlign: "center",
        color:"orange"
    },
    buttonView: {
        width: "100%",
        // backgroundColor:"red",
        flexDirection: "row",
        justifyContent:"space-around"
    },
    containerStyle: {
        width: "40%",
    }
})