import React, {useEffect,useState} from 'react';
import {View,Text,Dimensions,Image,TouchableOpacity,ScrollView} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import Refresh from './../Imagenes/refresh.png';
import Close from './../Imagenes/iconosMapa/close.png';

const {width,height} = Dimensions.get('window');

const ListaEventos = () => {
    const [eventos,cambiarEventos] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const navigator = useNavigation();
    const obtenerEventos = () => {
        try{
            const newsRef = db.ref('activities').limitToLast(20);
    
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                const lista = []
                for(let id in Snapshot){
                        lista.push(Snapshot[id].activityData);
                        
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
    return(
        <>
        <View style={{width:width,height:height}}>
            {cargando == false ? 
                                  <ScrollView >
                                  {eventos.reverse().map((actividad,index)=>{
                                      //Este touchable opacity, es el circulo rojo de eliminar sobre la tarjeta, se encuentra en todas las listas del admin
                                      //Es para eliminar el registro de la base de datos.
                                      return(
                                        <View key={index}>
                                        <TouchableOpacity onPress={()=>{
                                            db.ref('activities/'+actividad.id).remove().then(()=>{
                                                cambiarCargando(true);
                                                obtenerEventos();
                                            });
                                           
                                        }}>
                                            <View style={{width:width,height:height*.02}}>
                                                <View style={{width:15,height:15,borderRadius:100,backgroundColor:'red',alignSelf:'flex-end',flexDirection:'column'}}>
                                                    <Image source={Close} style={{width:11,height:11,alignSelf:'center',marginTop:2}}/>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                          <TouchableOpacity  onPress={() => {navigator.navigate('act',{
                                            actividad:actividad.actividad,
                                            descripcion:actividad.descripcion,
                                            fecha:actividad.fecha,
                                            hora:actividad.hora,
                                            imagen:actividad.imagen,
                                            id: actividad.id
                                        }); cambiarCargando(true);cambiarEventos([])}}>
                                              <View style={{width:width * .99,height: height * .12,backgroundColor:'#cdcdcd',alignSelf:'center',borderRadius:20}}>
                                                <Image source={{uri:actividad.imagen}} style={{width: width * .99,height: height * .08,alignSelf:'center',borderTopLeftRadius:20,borderTopRightRadius:20}}/>
                                             
                                                <View style={{width: width * .99, height: height * .04}}>
                                                    <View style={{maxWidth:width/2,maxHeight:height * .04,flexDirection:'row',width:'auto',height:'auto',alignSelf:'center'}}>
                                                        <Text style={{alignSelf:'center',color:'#000000',fontWeight:'bold'}}>{actividad.actividad}</Text>
                                                        <Text style={{alignSelf:'center',color:'#f44611',fontWeight:'bold'}}>{actividad.fecha}</Text>
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
      </>
    )
}
export default  ListaEventos;