import React from 'react';
import {View,StyleSheet,Text,ProgressBarAndroid,TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import HeaderWithGoBack from '../Components/HeaderWithGoBack';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {logOutRequest,resetLevelReq,resetLevelContent,resetUserProgress} from '../actions/index'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';
function ProfilePage(props) {
    
    const { user, level, levelContent,userProg } = props
    // console.log(level)

    let totalMaxScore =0

    level.CONTENT.forEach((l,i) => {
        totalMaxScore +=l.levelMaxScore
    });

    // console.log(totalMaxScore)
    const handleLogout = () => {
        props.resetUser(user)
        props.resetLevel(level)
        props.resetLevelContent(levelContent)
        props.resetUserProg(userProg)
    }
    return(
        <React.Fragment>
            <HeaderWithGoBack
                {...props}
                title="Profile"
            />
            <View style={styles.profileView}>
                <View style={styles.profileDetails}>
                        <Avatar
                            source={require('../assets/profileavatar.png')}
                            size={180}
                            avatarStyle={styles.avatarStyle}
                        />
                    <View>
                        <Text style={styles.textStyles}>{user.payload.CONTENT.firstName}</Text>
                        <Text style={styles.textStyles}>{user.payload.CONTENT.email}</Text>
                    </View> 
                </View>
                <View style={styles.progressBar}>
                    <Icon
                        name="verified-user"
                        size={50}
                        color="orange"
                    />
                    <View style={styles.progressBarView}>
                        <Text style={styles.progressScoreContent}>{userProg.CONTENT.userScore} points out of {totalMaxScore} </Text>
                        <ProgressBarAndroid
                                styleAttr="Horizontal" 
                                indeterminate={false} 
                                progress={userProg.CONTENT.userScore/totalMaxScore} 
                                color="yellow" 
                                style={{width:"100%"}}
                            />
                    </View>
                </View>
                <View style={styles.progressView}>
                    <Card
                        containerStyle={styles.cardContainer}
                    >
                        <View style={styles.cardContainerView}>
                            <Text style={styles.cardText}>Languages:</Text>
                            <Text style={{ ...styles.cardText, color: "#54718f", marginLeft: wp("4%") }}>{user.payload.CONTENT.languageList[0].language}</Text>
                        </View>   
                    </Card>
                    <Card
                        containerStyle={styles.cardContainer}
                    >
                        <View style={styles.cardContainerView}>
                            <Text style={styles.cardText}>Words Completed:</Text>
                            <Text style={{ ...styles.cardText, color: "#54718f", marginLeft: wp("4%") }}>{userProg.CONTENT.totalCompletedWords}</Text>
                        </View> 
                        
                    </Card>
                    <Card
                        containerStyle={styles.cardContainer}
                    >
                        <View style={styles.cardContainerView}>
                            <Text style={styles.cardText}>Status:</Text>
                            <Text style={{ ...styles.cardText, color: "#54718f", marginLeft: wp("4%") }}>{userProg.CONTENT.langStatus}</Text>
                        </View> 
                        
                    </Card>
                    <Card
                        containerStyle={styles.cardContainer}
                    >
                        <View style={styles.cardContainerView}>
                            <Text style={styles.cardText}>Score:</Text>
                            <Text style={{ ...styles.cardText, color: "#54718f", marginLeft: wp("4%") }}>{userProg.CONTENT.userScore}</Text>
                        </View> 
                        
                    </Card>
                    
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={handleLogout}
                    >
                            <Icon
                            name='exit-to-app'
                            color="#6f548f"
                            />
                        <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    
                </View>
            </View>
                    
                    
        </React.Fragment>
    )
}

const mapStateToProps =(state) =>{
    return {
        user: state.user,
        level: state.levelsData,
        levelContent: state.levelContent,
        userProg:state.userProgress
    }
}
const mapDispatchToProps =(dispatch) =>({
    resetUser: (data) => dispatch(logOutRequest(data)),
    resetLevel: (data) => dispatch(resetLevelReq(data)),
    resetLevelContent: (data) => dispatch(resetLevelContent(data)),
    resetUserProg: (data) => dispatch(resetUserProgress(data)),
})
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);

const styles = StyleSheet.create({
    profileView:{
        flex: 1,
        backgroundColor: "#33898f",
    },
    textStyles: {
        margin: hp("1%"),
        fontSize: hp("2.3%"),
        fontWeight: "bold",
        color:"white"
    },
    profileDetails:{
        width: wp("100%"),
        flexDirection: "row",
        height: hp("30%"),
        alignItems: "center",
        justifyContent:"space-around",
        
    },
    progressBar: {
        flexDirection: "row",
        width:wp("100%"),
        justifyContent:"center",
    },
    progressBarView: {
        width: wp("70%"),
        justifyContent: "flex-end" 
    },
    progressScoreContent: {
        fontSize: hp("1.7%"),
        fontWeight: "bold",
        marginLeft: wp("3%")
    },
    progressView: {
        top: hp("5%"),
        paddingTop:hp("2%"),
        width: wp("100%"),
        height: "100%",
        borderTopEndRadius: 60,
        borderTopStartRadius:60,
        backgroundColor: "white",
        alignItems:"center"
    },
    cardContainer: {
        width: wp("80%"),
        height: hp("6%"),
        borderRadius: 10,
    
        shadowColor: "#000",
        margin:hp("2.5%"),
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 8
        
    },
    cardContainerView: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    cardText: {
        fontSize: hp("2.3%"),
        fontWeight: "bold",
        color: "#6f548f",
        textTransform:"capitalize"
    },
    buttonStyle: {
        marginTop:hp("4.5%"),
        flexDirection: "row",
        width: wp("50%"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: hp("5%"),
        borderRadius: 10,
        shadowColor: "#000",
        margin:hp("2%"),
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 5,
        elevation: 15
    },
    logoutText: {
        fontSize: hp("2.3%"),
        marginLeft: wp("4%"),
        fontWeight: "bold",
        color: '#54718f'
    }
    
})