import React from 'react';
import { StyleSheet, ScrollView,TouchableOpacity,ActivityIndicator } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import CustomCards from '../Components/CustomCard';
import { connect } from 'react-redux';
import { ROOT_URL } from '../environment';
import axios from 'axios';
import { levelContentRequest } from '../actions/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from '../utils/react-native-responsive-screen';
function UserHome(props){
  const { levels, userProgData } = props
  const [loading, setLoading] = React.useState(false)
  const [levlId, setLevelId] = React.useState(1)
  const [levelName,setLevelName] =React.useState('')
  const handleClick = (lvlId,lvlName) =>{
    setLoading(true)
    setLevelId(lvlId)
    setLevelName(lvlName)
    // console.log(lvlId)
    props.getLevelContents({
      "fk_languageId":1,
      "fk_levelId":lvlId 
    })
  }

  // console.log(props)
  React.useEffect(() =>{
    if (props.levelContent.STS === "200") {
      setLoading(false)
      // console.log(levlId,levelName)
      props.navigation.navigate("levelDetail", {
        levlId: levlId,
        levlName:levelName
      })
    }
  }, [props.levelContent])
  
    return (   
        <>
                <CustomHeader {...props} title="Kannada"/>
              <ScrollView style={styles.containerView}>
                      {
                        levels.CONTENT.map(level =>(
                          <TouchableOpacity 
                            key={level.levelId}
                            onPress={() => handleClick(level.levelId,level.categoryName)}
                            disabled={loading?true:false || !(level.levelId <= userProgData.CONTENT.currLevelId)}
                          >
                            
                            <CustomCards 
                              title={level.categoryName}
                              completedWords={userProgData.CONTENT.currLevelId > level.levelId ?
                                (level.levelMaxScore / 2 >= 100 ? (level.levelMaxScore - 100) / 10 :
                                (level.levelMaxScore/20)
                                )
                                : userProgData.CONTENT.currLevelId == level.levelId ?
                                userProgData.CONTENT.completedWords:0
                              }
                              totalwords={
                                  level.levelMaxScore/2 >= 100 ? (level.levelMaxScore -100)/10 : level.levelMaxScore/20
                                }
                              maxScore={level.levelMaxScore}
                              locked={!(level.levelId <= userProgData.CONTENT.currLevelId)}
                              score={userProgData.CONTENT.currLevelId > level.levelId ?
                                level.levelMaxScore : userProgData.CONTENT.currLevelId == level.levelId ?
                                userProgData.CONTENT.completedWords*10:0
                              }
                            />
                          </TouchableOpacity>
                        ))
                      }
                    {loading ? 
                        (
                          
                              <ActivityIndicator
                                size="large"
                                color="#c2be46"
                                style={styles.activityStyle}
                              />
                            )
                          : null}
                    </ScrollView>
        </>
      
    )
}

const mapStateToProps =(state) =>{
  return {
    levels:state.levelsData,
    levelContent: state.levelContent,
    userProgData:state.userProgress
  }
}

const mapDispatchToProps =(dispatch) =>({
  getLevelContents:(data) =>dispatch(levelContentRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);

// const getlevelTotalWords = async(levelId) => {
//   const url = `${ROOT_URL}/adminSecure/getAllContent`;
//   const postData = {
//     "fk_languageId":1,
//     "fk_levelId":levelId
//   }
//   const requst = await axios.post(url, postData);

//   // console.log(requst.data.CONTENT.length)
//   return requst.data.CONTENT.length;
// }

const styles  = StyleSheet.create({
  containerView:{
    backgroundColor: "#d7d8db",
    height:hp("100%")
  },
  activityStyle: {
    position: "absolute",
    top: hp("50%"),
    left: wp("45%"),
    zIndex:1
  }
})