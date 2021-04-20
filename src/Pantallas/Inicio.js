import React, { useEffect, useState } from 'react';
import {ImageBackground,View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { StatusBar } from 'react-native';
import {Dimensions} from 'react-native';
import CustomHeader from '../elementos/CustomHeader';
import CustomSwiperNoticias from './../elementos/CustomSwiperNoticias';
import imagenFondoInicio from './../elementos/imagenFondoInicio';


const Inicio = () => {
   const {height} = Dimensions.get('window');
    
    const imagen = imagenFondoInicio();
    const navigator = useNavigation();
    //Estado del drawer y funcion para cerrarlo y abrirlo
    const [estadoDrawer,cambiarEstadoDrawer] = useState(false);
    const backAction = () => {
        navigator.openDrawer();
        cambiarEstadoDrawer(!estadoDrawer);
        if(estadoDrawer === true ){
            navigator.closeDrawer();
            cambiarEstadoDrawer(!estadoDrawer);
        }
        return true;
    }
    //Con este use effect ponemos el boton de atras del celular para que abra y cierre el menu del Drawer,
    //Evitando que nos saque a la pantalla de inicio de sesion.
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress",backAction)
        return () => BackHandler.removeEventListener("hardwareBackPress",backAction);
        
    },[]);
    

    
    return (
    
            <View style={{flex:1,height:height * 1 }}>
                
                <ImageBackground source={imagen} style={{resizeMode:'cover',height:height}}> 
                <StatusBar backgroundColor='transparent' barStyle='default' animated={true} translucent/>
                <CustomHeader nombre='Inicio'/>
                </ImageBackground>
                <CustomSwiperNoticias/>
            </View>
            
        
        
     );
}
 
export default Inicio;
