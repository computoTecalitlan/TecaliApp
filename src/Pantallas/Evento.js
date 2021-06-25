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

const Evento = ({route}) => {
    const navigator = useNavigation();
    const {descripcion,evento,dia,fecha,hora,id,imagen,tipo} = route.params;
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [date,cambiarDate] = useState(fecha);
    const [hour,cambiarHour] = useState(hora);
    const [description,cambiarDescription] = useState(descripcion);
    const [event,cambiarEvent] = useState(evento);
    const [type,cambiarType] = useState(tipo);
    const [day,cambiarDay] = useState(dia);
    const [image,cambiarImage] = useState(imagen);
    const [imagenActualizar,cambiarImagenActualizar] = useState(null);
    let urlImagen = '';

    useEffect(()=>{
        cambiarHour(hora);
        cambiarDate(fecha);
        cambiarEvent(evento);
        cambiarImage(imagen);
        cambiarType(tipo);
        cambiarDay(dia);
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
        let hr;
        //Esta funcion obtiene la fecha y le da formato de dia/mes/año

        //Los if anidados son para identificar si la hora seleccionada es AM o PM y si la hora marca menor a 10, se necesita completar con un '0' para completar los dos digitos
        if(f.getHours() < 12){
            if (f.getHours() < 10 ){
                if(f.getMinutes() < 10){
                    hr = '0'+f.getHours() + ':'+'0'+f.getMinutes()+' AM';
                }
                else{
                    hr = '0'+f.getHours() + ':'+ f.getMinutes()+' AM';
                }   
            }
           else{
               if(f.getMinutes() < 10 ){
                hr = f.getHours() + ':'+ '0' + f.getMinutes()+' AM';
               }
               else{
                    hr = f.getHours() + ':'+ f.getMinutes()+' AM';
               }
           }
        }else{
            if (f.getHours() < 10 ){
                if(f.getMinutes() < 10){
                    hr = '0'+f.getHours() + ':'+'0'+f.getMinutes()+' PM';
                }
                else{
                    hr = '0'+f.getHours() + ':'+ f.getMinutes()+' PM';
                }   
            }
           else{
               if(f.getMinutes() < 10 ){
                hr = f.getHours() + ':'+ '0' + f.getMinutes()+' PM';
               }
               else{
                    hr = f.getHours() + ':'+ f.getMinutes()+' PM';
               }
           }
        }
        cambiarDate(dd+'/'+mm+'/'+yyyy);
        cambiarHour(hr);
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
        
        const newsRef = db.ref('events/'+id);
        newsRef.update({
            eventData:{
                nombre:event,
                tipo:type,
                dia:day,
                imagen:urlImagen,
                fecha:date,
                hora:hour,
                descripcion:description,
                id:id
            }}).then(()=>{
                alert('Se modifico con exito el evento');
                navigator.goBack();
            }).catch((error) => alert('Hubo un error \n'+error));
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
                    <TextInput style={{fontWeight:'bold',fontSize:20}} value={event} onChangeText={text => cambiarEvent(text)}/>
                </View>
            </View>
            <View style={{width:width,height:height * .10}}>
                <View style={{width:'auto',height:'auto'}}>
                    <Text style={{width:'auto',height:'auto',color:'#828282',fontWeight:'bold'}}>{date}</Text>
                    <Text style={{width:'auto',height:'auto',color:'#828282',fontWeight:'bold'}}>{hour}</Text>
                    <TouchableOpacity onPress={mostrarDatePicker}>
                        <Image source={DateTime} style={{width:20,height:20,alignSelf:'center'}}/>
                        <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode='datetime'
                        onConfirm={confirmarFecha}
                        onCancel={ocultarDatePicker}
                        locale='es'
                />
                    </TouchableOpacity>
                </View>
            </View>
            <TextInput value={type} onChangeText={text => cambiarType(text)}/>
            <TextInput value={day} onChangeText={text => cambiarDay(text)}/>
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

export default Evento;