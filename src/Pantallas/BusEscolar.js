import React,{useState,useEffect} from 'react';
import { StatusBar } from 'react-native';
import {Text} from 'react-native';

import CartaEncabezadoPersonalizada from './../elementos/CartaEncabezadoPersonalizada';


const BusEscolar = () => {
    
    return ( 
        <>
            <StatusBar backgroundColor='#bac95f' barStyle='light-content'animated={true}/>
            <CartaEncabezadoPersonalizada idCarta='bus'/>
        </>
     );
}
 
export default BusEscolar;