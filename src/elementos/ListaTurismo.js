import React, {useEffect,useState} from 'react';
import {View,Text,Dimensions,Image,TouchableOpacity,ScrollView,TextInput} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import imgCargando from './../Imagenes/noticia.png';
import BottomSheet from 'reanimated-bottom-sheet';
import Close from './../Imagenes/iconosMapa/close.png';

const {width,height} = Dimensions.get('window');

const ListaEventos = () => {
    const [lugares,cambiarLugares] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const [nota,cambiarNota] = useState([]);

    const obtenetLugares = () => {
        try{
            const newsRef = db.ref('tourism').limitToLast(20);
    
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                const lista = [];
                for(let id in Snapshot){
                        lista.push(Snapshot[id].placeData);
                        
                }
                cambiarCargando(false);
                cambiarLugares(lista);
            })
           }catch(error){
               alert(error.message);
           }
    };
    useEffect(()=>{
        obtenetLugares();
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
                height:height /3,
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
                {nota.noticia}</Text>
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
               Departamento: {nota.direccion}</Text>
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
                                  {lugares.reverse().map((place,index)=>{
                                      return(
                                          <View key={index}>
                                                 <View style={{width:width,height:height*.02}}>
                                            <TouchableOpacity onPress={()=>{
                                            db.ref('tourism/'+place.id).remove().then(()=>{
                                                cambiarCargando(true);
                                                obtenerLugares();
                                            });
                                           
                                        }}>
                                            <View style={{width:15,height:15,borderRadius:100,backgroundColor:'red',alignSelf:'flex-end',flexDirection:'column'}}>
                                                    <Image source={Close} style={{width:11,height:11,alignSelf:'center',marginTop:2}}/>
                                            </View>
                                        </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity key={index} onPress={() => {cambiarNota(place);sheetRef.current.snapTo(0)}}>
                                              <View style={{width:width * .99,height: height * .12,backgroundColor:'#cdcdcd',marginTop: 2,alignSelf:'center',borderRadius:30}}>
                                                <Image source={{uri:place.imagen}} style={{width: width * .99,height: height * .08,alignSelf:'center',borderTopLeftRadius:30,borderTopRightRadius:30}}/>
                                                <View style={{width: width * .99, height: height * .04}}>
                                                    <Text style={{alignSelf:'center',color:'#000000',fontWeight:'bold'}}>{place.lugar}</Text>
                                                </View>
                                                <View style={{width: width  * .99,height: height * .06,borderBottomLeftRadius:30,borderBottomRightRadius:30,flexDirection:'row',alignContent:'center'}}>
                                                    
                                                </View>
                                              </View>
                                          </TouchableOpacity>
                                          </View>
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
         snapPoints={[height,300,0]}
         enabledHeaderGestureInteraction={true}
         renderContent={renderContent}
         renderHeader={renderHeader}
         initialSnap={2}
      />
      </>
    )
}
export default  ListaEventos;