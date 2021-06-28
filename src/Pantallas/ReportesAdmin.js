import React from 'react';
import { Dimensions,View,Text } from 'react-native';
import ListaReportes from './../elementos/ListaReportes';


const {width,height} = Dimensions.get('window');
const ReportesAdmin = () => {
    return(
        <View style={{width:width,height:height,backgroundColor:'#fff'}}>
            <ListaReportes/>
        </View>
    );   
}

export default ReportesAdmin;