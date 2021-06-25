import React,{useState,useEffect} from 'react';
import {Text,View,ImageBackground,Image,TextInput,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import GoBack from './../Imagenes/back-orange.png';
import DateTime from './../Imagenes/date-time.png'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Camera from './../Imagenes/camera.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {db} from './../firebase/firebaseConfig';

const {width,height} = Dimensions.get('window');

const Noticia = ({route}) => {
    const navigator = useNavigation();
    const {noticia,id,fecha,descripcion,direccion,imagen} =route.params;
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [date,cambiarDate] = useState(fecha);
    const [description,cambiarDescription] = useState(descripcion);
    const [Noticia,cambiarNoticia] = useState(noticia);
    const [dept,cambiarDireccion] = useState(direccion);
    const [image,cambiarImage] = useState(imagen);
    const [imagenActualizar,cambiarImagenActualizar] = useState(null);
    let urlImagen = '';

    useEffect(()=>{
        cambiarDate(fecha);
        cambiarNoticia(noticia);
        cambiarImage(imagen);
        cambiarDireccion(direccion);
        cambiarDescription(descripcion);
    },[id]);

    const mostrarDatePicker = () => {
        cambiarDatePickerVisible(true);
    }
    const ocultarDatePicker = () => {
        cambiarDatePickerVisible(false);
    }
    const confirmarFecha = (f) => {
        ocultarDatePicker();
        let dd = f.getDate();
        let mm = f.getMonth() + 1;
        let yyyy = f.getFullYear();
        cambiarDate(dd+'/'+mm+'/'+yyyy); 
    }
    const handleImageLib = () =>{
        const options = {
            mediaType:'photo'
        };
        launchImageLibrary(options,response => {
             if(response.uri){
                    cambiarImage(response.uri);
                    cambiarImagenActualizar(response);
             }
        })
    };
    const actualizarEventos = () => {
        
        const newsRef = db.ref('news/'+id);
        newsRef.update({
            newData:{
                noticia:Noticia,
                direccion:dept,
                descripcion:description,
                fecha:date,
                id:id,
                imagen:urlImagen
            }}).then(()=>{
                alert('Se modifico con exito el ');
                navigator.goBack();
            }).catch((error) => alert('Hubo un error \n'+error));
   };
   const actualizarImagen = async () =>{
    const uploadUri = imagenActualizar;
    const imageFormData = new FormData();
    
    imageFormData.append('file',{
        name:uploadUri.fileName,
        size:uploadUri.fileSize,
        direccion: uploadUri.direccion,
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
            urlImagen = url; //Aqui obtengo como respuesta la url de la  ya en cloudinary.
            actualizarEventos();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
        })
        .catch(error => {
            alert(error);
        })
};
    return(
        <View style={{width:width,height:height}}>
            <View style={{width:width,height:'auto',flexDirection:'row'}}>
                <View style={{width:width*.10,height:height*.10,flexDirection:'column-reverse'}}>
                    <TouchableOpacity onPress={()=>navigator.goBack()}><Image source={GoBack} style={{width:30,height:30}}/></TouchableOpacity>
                </View>
                <View style={{width:'auto',height:height*.10,flexDirection:'column-reverse'}}>
                    <TextInput style={{fontWeight:'bold',fontSize:20}} value={Noticia} onChangeText={text => cambiarNoticia(text)}/>
                </View>
            </View>
            <View style={{width:width,height:height * .10}}>
                <View style={{width:'auto',height:'auto'}}>
                    <Text style={{width:'auto',height:'auto',color:'#828282',fontWeight:'bold'}}>{date}</Text>
                   
                    <TouchableOpacity onPress={mostrarDatePicker}>
                        <Image source={DateTime} style={{width:20,height:20,alignSelf:'center'}}/>
                        <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode='date'
                        onConfirm={confirmarFecha}
                        onCancel={ocultarDatePicker}
                        locale='es'
                />
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput value={dept} onChangeText={text => cambiarDireccion(text)}/>
            
            <View style={{width:width,height:'auto',maxHeight:height*.10}}>
            <TextInput  value={description}
                        onChangeText={text => cambiarDescription(text)}
                        style={{width:'auto',height:'auto',color:'#000'}} 
                        multiline={true} />
                        
                       
            </View>
            <ImageBackground style={{width:width,height:height * .70}} source={{uri:image}}>
            <TouchableOpacity onPress={handleImageLib}>
                <View style={{width:30,height:'auto',borderRadius:20,backgroundColor:'#828282',alignSelf:'flex-end'}}>
                    <Image source={Camera} style={{width:20,height:20,alignSelf:'center'}}/>
                </View>
                
                <View style={{width:width,height:height * .60,flexDirection:'column-reverse'}}>
                    <TouchableOpacity onPress={()=>{
                        if(imagenActualizar){
                           actualizarImagen();
                        }else{
                            urlImagen= image
                            actualizarEventos();
                        }
                    }}>
                    <View style={{width:80,height:20,borderRadius:20,backgroundColor:'#828282',alignSelf:'center'}}><Text style={{alignSelf:'center',color:'#fff'}}>Guardar</Text></View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

export default Noticia;