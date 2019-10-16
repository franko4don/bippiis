import React, { Component } from 'react';
import { Dimensions, Modal, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {toggleErrorModal} from './../../../redux/actions';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';
import { SUCCESS, ERROR } from '../../../style/images';


class ErrorModal extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const {width} = Dimensions.get('screen');
        return (
             
            <Modal
                transparent={true}
                visible={this.props.showErrorModal}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
                
            >
                <StatusBar translucent={true} backgroundColor={'#000000'+calculateOpacity(50)}/>
               
                <View style={{backgroundColor: '#000000'+calculateOpacity(50), flex: 1, justifyContent: 'center', paddingRight: 10, paddingLeft: 10}}>
                    
                    <Card style={styles.cardStyle}>
                        
                        <Text style={{color: 'red', textAlign: 'center', fontSize:28, marginBottom: 10, marginTop: 20}}>Failure!</Text>
                        <View style={{marginTop: 30}}>
                            <Image
                                source={ERROR}
                                style={{width: 80, height: 80, alignSelf: 'center'}}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{marginTop: 15, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#707070', textAlign: 'center', paddingLeft: 20, paddingRight: 20, fontSize: 18, marginTop: 15}}>
                                    {this.props.message}
                                </Text>
                                
                                <TouchableOpacity onPress={() => {
                                        this.props.toggleErrorModal(false);
                                      
                                        
                                        }} style={[styles.buttonStyle,{alignSelf: 'center', justifyContent: 'flex-end'}]} >
                                    <Text style={{color: WHITE, textAlign: 'center', fontSize: 18}}>OK</Text>
                                </TouchableOpacity>
                                
                                
                                
                            </View>
                           
                        </View>
                    </Card>
                    
                </View>

            </Modal>

        );
    }
}

const styles = {
    cardStyle: {
        height: 400,
        width: 350,
        borderRadius: 10,
        marginTop: 60,
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 15,
        paddingTop: 15,
        marginBottom: 40,
        paddingBottom: 20,
      },
      buttonStyle: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        borderRadius: 2,
        backgroundColor: 'red'
    }
}

const mapStateToProps = (state) => {
    const {showErrorModal} = state.boilerService.modal;
    const {image} = state.boilerService.capture;
    const {message} = state.boilerService.error;
    return {showErrorModal, image, message}
};

export default connect(mapStateToProps, {toggleErrorModal})(ErrorModal);
