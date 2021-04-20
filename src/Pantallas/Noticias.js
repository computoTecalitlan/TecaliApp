import React from 'react';
import { StatusBar,Text } from 'react-native';


const Noticias = () => {
    return ( 
        <>
        <StatusBar backgroundColor='#00847b' barStyle='light-content'animated={true}/>
        <Text style={{alignSelf:"center", fontSize:16}}>Las Noticias de Tecalitlan</Text>
        </>
     );
}
 
export default Noticias;