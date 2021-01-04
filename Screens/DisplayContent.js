import React from 'react';
import {StyleSheet,View,Text,TouchableOpacity,ActivityIndicator,Dimensions} from 'react-native';
import { Video, Audio } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import {Icon} from 'react-native-elements';
import CustomHeader from '../Components/CustomHeader';
import {connect} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import {updateUserProgess} from '../actions/index'
import OverLayModal from '../Components/OverLayModal';
import { wordIncrement, wordProgressScore } from '../environment';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';
function DisplayContents(props) {
    // const videoRef = React.useRef()
    const { userProgData ,navigation} = props
    const levelContent = props.levelContent.CONTENT;
    const [index,setIndex] = React.useState(props.route.params.index);
    const [content, setContent] = React.useState(levelContent[index]);
    const [loading, setLoading] = React.useState(true);
    const [isVisible, setVisible] = React.useState(false);
    const [audioUrl, setAudioUrl] = React.useState(content.audioPath);
    const [shouldPlay,setShouldPlay] = React.useState(false)
    const [videoUrl,setVideoUrl] = React.useState(content.videoPath)
    setTimeout(() => {
        setLoading(false);
    }, 1000);
    // let sound;
    // console.log(userProgData)
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
            shouldPlay:false
        }

        // sound.loadAsync({ uri: audioUrl },status,false)

        // sound.loadAsync({ uri: content.audioPath },status,false)
       // React.useEffect(() =>{
         //   async()=>{
           //     await sound.loadAsync({ uri: content.audioPath },status,false)
            //}
        //},[content.audioPath])

    
    const handleVisible = () => {
        
        if (index === userProgData.CONTENT.completedWords  && content.fk_levelId == userProgData.CONTENT.currLevelId) {
            props.updateProgress({
                ...userProgData.CONTENT,
                completedWords: userProgData.CONTENT.completedWords + wordIncrement,
                totalCompletedWords: userProgData.CONTENT.totalCompletedWords + wordIncrement,
                userScore:userProgData.CONTENT.userScore + wordProgressScore
            })
        }
        setVisible(!isVisible)
    }
    // console.log(userProgData.CONTENT,content)
    const handleNext = (i) => {
        setIndex(i);
        setLoading(true);

        if (index === userProgData.CONTENT.completedWords && content.fk_levelId == userProgData.CONTENT.currLevelId) {
            props.updateProgress({
                ...userProgData.CONTENT,
                completedWords: userProgData.CONTENT.completedWords + wordIncrement,
                totalCompletedWords: userProgData.CONTENT.totalCompletedWords + wordIncrement,
                userScore:userProgData.CONTENT.userScore + wordProgressScore
            })
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
    // console.log(videoRef)
    //audio..
    const playSound = async () => {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: content.audioPath }, status, false);
        const sts =await sound.playAsync();
        setTimeout(() => {
            sound.unloadAsync();
        },sts.playableDurationMillis)
    }
    React.useEffect(() => {
        setIndex(props.route.params.index)
        // sound.unloadAsync();

    },[props.route.params.index])
    
    React.useEffect(() => {
        if (index <levelContent.length) {
            setContent(levelContent[index])
            setAudioUrl(levelContent[index].audioPath)
            setVideoUrl(levelContent[index].videoPath)
        } 
    },[index])
    // console.log(props.route)
    const handleOnLoad = (plaback) => {
        // console.log(plaback)
        setShouldPlay(true)
    }
    return(
        <React.Fragment>
            <CustomHeader {...props} title={props.route.params.title} />
            <LinearGradient
                colors={['#33898f', 'transparent']}
                style={{
                width:"100%",
                height:"100%",
                }}
            >
                {loading ?
                    <ActivityIndicator
                        size="large"
                        color="#4287f5"
                        style={styles.activityStyle}
                    />
                    :(<View style={styles.mainView}>
                        <View style={styles.videoView}>    
                            <VideoPlayer
                                videoProps={{
                                    shouldPlay: shouldPlay,
                                    resizeMode: "cover",
                                    
                                    onLoad: handleOnLoad,
                                    source: {
                                        uri: content.videoPath,
                                    },
                                    
                                }}
                                debug={true}
                                // videoRef={videoRef}
                                
                                width={Dimensions.get('window').width}
                                height={Dimensions.get('window').height*0.4}
                            />
                                <View style={{backgroundColor:"#c5e5e8",padding:10}}>
                                    <Text
                                    style={styles.textStyle}
                                    >{content.word}</Text>
                                </View>
                        </View>
                        <View style={styles.contentView}>
                            <View>
                                    <TouchableOpacity onPress={playSound}>
                                        <Icon  
                                            name="volume-up"
                                            type="font-awesome"
                                            size={45}
                                            color="orange"
                                        />
                                    </TouchableOpacity>
                            </View>
                            <View style={styles.transcriptView}>
                                <View>
                                    <Text style={{...styles.textStyle,fontSize:hp("2.2%")}}>English</Text>
                                    <Text style={{ ...styles.textStyle, fontWeight: "normal", }}>{content.transcript}</Text>
                                </View>
                                <View>
                                    <Text style={{...styles.textStyle,fontSize:hp("2.2%"),}}>Literal Translation</Text>
                                    <Text style={{ ...styles.textStyle, fontWeight: "normal" }}>{content.word}</Text>
                                </View>
                            </View>
                            <View style={styles.buttonView}>
                                
                                { userProgData.CONTENT.completedWords < levelContent.length-1? 
                                    
                                (
                                    <TouchableOpacity style={styles.button}
                                    onPress={() => handleNext(index+1)}
                                    >
                                        <Text style={{...styles.textStyle,color:"white"}}>Ok Got it !</Text>
                                    </TouchableOpacity>
                                    ) :
                                    
                                (
                                    <TouchableOpacity style={styles.button}
                                    onPress={handleVisible}
                                    >
                                        <Text style={{...styles.textStyle,color:"white"}}>Ok Got it !</Text>
                                    </TouchableOpacity>
                                )
                        }
                        </View>
                        </View>
                    </View>)
                }
                {
                    // console.log(content.fk_levelId)
                    isVisible ?
                        <OverLayModal
                            isVisible={isVisible}
                            setVisible={handleVisible}
                            navigation={navigation}
                            levelId={content.fk_levelId}
                            languageId={content.fk_languageId}

                        /> :
                        null
                }
            </LinearGradient>
        </React.Fragment>
    )
}

const mapStateToProps = (state) =>{
    return{
        levelContent: state.levelContent,
        userProgData:state.userProgress
    }
}

const mapDispatchToProps =(dispatch) =>({
    updateProgress:(data) =>dispatch(updateUserProgess(data)),
    
})

export default connect(mapStateToProps,mapDispatchToProps)(DisplayContents);

const styles = StyleSheet.create({
    mainView:{
        flex:1,
        width:wp("100%"),
        alignItems: "center",
        backgroundColor:"white"
    },
    videoView: {
        width:wp("100%"),
        height:hp('40%'),
    },
    textStyle: {
        textAlign: "center",
        fontSize: hp("2.2%"),
        fontWeight: "bold",
        color: "#6f6285"   
    },
    contentView: {
        height: hp("50%"),
        width: wp("100%"),
        alignItems:"center",
        justifyContent:'space-evenly'
    },
    transcriptView: {
        justifyContent: "space-between",
        height:"30%"
    },
    buttonView: {
        width:wp("90%"),
    },
    button:{
        backgroundColor:"orange",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        height:hp("5%")
    },
    activityStyle: {
        position: "absolute",
        top:hp("40%"),
        left: wp("45%"),
        zIndex:1
      }
})