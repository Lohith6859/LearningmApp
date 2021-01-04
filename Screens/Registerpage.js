import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native';
import { Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux'
import {signUpRequest} from '../actions/index'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';

function RegisterPage(props) {
    const {navigation} =props;
    const [data,setData] = React.useState({
        firstName:'',
        lastName:'',
        email:'',
        userPassword:'',
    })
    const [isLoading,setLoading] =React.useState(false);
    const [error,setError] =React.useState({
        fNameErr:'',
        lNameErr:'',
        emailErr:'',
        passErr:'',
        confirmPassErr:''
    })

    const validateFname =() =>{
        let regex = /^[a-zA-Z ]{2,20}$/;
        if(regex.test(data.firstName)==false){
            setError({
                ...error,
                fNameErr:"Enter valid First Name"
            })
        }
        else{
            setError({
                ...error,
                fNameErr:''
            }) 
        }
    }
    const validateLname =() =>{
        let regex = /^[a-zA-Z ]{0,20}$/;
        if(regex.test(data.lastName)==false){
            setError({
                ...error,
                lNameErr:"Enter valid Last Name"
            })
        }
        else{
            setError({
                ...error,
                lNameErr:''
            })
        }
    }
    const validateEmail =() =>{
        let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if(regex.test(data.email)==false){
            setError({
                ...error,
                emailErr:"enter a valid email "
            })
        }
        else{
            setError({
                ...error,
                emailErr:''
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
        else{
            setError({
                ...error,
                passErr:''
            })
        }
    }
    
    const [isDissable,setDissable] = React.useState(true)
    const setFirstName =(val) =>{
        if(val.length!==0){
           
                setData({
                    ...data,
                    firstName:val
                })
            
            
        }
    } 
    const setLastName = (val) =>{
        if(val.length!== 0){
            
                setData({
                    ...data,
                    lastName:val
                })
        }
    }
    const setEmail =(val) =>{
        if(val.length!== 0){
           
                setData({
                    ...data,
                    email:val
                })
                 
        }
    }

    const setPassword = (val) =>{
        if(val.length!== 0){
            
                setData({
                    ...data,
                    userPassword:val
                })
            
        }
    }

    const setConfirmPassword = (val) =>{
        if(val.lenght !== 0 && val === data.userPassword){
            setError({
                ...error,
                confirmPassErr:''
            })
            setDissable(false);   
        }
        else{
            setError({
                ...error,
                confirmPassErr:"password did not match"
            })
        }
    }
 
    const onSubmit = () =>{
            props.signup({
                ...data
            }) 
        setLoading(true)
    }
    React.useEffect(()=>{
        if (isLoading) {
            if(props.userState.isRegistered){
                setLoading(false)
                navigation.navigate("Language")
            }
            else {
                setLoading(false)
                alert("Sign Up failed try again")
            }
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
                        height:"100%",
                    }}
                    />
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                {/* input fields start */}
                <ScrollView>
                            <Input
                                placeholder='First Name'
                                inputContainerStyle={styles.action}
                                inputStyle={styles.textInput}
                                onChangeText={(val) => setFirstName(val)}
                                keyboardType="default"
                                onBlur ={validateFname}
                                leftIcon={
                                    <FontAwesome
                                    name='user'
                                    size={24}
                                    />
                                }
                            />
                            <Text style={{color:"red",marginLeft:30}}>{error.fNameErr}</Text>
                            <Input
                                placeholder='Last Name'
                                inputContainerStyle={styles.action}
                                inputStyle={styles.textInput}
                                keyboardType="default"
                                onBlur={validateLname}
                                onChangeText={(val) => setLastName(val)}
                                leftIcon={
                                    <FontAwesome
                                    name='user'
                                    size={24}
                                    />
                                }
                            />
                            <Text style={{color:"red",marginLeft:30}}>{error.lNameErr}</Text>
                            <Input
                                placeholder=' Your Email'
                                inputContainerStyle={styles.action}
                                inputStyle={styles.textInput}
                                onBlur={validateEmail}
                                keyboardType="email-address"
                                onChangeText={(val) =>setEmail(val)}
                        
                                leftIcon={
                                    <FontAwesome
                                    name='envelope'
                                    size={24}
                                    />
                                }
                            />  
                            <Text style={{color:"red",marginLeft:30}}>{error.emailErr}</Text>
                            <Input
                                placeholder='Password'
                                inputContainerStyle={styles.action}
                                inputStyle={styles.textInput}
                                secureTextEntry={true}
                                onBlur={validatePass}
                                onChangeText={(val) =>setPassword(val)}
                                leftIcon={
                                    <FontAwesome
                                    name='lock'
                                    size={24}
                                    />
                                }
                            />
                            <Text style={{color:"red",marginLeft:30}}>{error.passErr}</Text>
                            <Input
                                placeholder='Confirm Password'
                                inputContainerStyle={styles.action}
                                inputStyle={styles.textInput}
                                secureTextEntry={true}
                                onChangeText={(val) =>setConfirmPassword(val)}
                                leftIcon={
                                    <FontAwesome
                                    name='lock'
                                    size={24}
                                    />
                                }
                            />
                            <Text style={{color:"red",marginLeft:30}}>{error.confirmPassErr}</Text>
                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>
                                By signing up you agree to our
                            </Text>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                        </View>
                        {/* SUbmit buttons */}
                        <View style={styles.button}>
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={onSubmit}
                                disabled={isDissable || isLoading}
                            >
                            <LinearGradient
                                colors={['#33898f', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color:'#fff'
                                }]}>Sign Up</Text>
                            </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("LoginPage")}
                                style={[styles.signIn, {
                                    borderColor: '#009387',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#009387'
                                }]}>Sign In</Text>
                            </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
            {
                isLoading?(
                          
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

const mapStateToProps = (state) =>{
    // console.log(state)
    return {
        userState :state.user
    }
}

const mapDispatchToProps = (dispatch) =>({
    signup: (data) => dispatch(signUpRequest(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);




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
        fontSize: hp("3.5%")
    },
    text_footer: {
        color: '#05375a',
        fontSize: hp("2.1%")
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: hp("4%")
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: hp("2.1%"),
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    activityStyle: {
        position: "absolute",
        top: "50%",
        left: "45%",
        zIndex:1
      }
  });
