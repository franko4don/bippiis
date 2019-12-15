import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, TouchableOpacity, ImageBackground, Image, View, StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { WHITE, BACKGROUND, GREEN } from '../../../style/colors';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';

import { Container, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import { ProfileSection } from '../../Presenters/Profile/ProfileSection';
import { LOGOTRANSPARENT, DOCUMENT, NOIMAGE } from '../../../style/images'
import {toggleImageViewModal, profileUpdate} from './../../../redux/actions';
import ImageViewModal from '../Modals/ImageViewModal';
import _ from 'lodash';
import moment from 'moment';
import { formatMoney } from '../../../../Helper';

class Pencom extends Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: 0
        }
        this.data = {}
    }


    render() {
        const {user} = this.props;
        return (
            
            <Container contentContainerStyle={{flexGrow: 1}}  style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
                <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 20}} style={{backgroundColor: BACKGROUND, padding: 15,}}>
                    <ImageBackground
                        source={LOGOTRANSPARENT}
                        style={{width: null, flex: 1}}
                        resizeMode={'contain'}
                    >

                        <ProfileSection
                            label={`Bippiis Number: `}
                            data={user.bippiis_number}
                        />
                        <ProfileSection
                            label={`Full Name: `}
                            data={user.civil_servants.surname + " "+user.civil_servants.first_name}
                        />
                        <ProfileSection
                            label={`Membership Status: `}
                            data={'Active'}
                        />
                        <ProfileSection
                            label={`Enrolment Date: `}
                            data={moment(user.civil_servants.pencom_enrolment_date, 'YYYY-MM-DD').format('Do MMMM, YYYY')}
                        />
                        <ProfileSection
                            label={`Amount Contributed: `}
                            data={'₦ 0.00'}
                        />
                        
                
                    </ImageBackground>
                </ScrollView>
            

            </Container>
        )


    }
}

const styles = {
   
    textStyle: {
        fontSize: 14, 
            
    }
}

const mapStateToProps = (state) => {
    const {user} = state.boilerService.auth;
    return {user}
};

export default connect(mapStateToProps, {toggleImageViewModal, profileUpdate})(Pencom);
