import React, { Component } from 'react';
import { Dimensions, Modal, NativeModules, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {toggleSuccessModal} from './../../../redux/actions';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';
import { SUCCESS } from '../../../style/images';
const { Print } = NativeModules;

class SuccessModal extends Component {
    constructor(props){
        super(props);
    }

    prepareContent(staffName, bippiis_number, operation, time){
        const {civil_servants} = this.props.user;
        
        if(civil_servants){
            if(civil_servants.constituency == 'LGCS'){
                let result = `
                Staff Name:   ${staffName}
       
                BIPPIIS NO:    ${bippiis_number}
       
                Operation:     ${operation}

                LGA Posted:    ${lga_posted_to}
       
                Status:        Successful
       
               ${time}
       
               Powered By Gamint Corporate Ltd. 
       
       
               `
               ;
               return result;
            }
        }
        let result =

        `
         Staff Name:   ${staffName}

         BIPPIIS NO:    ${bippiis_number}

         Operation:     ${operation}

         Status:        Successful

        ${time}

        Powered By Gamint Corporate Ltd. 


        `
        ;
        return result;
    }
    
    render() {
        const {staffName, bippiis_number,  operation, time} = this.props;
        
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
                        
                        <Text style={{color: '#00981E', textAlign: 'center', fontSize:28, marginBottom: 35, marginTop: 20}}>Success!</Text>
                        <View style={{marginTop: 10}}>
                            <Image
                                source={SUCCESS}
                                style={{width: 90, height: 90, alignSelf: 'center'}}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{ alignItems: 'center'}}>
                            <View style={{flex: 9, backgroundColor: 'yellow'}}>
                                <Text style={{color: '#707070', textAlign: 'center', paddingLeft: 20, paddingRight: 20, fontSize: 18, marginTop: 10}}>
                                    {this.props.message}
                                </Text>
                                
                            </View>
                            
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 45, marginRight: 20, alignItems: 'center', flex: 1, justifyContent: this.props.another ? 'space-between' : 'center'}}>
                                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                        this.props.toggleSuccessModal(false);
                                        if(this.props.print){
                                            Print.startPrinter(
                                                this.prepareContent(staffName, bippiis_number,  operation, time))
                                                ;
                                        }
                                        if(this.props.user.category == 1){
                                            Actions.reset('home');
                                        }else{
                                            Actions.reset('pensionHome');
                                        }
                                        
                                        
                                        }} >
                                    <Text style={{color: WHITE, textAlign: 'center', fontSize: 17}}>OK</Text>
                                </TouchableOpacity>
                                {
                                    this.props.another ?
                                    <TouchableOpacity onPress={this.props.onPress} style={[styles.buttonStyle, {backgroundColor: '#707070'}]} >
                                        <Text style={{color: WHITE, textAlign: 'center', fontSize: 17}}>{this.props.anotherText}</Text>
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
        height: 400,
        width: 350,
        borderRadius: 10,
        marginTop: 60,
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 5,
        paddingTop: 15,
        marginBottom: 40,
        paddingBottom: 20,
      },
      buttonStyle: {
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 2,
          justifyContent: 'center',
          backgroundColor: '#00981E'
      }
}

const mapStateToProps = (state) => {
    const {showSuccessModal} = state.boilerService.modal;
    const {image} = state.boilerService.capture;
    const {user} = state.boilerService.auth;
    
    return {showSuccessModal, image, user}
};

export default connect(mapStateToProps, {toggleSuccessModal})(SuccessModal);
