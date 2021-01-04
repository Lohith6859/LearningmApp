import React  from 'react';
import {View,Image,Text,TouchableOpacity,Button,StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const pages = [
    {
        backgroundColor: '#fff',
      image: <Image source={require('../assets/language-word-concept.jpg')} 
      style={{ 
        width: '70%', 
        height: 250, 
          borderRadius:20,
          // borderWidth: 1,
          // borderColor: 'red', 
        }} />,
      title: '',
      subtitle: 'Select any local language\n you want to learn',
    },
    {
      backgroundColor: '#fff',
    image: <Image source={require('../assets/usingAppGif.gif')} 
    style={{ 
      width: '80%', 
      height: 250, 
      borderRadius:20, 
    }} />,
    title: '',
    subtitle: 'Complete all the levels by playing\n all the audio and video clips',
    },
    {
        backgroundColor: '#fff',
      image: <Image source={require('../assets/boy_and_girl.png')} 
      style={{ 
        width: 300, 
        height: 250, 
        borderRadius:20, 
      }} />,
      title: '',
      subtitle: 'Start to speak with anyone\n anywhere anytime',
    }
]
const DoneButton =({...props}) =>{
  return(
<TouchableOpacity
{...props}
>
  <Text style={{ left:-20, fontSize:15 }}>Start</Text>
</TouchableOpacity>
  )
}
function OnBoardScreen(props){
    const {navigation} = props
    return (
        <Onboarding
        imageContainerStyles={styles.imageContainerStyles}
        onSkip={() => navigation.navigate("LandingPage")}
        onDone={() =>navigation.navigate("LandingPage")}
        // DoneButtonComponent ={DoneButton}
        pages={pages}
        />
    )
}

export default OnBoardScreen;
const styles = StyleSheet.create({
  imageContainerStyles:{
    
  }
})