import React from 'react';
import {View,Text,StyleSheet,ProgressBarAndroid} from "react-native";
import {Card,ListItem,Avatar} from 'react-native-elements';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';

function CustomCards(props){
    const {title,maxScore,locked,score,completedWords,totalwords} =props
    return (
            <ListItem
            disabled={locked}
            friction={90} 
            tension={100} 
            activeScale={0.95} 
            linearGradientProps={{
                colors: ['#49a37f','#6aaade'],
                start: { x: 1, y: 0 },
                end: { x: 0.2, y: 0 },
            }}
            containerStyle={styles.containerStyle}
            >
                <ListItem.Content>
                    <View style={styles.listItemView}>
                    {/* <View style={styles.levelImg}/> */}
                        <View style={styles.levelInfoView}>
                            <ListItem.Title style={styles.listItemTitle}>
                            {title}
                            </ListItem.Title>
                            
                            <View>
                                
                            
                                {
                                locked ? <Text style={styles.lockedText}>Level is Locked</Text> :
                                    <>
                                        <Text style={styles.completedWordsText}> Total words {totalwords}</Text>
                                        <Text style={styles.pointsText}>{completedWords} Words completed</Text>
                                    </>
                                    
                                }
                                <ProgressBarAndroid 
                                styleAttr="Horizontal" 
                                indeterminate={false} 
                                progress={completedWords/totalwords} 
                                color="yellow" 
                                style={styles.progressBar}
                                />
                                
                            </View>
                        </View>
                        {locked?
                            <Avatar
                            size={100}
                            icon={{name: 'lock', type: 'font-awesome'}}
                        /> :
                        <Avatar
                            size={100}
                            icon={{name: 'unlock', type: 'font-awesome'}}
                        />
                    }
                    </View>
                </ListItem.Content>
                <ListItem.Chevron color="white" size={30} />
        </ListItem>      
    )
}

export default CustomCards;

const styles = StyleSheet.create({
    cardContainer:{
        flexDirection:"row"
    },
    containerStyle:{
        margin:hp("1%"),
        flexDirection:"row",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 7,
    },
    levelInfoView:{
        flex:1,
        justifyContent:"space-evenly",
        marginLeft:wp("5%"),
        width:wp("70%"),
    },
    progressBar:{
        width:"100%",
    },
    listItemView: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    listItemTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp("2.5%")
    },
    lockedText: {
        color: "yellow",
        fontSize: hp("2.1%")
    },
    completedWordsText: {
        marginTop: hp("1%"),
        fontSize: hp('2%'),
        color: "#383f6b"
    },
    pointsText: {
        fontSize: hp('2%'),
        color: "#383f6b"
    }
})