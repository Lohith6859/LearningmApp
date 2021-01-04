import React from 'react';
import {View,Text,StyleSheet,ProgressBarAndroid} from "react-native";
import {ListItem,Avatar,Card} from 'react-native-elements';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';
function CustomWordCard(props){
    const {isCompleted,word} = props
    return (
            <Card
            containerStyle={styles.containerStyle}
            >
                <View style={styles.wordStyle}>
                    <View style={styles.iconCellStyle}>
                            <Avatar
                                size={50}
                                icon={{name: 'bolt', type: 'font-awesome',color:"#20a89d"}}
                            />
                    </View>
                    <View style={styles.textCellStyle}>
                            <Text style={styles.wordText}>{word}</Text>
                    </View>
                    <View style={styles.iconCellStyle}>
                        {isCompleted?
                            <Avatar
                                size={50}
                                icon={{name: 'check', type: 'font-awesome',color:"#2fb55c",}}
                            />:
                            null
                        }
                        </View>       
                    </View>
            </Card>
                
    )
}

export default CustomWordCard;

const styles = StyleSheet.create({
    containerStyle:{
        margin: wp("1.7%"),
        // marginBottom:5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    wordStyle:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center"
    },
    textCellStyle:{
        width:"60%"
    },
    iconCellStyle:{
        width:"20%",
    },
    wordText: {
        fontSize: hp("3%"),
        fontWeight: "bold",
        color: "#441f70",
        textTransform: "capitalize"
    }
})