import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements'
import {Header} from "react-native-elements";


function HeaderWithGoBack(props){
    return (
        <React.Fragment>
            <Header
                leftComponent={<LeftComponent {...props}/>}
                centerComponent={{text:`${props.title}`,style:{color: '#fff',fontSize:30}}}
                // rightComponent={{icon:"user-circle-o",color:"#ffff",type:"font-awesome",size:30}}
                linearGradientProps={{
                    colors: ['#399668','#33898f'],
                }}
                containerStyle={styles.containerStyle}
            />
        </React.Fragment>
    )
}

export default HeaderWithGoBack;

const LeftComponent = (props) => {
    return(
        <TouchableOpacity 
            onPress={() =>props.navigation.goBack()}
        >
            <Icon
                name='keyboard-backspace'
                type='material'
                size={40}
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