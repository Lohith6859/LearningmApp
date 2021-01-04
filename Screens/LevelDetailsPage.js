import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-elements'
import CustomHeader from '../Components/CustomHeader';
import CustomWordCard from '../Components/CustomWordCard';


import {connect} from 'react-redux';
import { getlevelAssesment } from '../actions/index';
// import { FAB } from 'react-native-paper';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
  } from '../utils/react-native-responsive-screen';
function LevelDetailsPage(props) {
    const [visibleButton, setVisibleButton] = React.useState(false);

    const { levelContent, navigation,userProgData } = props
    const [loading,setLoading] =React.useState(false)
    const handleClick = (index) => {
        navigation.navigate("contentsPage",{
            index: index,
            title:props.route.params.levlName
        })
    }
    // console.log(props.route.params,userProgData.CONTENT.currLevelId)
    React.useEffect(() => {
        // console.log(userProgData.CONTENT.completedWords)
        if (props.route.params.levlId === userProgData.CONTENT.currLevelId &&
            userProgData.CONTENT.completedWords === levelContent.CONTENT.length)
         {
            setVisibleButton(true)
        }
        else {
            setVisibleButton(false)
        }
    },[userProgData.CONTENT.completedWords])
    React.useEffect(() => {
        if (loading) {
            // console.log(props.assementData)
            if (props.assementData.STS == '200') {
                setLoading(false)
                props.navigation.navigate('assesmentPage')
            }
            else {
                setLoading(false)
                alert("something went wrong try again later")
            }
        }
    },[props.assementData])
    // console.log(levelContent)
    const handleAssesment = () => {
        setLoading(true);
        props.getLevelAssesment({
            fk_languageId: levelContent.CONTENT[0].fk_languageId,
            fk_levelId:levelContent.CONTENT[0].fk_levelId
        })
    }

    React.useEffect(() => {
        if (loading) {
            if (props.assementData.STS == '200') {
                setLoading(false)
                props.navigation.navigate('assesmentPage')
            }
            else {
                alert("something went wrong try again later")
            }
        }
    },[props.assementData])
    return(
        <React.Fragment>
            <CustomHeader {...props} title={props.route.params.levlName}/>
            <ScrollView style={styles.detailView}>
                        {
                            levelContent.CONTENT.map((content,index)=> (
                                <TouchableOpacity
                                    key={content.contentId}
                                    onPress={() => handleClick(index)}
                                >
                                    <CustomWordCard
                                        word={content.word}
                                        isCompleted={content.fk_levelId < userProgData.CONTENT.currLevelId ?
                                            true:index < userProgData.CONTENT.completedWords}
                                    />
                                </TouchableOpacity>
                            )) 
                        }
                        {
                            visibleButton?
                            (<View style={styles.buttonView}>
                                <Button
                                    title="Take Assement"
                                    titleStyle={{fontSize:hp("3%")}}
                                    containerStyle={{margin:wp("2%"),width:wp("95%"),borderRadius:10}}
                                    onPress={handleAssesment}
                                />
                            </View>):null
                        }
                        
                        
                </ScrollView>
                {/* {
                    visibleButton?(
                        <FAB
                            style={styles.fab}
                            label="take Assesment"
                            icon="pencil"
                            onPress={() => props.navigation.navigate('assesmentPage')}
                        />
                    ):null
                } */}
        </React.Fragment>
    )
}

const mapStateToProps =(state) =>{
    return{
        levelContent: state.levelContent,
        userProgData: state.userProgress,
        assementData:state.assesmentData
    }
}
const mapDispatchToProps = (dispatch) => ({
    getLevelAssesment:(data) => dispatch(getlevelAssesment(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(LevelDetailsPage); 


const styles = StyleSheet.create({
    detailView: {
        
        width:wp("100%"),
        height: hp("100%"),
        backgroundColor: "white",
        
    },
    buttonView: {
        // flexGrow:1,
        width: "100%",
        alignItems:"center"
        // justifyContent:"space-around"  
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})