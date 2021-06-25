import React,{useState} from 'react';
import { StatusBar, ViewPropTypes } from 'react-native';
import {Text,TouchableOpacity,View,Dimensions,StyleSheet,TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CartaEncabezadoPersonalizada from './../elementos/CartaEncabezadoPersonalizada';
import ListaReportes from '../elementos/ListaReportes';
import FormulariosPersonalizados from './../Componentes/FormulariosPersonalizados';
import CustomHeader from '../elementos/CustomHeader';

const {width,height} = Dimensions.get('window');

const ReporteCiudadano = () => {
    const [formLista,cambiarFormLista] = useState(true);
    const cambiarALista = () => {
        cambiarFormLista(!formLista);
    }
    return (
        <View style={{flex:1}}>
                
                <CustomHeader nombre='reporte'/>
                <CartaEncabezadoPersonalizada idCarta='reportes'/>
                <FormulariosPersonalizados nombreFormulario='reporte'/>
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