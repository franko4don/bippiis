import React, { Component } from 'react';
import {ScrollView, NativeModules, Dimensions, FlatList, ImageBackground, Image, View, StatusBar, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { BACKGROUND, GREEN, WHITE } from '../../../style/colors';
import { Text, RoundedInput, RoundedButton } from '../../Reusables';
import {getTransfers, getSingleTransfer} from './../../../redux/actions';
import { OverlayLoader } from '../../Reusables/Loaders/OverlayLoader';
import { HomeSection } from '../../Presenters/Home/HomeSection';
import { calculateOpacity } from '../../../../Helper';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { TransferSection } from '../../Presenters/Transfer/TransferSection';

class Transfer extends Component {

    componentWillMount(){
        this.props.getTransfers();
    }

    render() {
       const {transfers} = this.props;

        return (
             
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1}} style={{backgroundColor: BACKGROUND}}>
                <StatusBar translucent={false} backgroundColor={WHITE} barStyle="dark-content"/>
                {this.props.transferLoading ? <OverlayLoader/> : null}
                <View style={{padding: 10}}>
                    <Text style={{color: '#707070', fontSize: 22, marginTop: 0, marginBottom: 10}}>My Transfers</Text>
                    
                </View>
                <FlatList
                    data={transfers}
                    keyExtractor={() => Math.random.toString(32)}
                    keyboardShouldPersistTaps='handled'
                    renderItem={({item}) => 
                    (<TransferSection
                        onPress={() => {this.props.getSingleTransfer({id: item.id}); Actions.singleTransfer(); }}
                        from={item.old_work_station}
                        to={item.new_work_station}
                        date={moment(item.date_effected, 'YYYY-MM-DD').format('Do MMMM, YYYY')}
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
    const {queries, transfers} = state.boilerService.profile;
    const {transferLoading} = state.boilerService.loader;
    return {queries, transferLoading, transfers}
};

export default connect(mapStateToProps, {getTransfers, getSingleTransfer})(Transfer);
