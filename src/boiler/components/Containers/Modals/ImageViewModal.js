import React, { Component } from 'react';
import { Dimensions, Modal, View, StatusBar, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {toggleImageViewModal} from './../../../redux/actions';
import { calculateOpacity } from '../../../../Helper';
import { GREEN, WHITE, RED } from '../../../style/colors';
import { Card, Text, RoundedButton } from '../../Reusables';
import { Actions } from 'react-native-router-flux';


class ImageViewModal extends Component {

    render() {
        const {width} = Dimensions.get('screen');

        return (
             
            <Modal
                transparent={true}
                visible={this.props.viewImageModal}
                onRequestClose={() => { console.log(true)}}
                animationType="fade"
                
            >
                <StatusBar translucent={false} backgroundColor={'transparent'}/>
               
                <View style={{backgroundColor: '#000000'+calculateOpacity(50), flex: 1, justifyContent: 'center', paddingRight: 10, paddingLeft: 10}}>
                    
                    <Card style={styles.cardStyle}>
                        <View style={{flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between'}}>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontSize: 18, paddingLeft: 10}}></Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.toggleImageViewModal(false)}>
                                <MaterialCommunityIcon name="close-circle-outline" color={GREEN} size={25}/>
                            </TouchableOpacity>
                            
                        </View>
                        
                        <View>
                            <Image
                                source={this.props.activeImage}
                                style={{width: width - 30, height: 400}}
                                resizeMode={'contain'}
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
        // minHeight: 300,
        // minWidth: 320,
        borderRadius: 10,
        marginTop: 60,
        // alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
        paddingRight: 15,
        paddingTop: 15,
        marginBottom: 40,
        paddingBottom: 20,
      }
}

const mapStateToProps = (state) => {
    const {viewImageModal} = state.boilerService.modal;
    const {activeImage} = state.boilerService.profile;
    console.log(activeImage);
    return {viewImageModal, activeImage}
};

export default connect(mapStateToProps, {toggleImageViewModal})(ImageViewModal);
