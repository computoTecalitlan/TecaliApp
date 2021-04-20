import React,{useState,useEffect} from 'react';
import { StatusBar } from 'react-native';
import {Text} from 'react-native';


const BusEscolar = () => {
    
    return ( 
        <>
            <StatusBar backgroundColor='#bac95f' barStyle='light-content'animated={true}/>
            <Text style={{alignSelf:"center", fontSize:16}}>Bus Escolar</Text>
        </>
     );
}
 
export default BusEscolar;