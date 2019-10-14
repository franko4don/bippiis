import React, { Component } from 'react';
import { Dimensions, Modal, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {toggleSuccessModal} from './../../../redux/actions';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';
import { SUCCESS } from '../../../style/images';


class SuccessModal extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const {width} = Dimensions.get('screen');
        return (
             
            <Modal
                transparent={true}
                visible={this.props.showSuccessModal}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
                
            >
                <StatusBar translucent={true} backgroundColor={'#000000'+calculateOpacity(50)}/>
               
                <View style={{backgroundColor: '#000000'+calculateOpacity(50), flex: 1, justifyContent: 'center', paddingRight: 10, paddingLeft: 10}}>
                    
                    <Card style={styles.cardStyle}>
                        <View style={{flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between'}}>
                            
                        </View>
                        <Text style={{color: '#00981E', textAlign: 'center', fontSize:28, marginBottom: 35, marginTop: 20}}>Success!</Text>
                        <View style={{marginTop: 30}}>
                            <Image
                                source={SUCCESS}
                                style={{width: 120, height: 120, alignSelf: 'center'}}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{marginTop: 15, alignItems: 'center'}}>
                            <View style={{flex: 9, backgroundColor: 'yellow'}}>
                                <Text style={{color: '#707070', textAlign: 'center', paddingLeft: 20, paddingRight: 20, fontSize: 18, marginTop: 15}}>
                                    {this.props.message}
                                </Text>
                                
                            </View>
                            
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 20, marginRight: 20, alignItems: 'center', flex: 1, justifyContent: this.props.another ? 'space-between' : 'center'}}>
                                <TouchableOpacity onPress={() => {
                                        this.props.toggleSuccessModal(false);
                                        Actions.reset('home');
                                        
                                        }} style={{}} >
                                    <Text style={{color: '#707070', textAlign: 'center', fontSize: 18, marginBottom: 15}}>OK</Text>
                                </TouchableOpacity>
                                {
                                    this.props.another ?
                                    <TouchableOpacity onPress={this.props.onPress} style={{}} >
                                        <Text style={{color: '#707070', textAlign: 'center', fontSize: 18, marginBottom: 15}}>{this.props.anotherText}</Text>
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>
                    </Card>
                    
                </View>

            </Modal>

        );
    }
}

const styles = {
    cardStyle: {
        flex: 1,
        borderRadius: 10,
        marginTop: 60,
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 5,
        paddingTop: 15,
        marginBottom: 40,
        paddingBottom: 20,
      }
}

const mapStateToProps = (state) => {
    const {showSuccessModal} = state.boilerService.modal;
    const {image} = state.boilerService.capture;
    
    return {showSuccessModal, image}
};

export default connect(mapStateToProps, {toggleSuccessModal})(SuccessModal);
