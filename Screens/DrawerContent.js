import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import { logOutRequest, resetLevelReq, resetLevelContent, resetUserProgress } from '../actions/index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';
function DrawerContent(props){
    const {user,level,levelContent,userProg} = props
    const handleLogOut =() =>{
        props.resetUser(user)
        props.resetLevel(level)
        props.resetLevelContent(levelContent)
        props.resetUserProg(userProg)
        // props.navigation.navigate('LandingPage')
    }
    return(
        <View style={{flex:1}}>
            <View style={styles.drawerHeader}>
                    <Image
                        style={{width:"100%",height:hp('25%')}}
                        source={require("../assets/logo2.png")}
                    />
            </View>
            <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
                    <DrawerItem
                            icon={({color,size}) =>(
                                <Icon
                                name="home"
                                color={color}
                                size={size}
                            />
                            )}
                            onPress={() => props.navigation.navigate('UserHome')}
                            activeTintColor="blue"
                            labelStyle={styles.labelStyle}
                            label="Home"
                        />
                    <DrawerItem
                            icon={({color,size}) =>(
                                <Icon
                                name="account"
                                color={color}
                                size={size}
                            />
                            )}
                            onPress={() => props.navigation.navigate('profilePage')}
                            labelStyle={styles.labelStyle}
                            label="Profile"
                        />
                        {/* <DrawerItem
                            icon={({color,size}) =>(
                                <Icon
                                name="translate"
                                color={color}
                                size={size}
                            />
                            )}
                            labelStyle={styles.labelStyle}
                            label="Choose Languages"
                        /> */}
                        <DrawerItem
                            icon={({color,size}) =>(
                                <Icon
                                name="message"
                                color={color}
                                size={size}
                            />
                            )}
                            onPress={() => props.navigation.navigate('feedback')}
                            labelStyle={styles.labelStyle}
                            label="Feedback"
                        />
                
            </DrawerContentScrollView>
            <View style={styles.drawerFooter}>
                <DrawerItem
                    icon={({color,size}) =>(
                        <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                    />
                    )}
                    onPress={handleLogOut}
                    labelStyle={styles.labelStyle}
                    label="Logout"
                />
            </View>
        </View>
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
export default connect(mapStateToProps,mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
    drawerHeader:{
        
        marginTop:hp('5%'),
        marginLeft:wp('8%'),
        width:"75%"
    },
    drawerContent:{
        marginLeft:wp("6%")
    },
    labelStyle:{
        fontSize:hp('2.4%'),
        fontWeight:"bold"
    },
    drawerFooter:{
        bottom:hp('2%'),
        marginLeft:wp("6%")
    }
})