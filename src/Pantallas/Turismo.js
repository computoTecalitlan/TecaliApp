import React, { useState } from 'react';
import {Text, View,Dimensions,ScrollView,Image, TouchableOpacity} from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import {db} from './../firebase/firebaseConfig';
import imgCargando from './../Imagenes/noticia.png'
import BottomSheet from 'reanimated-bottom-sheet';
import { Button } from 'native-base';

const {width,height} = Dimensions.get('window');

const Turismo = () => {
     const [cargando,cambiarCargando] = useState(true);
     const [lugares,cambiarLugares] = useState([]);
     const [content,cambiarContent] = useState([]);
    useEffect(()=>{
        try{
        const turRef = db.ref('tourism');
        const lista = [];
    
        turRef.on(('value'),(snapshot) => {
            const snap = snapshot.val();
    
            for(let id in snap){
                lista.push(snap[id].placeData);
            }
            cambiarCargando(false);
        })
        cambiarLugares(lista);
        }catch(error){
            console.error(error);
        }
    },[])
    useEffect(()=>{
        return(
            cambiarCargando(true)
        );
    },[])
const renderContent = () => (
    <View style={{height:height,backgroundColor:'#fff'}}>
         <Text>{content.descripcion}</Text>
         <Image source={{uri:content.url1}} style={{height:height / 4,width: width}}/>
    </View>
)

const renderHeader = () => (
    <View style={{borderTopLeftRadius:50,borderTopRightRadius:50,backgroundColor:'#828282',height:40,flexDirection:'row',alignContent:'center'
    }}>
        <Text 
        style={{
            alignSelf:'center',
            color:'#fff',
            fontWeight:'bold',
            fontSize:18,
            marginLeft:45
        }}
        >Desliza hacia abajo para cerrar la hoja</Text>
    </View>
    
)
    const sheetRef = React.useRef(null);
    return ( 
        <View style={{width:width * 98,height : height * .88,borderColor:'#828282', borderWidth:5,borderRadius:2}}>
            {cargando == true ? 
                <ScrollView>
                    {lugares.reverse().map((lugar,index)=>{
                        return(
                            <TouchableOpacity key={index} onPress={() => {
                                cambiarContent(lugar);
                                console.log(content)
                                sheetRef.current.snapTo(0);
                            }}>
                                <Image source={{uri:lugar.imagenes.url0}} style={{height:height / 4 ,borderRadius:10, resizeMode:'cover'}}/>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            :
            <View style={{flex:1}}>
                <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain'}}/>
                <Text style={{alignSelf:'center'}}>Estamos investigando ... </Text> 
            </View> 
            } 
            <BottomSheet
                  ref={sheetRef}
                  snapPoints={[height * .95,300,0]}ç
                  enabledHeaderGestureInteraction={true}
                  renderContent={renderContent}
                  renderHeader={renderHeader}
                  initialSnap={2}
            />
        </View>
     );
}
 
export default Turismo;