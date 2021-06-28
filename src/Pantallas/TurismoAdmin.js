import React,{useState} from 'react';
import { View,Text,Dimensions,Image,TouchableOpacity, TextInput,Alert } from 'react-native';
import ListaTurismo from './../elementos/ListaTurismo';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Galeria from './../Imagenes/image-white.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {db} from './../firebase/firebaseConfig';
const {width,height} = Dimensions.get('window');



const TurismoAdmin = () => {
    const [estadoForm,cambiarEstadoForm] = useState(true);
    const [form,cambiarForm] = useState('');
    const [lugar,cambiarLugar] = useState();
    const [descripcion,cambiarDescripcion] = useState();
    const [latitude,cambiarLatitude] = useState();
    const [longitude,cambiarLongitude] = useState();
    const [imagen,cambiarImagen] = useState();
   
    const handleImageLib = () =>{
        const options = {
            mediaType:'photo',
            isSingleSelect:false
        };
        launchImageLibrary(options,response => {
            
             if(response.uri){
                    cambiarImagen(response);
             }
        })
    };

    const subirImagen = async () =>{
        const uploadUri = imagen;
        const imageFormData = new FormData();
        
        imageFormData.append('file',{
            name:uploadUri.fileName,
            size:uploadUri.fileSize,
            type: uploadUri.type,
            uri:uploadUri.uri
        });
        imageFormData.append('upload_preset','ayuntamiento');        
            axios({
                url:'https://api.cloudinary.com/v1_1/h-ayuntamiento-de-tecalitlan/image/upload',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: imageFormData
            }).then((response) => {
                const{data} = response;
                const {url} = data;
                urlImagen = url; //Aqui obtengo como respuesta la url de la imagen ya en cloudinary.
                depositarLugar();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
            })
            .catch(error => {
                alert(error);
            })
   }
   const depositarLugar = () => {
       //Hago un alert que le pide al usuario una conifirmación de que los datos son correctos
    Alert.alert("Confirmación","¿Los datos son correctos? \n Lugar: "+lugar+"\n Descripcion: "+descripcion,[
        {
            text:"No", //Si presiona 'No', simplemente se cierra el alert y le da oportunidad de modificar los datos.
            style: 'cancel'
        },
        {
            text:"Enviar", //Si presiona enviar se ejecuta la funcion de enviar los datos
            onPress:()=>{
                if(urlImagen && latitude && longitude){    
                  const sendRef =  db.ref('tourism').push()
                  let id = sendRef.key;
                       sendRef.set({
                           placeData:{
                                lugar:lugar,
                                descripcion:descripcion,
                                latitude:latitude,
                                longitude:longitude,
                                imagen:urlImagen,
                                id:id
                           }})
                       .then(() => {
                           alert('Se registró con exito el evento');
                            cambiarEstadoForm(true);
                            cambiarForm('');
                            cambiarImagen(null);
                            cambiarDescripcion('');
                            cambiarLugar('');
                            cambiarLatitude('');
                            cambiarLongitude('');
                            })
                        .catch(error => {alert(error)})
                    }else {
                        alert('Tienes que completar todos los datos');
                    }
            }
        }
    ]);//Termina Alert
    }
   
   
    return(
        <View >
            {estadoForm == true ? 
            <View style={{width:width,height:'auto'}}>
                
                <View style={{width:'auto',height:'auto',flexDirection:'row',alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{
                     cambiarForm('agregar');
                     cambiarEstadoForm(false);
                     }}>
            <View style={{width:'auto',height:'auto',borderRadius:10,backgroundColor:'#45b39d'}}><Text style={{fontWeight:'bold'}}>Agregar nuevo</Text></View>
        </TouchableOpacity>
        
                </View>
               
            </View>
        : 
        <></>
        }
        {form == 'agregar' ?
            <>
                <View style={{width:width/3,alignSelf:'flex-end',height:20}}>
                    <TouchableOpacity onPress={()=>{cambiarEstadoForm(true);cambiarForm('');}}>
                        <View style={{width:50,height:'auto',borderRadius:20,backgroundColor:'red',alignSelf:'flex-end',marginRight:3}}><Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>X</Text></View>
                    </TouchableOpacity>   
                </View>
                <TextInput style={{width:'auto',height:'auto',fontWeight:'bold'}} placeholder='Lugar' value={lugar} onChangeText={text =>cambiarLugar(text)}/>
                <TextInput multiline={true} style={{width:'auto',height:'auto',fontWeight:'bold'}} placeholder='Descripcion' value={descripcion} onChangeText={text => cambiarDescripcion(text)}/>
                <View style={{width:width,height: height/3}}>
                <MapView
                       initialRegion={{
                           latitude: 19.470847,
                           longitude: -103.306859,
                           latitudeDelta: 0.0122,
                           longitudeDelta: width / height * 0.0122
                       }}
                       style={{width: width,height:height / 3}}
                       mapType='standard'
                       showsPointsOfInterest={false}
                       provider={PROVIDER_GOOGLE}
                       onPress={event => {
                           cambiarLatitude(event.nativeEvent.coordinate.latitude);
                           cambiarLongitude(event.nativeEvent.coordinate.longitude);
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
                    {latitude && longitude ? 
                        <Marker
                        
                        coordinate={{
                        latitude: latitude,
                        longitude: longitude
                    }}
                    
                    title={lugar}
                    description={descripcion}
            />
                    : <></>}
                    </MapView>
                </View>
                <TouchableOpacity onPress={()=> handleImageLib()}>
                        <View style={{width: 55,backgroundColor:'#f8ae40',height:50,borderRadius:4,alignSelf:'center',marginTop:3}}>
                            <Image source={Galeria}  style={{width:30,height:30,alignSelf:'center'}}/>
                            <Text style={{color:'#fff',alignSelf:'center'}}>Galería</Text>
                        </View>
                </TouchableOpacity>
                <View style={{marginTop:2,width:width * .92,height:150,alignSelf:'center',borderStyle:'dashed',borderWidth:1,borderColor:'#828282'}}>
                                {imagen ? 
                                    <Image source={{uri:imagen.uri}} style={{width:width * .92,height:150,borderRadius:5}}/>
                                :
                                <View style={{width:width *.92}}>
                                    <Text style={{alignSelf:'center',color:'#828282'}}> - No has seleccionado ninguna imagen - </Text>
                                </View>
                                }
                    </View>
                        <TouchableOpacity onPress={subirImagen}>
                            <View style={{backgroundColor:'green',width:'auto',borderRadius:5,marginTop:10,height: 'auto',alignSelf:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
            </>
        : 
        <>
            <ListaTurismo/>
        </>
        }
        </View>
    );   
}

export default TurismoAdmin;