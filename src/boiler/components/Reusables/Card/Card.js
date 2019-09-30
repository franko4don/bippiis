import React, { Component } from 'react';
import { View } from 'react-native';
import { WHITE } from '../../../style/colors';

const Card = (props) => {

    const { containerStyle } = styles;

    const externalStyle = props.style ? props.style : {};

    return (
        <View   style={[containerStyle,  externalStyle]}>
            {props.children}
        </View>
    );
};


const styles = {

    containerStyle: {
        borderWidth: 0.1,
        borderRadius: 1,
        borderColor: "#efefea",
        backgroundColor: WHITE,
        borderBottomWidth: 0.1,
        shadowColor: "#ddd",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 3

    }

}

export { Card };
