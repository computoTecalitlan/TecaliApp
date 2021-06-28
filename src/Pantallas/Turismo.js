import React, { useState,useEffect } from 'react';
import {Text, View,Dimensions,ScrollView,Image, TouchableOpacity, ViewPropTypes, StatusBar} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import imgCargando from './../Imagenes/noticia.png'
import BottomSheet from 'reanimated-bottom-sheet';
import CustomHeader from './../elementos/CustomHeader';
import Animated from 'react-native-reanimated';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';


const {width,height} = Dimensions.get('window');

const Turismo = () => {
     const [cargando,cambiarCargando] = useState(true);
     const [lugares,cambiarLugares] = useState([]);
     const [content,cambiarContent] = useState([]);//Utilizada para almacenar los datos y visualizarlos en la bottomSheet
     
    //Consulta al cargar
     useEffect(()=>{
        obtenerDatos();
    },[])
    //Consulta a la BD
    const obtenerDatos = () =>{
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
                alert(error);
            }
    }
   //Contenido del BottomSheet
const renderContent = () => (
    content.length != 0 ?
    <View style={{height:height * 1.4,backgroundColor:'#fff',width:width * .99}}>
        <Image source={{uri:content.imagen}} style={{height: height /3 ,width: width * .99}}/>
        <Text style={{fontWeight:'bold',color:'#f8ae40',textAlign:'center'}}>{content.lugar}</Text> 
        <View style={{width:width * .98,height:200}}>
        <Text style={{textAlign:'justify',fontWeight:'bold',color:'#828282'}}>{content.descripcion}</Text>
        </View>
        <View style={{width:width,height:295}}>
            <MapView 
                region={{
                    latitude:content.latitude,
                    longitude:content.longitude,
                    latitudeDelta: 0.0522,
                    longitudeDelta: width / 295 * 0.0322,
                }}
                style={{width:width,height:295}}
                provider={PROVIDER_GOOGLE}
            >
                <Marker 
                    coordinate={{
                        latitude: content.latitude,
                        longitude:content.longitude

                    }}
                    title={content.lugar}
                />
            </MapView>
        </View>
                
         
    </View>
    :
    <></>
)
     //Funcion para la barra de busqueda
     const filtrar = (text) => {
        if(text != ''){
           cambiarCargando(true);
           const busqueda = lugares.filter(lug =>{
            let ban = false;
                const filtrada = lug['lugar'];
                if(filtrada.includes(text)){
                    ban = true;
                    cambiarCargando(false);
                    if(ban){
                        return lug;
                    }
                }
               
            })
            cambiarLugares(busqueda);
            
        }
        else if(text == ''){
            cambiarCargando(true);
            obtenerDatos();
        }
     } 
//Para el boton de actualizar del header. Consultamos de nuez :P
const actualizar = () =>{
    obtenerDatos();
}

//El Header del BottomSheet o la pestaña que se visualiza para que el usuario la arrastre.
const renderHeader = () => (
    <View style={{borderTopLeftRadius:50,borderTopRightRadius:50,backgroundColor:'#828282',height:40,flexDirection:'row',alignContent:'center',width:width * .99
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
    const sheetRef = React.useRef(null); //Referencia al BottomSheet para llamar sus posiciones en la pantalla
    return ( 
        <View style={{height: height,flex:1}}>
            <View style={{width:width,height:100}}>
            <CustomHeader nombre='noticias' actualizar={actualizar} filtrar={filtrar}/>
            </View>
            {cargando == false ? 
            <View style={{flex:1,width:width,height:height * .80}}>
                <ScrollView 
                   style={{flex:1}}
                >
                    {lugares.reverse().map((lugar,index)=>{
                        return(
                            <TouchableOpacity key={index} onPress={() => {
                                cambiarContent([])
                                cambiarContent(lugar);
                                sheetRef.current.snapTo(0);
                            }}
                            >
                                <View style={{backgroundColor: '#828282',
                                                borderRadius:10,
                                                height: height * .25,
                                                width: width * .99,
                                                }}>
                                <Image source={{uri:lugar.imagen}} style={{height:100,width: width * .99,alignSelf:'center',borderTopLeftRadius:10,borderTopRightRadius:10}}/>
                                <Text style={{fontWeight:'bold',color:'#fff',alignSelf:'center'}}>{lugar.lugar}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <BottomSheet
                ref={sheetRef} //Su referencia para hacer el llamado a este componente
                snapPoints={[height * .95,300,0]} //Obligatorio, las posiciones de la hoja en la pantalla
                enabledHeaderGestureInteraction={true}
                renderContent={renderContent}
                renderHeader={renderHeader}
                initialSnap={2}
            />
                </View>
            :
            <View style={{flex:1}}>
            <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain'}}/>
            <Text style={{alignSelf:'center'}}>Estamos investigando ... </Text> 
        </View> 
            } 
        </View>
     );
}
 
export default Turismo;