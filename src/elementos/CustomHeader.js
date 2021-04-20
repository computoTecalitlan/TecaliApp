
import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import useObtenerClima from './../hooks/useObtenerClima';
import {Dimensions} from 'react-native';
import MenuIcon from './../Imagenes/menu-white.png';
import logo from './../Imagenes/logo.png'
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({nombre}) => {
    const [cargando,cambiarCargando] = useState(true);
    const clima = useObtenerClima({cambiarCargando});

    
    
    const navigator = useNavigation();
    if(nombre == 'Inicio'){
        return ( 
            <View style={estilo.header}>
                <View style={{width: width * .33}}>
                <TouchableOpacity 
                                onPress={() => {navigator.openDrawer();}}
                                style={{flexDirection:'row'}}>
                    <Image source={MenuIcon} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:22}}/>
                </TouchableOpacity>
                </View>
                <View style={{width:width * .33,flex:1}}>
                        <Image source={logo} style={{width:50,height:height*.07,marginTop:15,alignSelf:'flex-start'}}></Image>
                </View>
                {cargando == false ?
                    <View style={{flexDirection:'row',
                    width:width*.33,
                    borderRadius:50,
                    height:height*.07,
                    backgroundColor:'#51d1f6',
                    marginTop:15
                    }}>
                        <Text style={estilo.headerText}>{parseInt(clima.temperatura)}°C</Text>
                    <Image source={{uri:'http://openweathermap.org/img/wn/'+clima.icono+'@2x.png'}} style={estilo.settingsIcon} />
                    </View>
                : <></>}
                
            </View>            
        );
        
    }else{
        return (<Text>Aqui va otro header</Text>);
    }
}
const {width,height} = Dimensions.get('window');
 const estilo = StyleSheet.create({
     header:{
        width:width,
        height: height * .08,
        flexDirection:'row',
        resizeMode:'cover',
        position:'relative',
        marginTop:23,    
        
     },
     headerText:{
         color:'#ffff',
         letterSpacing:1,
         fontWeight:'bold',
         fontSize:25,
         alignSelf:"center",
         marginLeft:5
     },
     settingsIcon:{
        width:45,
        height:45,
        alignSelf:"center",
        
     }
 });
export default CustomHeader;