import React, { useState,useEffect } from 'react';
import { StatusBar,Text,View,Image,ImageBackground,Dimensions,StyleSheet, ScrollView, TouchableOpacity,Modal } from 'react-native';
import {db} from './../firebase/firebaseConfig';
import CartaEncabezadoPersonalizada from './../elementos/CartaEncabezadoPersonalizada';
import CustomHeader from '../elementos/CustomHeader';
import imgCargando from './../Imagenes/noticia.png'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const {width,height} = Dimensions.get('window');




const Noticias = () => {
    const [noticias,cambiarNoticias] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const [modalVisible,cambiarModalVisible] = useState(false);
    const [nota,cambiarNota] = useState([]);
    useEffect(()=> {
        obtenerNoticias();
    },[]);
    useEffect(()=>{
        return(
            cambiarCargando(true)
        );
    },[])
    const obtenerNoticias =  () => {
        try{
            const newsRef = db.ref('news').limitToLast(7);
            const lista = [];
            newsRef.on('value',(snapshot)=>{
                const Snap = snapshot.val();
    
                for(let id in Snap){
                    lista.push(Snap[id].newData)
                }
                cambiarCargando(false);
            })
            cambiarNoticias(lista);
        }catch(error){
            console.error(error)
        }
        
    }
        //Funcion para la barra de busqueda
         const filtrar = (text) => {
            if(text != ''){
               cambiarCargando(true);
               const busqueda = noticias.filter(not =>{
                let ban = false;
                    const filtrada = not['noticia'];
                    if(filtrada.includes(text)){
                        ban = true;
                        cambiarCargando(false);
                        if(ban){
                            return not;
                        }
                    }
                   
                })
                cambiarNoticias(busqueda);
                
            }
            else if(text == ''){
                cambiarCargando(true);
                obtenerNoticias();
            }
         }  
         //funcion para el boton de actualizar
         const actualizar = () => {
             obtenerNoticias();
         }    
         //Funcion para el contenido de la bottom-sheet
         const renderContent = () => (
             <View
                style={{
                    backgroundColor: '#eee',
                    padding: 16,
                    height: height * .95
                }}
             >
                 <Image 
                 source={{uri:nota.imagen}} 
                 style={{
                     borderTopLeftRadius:10,
                     borderTopRightRadius:10,
                     width: width,
                     height:150,
                     alignSelf:'center'
                    }}
                 />
                 <Text 
                 style={{
                     alignSelf:'center',
                     fontWeight:'bold',
                     fontSize:25,
                     textAlign:'center'
                 }}
                 >
                     {nota.noticia}</Text>
                 <Text 
                 style={{
                    
                    textAlign:'left',
                    fontSize:20
                 }}>
                    Departamento: {nota.direccion}</Text>
                 <Text 
                 style={{
                    color:'#f8ae40',
                    fontSize:18
                 }}>
                    {nota.fecha}</Text>
                 <Text 
                 style={{
                     textAlign:'justify',
                     alignSelf:'center',
                     fontWeight:'200'
                 }}>{nota.descripcion}</Text>
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
        <View style={{flex:1,height:height}}>
       
         <CustomHeader nombre='noticias' filtrar={filtrar} actualizar={actualizar}/>
         <CartaEncabezadoPersonalizada idCarta='noticias' />
         <View style={estilo.contenedorLista}>
            {cargando == false ? 
                <ScrollView style={{flex: 1}} >
                    {noticias.reverse().map((noticia,index) => {
                        return( 
                            <TouchableOpacity key={index}  onPress={() => {
                                cambiarNota(noticia);
                                sheetRef.current.snapTo(0);
                            }}>
                                <View style={estilo.cartaNoticia}>
                                    <Image source={{uri:noticia.imagen}} style={estilo.imagenNoticia}/>
                                    <Text style={{alignSelf:'center',color:'#fff',fontWeight:'bold'}}>{noticia.noticia}</Text>
                                    <Text style={{alignSelf:'center',color:'#fff',fontWeight:'bold'}}>{noticia.fecha}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            :
            <View style={{flex:1}}>
                <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain'}}/>
                <Text style={{alignSelf:'center'}}>Estamos investigando ... </Text> 
            </View> 
        
            }
         </View>
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
 
const estilo = StyleSheet.create({
    contenedorLista:{
        width:width * .99,
        height: height * .60,
        alignSelf:'center',
       borderWidth: 4,
       borderColor:'#828282',
       borderTopLeftRadius:2,
       borderTopRightRadius:2,
       marginTop:2
    },
    cartaNoticia:{
        width: width * .95,
        height: height * .25,
        alignSelf: 'center',
        backgroundColor: '#f8ae40',
        marginTop:2,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        flex:1
    },
    imagenNoticia:{
        width: width * .96,
        height: height * .10,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10
    },
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 22,
    }
})
export default Noticias;