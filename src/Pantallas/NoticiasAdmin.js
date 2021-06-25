import React, {useState} from 'react';
import { View,Text,Dimensions,Image,TouchableOpacity,TextInput,Alert } from 'react-native';
import Ciudadano from './../Imagenes/prs-logo.png';
import ListaNoticias from './../elementos/ListaNoticias';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Galeria from './../Imagenes/image-white.png';
import Calendar from './../Imagenes/calendar.png';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {db} from './../firebase/firebaseConfig';
const {width,height} = Dimensions.get('window');

const NoticiasAdmin = () => {
    const [estadoForm,cambiarEstadoForm] = useState(true);
    const [form,cambiarForm] = useState('');
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [fecha,cambiarFecha] = useState();
    const [imagen,cambiarImagen] = useState(null);
    const [noticia,cambiarNoticia] = useState();
    const [direccion,cambiarDireccion] = useState();
    const [descripcion,cambiarDescripcion] = useState();
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
        cambiarFecha(dd+'/'+mm+'/'+yyyy);
        
    }
    const handleImageLib = () =>{
        const options = {
            mediaType:'photo'
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
                depositarNoticia();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
            })
            .catch(error => {
                alert(error);
            })
   }
   const depositarNoticia = () => {
       //Hago un alert que le pide al usuario una conifirmación de que los datos son correctos
    Alert.alert("Confirmación","¿Los datos son correctos? \n Noticia: "+noticia+"\n Departamento: "+direccion+"\n Descripción: "+descripcion+"\n Fecha: " + fecha ,[
        {
            text:"No", //Si presiona 'No', simplemente se cierra el alert y le da oportunidad de modificar los datos.
            style: 'cancel'
        },
        {
            text:"Enviar", //Si presiona enviar se ejecuta la funcion de enviar los datos
            onPress:()=>{
                if(noticia && descripcion && direccion && fecha  && urlImagen){    
                  const sendRef =  db.ref('news').push()
                  let id = sendRef.key;
                       sendRef.set({
                           newData:{
                                noticia:noticia,
                                descripcion:descripcion,
                                direccion:direccion,
                                fecha:fecha,
                                imagen:urlImagen,
                                id:id
                           }})
                       .then(() => {
                           alert('Se deposito con exito tu sugerencia \n espera una respuesta pronto');
                            cambiarImagen(null);
                            cambiarEstadoForm(true);
                            cambiarForm('');
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
        <View style={{width:width,height:height,backgroundColor:'#fff'}}>
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
                                <TouchableOpacity onPress={()=>{cambiarEstadoForm(true);cambiarForm('');cambiarFecha('')}}>
                                    <View style={{width:50,height:'auto',borderRadius:20,backgroundColor:'red',alignSelf:'flex-end',marginRight:3}}><Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>X</Text></View>
                                </TouchableOpacity>
                </View>
                <TextInput 
                    style={
                        {
                            
                            height:'auto',
                            marginTop:5,
                            fontWeight:'bold',
                            alignSelf:'center',
                            width:width * .96
                        }
                    } 
                    placeholder='Noticia'
                    placeholderTextColor='#f8ae40'
                    onChangeText={text => cambiarNoticia(text)}
                />
                    <TextInput 
                    style={
                        {
                           
                            height:'auto',
                            marginTop:5,
                            fontWeight:'bold',
                            alignSelf:'center',
                            width:width * .96
                        }
                    } 
                    placeholder='Departamento'
                    placeholderTextColor='#f8ae40'
                    onChangeText={text => cambiarDireccion(text)}
                />
                <TextInput 
                  
                    style={
                        {
                            width: width * .97, 
                            height: 'auto', 
                            borderWidth:1,
                            borderColor:'#828282',
                            borderRadius:5,
                            marginTop:4,
                            alignSelf:'center',
                            fontWeight:'bold'
                        }
                    } 
                    placeholder='Descripción de la noticia' 
                    multiline={true}
                    placeholderTextColor='#f8ae40'
                    onChangeText={text => cambiarDescripcion(text)}
                />
                {fecha ? 
                    <View style={{width:100,height:'auto',backgroundColor:'#f8ae40',alignSelf:'center',borderRadius:10,marginTop:1}}>
                        <TouchableOpacity onPress={mostrarDatePicker}>
                            <Image source={Calendar} style={{width:30,height:30,alignSelf:'center'}}/>
                        </TouchableOpacity>
                        <Text style={{color:'#828282',alignSelf:'center'}}>Selecciona fechas</Text>
                        <Text style={{alignSelf:'center',color:'#fff',fontWeight:'bold'}}> - {fecha} - </Text>
                    </View>
                : 
                    <View style={{width:100,height:'auto',backgroundColor:'#f8ae40',alignSelf:'center',borderRadius:10,marginTop:1}}>
                        <TouchableOpacity onPress={mostrarDatePicker}>
                            <Image source={Calendar} style={{width:30,height:30,alignSelf:'center'}}/>
                        </TouchableOpacity>
                        <Text style={{color:'#fff',alignSelf:'center'}}>Fecha</Text>
                    </View>
                }
                   
                   <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode='date'
                    onConfirm={confirmarFecha}
                    onCancel={ocultarDatePicker}
                    locale='es'
                />
                <View style={{marginTop:2,width:width * .92,height:150,alignSelf:'center',borderStyle:'dashed',borderWidth:1,borderColor:'#828282'}}>
                                {imagen ? 
                                    <Image source={{uri:imagen.uri}} style={{width:width * .92,height:150,borderRadius:5}}/>
                                :
                                <View style={{width:width *.92}}>
                                    <Text style={{alignSelf:'center'}}> - No has seleccionado ninguna imagen - </Text>
                                </View>
                                }
                    </View>
                    <TouchableOpacity onPress={()=> handleImageLib()}>
                        <View style={{width: 55,backgroundColor:'#f8ae40',height:50,borderRadius:4,alignSelf:'center',marginTop:3}}>
                            <Image source={Galeria}  style={{width:30,height:30,alignSelf:'center'}}/>
                            <Text style={{color:'#fff',alignSelf:'center'}}>Galería</Text>
                        </View>
                    </TouchableOpacity>
                    {fecha && imagen  && noticia && descripcion && direccion ? 
                        <TouchableOpacity onPress={subirImagen}>
                            <View style={{backgroundColor:'green',width:'auto',borderRadius:5,marginTop:10,height: 'auto',alignSelf:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                    :<></>}
            </>
        :
        <>
            <ListaNoticias/>
        </>
        }
        </View>
    );   
}

export default NoticiasAdmin;