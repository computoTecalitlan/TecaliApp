import React from 'react';
import {Text,View,ScrollView,StyleSheet,Dimensions,Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ImgCargando from './../Imagenes/noticia.png';
const {width,height} = Dimensions.get('window');
const ListaSugerenciasAdmin = ({mostrarHoja,obtenerSugerencias,cambiarNota,nota,cargando,cambiarCargando,sugerencias,cambiarSugerencias}) => {

   

 
    return(
        <View style={estilo.contenedorRespuestas}>
            {cargando == false  && sugerencias.length > 0 ? 
                    <ScrollView >
                        {sugerencias.reverse().map((sugerencia,index)=>{
                            return(  
                                <TouchableOpacity onPress={()=>{
                                   cambiarNota(sugerencia);
                                        mostrarHoja();
                                }} key={index}>
                                    <View style={sugerencia.estado == 'aceptada' ? estilo.sugerenciaAceptada : sugerencia.estado == 'rechazada' ? estilo.sugerenciaRechazada : estilo.sugerenciaEspera} >
                                        <Text style={{color:'#222222',fontWeight:'bold',alignSelf:'center'}}>{sugerencia.asunto}</Text>
                                        <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>{sugerencia.comentario}</Text>
                                        <Text style={{color:'#222222',fontWeight:'bold',alignSelf:'center'}}>Respuesta:</Text>
                                        <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>{sugerencia.respuesta}</Text>
                                    </View>  
                                </TouchableOpacity>  
                           );
                       })}
                    </ScrollView>
            :
            <View style={{width:width * .95, height: height / 5,alignSelf:'center'}}>
                <TouchableOpacity onPress={obtenerSugerencias}>
                <Image source={ImgCargando} style={{width:width * .60,height: height / 8,resizeMode:'contain',alignSelf:'center'}}/>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold',color:'#000',alignSelf:'center'}}>Estamos investigando ... </Text>
                <Text style={{fontWeight:'bold',color:'#000',alignSelf:'center'}}>Presiona para al ciudadano para volver a cargar.</Text>
            </View>
            }
        </View>
    );
}

const estilo = StyleSheet.create({
    contenedorRespuestas:{
        width: width * .95,
        height: height,
        backgroundColor: '#eee',
        borderRadius: 1,
        borderWidth:4,
        borderColor: '#828282',
        alignSelf:'center',
        marginTop:1,
       
        
    },
    sugerenciaAceptada:{
        width: width * .90,
        height: height * .20,
        backgroundColor: '#45b39d',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:5,
        
    },
    sugerenciaRechazada:{
        width: width * .90,
        height: height * .20,
        backgroundColor: '#d61a3c',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:5,
        
    },
    sugerenciaEspera:{
        width: width * .90,
        height: height * .20,
        backgroundColor: '#474b4e',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:5,
        
    }
})
export default ListaSugerenciasAdmin;