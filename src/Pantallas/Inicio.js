import React, { useEffect, useState } from 'react';
import {ImageBackground,View,Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { StatusBar } from 'react-native';
import {Dimensions} from 'react-native';
import CustomHeader from '../elementos/CustomHeader';
import CustomSwiperNoticias from './../Componentes/CustomSwiperNoticias';
import imagenFondoInicio from './../elementos/imagenFondoInicio';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';




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
    const renderContent = () => (
        <CustomSwiperNoticias/>
    )
    const renderHeader = () => (
        <View style={{borderTopLeftRadius:50,borderTopRightRadius:50,backgroundColor:'#828282',height:40,flexDirection:'column',alignContent:'center'
        }}>
            <Text 
            style={{
                alignSelf:'center',
                color:'#fff',
                fontWeight:'bold',
                fontSize:18,
            }}
            >Arrastra</Text>
        </View>
        
    )
     const sheetRef = React.useRef(null);
    useEffect(()=>{
        return(
            sheetRef.current.snapTo(1)
        );
    },[])
    return (
    
            <View style={{flex:1,height:height * 1 }}>
                
                <ImageBackground source={imagen} style={{resizeMode:'cover',height:height}}> 
                <StatusBar backgroundColor='transparent' barStyle='default' animated={true} translucent/>
                <CustomHeader nombre='inicio'/>
                </ImageBackground>
                <BottomSheet
            ref={sheetRef}
            snapPoints={[350,300,45]}ç
            enabledHeaderGestureInteraction={true}
            renderContent={renderContent}
            renderHeader={renderHeader}
            initialSnap={2}
            
         />
            </View>
            
        
        
     );
}
 
export default Inicio;
