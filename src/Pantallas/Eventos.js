import React,{useState,useEffect} from 'react';
import {Text,Dimensions,View,ImageBackground, ScrollView,Image} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import CustomHeader from '../elementos/CustomHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import imgCargando from './../Imagenes/noticia.png';

const {width,height} = Dimensions.get('window');
const Eventos = () => {
    const [eventos,cambiarEventos] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const [nota,cambiarNota] = useState([]);

    const obtenerReportes = () => {
        try{
            const newsRef = db.ref('events').limitToLast(20);
            const lista =[]
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                
                for(let id in Snapshot){
                        lista.push(Snapshot[id].eventData);
                        
                }
                cambiarCargando(false);
                cambiarEventos(lista);
            })
           }catch(error){
               alert(error.message);
           }
    };
    useEffect(()=>{
        obtenerReportes();
    },[]);

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
                width: width,
                height:height /2,
                alignSelf:'center',
                resizeMode:'contain'
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
                {nota.evento}</Text>
            <Text 
            style={{
               
               textAlign:'left',
               fontSize:20
            }}>{nota.tipo}</Text>
            <Text 
            style={{
               color:'#f8ae40',
               fontSize:18
            }}>
               {nota.fecha}</Text>
               <Text 
            style={{
               color:'#000000',
               fontSize:18
            }}>
               A partir de las: {nota.hora}</Text>
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
   const actualizar = () =>{
       obtenerReportes();
   }
    const sheetRef = React.useRef(null);
    return (
        <View style={{width:width,height:height,backgroundColor:'#eee'}}>
            <CustomHeader nombre='eventos' actualizar={actualizar}/>
            <View style={{width: width ,height:height ,alignSelf:'center',flex:1,marginTop:5}}>
                {cargando == false ? 
                                  <ScrollView>
                                  {eventos.reverse().map((evento,index)=>{
                                      return(
                                          <TouchableOpacity key={index} onPress={() => {cambiarNota(evento);sheetRef.current.snapTo(0)}}>
                                              <View style={{width:width * .99,height: height * .34,backgroundColor:'#cdcdcd',marginTop: 2,alignSelf:'center',borderRadius:15}}>
                                                <Image source={{uri:evento.imagen}} style={{width: width * .99,height: height * .18,alignSelf:'center',borderTopLeftRadius:15,borderTopRightRadius:15}}/>
                                                <View style={{width: width * .99, height: height * .10}}>
                                                    <Text style={{alignSelf:'center',color:'#000000',fontWeight:'bold'}}>{evento.evento}</Text>
                                                    <Text style={{alignSelf:'center',color:'#f44611',fontWeight:'bold'}}>{evento.fecha}</Text>
                                                </View>
                                                <View style={{width: width  * .99,height: height * .06,borderBottomLeftRadius:15,borderBottomRightRadius:15,flexDirection:'row',alignContent:'center'}}>
                                                    <View style={{marginLeft:10,width: width * .50, height: height * .03,backgroundColor:'blue',borderRadius:20}}>
                                                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>{evento.tipo}</Text>
                                                        </View>
                                                    <View style={{marginLeft:5,width: width * .15, height: height * .03,backgroundColor:'red',borderRadius:20}}>
                                                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Día {evento.dia}</Text>
                                                    </View>
                                                </View>
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
 
export default Eventos;