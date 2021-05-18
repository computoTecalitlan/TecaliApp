import React,{useState} from 'react';
import { StatusBar, ViewPropTypes } from 'react-native';
import {Text,TouchableOpacity,View,Dimensions,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CartaEncabezadoPersonalizada from './../elementos/CartaEncabezadoPersonalizada';
const {width,height} = Dimensions.get('window');
const ReporteCiudadano = () => {
    const [formLista,cambiarFormLista] = useState(true);
    const cambiarALista = () => {
        cambiarFormLista(!formLista);
    }
    return (
        <View style={{flex:1}}>
        {formLista == true ? 
            <ScrollView style={{flex:1}}>
                <StatusBar backgroundColor='#00a3e4' barStyle='light-content' animated={true}/>
                <CartaEncabezadoPersonalizada idCarta='reportes'/>
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
                <View style={{flex:1, width:width,height: height, borderWidth:5,borderColor:'#828282'}}>
                    <Text>FORM</Text>
                </View>
            </ScrollView>
        :
        <View>
            <StatusBar backgroundColor='#00a3e4' barStyle='light-content' animated={true}/>
            <CartaEncabezadoPersonalizada idCarta='reportes'/>
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
            
            <ScrollView>
                <Text>Hola mundo</Text>
                <Text>Hola mundo</Text>
                <Text>Hola mundo</Text>
                <Text>Hola mundo</Text>
                <Text>Hola mundo</Text>

            </ScrollView>
        
        </View>
        }
        </View>
       
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
 
export default ReporteCiudadano;