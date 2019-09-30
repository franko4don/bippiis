import React from 'react';
import { Text as UText } from 'react-native'
import { FONTFAMILYREGULAR } from '../../../../fonts';

const Text = (props) => {

    return (
        <UText style={[styles.textStyle, props.style]}>
            {props.children}
        </UText>
    )
};

const styles = {
    textStyle: {
       fontFamily: FONTFAMILYREGULAR
    }
};


export { Text}