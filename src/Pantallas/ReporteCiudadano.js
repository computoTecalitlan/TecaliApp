import React from 'react';
import { StatusBar } from 'react-native';
import {Text} from 'react-native';

const ReporteCiudadano = () => {
    return ( 
        <>
        <StatusBar backgroundColor='#00a3e4' barStyle='light-content' animated={true}/>
        <Text style={{alignSelf:"center", fontSize:16}}>Hola Mundo</Text>
        </>
     );
}
 
export default ReporteCiudadano;