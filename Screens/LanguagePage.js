import React from 'react';
import { StyleSheet, Text, View ,} from 'react-native';
import { Button,ListItem,Card,Icon} from 'react-native-elements';
// import { List } from 'react-native-paper';
import {connect} from 'react-redux';
import { languageRequest, levelRequest, updateUserProgess, setUserProgressRequest } from '../actions/index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';

function LanguagePage(props){
    const { navigation,userState} =props
    const LangData =[
        "Kannada",
    ]
    const handleChose = (l) => {
        // console.log("handlechoose")
        props.getLevel({
            "fk_languageId":1  
        })
    }
    const handleClick = () => {  
        props.setUserProgress({
            CONTENT: {
                ...userState.CONTENT.userProgList[0]
            }
        })
        props.getLevel({
            "fk_languageId":1  
        })
    }
    React.useEffect(() => {
        if (props.levels.STS === "200") {
            if (userState.isRegistered) {
                const leveldata = props.levels.CONTENT[0]
                props.updateProgress({
                    userId: userState.CONTENT.userId,
                    languageId: leveldata.fk_languageId,
                    currLevelId: leveldata.levelId,
                    completedWords: 0,
                    userScore: 0,
                    isLvlAsntComplt: 'N',
                    isCurLvlAsgnTkn: 'N',
                    levelSerialNo: leveldata.levelSerialNo,
                    totalCompletedWords:0,
                })
            }
            if (userState.CONTENT.isLanguageChoosen === "N") {
                const leveldata = props.levels.CONTENT[0]
                props.updateProgress({
                    userId: userState.CONTENT.userId,
                    languageId: leveldata.fk_languageId,
                    currLevelId: leveldata.levelId,
                    completedWords: 0,
                    userScore: 0,
                    isLvlAsntComplt: 'N',
                    isCurLvlAsgnTkn: 'N',
                    levelSerialNo: leveldata.levelSerialNo,
                    totalCompletedWords:0,
                })
            }
            if (userState.CONTENT.isLanguageChoosen === 'Y') {
                if (props.levels.STS == '200') {
                    props.choose({
                        ...userState
                    })
                }
            }
            if (props.userProgData.STS == "200") {
                props.choose({
                    ...userState
                })
            }
        }

    }, [props.levels, props.userProgData])
    
    return(
        <React.Fragment>
            {
                userState.CONTENT.isLanguageChoosen === 'Y'
                ? renderSelectedLanguage(userState.CONTENT.languageList,handleClick):
                renderLanguageList(LangData, handleChose)}
       </React.Fragment>
    )
}
const renderSelectedLanguage = (langList,handleClick) => {
    return (
        <View style={{...styles.languagePageView,backgroundColor:"#33898f"}}>
        <View style={styles.nativeLangView}>
            <Text style={styles.langText}>My Languages Are </Text>
        </View>
        <View style={styles.selectedOuterView}>

                        {
                    langList.map(l => (
                        <Card containerStyle={styles.selectedlangView} key={l.languageId}>
                            <View style={styles.langListStyle}>
                                <Text style={styles.langListText}>{l.language}</Text>
                            <Icon
                                name="chevron-right"
                                type="font-awesome"
                                color="green"
                                onPress={handleClick}
                            />
                            </View>
                        </Card>
                            ))
                        }
        </View>
    </View>
    )
}

const renderLanguageList = (LangData,handleChose) => {
    return (
        <View style={styles.languagePageView}>
        <View style={styles.nativeLangView}>
            <Text style={{fontSize:30,color:"#33898f"}}>I speak </Text>
            <Button
                title="English"
                type="outline"
                titleStyle={styles.titleStyle}
                buttonStyle={styles.buttonStyle}
                onPress={() => {}}
            />
        </View>
        <Text style={styles.chooseLangText}>I want to learn</Text>
        <View style={styles.outerView}>
            
                    <View style={styles.languageView}> 
                    {
                        LangData.map((l,i) =>(
                            <ListItem key={i} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title style={styles.listTitle}>{l}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron size={30} color="#33898f" onPress={handleChose}/>
                            </ListItem>
                        ))
                    }
                 </View>
        </View>
    </View>
    )
}
const mapStateToProps =(state) =>{
    return {
        userState: state.user,
        levels: state.levelsData,
        userProgData:state.userProgress
    }
}
const mapDispatchToProps =(dispatch) =>({
    choose: (data) => dispatch(languageRequest(data)),
    updateProgress: (data) => dispatch(updateUserProgess(data)),
    getLevel: (data) => dispatch(levelRequest(data)),
    setUserProgress: (data) => dispatch(setUserProgressRequest(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(LanguagePage);

const styles = StyleSheet.create({
    languagePageView:{
        flex:1,
        alignItems:"center"
    },
    nativeLangView:{
        width:wp("100%"),
        top:hp("15%"),// 27% to 15% reduced.
        flexDirection:"row",
        justifyContent:"center"
    },
    chooseLangText:{
        top:hp("17%"),
        fontSize:hp("3.5%"),
        color:"#33898f"
    },
    buttonStyle:{
        width:wp("37%"),
        borderWidth:2,
        borderRadius:30,
        borderColor:"#33898f",
    },
    titleStyle:{
        textAlign:"center",
        fontSize:hp("2.5%"),
        fontWeight:"600",
        color:"#33898f"
    },
    outerView:{
        top:hp("22%"),
        width:wp("75%"),
        alignItems:"center",
        justifyContent:"center",
        minHeight:hp("10%"),
        backgroundColor:"#33898f",
        borderRadius:35,
        transform:[
            {rotate:"-2deg"}
        ]
    },
    selectedOuterView: {
        top:hp("30%"),
        width: wp("75%"),
        minHeight:hp("35%"),
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        borderRadius:35,
    },
    selectedlangView: {
        width:"80%",
        // margin: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
    languageView:{
        position:"relative",
        width:"80%",
        margin:20,
        transform:[
            {rotate:"2deg"}
        ]
    },
    listTitle:{
        fontSize:hp("3%"),
        color:"#33898f"
    },
    langText: {
        fontSize: hp("3.5%"),
        color: "white",
        fontWeight: "bold"
    },
    langListStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    langListText:{
        fontSize: hp("3%"),
        color: "#33898f"
    }
})