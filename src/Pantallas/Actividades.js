import React, {useState,useEffect} from 'react';
import {Text,StatusBar,Dimensions,View,ImageBackground,Image,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoBack from './../Imagenes/back-orange.png';
import Camera from './../Imagenes/camera.png';
import DateTime from './../Imagenes/date-time.png'
import {useNavigation} from  '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {db} from './../firebase/firebaseConfig';

const {width,height} = Dimensions.get('window');
const Actividades = ({route}) => {
    const {actividad,descripcion,fecha,hora,imagen,id} = route.params;
    const navigator = useNavigation();
    const [date,cambiarDate] = useState(fecha);
    const [hour,cambiarHour] = useState(hora);
    const [activity,cambiarActivity] = useState(actividad);
    const [description,cambiarDescription] = useState(descripcion);
    const [image,cambiarImage] = useState(imagen);
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [imagenActualizar,cambiarImagenActualizar]= useState(null);
   
    let urlImagen = '';
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
    useEffect(()=>{
            cambiarHour(hora);
            cambiarDate(fecha);
            cambiarActivity(actividad);
            cambiarDescription(descripcion);
            cambiarImage(imagen);
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
                actualizarActividades();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
            })
            .catch(error => {
                alert(error);
            })
    };
    const actualizarActividades = () => {
        
        const newsRef = db.ref('activities/'+id);
        newsRef.update({
            activityData:{
                actividad: activity,
                descripcion: description,
                fecha:date,
                hora:hour,
                imagen:urlImagen,
                id:id
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
                    <TextInput style={{marginTop:30,fontSize:22,fontWeight:'bold'}} onChangeText={text => cambiarActivity(text)} value={activity}/>
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
            <View style={{width:width,height:'auto',maxHeight:height*.10}}>
            <TextInput  value={description}
                        onChangeText={text => cambiarDescription(text)} 
                        style={{width:'auto',height:'auto',color:'#000'}} 
                        multiline={true}/>
            </View>
        
        <ImageBackground style={{width:width, height:height * .70,borderRadius:100}} source={{uri:image}}>
            <TouchableOpacity onPress={handleImageLib}>
                <View style={{width:30,height:'auto',borderRadius:20,backgroundColor:'#828282',alignSelf:'flex-end'}}>
                    <Image source={Camera} style={{width:20,height:20,alignSelf:'center'}}/>
                </View>
                
                <View style={{width:width,height:height * .60,flexDirection:'column-reverse'}}>
                    <TouchableOpacity onPress={()=>{
                        if(imagenActualizar){
                            actualizarImagen();
                        }else{
                            urlImagen=imagen;
                            actualizarActividades();
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
 
export default Actividades;