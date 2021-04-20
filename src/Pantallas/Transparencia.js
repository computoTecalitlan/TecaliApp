import React, { useEffect,useState } from 'react';
import {StatusBar,Dimensions,Image} from 'react-native';
import {WebView} from 'react-native-webview';

//La parte de transparencia de la base de datos se tiene que modificar para que almacene la informacion de manera similar a la Web de transparencia
const Transparencia = () => {
    const [color,cambiarcolor] = useState()
    useEffect(() => {
        cambiarcolor('#00847b')
    },[]);
    return ( 
        <>
        <StatusBar backgroundColor={color} barStyle='light-content' animated={true}/>
        {/* Se crea un WebView que nos conecta con la pagina de transparencia del ayunamiento */}
        <WebView
            style={{flex:1}}
            source={{uri:'http://transparencia.tecalitlan.gob.mx/'}}
        />
        </>
     );
}
 
export default Transparencia;