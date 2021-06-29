import React, {useState,useEffect} from 'react';
import {Text,Dimensions,View,ImageBackground,Image,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoBack from './../Imagenes/back-orange.png';
import Camera from './../Imagenes/camera.png';
import {useNavigation} from  '@react-navigation/native';
import MapView,{PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {db} from './../firebase/firebaseConfig';

const {width,height} = Dimensions.get('window');
const EditarLugar = ({route}) => {
    const {lugar,id,descripcion,longitude,latitude,imagen} = route.params;
    const navigator = useNavigation();
    const [place,cambiarLugar] = useState(lugar);
    const [description,cambiarDescription] = useState(descripcion);
    const [image,cambiarImage] = useState(imagen);
    const [long,cambiarLong] = useState(longitude);
    const [lat,cambiarLat] = useState(latitude);
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [imagenActualizar,cambiarImagenActualizar]= useState(null);
   
    let urlImagen = '';


    useEffect(()=>{
            cambiarLugar(lugar);
            cambiarDescription(descripcion);
            cambiarImage(imagen);
            cambiarLong(longitude);
            cambiarLat(latitude);
            urlImagen = imagen
    },[id]);
    const handleImageLib = () =>{
        const options = {
            mediaType:'photo'
        };
        launchImageLibrary(options,response => {
             if(response.uri){
                    cambiarImage(response.uri);
                    cambiarImagenActualizar(response);
                    alert(imagenActualizar);
             }
        })
    };
    const actualizarImagen = async () =>{
        const uploadUri = imagenActualizar;
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
                actualizarLugar();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
            })
            .catch(error => {
                alert(error);
            })
    };
    const actualizarLugar = () => {
        
        const newsRef = db.ref('tourism/'+id);
        newsRef.update({
            activityData:{
                lugar: place,
                descripcion: description,
                imagen:urlImagen,
                id:id,
                latitude:lat,
                longitude:long
            }}).then(()=>{
                alert('Se modifico con exito la actividad');
                navigator.goBack();
            }).catch((error) => alert('Hubo un error \n'+error));
   }
    return ( 
        <View style={{width: width, height: height,backgroundColor:'#eee'}}>
            <View style={{width:width,height:height * .10,flexDirection:'row'}}>
                <View style={{width:width * .10,height:height * .10,flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>{
                    navigator.goBack();
                    }}>
                    <Image source={GoBack} style={{width:20,height:20,marginTop:36,alignSelf:'center'}}/>
                </TouchableOpacity>
                </View>
                <View style={{width: width * .90,height:height * .10}}>
                    <TextInput style={{marginTop:30,fontSize:22,fontWeight:'bold'}} onChangeText={text => cambiarLugar(text)} value={place}/>
                </View>
            </View>
         
            <View style={{width:width,height:'auto',maxHeight:height*.15}}>
            <TextInput  value={description}
                        onChangeText={text => cambiarDescription(text)} 
                        style={{width:'auto',height:'auto',color:'#000'}} 
                        multiline={true}
                        textAlign='justify'/>
                        
            </View>
            <View style={{width:width,height:295}}>
            <MapView 
                region={{
                    latitude:lat,
                    longitude:long,
                    latitudeDelta: 0.0522,
                    longitudeDelta: width / 295 * 0.0322,
                }}
                style={{width:width,height:295}}
                provider={PROVIDER_GOOGLE}
                onPress={(event)=>{
                    cambiarLat(event.nativeEvent.coordinate.latitude);
                    cambiarLong(event.nativeEvent.coordinate.longitude);
                }}
            >
                <Marker 
                    coordinate={{
                        latitude: lat,
                        longitude:long

                    }}
                    title={place}
                />
            </MapView>
        </View>
        <ImageBackground style={{width:width, height:height * .30,borderRadius:100}} source={{uri:image}}>
            <TouchableOpacity onPress={handleImageLib}>
                <View style={{width:30,height:'auto',borderRadius:20,backgroundColor:'#828282',alignSelf:'flex-end'}}>
                    <Image source={Camera} style={{width:20,height:20,alignSelf:'center'}}/>
                </View>
                </TouchableOpacity>
                <View style={{width:width,height:height * .30,flexDirection:'column-reverse'}}>
                    <TouchableOpacity onPress={()=>{
                        if(imagenActualizar){
                            actualizarImagen();
                        }else{
                            urlImagen=imagen;
                            actualizarLugar();
                        }
                    }}>
                    <View style={{width:80,height:20,borderRadius:20,backgroundColor:'#828282',alignSelf:'center'}}><Text style={{alignSelf:'center',color:'#fff'}}>Guardar</Text></View>
                    </TouchableOpacity>
                </View>
        </ImageBackground>
        </View>
     );
}
 
export default EditarLugar;