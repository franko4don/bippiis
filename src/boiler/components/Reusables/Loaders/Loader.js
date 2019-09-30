import React, {Component} from 'react'
import {View, Image, Animated, StatusBar, Text, Easing, Modal} from 'react-native';
import { LOGO } from '../../../style/images';
import { calculateOpacity } from '../../../../Helper';
import { WHITE } from '../../../style/colors';


class Loader extends Component{

    constructor(props){
        super(props);
        this.state = {
            spinValue: new Animated.Value(0),
            opacity: new Animated.Value(0.25),
        }
    }

    componentWillMount(){
        this.startAnimation();
    }

    startAnimation(){
       
        Animated.loop(
            Animated.sequence([
              Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear
              }),
              Animated.timing(this.state.opacity, {
                toValue: 0.25,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear
              })
            ])
          ).start();
    }

    render(){
       
        return (
            <Modal
            transparent={true}
            visible={true}
            onRequestClose={() => { console.log(true)}}
            animationType="fade"
            style={{backgroundColor: '#000000'+calculateOpacity(50)}}
            >
            <StatusBar hidden={true}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000'+calculateOpacity(50)}}>
                <View style={{}}>
                    
                    <Animated.Text style={{color: WHITE, textAlign: 'center', paddingTop: 5, fontSize: 20, opacity: this.state.opacity}}> Capturing ...{this.props.text}</Animated.Text>
                </View>
            </View>

            </Modal>
        )
    }
}

export {Loader}