import React, {useState,useEffect} from 'react';
import {Text,View,Dimensions,ScrollView,TouchableOpacity,Image} from 'react-native';
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
import Close from './../Imagenes/iconosMapa/close.png';
import GoBack from './../Imagenes/back-orange.png';
import {useNavigation} from '@react-navigation/native';
const {width,height} = Dimensions.get('window');



const MapaEliminar = () => {
    const [ubicaciones,cambiarUbicaciones] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
    const navigator = useNavigation();
    useEffect(()=>{
        obtenerUbicaciones();
    },[]);

    useEffect(()=>{
        return(
            cambiarCargando(true)
        );
    },[])
   
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
    return(
    <View style={{width:width,height:height * .98,backgroundColor:'#eee'}}>
        <View style={{width:width,height:'auto'}}>
        <View style={{width:width*.10,height:height*.10,flexDirection:'column-reverse'}}>
                    <TouchableOpacity onPress={()=>navigator.goBack()}><Image source={GoBack} style={{width:30,height:30}}/></TouchableOpacity>
                </View>
        </View>
        <ScrollView>
            {ubicaciones.map((ubicacion,index)=>{
                return(
                    <View style={{width:width,height:height*.05,marginTop:2,flexDirection:'row'}} key={index}>
                        <View style={{height:height*.05,width:width*.10}}><Image source={cambiarIcono(ubicacion.categoria)} style={{height:height * .05,width:width*.10}}/></View>
                        <View style={{height:height*.05,width:width*.80}}><Text style={{fontWeight:'bold',fontSize:20,textAlign:'justify'}}>{ubicacion.name}</Text></View>
                        <View style={{height:height*.05,width:width*.10}}>
                            <TouchableOpacity onPress={()=>{
                                db.ref('mapmarkers/'+ubicacion.id).remove().then(()=>{
                                    cambiarCargando(true);
                                    obtenerUbicaciones();
                                });

                            }}>
                                <Image source={Close} style={{width:width*.09,height:height*.04}}/>
                            </TouchableOpacity>
                        </View>  
                    </View>
                );
            })}
        </ScrollView>
    </View>
    );
}

export default MapaEliminar;
