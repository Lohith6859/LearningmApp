import React from 'react';
import { StyleSheet, Image,TouchableOpacity } from 'react-native';
import { Header, Icon } from "react-native-elements";
import { connect } from 'react-redux';
import {getQuizzData} from '../actions/index'
// import { Icon } from 'react-native-vector-icons/Icon';


function CustomHeader(props) {
    const [loading,setLoading] = React.useState(false)
    const { userProg,levels} = props
    let levSlno;
    //geting levelsl no
    levels.CONTENT.forEach(level => {
        if (level.levelId === userProg.CONTENT.currLevelId) {
            levSlno= level.levelSerialNo
        }
    });

    const handleQuizz = () => {
        props.getQuizz({
            fk_languageId:userProg.CONTENT.languageId,
            levelSerialNo:levSlno
        })
        setLoading(true);
        
    }
    React.useEffect(() => {
        if (loading) {
            if (props.quizzData.STS === '200') {
                setLoading(false)
                props.navigation.navigate('quizzPage')
            }
        }
    },[props.quizzData])
    
    return (
        <React.Fragment>
            <Header
                leftComponent={<LeftComponent {...props}/>}
                centerComponent={{ text: `${props.title}`, style: { color: '#fff', fontSize: 25 } }}
                rightComponent={<RightComponent  {...props} handleQuizz={handleQuizz}/>}
                linearGradientProps={{
                    colors: ['#399668','#33898f'],
                }}
                
                containerStyle={styles.containerStyle}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        quizzData: state.quizzData,
        userProg: state.userProgress,
        levels:state.levelsData
    }
}

const mapDispatchToProps = dispatch => ({
    getQuizz:(data) => dispatch(getQuizzData(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CustomHeader);
const LeftComponent = (props) => {
    return(
        <TouchableOpacity 
            onPress={props.navigation.openDrawer}
        >
            <Image source={require("../assets/Menu.png")} style={styles.menuStyle}/>
        </TouchableOpacity>
    )
}

const RightComponent = (props) => {

    
    return (
        <TouchableOpacity
        onPress={props.handleQuizz}
        >
            <Icon
            name="school"
            type='material'
            size={40}
            color='white'
            
         />
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    containerStyle:{
        height:"13%",
        borderBottomWidth:7,
        borderBottomColor:"#6b6464",
    },
    menuStyle:{
        width:40,
        height:40,
        marginLeft:10
    }
})