import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground,Text } from 'react-native';
import FondoDePantalla from './../Imagenes/fondo.jpg';
import {auth}from './../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from './../contextos/AuthContext';
const CerrarSesion = () => {

    const navigator = useNavigation();
    const {usuario} = useAuth();
   
        //Se comprueba si hay un usuario 
        if(usuario){
            
                 auth.signOut()
                .then(() => {
                    alert('Has cerrado sesion con exito!');
                    navigator.navigate('PantallaInicioSesion');}).catch(error => {
                        console.log(error.message);
                    })
            
        } 
    else if (!usuario){return(
        <ImageBackground style={{resizeMode:'cover',flex:1}} source={FondoDePantalla}>
            <Text style={{color: '#000080',position:'absolute',alignSelf:'center',flex:1,marginTop:150,fontSize:25}}>Espera un momento...</Text>
        </ImageBackground>
    );
}
    return ( 
        <ImageBackground style={{resizeMode:'cover',flex:1}} source={FondoDePantalla}>
        </ImageBackground>
     );

}
 
export default CerrarSesion;