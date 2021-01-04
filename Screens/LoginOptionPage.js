import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux'
import * as Google from 'expo-google-app-auth';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../utils/react-native-responsive-screen';
import {logInRequest,setUserProgressRequest,languageRequest,levelRequest} from '../actions/index'
function LoginOptionPage(props) {
  const {navigation} = props
  const [loading,setLoading] = React.useState(false)
  const signIn = async() =>{
    try{
        await Google.logInAsync({
            androidClientId:"371785710764-omslvo1td435sns5lj99mhge53jai4dg.apps.googleusercontent.com",
            scopes:["profile", "email"]
        }).then(result => {
          if(result.type === "success"){
                props.login({
                  userEmailId: result.user.email,
                  userPassword:result.user.id
                })
            setLoading(true)
            }else{
              console.log("caceled")
          }
        })
    }catch(err){
        console.log(err)
    }
}
React.useEffect(() =>{
  if (loading) {
    if (props.userState.isLogedIN) {
      setLoading(false)
      // console.log("userstate",props.userState)
      navigation.navigate('Language')
    }
    else {

      setTimeout(() => {
        setLoading(false)
      }, 2000)
      alert("Sign In failed try again ")
    }
  }
},[props.userState])
  return (
 
    <View style={styles.LndingPageView}>
        <View style={styles.logo}>
          <Image
              source={require('../assets/logo2.png')}
              style={styles.image}
            />
        </View>
        <View style={styles.buttonView}>
                <TouchableOpacity
                        onPress={signIn}
                        disabled={loading}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In With Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => navigation.navigate("LoginPage")}
                        disabled={loading}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In With Email</Text>
                </TouchableOpacity>
        </View>
        <View style={styles.registerOptionView}>
              <Text style={styles.registerOptionText}> Don't Have an account ??</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate("RegisterOption")}
              >
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
        </View>
                {loading ? 
                        (
                          
                              <ActivityIndicator
                                size="large"
                                color="#c2be46"
                                style={styles.activityStyle}
                              />
                            )
                          : null}
    </View>
  );
}

const mapDispatchToProps =(dispatch) =>({
  login: (data) => dispatch(logInRequest(data)),
  choose:(data) => dispatch(languageRequest(data)),
  setUserProgress: (data) => dispatch(setUserProgressRequest(data)),
  getLevel:(data) => dispatch(levelRequest(data))
})
const mapStateToProps =(state) =>{
  return {
    userState :state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginOptionPage);

const styles = StyleSheet.create({
    LndingPageView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:"center"
  },
  logo:{
    position:"relative",
    width:wp("70%"),
    height:hp("35%"),
    borderRadius:25,
    top:hp("20%")
  },
  image:{
    width:"100%",
    height:"100%",
    borderRadius:25,
  },
  registerOptionView:{
      position:"absolute",
      bottom:hp("10%"),
      alignItems:"center"
  },
  buttonView:{
    width:wp("80%"),
    position:"absolute",
    bottom:hp("20%")
  },
  signIn: {
    width: '100%',
    height: wp("12%"),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: hp("2.1%"),
    fontWeight: 'bold'
  },
  activityStyle: {
    position: "absolute",
    top: hp("50%"),
    left: wp("45%"),
    zIndex:1
  },
  registerOptionText: {
    fontSize: hp("2.2%"),
    color: "#399668"
  },
  registerText: {
    fontSize: hp("2.1%"),
    fontWeight: "700",
    color: "#399668"
  }
});

