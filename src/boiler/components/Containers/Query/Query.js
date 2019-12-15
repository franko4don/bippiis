import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, FlatList, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { LOGO, ICONBIOMETRICS, ICONFACECAPTURE, ICONPROFILE, ICONPROFILEUPDATE, ICONFINANCIALREPORT, TRANSAPARENTBACKGROUND, GOVERNOR, ICONHEALTH, ICONATTENDANCE, ICONIDCARD, ICONVERIFICATION } from '../../../style/images';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import {getQueries, getSingleQuery} from './../../../redux/actions';
import { FONTFAMILYBOLD } from '../../../../fonts';
import { FONTFAMILYREGULAR, FONTFAMILYSEMIBOLD } from '../../../style/fonts';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { HomeSection } from '../../Presenters/Home/HomeSection';
import { calculateOpacity } from '../../../../Helper';
import { Actions } from 'react-native-router-flux';
import { QuerySection } from '../../Presenters/Query/QuerySection';
import moment from 'moment';

class Query extends Component {

    componentWillMount(){
        this.props.getQueries();
    }

    render() {
        const {width, height} = Dimensions.get('screen');

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
                {this.props.queryLoading ? <OverlayLoader/> : null}
                <View style={{padding: 10}}>
                    <Text style={{color: '#707070', fontSize: 22, marginTop: 10, marginBottom: 10}}>My Queries</Text>
                    
                </View>
                <FlatList
                    data={this.props.queries}
                    keyExtractor={() => Math.random.toString(32)}
                    keyboardShouldPersistTaps='handled'
                    renderItem={({item}) => 
                    (<QuerySection
                        onPress={() => {this.props.getSingleQuery({id: item.id}); Actions.singleQuery(); }}
                        reason={item.reason} 
                        bippiis_number={item.bippiis_number}
                        date={moment(item.created_at, 'YYYY-MM-DD').format('Do MMMM, YYYY')}
                    />)
                    
                }
            />
                 
            </ScrollView>

        );
    }
}

const styles = {

}

const mapStateToProps = (state) => {
    const {queries} = state.boilerService.profile;
    const {queryLoading} = state.boilerService.loader;
    return {queries, queryLoading}
};

export default connect(mapStateToProps, {getQueries, getSingleQuery})(Query);
