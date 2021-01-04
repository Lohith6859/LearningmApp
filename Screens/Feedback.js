import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity,ScrollView, Picker,Alert ,ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper'
import { Rating, } from 'react-native-elements';
import HeaderWithGoBack from '../Components/HeaderWithGoBack';
import {LinearGradient} from 'expo-linear-gradient'
import { connect } from 'react-redux';
import axios from 'axios';
import { ROOT_URL } from '../environment';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';


const postFeedBack = async (data) => {
    const url = `${ROOT_URL}/userProgress/provideFeedBack`;
    const request = await axios.post(url, data)
    // console.log(request)
    return request.data;
}

function FeedBack(props) {
    const {userProg} = props
    const [feedBack, setFeedBack] = React.useState('');
    const [rating, setRating] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const handleRating = (rating) => {
        setRating(rating)
    }
    const handleFeedback = (value) => {
        setFeedBack(value.nativeEvent.text)
    } 
    const handleSubmit = () => {
        setLoading(true)
        if (feedBack != '') {
            postFeedBack({
                userId:userProg.CONTENT.userId,
                languageId:userProg.CONTENT.languageId,
                ratings:rating,
                feedBack:feedBack
            }).then(res => {
                if (res.STS === '200') {
                    setFeedBack('');
                    setRating(0);
                    setLoading(false);
                    Alert.alert(
                        "Feedback Status",
                        "Thank you for provoding feedback"
                    )
                } else {
                    setFeedBack('');
                    setRating(0);
                    setLoading(false);
                    Alert.alert(
                        "Feedback Status",
                        "failed to submit feedback try again"
                    )
                }
            }).catch(err => {
                console.log(err);
                setFeedBack('');
                    setRating(0);
                    setLoading(false);
                    Alert.alert(
                        "Feedback Status",
                        "failed to submit feedback try again"
                    )
            })
        } {
            alert("Feedback is empty please give us \n your valuable feedback")
        }
    }

    return (
        <React.Fragment>
            <HeaderWithGoBack
                {...props}
                title="Feedback"
            />
                <LinearGradient
                colors={['#33898f', '#82baab']}
                style={{
                width:wp("100%"),
                height:hp("100%")
                }}
            >   
                <View style={styles.mainView}>
                   
                    <View style={styles.feedBackView}>
                    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                        <View style={{padding:15}}>
                            <Text style={styles.textStyle}>
                                    Give your feedback on learning Kannada language ,Your every feedback matters,
                                    and rate your experience.
                                </Text>
                            </View>
                            <TextInput
                                    style={{width:"85%",}}
                                    scrollEnabled
                                    multiline
                                    numberOfLines={10}
                                    theme={{ colors: { primary: '#5c8d9e',underlineColor:'transparent',}}}
                                    editable
                                    value={feedBack}
                                    onChange={handleFeedback}
                                    mode="outlined"
                                    placeholder="Provide Feedback"
                            />
                            <View style={{marginTop:hp("2%")}}>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    ratingColor="#e3cf5b"
                                    minValue={0}
                                    startingValue={rating}
                                    onFinishRating={handleRating}
                                    imageSize={40}
                                />
                            </View>
                            <View style={{width:"60%",marginTop:hp("3%")}}>
                                <TouchableOpacity style={styles.button}
                                    onPress={handleSubmit}
                                    disabled ={loading}
                                >
                                    {
                                        loading ?
                                            <ActivityIndicator />
                                            :<Text>Submit</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                            </ScrollView> 
                        </View>
                        
                </View>
                </LinearGradient>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        userProg: state.userProgress,
        // user:state.user
    }
}


export default connect(mapStateToProps,null)(FeedBack);

const styles = StyleSheet.create({
    mainView: {
        // flex:1,
        height: hp("100%"),
        width: wp("100%"),
        alignItems: "center",
    },
    feedBackView: {    
        top:hp('10%'),
        width:wp("80%"),
        height:hp("60%"),
        backgroundColor: "white",
        alignItems: "center",
        justifyContent:'space-around',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 20,
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: "space-around",
        alignItems: "center"  
    },
    textStyle: {
        fontSize: hp("2.5%"),
        fontWeight: "bold",
        color: "#5c8d9e",
        textAlign: "center"  
    },
    ratingView: {
        
    },
    button: {
        width: "100%",
        height: hp("4%"),
        alignItems: "center",
        justifyContent: "center",
        borderRadius:15,
        backgroundColor:"orange"
    },
    messageStyle: {
        borderWidth: 2,
        borderColor: "grey",
        borderRadius:20
    }
})