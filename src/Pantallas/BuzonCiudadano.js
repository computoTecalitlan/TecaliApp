import React from 'react';
import { StatusBar } from 'react-native';
import {Text} from 'react-native';

const BuzonCiudadano = () => {
    return ( 
        <>
        <StatusBar backgroundColor='#f39028'barStyle='light-content' animated={true}/>
        <Text style={{alignSelf:"center", fontSize:16}}>Buzon Ciudadano</Text>
        </>
     );
}
 
export default BuzonCiudadano;