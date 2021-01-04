import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import {heightPercentageToDP as hp ,widthPercentageToDP as wp} from '../utils/react-native-responsive-screen'
function LandingPage(props) {
  const { navigation} =props
  return (
    <View style={styles.LndingPageView}>
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
        <View style={styles.logoView}>
          <Image
            source={require('../assets/logo1.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
              title="Pick a Language to learn"
              titleStyle={styles.titleStyle}
              buttonStyle={styles.buttonStyle}
              onPress={() => navigation.navigate("RegisterOption")}
            />
        </View>
    </View>
  );
}
export default LandingPage;
const styles = StyleSheet.create({
    LndingPageView: {
    flex: 1,
    backgroundColor: '#399668',
    alignItems:"center"
  },
  logoView:{
    position:"relative",
    width:wp("70%"),
    height:hp("35%"),
    backgroundColor:"white",
    borderRadius:25,
    top:hp("15%")
  },
  image:{
    width:"100%",
    height:"100%",
    borderRadius:25,
  },
  buttonView:{
    width:"100%",
    position:"absolute",
    top:"70%",
    alignItems:"center"
  },
  buttonStyle:{
    height:50,
    backgroundColor:"white",
    borderRadius:10,
    padding:20
  },
  titleStyle:{
    color:"#399668",
    fontSize:hp("3%"),
    fontWeight:"100"
  }

});
