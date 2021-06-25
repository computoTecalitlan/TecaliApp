
import React, { useEffect, useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image, } from 'react-native';

import {Input,Item} from 'native-base';
import {Dimensions} from 'react-native';
import MenuWhite from './../Imagenes/menu-white.png';
import MenuGrey from './../Imagenes/menu-grey.png';
import Icons from './../Imagenes/icons.png'
import logo from './../Imagenes/logo.png'
import refresh from './../Imagenes/refresh.png';
import {useNavigation} from '@react-navigation/native';
import GoBack from './../Imagenes/back-white.png';
import {db} from './../firebase/firebaseConfig';
import Lista from './../Imagenes/list.png';

const CustomHeader = ({nombre,filtrar,actualizar,consSimb}) => {
    const [cargando,cambiarCargando] = useState(true);
    const [banner,cambiarBanner] = useState();
     
    useEffect(()=>{
        try{
            const bannerRef = db.ref('banner');
            bannerRef.on('value',(SnapShot)=>{
                const snap = SnapShot.val();
                for(let id in snap){
                    cambiarBanner(snap[id].eventData.imagen);
                }
               
            })
        }catch(error){alert(error)}
    });
    
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
            </View>            
        );
        case 'noticias':
            return(
                
                <View style={estilo.headerNoticias}>
                    <View style={{width: width * .10,marginTop:30}}>
                        <TouchableOpacity 
                                onPress={() => {navigator.openDrawer();}}
                                style={{flexDirection:'row'}}>
                            <Image source={MenuWhite} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:22}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: width * .80,height:height * .05,marginTop:30,marginLeft:5}}>
                    <Item>
                        <Input placeholder='Buscar' style={{backgroundColor:'#fff',borderRadius:50}} onChangeText={text => filtrar(text)}></Input>
                    </Item>
                </View>
                <View style={{width:width * .10,flexDirection:'row',marginTop:20}}>
                    <TouchableOpacity onPress={() => actualizar()}>
                        <Image source={refresh} style={{width:22,height:22,marginTop:30,marginLeft:2}}/>
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
                case 'actividad':
                    return(
                        <View style={{height:100,width:width,backgroundColor:'#1dd2fc'}}>
                            <View style={{width:width/5,height:100,flexDirection:'column-reverse'}}>
                                <TouchableOpacity onPress={() => navigator.goBack()}>
                                    <Image source={GoBack} style={{marginBottom:1,width:20,height:20}}/>
                                    <Text style={{color:'#fff'}}>Regresar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                case 'eventos':
                    return(
                        <View style={{width:width,height:height /  4,borderBottomLeftRadius:100,borderBottomRightRadius:100,backgroundColor:'#45b39d',flexDirection:'row'}}>
                            <View style={{width: width * .10}}>
                            <TouchableOpacity 
                                onPress={() => {navigator.openDrawer();}}
                                style={{flexDirection:'row'}}>
                                <Image source={MenuWhite} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:50}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: width * .79,height: height / 4,flexDirection:'column',marginTop:30}}>
                            {banner ? 
                                <Image source={logo} style={{width: width  * .60,height: height / 6,resizeMode:'contain',alignSelf:'center',borderRadius:20}}/>
                            : <></>}
                        </View>
                        <View style={{width: width * .10}}>
                            <TouchableOpacity 
                                onPress={() => actualizar()}
                                style={{flexDirection:'row'}}>
                                <Image source={refresh} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:50}}/>
                            </TouchableOpacity>
                        </View>
                        </View>
                    );
                    case 'mapaAdmin':
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
                                    <TouchableOpacity onPress={()=>navigator.navigate('mapaEliminar')}>
                                        <Text style={{width:30,height:30,color:'red',alignSelf:'flex-end',marginTop:50,fontWeight:'bold',fontSize:20}}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        );
                        case 'reporte':
                            return(
                                <View style={{width:width,height:height*.08,flexDirection:'row',backgroundColor:'#f8ae40'}}>
                                <View style={{width: width * .10,flexDirection:'column-reverse'}}>
                                <TouchableOpacity 
                                                onPress={() => {navigator.openDrawer();}}
                                                style={{flexDirection:'row'}}>
                                    <Image source={MenuWhite} style={{width:22,height:22,alignSelf:'center',marginLeft:15,marginTop:22}}/>
                                </TouchableOpacity>
                                </View>
                                <View style={{width:width * .80,flex:1,flexDirection:'column-reverse'}}>
                                        <View style={{width:width * .80,height:'auto'}}><Text style={{alignSelf:'flex-end',color:'#828282'}}>Lista de reportes</Text></View>
                                </View>
                                <View style={{width:width * .10,flexDirection:'column-reverse'}}>
                                        <TouchableOpacity onPress={()=>navigator.navigate('listaReporte')}>
                                            <Image source={Lista} style={{width:20,height:20}}/>
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
        height: height * .1,
        flexDirection:'row',
        marginTop:0,
        backgroundColor: '#f8ae40',   
        flex:1
        
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