import React, { Component } from 'react';
import { Dimensions, Modal, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {togglePencomModal} from './../../../redux/actions';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';
import { SUCCESS, ERROR } from '../../../style/images';


class PencomModal extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const {width} = Dimensions.get('screen');
        return (
             
            <Modal
                transparent={true}
                visible={this.props.showPencomModal}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
                
            >
                <StatusBar translucent={true} backgroundColor={'#000000'+calculateOpacity(50)}/>
               
                <View style={{backgroundColor: '#000000'+calculateOpacity(50), flex: 1, justifyContent: 'center', paddingRight: 10, paddingLeft: 10}}>
                    
                    <Card style={styles.cardStyle}>
                        
                        <Text style={{textAlign: 'center', fontSize: 24, marginBottom: 10, marginTop: 10}}>Status Report</Text>
                        
                        <View style={{marginTop: 35, flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={{color: '#707070', textAlign: 'center', paddingLeft: 20, paddingRight: 20, fontSize: 17, marginTop: 15}}>
                                    You are not a member of Benue PENCOM Scheme
                                </Text>
                                
                                <TouchableOpacity onPress={() => {
                                        this.props.togglePencomModal(false);
                                      
                                        
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
        height: 300,
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
        backgroundColor: GREEN,
        marginTop: 30
    }
}

const mapStateToProps = (state) => {
    const {showPencomModal} = state.boilerService.modal;
    const {image} = state.boilerService.capture;
    const {message} = state.boilerService.error;
    return {showPencomModal, image, message}
};

export default connect(mapStateToProps, {togglePencomModal})(PencomModal);
