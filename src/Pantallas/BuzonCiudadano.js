import React,{useEffect, useState} from 'react';
import { StatusBar,BackHandler } from 'react-native';
import {Dimensions,StyleSheet , Text, View, ScrollView,TouchableOpacity,Image} from 'react-native';
import CartaEncabezadoPersonalizada from './../elementos/CartaEncabezadoPersonalizada';
import FormulariosPersonalizados from './../Componentes/FormulariosPersonalizados';
import ListaSugerencias from './../elementos/ListaSugerencias';
const {width,height} = Dimensions.get('window');
const BuzonCiudadano = () => {
    //vARIABLE DEL ESTADO QUE CAMBIA DE FORMULARIO ENTRE DEPOSITAR SUGERENCIA Y CONSULTAR RESPUESTAS
    const [formLista,cambiarFormLista] = useState(true);
    const cambiarALista = () => {
        cambiarFormLista(!formLista);
    }
  
    return ( 
                formLista ? 
                    <ScrollView style={{height:height * 1.4,flex:1}}>
                    <CartaEncabezadoPersonalizada idCarta='buzon'/>
                <StatusBar backgroundColor='#f39028'barStyle='light-content' animated={true}/>
                        <View style={estilo.estado}>
                            <TouchableOpacity onPress={cambiarALista} disabled={formLista ? true : false}>
                            <View style={formLista ? estilo.estiloActivo : estilo.estiloInactivo}>
                                <Text style={{color:'#fff',fontWeight:'bold', alignSelf:'center'}}>Depositar</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={cambiarALista} disabled={formLista ? false : true}>
                            <View style={formLista ? estilo.estiloInactivo : estilo.estiloActivo}>
                                <Text style={{color:'#fff',fontWeight:'bold', alignSelf:'center'}}>Lista</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    <FormulariosPersonalizados nombreFormulario='depSugerencia'/>
                    </ScrollView>
                :
                <>
            <CartaEncabezadoPersonalizada idCarta='buzon'/>
        <StatusBar backgroundColor='#f39028'barStyle='light-content' animated={true}/>
                <View style={estilo.estado}>
                    <TouchableOpacity onPress={cambiarALista} disabled={formLista ? true : false}>
                    <View style={formLista ? estilo.estiloActivo : estilo.estiloInactivo}>
                        <Text style={{color:'#fff',fontWeight:'bold', alignSelf:'center'}}>Depositar</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cambiarALista} disabled={formLista ? false : true}>
                    <View style={formLista ? estilo.estiloInactivo : estilo.estiloActivo}>
                        <Text style={{color:'#fff',fontWeight:'bold', alignSelf:'center'}}>Lista</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                    <View style={{flex:1,position:'relative'}}>
                        <ListaSugerencias />
                    </View>
                    </>
     );
}
const estilo = StyleSheet.create({
    estado:{
        width:width * .44,
        alignSelf: 'center',
        flexDirection:'row',
        marginTop:1
        
    },
    estiloActivo:{
        backgroundColor:'orange',
        borderWidth:2,
        borderColor:'#828282',
        width: width *.22
    },
    estiloInactivo:{
        backgroundColor:'#828282',
        borderWidth:2,
        borderColor:'#828282',
        width: width *.22
    },
    icono:{
        resizeMode:'contain',
        width: width *.42,
        height: height * .15,
        marginTop:25
        
    }
})
 
export default BuzonCiudadano;