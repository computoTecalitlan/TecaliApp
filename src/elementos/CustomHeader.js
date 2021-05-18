
import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image, ViewPropTypes} from 'react-native';
import useObtenerClima from './../hooks/useObtenerClima';
import {Input,Item} from 'native-base';
import {Dimensions} from 'react-native';
import MenuWhite from './../Imagenes/menu-white.png';
import MenuGrey from './../Imagenes/menu-grey.png';
import Icons from './../Imagenes/icons.png'
import logo from './../Imagenes/logo.png'
import refresh from './../Imagenes/refresh.png';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({nombre,filtrar,actualizar,consSimb}) => {
    const [cargando,cambiarCargando] = useState(true);
    const clima = useObtenerClima({cambiarCargando});
     
    
    
    const navigator = useNavigation();
    switch(nombre){
        case'inicio':
        return ( 
            <View style={estilo.header}>
                <View style={{width: width * .33}}>
                <TouchableOpacity 
                                onPress={() => {navigator.openDrawer();}}
                                style={{flexDirection:'row'}}>
                    <Image source={MenuWhite} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:22}}/>
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
        case 'noticias':
            return(
                
                <View style={estilo.headerNoticias}>
                    <View style={{width: width * .10}}>
                        <TouchableOpacity 
                                onPress={() => {navigator.openDrawer();}}
                                style={{flexDirection:'row'}}>
                            <Image source={MenuWhite} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:22}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: width * .80,height:height * .05,marginTop:10,marginLeft:5}}>
                    <Item>
                        <Input placeholder='Buscar' style={{backgroundColor:'#fff',borderRadius:50}} onChangeText={text => filtrar(text)}></Input>
                    </Item>
                </View>
                <View style={{width:width * .10,flexDirection:'row'}}>
                    <TouchableOpacity onPress={() => actualizar()}>
                        <Image source={refresh} style={{width:22,height:22,marginTop:25,marginLeft:2}}/>
                    </TouchableOpacity>
                </View>
                </View>
                
            );
            case 'mapa':
                return(
                    <View style={estilo.headerMapa}>
                        <View style={{width: width * .33}}>
                            <TouchableOpacity 
                                onPress={() => {navigator.openDrawer();}}
                                style={{flexDirection:'row'}}>
                                <Image source={MenuGrey} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:50}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:width * .33}}></View>
                        <View style={{width: width * .33,flex:1}}>
                            <TouchableOpacity 
                                onPress={() => consSimb()} 
                                style={{flexDirection:'column',alignSelf:'flex-end',marginTop:45,marginRight:5}}>
                                <Image source={Icons} style={{width:25,height:25}}/>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                );
    }
    return null;
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
     headerNoticias:{
        width:width,
        height: height * .10,
        flexDirection:'row',
        resizeMode:'cover',
        position:'relative',
        marginTop:23,
        backgroundColor: '#f8ae40'   
        
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
        
     },
     headerMapa:{
        width:width,
        height: height * .15,
        flexDirection:'row',
        resizeMode:'cover',
        position:'absolute',
        marginTop:23,    
        
     }
 });
export default CustomHeader;