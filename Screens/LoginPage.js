import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,Platform,ActivityIndicator} from 'react-native';
import { Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { logInRequest } from '../actions/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../utils/react-native-responsive-screen';
function LoginPage(props) {
  const { navigation } = props
  const [loading,setLoading] = React.useState(false)
  // let {userState} = props
  const [data,setData] =React.useState({
    userEmailId:'',
    userPassword:''
  })
  const [error,setError] =React.useState({
    emailErr:'',
    passErr:'',
  })
  const setEmail = (val)=>{
    if(val.length!==0){
      setData({
        ...data,
        userEmailId:val
      })
    }
  }
  const setPassword =(val) =>{
    if(val.length!==0){
      setData({
        ...data,
        userPassword:val
      })
    }
  }
  const validateEmail =() =>{
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(regex.test(data.userState)==false){
        setError({
            ...error,
            emailErr:"enter a valid email "
        })
    }
}
const validatePass =() =>{
    let regex = /^[A-Za-z]\w{7,14}$/;
    if(regex.test(data.userPassword)==false){
        setError({
            ...error,
            passErr:"password should contain minimum 6 charecters"
        })
    }
}
  const onSubmit = () =>{
        props.login({
          ...data
        })
    setLoading(true)

  }
  React.useEffect(() =>{
    // console.log(userState)
    if (props.userState.isLogedIN) {
      setLoading(false)
      navigation.navigate("Language")
    }
    else {
      setTimeout(() => {
        setLoading(false)
      },2000)
    }
 },[props.userState])
  return (
    <View style={styles.container}>
          <View style={styles.header}>
              <LinearGradient
                  colors={['#33898f', 'transparent']}
                  style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height:hp("100%"),
                  }}
                  />
              <Text style={styles.text_header}>Sign In  !</Text>
          </View>
          <Animatable.View 
              animation="fadeInUpBig"
              style={styles.footer}
          >
            <ScrollView style={styles.signView}>
                <Input
                  placeholder='Email'
                  inputContainerStyle={styles.action}
                  inputStyle={styles.textInput}
                  keyboardType="email-address"
                  onChangeText={(val) => setEmail(val)}
                  leftIcon={
                      <FontAwesome
                      name='envelope'
                      size={24}
                      />
                  }
                />             
                <Input
                    placeholder='Password'
                    inputContainerStyle={styles.action}
                    inputStyle={styles.textInput}
                    secureTextEntry={true}
                    onChangeText={(val) =>setPassword(val)}
                    leftIcon={
                        <FontAwesome
                          name='lock'
                          size={24}
                        />
                      }
                />
                <View style={styles.textPrivate}>
                  <Text style={styles.color_textPrivate}>Forgot Password ?</Text>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                      style={styles.signIn}
                     onPress={onSubmit}
                     disabled={loading}
                  >
                      <LinearGradient
                          colors={['#33898f', '#01ab9d']}
                          style={styles.signIn}
                      >
                          <Text style={[styles.textSign, {
                              color:'#fff'
                          }]}>Sign In</Text>
                      </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => navigation.navigate("RegisterOption")}
                      style={[styles.signIn, {
                          borderColor: '#009387',
                          borderWidth: 1,
                          marginTop: 15
                      }]}
                  >
                      <Text style={[styles.textSign, {
                          color: '#009387'
                      }]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
          </Animatable.View>
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
  login :(data) => dispatch(logInRequest(data))
})
const mapStateToProps =(state) =>{
  return {
    userState :state.user
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: wp("5%"),
        paddingBottom: hp("5%")
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: hp('4%')
    },
    text_footer: {
        color: '#05375a',
        fontSize: hp("2.1")
    },
    signView:{
      marginTop:hp("10%")
    },
    action: {
        flexDirection: 'row',
        marginTop: hp("1%"),
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: wp("3%"),
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
    },
    signIn: {
        width: '100%',
        height: hp("6%"),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:hp("2%"),
        borderRadius: 10
    },
    textSign: {
        fontSize: hp("2.1%"),
        fontWeight: 'bold'
    },
    textPrivate: {
      alignItems:"center",
      marginTop: hp("2%")
  },
  color_textPrivate: {
      color: 'gray',
      fontWeight:"bold"
  }
  });
