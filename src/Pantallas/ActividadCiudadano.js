import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text,ImageBackground,TouchableOpacity,Dimensions, View,Image} from 'react-native';
import GoBack from './../Imagenes/back-orange.png';

const {width,height} = Dimensions.get('window');


const ActividadCiudadano = ({route}) => {
    const {actividad,descripcion,fecha,hora,imagen,id} = route.params;
    const navigator = useNavigation();

    return(
       <View style={{width:width,height:height}}>
           <ImageBackground style={{width:width,height:height*.60}} source={{uri:imagen}}>
                <View style={{width:width * .10,height:height*.10,flexDirection:'column-reverse'}}>
                    <TouchableOpacity onPress={()=>navigator.goBack()}> 
                        <Image style={{width:20,height:20,alignSelf:'flex-end'}} source={GoBack}/>
                    </TouchableOpacity>
                </View>
           </ImageBackground> 
           <Text style={{fontWeight:'bold',alignSelf:'center',fontSize:20}}>{actividad}</Text>
           <Text style={{color:'#828282',fontWeight:'bold',fontSize:18}}>{fecha}</Text>
           <Text style={{color:'#828282',fontWeight:'bold',fontSize:18}}>{hora}</Text>
           <Text style={{textAlign:'justify'}}>{descripcion}</Text>
       </View>
    );
}
export default ActividadCiudadano;