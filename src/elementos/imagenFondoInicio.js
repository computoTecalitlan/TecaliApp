import React, { useEffect, useState } from 'react';
import fondo1 from './../Imagenes/Gif/teca-centro1.gif';
import fondo2 from './../Imagenes/Gif/teca-centro2.gif';
import fondo3 from './../Imagenes/Gif/teca-centro3.gif';
import fondo4 from './../Imagenes/Gif/teca-centro4.gif';
import fondo5 from './../Imagenes/Gif/teca-centro5.gif';



const imagenFondoInicio = () => {
    const numero = Math.floor(Math.random() * 5) +1;
    const [imagen,cambiarImagen] = useState();
    useEffect(() => { 
            if(numero == 1){
                cambiarImagen(fondo1);
            }
            if(numero == 2){
                cambiarImagen(fondo2);
            }
            if(numero == 3){
                cambiarImagen(fondo3);
            }
            if(numero == 4){
                cambiarImagen(fondo4);
            }  
            if(numero == 5){
                cambiarImagen(fondo5);
            }
    },[])
    return imagen;
}
 
export default imagenFondoInicio;