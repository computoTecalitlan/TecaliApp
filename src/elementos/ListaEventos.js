import React, {useEffect,useState} from 'react';
import {View,Text,Dimensions,Image,TouchableOpacity,ScrollView} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import imgCargando from './../Imagenes/noticia.png';
import BottomSheet from 'reanimated-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import Refresh from './../Imagenes/refresh.png';
import Close from './../Imagenes/iconosMapa/close.png';

const {width,height} = Dimensions.get('window');

const ListaEventos = () => {
    const [eventos,cambiarEventos] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const [nota,cambiarNota] = useState([]);
    const navigator = useNavigation();
    const obtenerEventos = async () => {
        try{
            const newsRef = db.ref('events').limitToLast(20);
    
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                const lista = [];
                for(let id in Snapshot){
                        lista.push(Snapshot[id].eventData);
                        
                }
                cambiarEventos(lista);
                cambiarCargando(false);
            })
           }catch(error){
               alert(error.message);
           }
    };
    useEffect(()=>{
            obtenerEventos();
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
                {nota.nombre}</Text>
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
       
   );
    const sheetRef = React.useRef(null);
    return(
        <>
        <View style={{width:width,height:height}}>
            {cargando == false ? 
                                  <ScrollView>
                                  {eventos.reverse().map((evento,index)=>{
                                      return(
                                          <View key={index}>
                                            <View style={{width:width,height:height*.02}}>
                                            <TouchableOpacity onPress={()=>{
                                            db.ref('events/'+evento.id).remove().then(()=>{
                                                cambiarCargando(true);
                                                obtenerEventos();
                                            });
                                           
                                        }}>
                                            <View style={{width:15,height:15,borderRadius:100,backgroundColor:'red',alignSelf:'flex-end',flexDirection:'column'}}>
                                                    <Image source={Close} style={{width:11,height:11,alignSelf:'center',marginTop:2}}/>
                                            </View>
                                        </TouchableOpacity>
                                            </View>
                                        
                                        <TouchableOpacity  onPress={() => {navigator.navigate('evento',{
                                              evento:evento.nombre,
                                              descripcion:evento.descripcion,
                                              fecha:evento.fecha,
                                              hora:evento.hora,
                                              imagen:evento.imagen,
                                              tipo:evento.tipo,
                                              id:evento.id,
                                              dia:evento.dia
                                          }); cambiarEventos([]);
                                                    cambiarCargando(true);
                                                }}>
                                              <View style={{width:width * .99,height: height * .15,backgroundColor:'#cdcdcd',marginTop: 2,alignSelf:'center',borderRadius:30}}>
                                                <Image source={{uri:evento.imagen}} style={{width: width * .99,height: height * .08,alignSelf:'center',borderTopLeftRadius:30,borderTopRightRadius:30}}/>
                                                <View style={{width: width * .99, height: height * .04}}>
                                                    <View style={{flexDirection:'row',maxWidth:width/2,maxHeight:height*.04,height:'auto',width:'auto',alignSelf:'center'}}>
                                                    <Text style={{alignSelf:'center',color:'#000000',fontWeight:'bold'}}>{evento.nombre}</Text>
                                                    <Text style={{alignSelf:'center',color:'#f44611',fontWeight:'bold'}}>{evento.fecha}</Text>
                                                    </View>
                                                </View>
                                                <View style={{width: width  * .99,height: height * .03,borderBottomLeftRadius:30,borderBottomRightRadius:30,flexDirection:'row',alignContent:'center'}}>
                                                    <View style={{marginLeft:10,width: width * .50, height: height * .03,backgroundColor:'blue',borderRadius:20}}>
                                                        <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>{evento.tipo}</Text>
                                                        </View>
                                                    <View style={{marginLeft:5,width: width * .15, height: height * .03,backgroundColor:'red',borderRadius:20}}>
                                                    <Text style={{textAlign:'center',color:'#fff',fontWeight:'bold'}}>Día {evento.dia}</Text>
                                                    </View>
                                                </View>
                                              </View>
                                          </TouchableOpacity>
                                          </View>
                                          
                                      );
                                  })}
                              </ScrollView>  
                : 
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={obtenerEventos}>
                                  <Image source={Refresh} style={{width:50,height:50,alignSelf:'center'}}/>
                                  <Text style={{fontWeight:'bold',color:'#828282',alignSelf:'center'}}>Recargar</Text>
                    </TouchableOpacity>
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
      </>
    )
}
export default  ListaEventos;
