import React, {useEffect,useState} from 'react';
import {View,Text,Dimensions,Image,TouchableOpacity,ScrollView} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import imgCargando from './../Imagenes/noticia.png';
import {useNavigation} from '@react-navigation/native';
import Close from './../Imagenes/iconosMapa/close.png';
const {width,height} = Dimensions.get('window');

const ListaEventos = () => {
    const navigator = useNavigation();
    const [noticias,cambiarNoticias] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const [nota,cambiarNota] = useState([]);

    const obtenerNoticias = () => {
        try{
            const newsRef = db.ref('news');
    
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                const lista = [];
                for(let id in Snapshot){
                        lista.push(Snapshot[id].newData);
                        
                }
                cambiarCargando(false);
                cambiarNoticias(lista);
            })
           }catch(error){
               alert(error.message);
           }
    };
    useEffect(()=>{
        obtenerNoticias();
    },[]);
    return(
        <>
        <View style={{width:width,height:height*.82}}>
            {cargando == false ? 
            <View style={{flex:1,height:'auto'}}>
                                  <ScrollView >
                                  {noticias.reverse().map((noticia,index)=>{
                                      return(
                                          <View key={index}>
                                        <TouchableOpacity onPress={()=>{
                                            db.ref('news/'+noticia.id).remove().then(()=>{
                                                cambiarCargando(true);
                                                obtenerNoticias();
                                            });
                                           
                                        }}>
                                            <View style={{width:width,height:height*.02}}>
                                                <View style={{width:15,height:15,borderRadius:100,backgroundColor:'red',alignSelf:'flex-end',flexDirection:'column'}}>
                                                    <Image source={Close} style={{width:11,height:11,alignSelf:'center',marginTop:2}}/>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                          <TouchableOpacity  onPress={() => {navigator.navigate('noticia',{
                                              noticia:noticia.noticia,
                                              fecha:noticia.fecha,
                                              imagen:noticia.imagen,
                                              descripcion:noticia.descripcion,
                                              id:noticia.id,
                                              direccion:noticia.direccion,
                                          })}}>
                                              <View style={{width:width * .99,height: height * .30,backgroundColor:'#cdcdcd',marginTop: 2,alignSelf:'center',borderRadius:15}}>
                                                <Image source={{uri:noticia.imagen}} style={{width: width * .99,height: height * .20,alignSelf:'center',borderTopLeftRadius:15,borderTopRightRadius:15}}/>
                                                <View style={{width: width * .99, height: height * .04}}>
                                                <View style={{maxWidth:width/2,maxHeight:height * .10,flexDirection:'row',width:'auto',height:'auto',alignSelf:'center'}}>
                                                        <Text style={{alignSelf:'center',color:'#000000',fontWeight:'bold'}}>{noticia.noticia}</Text>
                                                        <Text style={{alignSelf:'center',color:'#f44611',fontWeight:'bold'}}>{noticia.fecha}</Text>
                                                    </View>
                                                </View>
                                              </View>
                                          </TouchableOpacity>
                                          </View >
                                      );
                                  })}
                              </ScrollView>  
                              </View>
                : 
                <View style={{flex:1}}>
                    <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain'}}/>
                    <Text style={{alignSelf:'center'}}>Estamos investigando ... </Text> 
                </View> 
                }
        </View>
      </>
    )
}
export default  ListaEventos;