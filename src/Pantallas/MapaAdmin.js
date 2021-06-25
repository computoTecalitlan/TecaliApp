import React from 'react';
import {Text,View,Dimensions, ViewPropTypes,Image,TouchableOpacity,TextInput, ScrollView} from 'react-native';
import { Marker } from 'react-native-maps';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {db} from './../firebase/firebaseConfig';
import { useEffect, useState } from 'react/cjs/react.development';
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
import imgCargando from './../Imagenes/noticia.png'
import {useNavigation} from '@react-navigation/native';
const {width,height} = Dimensions.get('window');


const MapaAdmin = () => {
    const [ubicaciones,cambiarUbicaciones] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const navigator = useNavigation();
    const [scroll,ocultarScroll] = useState(true)
    useEffect(()=>{
        obtenerUbicaciones();
    },[]);

   
    const obtenerUbicaciones = async ()=>{
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
    };
    

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
                       onPress={event => {
                           navigator.navigate('agregarMap',{
                              latitude:event.nativeEvent.coordinate.latitude,
                               longitude:event.nativeEvent.coordinate.longitude
                           });
                           
                       }}
                       zoomTapEnabled={false}
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
                          <CustomHeader nombre='mapaAdmin' />
                   </View>
                : 
                    <TouchableOpacity onPress={() => obtenerUbicaciones()}>
                        <View style={{height:'auto'}}>
                            <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain',marginTop:100}}/>
                        <Text style={{alignSelf:'center'}}>Estamos investigando ... {'\n'} Presiona para  al ciudadano volver a cargar </Text> 
                        </View> 
                    </TouchableOpacity>
                }
            </View>
         );
    
    
}
 

export default MapaAdmin;