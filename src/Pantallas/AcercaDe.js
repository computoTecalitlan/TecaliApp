import React from 'react';
import {Text,Dimensions,View,Image,ScrollView} from 'react-native';

import Computo from './../Imagenes/logo-computo-blanco.png'
import Logo from './../Imagenes/logo.png'


const AcercaDe = () => {
    const {width,height} = Dimensions.get('window');
    return ( 
        <ScrollView>
            <View style={{height: height,backgroundColor:'#828282'}}>
            <View style={{width:width,height:height * .3,marginTop:1}}>
            <Image source={Computo} style={{height:height *.3,width:width,resizeMode:'contain',marginTop:1}}></Image>
            </View>
            <View style={{marginLeft:5}}>
            <Text style={{alignSelf:'center',fontSize:20,color:'#fff',fontWeight:'bold',marginTop:10}}>TecaliApp Version 2.0</Text>
            <Text style={{marginTop:10,fontSize:18,color:'#f8ae40',fontWeight:'bold'}}>Desarrollado por: </Text>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold',textAlign:'justify'}}>ING. Carlos Alejandro Buenrostro Ramírez</Text>
            <Text style={{marginTop:10,fontSize:18,color:'#fff',fontWeight:'bold',textAlign:'justify'}}>LDG. Alejandro López Herrera</Text>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold',textAlign:'justify'}}>Tec. Antonio de Jesús Olivera Rodríguez</Text>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold',textAlign:'justify'}}>ING. Gerardo Ortiz Ramírez</Text>
            <Text style={{marginTop:10,fontSize:18,color:'#f8ae40',fontWeight:'bold'}}>Puedes reportar problemas o contactarnos por: </Text>
            <Text style={{marginTop:10,fontSize:18,color:'#45b39d',fontWeight:'bold'}}>Correo electrónico:</Text>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold',textAlign:'justify'}}>computo.tecalitlan@gmail.com</Text>
            <Text style={{marginTop:10,fontSize:18,color:'#45b39d',fontWeight:'bold'}}>Teléfono:</Text>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold',textAlign:'justify'}}>371 418 4000 Extensión 123</Text>
            </View>
            <Image source={Logo} style={{width:100,height:100,alignSelf:'center'}}></Image>
        </View>
        </ScrollView> 
     );
}
 
export default AcercaDe;