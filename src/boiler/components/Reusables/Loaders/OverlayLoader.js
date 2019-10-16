import React, {Component} from 'react'
import {View, Image, Animated, StatusBar, Text, Easing, Modal} from 'react-native';
import { LOGO } from '../../../style/images';
import { calculateOpacity } from '../../../../Helper';
import { WHITE } from '../../../style/colors';


class OverlayLoader extends Component{

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
            Animated.timing(
                this.state.spinValue,
            {
                toValue: 1,
                useNativeDriver: true,
                duration: 5000,
                easing: Easing.linear
            }
        )).start()

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
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          });
        return (
            <Modal
                transparent={true}
                visible={true}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
                style={{backgroundColor: '#000000'+calculateOpacity(50)}}
            >
            <StatusBar translucent={true} backgroundColor={'#000000'+calculateOpacity(50)}/>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000'+calculateOpacity(50)}}>
                <View style={{}}>
                    <Animated.Image
                        source={LOGO}
                        style={{width: 100, height: 100, transform: [{rotate: spin}], opacity: this.state.opacity}}
                        resizeMode={'contain'}
                    />
                    
                    <Animated.Text style={{color: WHITE, textAlign: 'center', paddingTop: 5, opacity: this.state.opacity}}> Processing ...{this.props.text}</Animated.Text>
                </View>
            </View>

            </Modal>
        )
    }
}

export {OverlayLoader}