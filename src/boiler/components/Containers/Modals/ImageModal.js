import React, { Component } from 'react';
import { Dimensions, Modal, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {toggleShowImageModal} from './../../../redux/actions';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';


class ImageModal extends Component {

    render() {
        const {width} = Dimensions.get('screen');
        return (
             
            <Modal
                transparent={true}
                visible={this.props.showImageModal}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
                
            >
                <StatusBar translucent={false} backgroundColor={'transparent'}/>
               
                <View style={{backgroundColor: '#000000'+calculateOpacity(50), flex: 1, justifyContent: 'center', paddingRight: 10, paddingLeft: 10}}>
                    
                    <Card style={styles.cardStyle}>
                        <View style={{flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between'}}>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, paddingLeft: 10}}>Passport Photo</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.toggleShowImageModal(false)}>
                                <MaterialCommunityIcon name="close-circle-outline" color={GREEN} size={25}/>
                            </TouchableOpacity>
                            
                        </View>
                        
                        <View>
                            <Image
                                source={{uri: this.props.image}}
                                style={{width: 300, height: 350}}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'center'}}>
                            <RoundedButton
                                name={'Retake'}
                                onPress={() => {Actions.camera(); this.props.toggleShowImageModal(false)}}
                                textStyle={{color: WHITE, textAlign: 'center', fontSize: 13,}}
                                buttonStyle={{backgroundColor: RED, paddingLeft: 25, paddingRight: 25, paddingTop: 2, paddingBottom: 2, marginLeft: 5, marginRight: 15, borderRadius: 50}}
                            />

                            <RoundedButton
                                onPress={() => this.props.toggleShowImageModal(false)}
                                name={'Proceed'}
                                buttonStyle={{borderRadius: 50, paddingTop: 2, paddingBottom: 2}}
                                textStyle={{color: WHITE, fontSize: 13, textAlign: 'center'}}
                            />
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
        width: 200,
        borderRadius: 10,
        marginTop: 60,
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
        paddingRight: 15,
        paddingTop: 15,
        marginBottom: 40,
        paddingBottom: 20,
      }
}

const mapStateToProps = (state) => {
    const {showImageModal} = state.boilerService.modal;
    const {image} = state.boilerService.capture;
    
    return {showImageModal, image}
};

export default connect(mapStateToProps, {toggleShowImageModal})(ImageModal);
