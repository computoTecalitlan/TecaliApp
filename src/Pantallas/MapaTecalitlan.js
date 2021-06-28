import React,{useEffect,useState} from 'react';
import {Text,View,Dimensions, ViewPropTypes,Image,TouchableOpacity} from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {db} from './../firebase/firebaseConfig';
import Iglesia from './../Imagenes/iconosMapa/church.png';
import Alimentos from './../Imagenes/iconosMapa/food.png';
import Hospital from './../Imagenes/iconosMapa/hospital.png';
import Cultura from './../Imagenes/iconosMapa/entertaiment.png';
import Public from './../Imagenes/iconosMapa/public-service.png';
import Hotel from './../Imagenes/iconosMapa/hotel.png'
import Escuela from './../Imagenes/iconosMapa/school.png';
import Deporte from './../Imagenes/iconosMapa/sport.png'
import Farmacia from './../Imagenes/iconosMapa/pharmacy.png';
import Gas from './../Imagenes/iconosMapa/gas.png'
import CustomHeader from './../elementos/CustomHeader';
import BottomSheet from 'reanimated-bottom-sheet';
import imgCargando from './../Imagenes/noticia.png'

const {width,height} = Dimensions.get('window');


const MapaTecalitlan = () => {
    const [ubicaciones,cambiarUbicaciones] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    
    useEffect(()=>{
        obtenerUbicaciones();
    },[])

    useEffect(()=>{
        return(
            cambiarCargando(true)
        );
    },[])
    const obtenerUbicaciones = ()=>{
        try{
            const locRef = db.ref('mapmarkers');
        const lista = [];
        locRef.on(('value'),(snapshot) => {
            const snap = snapshot.val();
            for(let id in snap){
                lista.push(snap[id].mapMarkerData)
            }  
            cambiarCargando(false); 
        })
        cambiarUbicaciones(lista);
        }catch(error){alert(error)}
    }

    const cambiarIcono = (categoria) =>{
        switch(categoria){
            case 'Templo':
                return Iglesia;
            case 'Alimentos':
                return Alimentos;
            case 'Cultura':
                return Cultura;
            case 'Hotel':
                return Hotel
            case 'Educación':
                return Escuela;
            case 'Servicios medicos':
                return Hospital;
            case 'Deporte':
                return Deporte;
            case 'Servicios publicos':
                return Public;
            case 'Farmacia':
                return Farmacia;
            case 'Gasolinera':
                return Gas;
        }
    }

    //Funcion para el contenido de la bottom-sheet
    const renderContent = () => (
        <View
           style={{
               backgroundColor: '#eee',
               padding: 16,
               height: height * 1.1
           }}
        >
           <Text 
            style={{
                alignSelf:'center',
                fontWeight:'bold',
                fontSize:20,
                color:'#f8ae40'
            }} 
           >Simbología</Text>
           <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={Cultura} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Cultura</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Deporte} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Deportes</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Farmacia} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Farmacia</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Gas} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Gasolinera</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Hotel} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Hotel</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Escuela} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Institución educativa</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Alimentos} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Restaurantes y/o venta de alimentos</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Hospital} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Servicios médicos</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Public} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Servicios públicos</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={Iglesia} style={{width:50,height:50}}/>
                    <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18}}>Templo</Text>
                </View>
                <Text style={{alignSelf:'center',color:'#828282',fontWeight:'bold',fontSize:18,textAlign:'justify'}}>Si deseas que tu negocio aparezca, acude a la oficina de computo del H. ayuntamiento</Text>
                <Text style={{alignSelf:'center',color:'#ff0000',fontWeight:'bold',fontSize:18,textAlign:'justify'}}>*El registro es gratuito</Text>
           </View>
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
       //--------------------------------------------------------------------------------------------------------------------------------------------------
   )
    const sheetRef = React.useRef(null);
    const consSimb = () =>{
        sheetRef.current.snapTo(0);
    }
        return ( 
            <View style={{width:width,height:height,flex:1}}>
                {cargando == false ? 
                    <View>
                    <MapView
                       initialRegion={{
                           latitude: 19.470847,
                           longitude: -103.306859,
                           latitudeDelta: 0.0122,
                           longitudeDelta: width / height * 0.0122
                       }}
                       style={{width: width,height:height}}
                       mapType='standard'
                       showsPointsOfInterest={false}
                       provider={PROVIDER_GOOGLE}
                       customMapStyle={[
                        {
                          featureType: "administrative",
                          elementType: "geometry",
                          stylers: [
                          {
                              visibility: "off"
                          }
                          ]
                        },
                        {
                          featureType: "poi",
                          stylers: [
                            {
                              visibility: "off"
                            }
                          ]
                        },
                        {
                          featureType: "road",
                          elementType: "labels.icon",
                          stylers: [
                            {
                              visibility: "off"
                            }
                          ]
                        },
                        {
                          featureType: "transit",
                          stylers: [
                            {
                              visibility: "off"
                            }
                          ]
                        }
                      ]}
            
                       
                       
                    >
                        {ubicaciones.map((ubicacion,index)=>{
                            return(
                                <Marker
                                    key={index}
                                    coordinate={{
                                    latitude: ubicacion.latitude,
                                    longitude: ubicacion.longitude
                                }}
                                
                                title={ubicacion.name}
                                description={ubicacion.categoria + '\n' + ubicacion.phone + '\n' + ubicacion.schedule}
                                image={cambiarIcono(ubicacion.categoria)}
                                
                        />
                            );
                        })}
                    </MapView>
                          <CustomHeader nombre='mapa' consSimb={consSimb}/>
                   </View>
                : 
                    <TouchableOpacity onPress={() => obtenerUbicaciones()}>
                        <View style={{height:'auto'}}>
                            <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain',marginTop:100}}/>
                        <Text style={{alignSelf:'center'}}>Estamos investigando ... {'\n'} Presiona para  al ciudadano volver a cargar </Text> 
                        </View> 
                    </TouchableOpacity>
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
 
export default MapaTecalitlan;