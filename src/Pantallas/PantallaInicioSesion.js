
import React, {useState, useContext, useEffect} from 'react';
import {ImageBackground,Image, StyleSheet,View,Text} from 'react-native';
import FondoDePantalla from './../Imagenes/fondo.jpg';
import LogoAyuntamiento from './../Imagenes/logo.png';
import FormularioBotones from './../Componentes/FormularioBotones';
import FormularioInicioSesion from './../Componentes/FormularioInicioSesion';


const PantallaInicioSesion = ({fondo}) => {
    //Se crea un estado para mostrar el componente que contiene los botones de Ingreso(como invitado),Administrador y Emergencias 
    const [botones,mostrarBotones] = useState(true);
    //Tambien se crea un estado para la imagen del logotipo, al momento editar en los inputs
    //La imagen se oculta y se mueven los inputs a la parte superior de la pantalla para 
    //que el teclado no bloquee la vista de los inputs.
    const [imagen,mostrarImagen] = useState(false);
    
    
    
    return ( 
        <>
            <ImageBackground source={fondo} style={estilo.fondo}>

                {/*Preguntamos por el estado de la imagen para saber si la mostramos o no*/}
                {imagen === false ?
                    <Image source={LogoAyuntamiento} style={estilo.logo}/>
                :
                    <></>
                }
                {/*Abrimos codigo js y condicionamos el estado que muestra los forms
                    si es true muestra los botones, de lo contrario muestra el inicio de sesion
                */}
                {botones ?
                    
                    <FormularioBotones mostrarBotones={mostrarBotones} botones={botones}/> 
                :
                    <FormularioInicioSesion botones={botones} mostrarBotones={mostrarBotones} imagen={imagen} mostrarImagen={mostrarImagen}/>
                }
               
            </ImageBackground>
        </>
     );
 }
const estilo = StyleSheet.create({
    fondo:{
        resizeMode: "cover",
        flex: 1
    },
    logo:{
        resizeMode: "center",
        height: 250,
        width: 250,
        alignSelf:'center',
        marginTop:24 
    }
});

export default PantallaInicioSesion;