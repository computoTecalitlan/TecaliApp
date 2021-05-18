import React from 'react';
import {Text,ImageBackground,View,Image,StyleSheet,Dimensions} from 'react-native';
import fondoCarta from './../Imagenes/logo-naranja-banner.png';
import PersonajeBuzon from './../Imagenes/buzon.png';
import Speaker from './../Imagenes/speaker.png'
import Reporte from './../Imagenes/incidents.png'
import Bus from './../Imagenes/bus.png'
const {width,height} = Dimensions.get('window');

const CartaEncabezadoPersonalizada = ({idCarta}) => {
    switch(idCarta){
        case 'buzon':
                return(
                    <View style={estilo.carta}>
                        <ImageBackground  source={fondoCarta} style={{width: width * .95,height: height * .25,flexDirection:'row'}} >
                            <View style={estilo.cartaImagen}>
                                <Image source={PersonajeBuzon} style={estilo.imagen}/>
                            </View>
                            <View style={estilo.cartaTexto}> 
                                <Text style={estilo.tituloCarta}>Buzón Ciudadano</Text>
                                <Text style={estilo.descripcionCarta}>Realice sugerencias de una manera sencilla.</Text>
                                <Text style={estilo.sugerenciaCarta}>También puedes visualizar la lista de sugerencias:</Text>
                                <View style={{flexDirection:'column'}}
                                >
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <View style={{width:10,height:10,borderRadius:10,backgroundColor:'#45b39d'}}></View>
                                        <Text> Aceptada.</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <View style={{width:10,height:10,borderRadius:10,backgroundColor:'#b0e0e6'}}></View>
                                        <Text> En espera.</Text>
                                    </View><View style={{flexDirection:'row',alignItems:'center'}}>
                                        <View style={{width:10,height:10,borderRadius:10,backgroundColor:'red'}}></View>
                                        <Text> Rechazada.</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                );
            case 'noticias':
                return(
                    <View style={estilo.carta}>
                    <ImageBackground  source={fondoCarta} style={{width: width * .95,height: height * .25,flexDirection:'row'}} >
                        <View style={estilo.cartaImagen}>
                            <Image source={Speaker} style={estilo.imagen}/>
                        </View>
                        <View style={estilo.cartaTexto}> 
                            <Text style={estilo.tituloCarta}>Noticias</Text>
                            <Text style={estilo.descripcionCarta}>Consulta las noticias que tu gobierno ciudadano trae para ti.</Text>
                            <Text style={estilo.sugerenciaCarta}>Presiona sobre la noticia para leer más.</Text>
                        </View>
                    </ImageBackground>
                </View>
                );
                case 'reportes':
                    return(
                        <View style={estilo.carta}>
                        <ImageBackground  source={fondoCarta} style={{width: width * .95,height: height * .25,flexDirection:'row'}} >
                            <View style={estilo.cartaImagen}>
                                <Image source={Reporte} style={estilo.imagen}/>
                            </View>
                            <View style={estilo.cartaTexto}> 
                                <Text style={estilo.tituloCarta}>Reporte ciudadano</Text>
                                <Text style={estilo.descripcionCarta}>Realice reportes de cualquier tipo de incidencias ocurridas dentro del municipio.</Text>
                                
                            </View>
                        </ImageBackground>
                    </View>
                    );
                    case 'bus':
                        return(
                            <View style={estilo.carta}>
                                <ImageBackground  source={fondoCarta} style={{width: width * .95,height: height * .25,flexDirection:'row'}} >
                                    <View style={estilo.cartaImagen}>
                                        <Image source={Bus} style={estilo.imagen}/>
                                    </View>
                                    <View style={estilo.cartaTexto}> 
                                        <Text style={estilo.tituloCarta}>Bus escolar</Text>
                                        <Text style={estilo.descripcionCarta}>Consulta los horarios y destinos de los autobuses escolares.</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        );
    }
    return null;
}

const estilo = StyleSheet.create({
    carta:{
        width: width * .99,
        height:height * .25,
        alignSelf:'center',
        marginTop:5,
        borderRadius:2,
        borderWidth:4,
        borderColor: '#828282',
        
    },
    cartaImagen:{
        width: width *.42,
        height: height * .25,   
    },
    cartaTexto:{
        width: width *.53,
        height: height * .25,
        marginRight:2,
        marginTop:10,
    },
    imagen:{
        resizeMode:'contain',
        width: width *.42,
        height: height * .24,
        
    },
    tituloCarta:{
        fontWeight:'bold',
        color:'#f8ae40',
        fontSize:20,
        textAlign:'center'
    },
    descripcionCarta:{
        color:'#828282',
        fontSize:15,
        textAlign:'justify'
        
    },
    sugerenciaCarta:{
        color:'#ffa500',
        fontSize:13
    }
})
export default CartaEncabezadoPersonalizada;