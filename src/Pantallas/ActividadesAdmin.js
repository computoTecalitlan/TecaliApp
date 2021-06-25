import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { View,Dimensions,TextInput,Text,Image,Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Calendar from './../Imagenes/calendar.png';
import {launchImageLibrary} from 'react-native-image-picker';
import Galeria from './../Imagenes/image-white.png';
import {db} from './../firebase/firebaseConfig';
import ListaActividades from './../elementos/ListaActividades';



const {width,height} = Dimensions.get('window');

const ActividadesAdmin = () => {
    const [inputAct,camibarInputAct] = useState();
    const [inputDept,cambiarInputDept] = useState();
    const [inputDescripcion,cambiarInputDescripcion] = useState();
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [fecha,cambiarFecha] = useState();
    const [hora, cambiarHora] = useState();
    const [imagen,cambiarImagen] = useState(null);
    let urlImagen = '';
    const [estadoForm,cambiarEstadoForm] = useState(true);
    const [form,cambiarForm] = useState('');
  

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
        cambiarFecha(dd+'/'+mm+'/'+yyyy);
        cambiarHora(hr);
    }
    const handleImageLib = () =>{
        const options = {
            mediaType:'photo'
        };
        launchImageLibrary(options,response => {
                 cambiarImagen(response);
        })
    }
    
    
    //Funcion que se encarga de subir la imagen a Cloudinary, despues de subirla llama el metodo depositarActividad
    //Que se encarga de subir los datos a la BD, incluida la url de la imagen.
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
                depositarActividad();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
            })
            .catch(error => {
                alert(error);
            })
   }
   const depositarActividad = () => {
       //Hago un alert que le pide al usuario una conifirmación de que los datos son correctos
    Alert.alert("Confirmación","¿Los datos son correctos? \n Actividad: "+inputAct+"\n Departamento: "+inputDept+"\n Descripción: "+inputDescripcion+"\n Fecha: " + fecha + "\n Hora: " + hora,[
        {
            text:"No", //Si presiona 'No', simplemente se cierra el alert y le da oportunidad de modificar los datos.
            style: 'cancel'
        },
        {
            text:"Enviar", //Si presiona enviar se ejecuta la funcion de enviar los datos
            onPress:()=>{
                if(inputAct && inputDescripcion && inputDept && fecha && hora  && urlImagen){    
                  const sendRef =  db.ref('activities').push()
                  let id = sendRef.key;
                       sendRef.set({
                           activityData:{
                                actividad:inputAct,
                                descripcion:inputDescripcion,
                                direccion:inputDept,
                                fecha:fecha,
                                hora:hora,
                                imagen:urlImagen,
                                id:id
                           }})
                       .then(() => {
                           alert('Se deposito con exito tu sugerencia \n espera una respuesta pronto');
                            cambiarEstadoForm(true);
                            cambiarForm('');
                            cambiarImagen(null);
                            comentRef.current.clear();
                            asuntoRef.current.clear();
                            deptRef.current.clear();
                            })
                        .catch(error => {alert(error)})
                    }else {
                        alert('Tienes que completar todos los datos');
                    }
            }
        }
    ]);//Termina Alert
   }
 
   const asuntoRef = React.createRef();
   const deptRef = React.createRef();
   const comentRef = React.createRef(); 
    return(
        <View style={{width:width,height:height,backgroundColor:'#eee'}}>
            {estadoForm == true ? 
                <View style={{width:width,height:'auto'}}>
                    <View style={{width:'auto',height:'auto',flexDirection:'row',alignSelf:'center'}}>
                        <TouchableOpacity   onPress={()=>{
                                                cambiarForm('agregar');
                                                cambiarEstadoForm(false);
                                            }}>
                            <View style={{width:80,height:'auto',borderRadius:20,backgroundColor:'#45b39d'}}><Text style={{fontWeight:'bold',alignSelf:'center',color:'#fff'}}>Agregar</Text></View>
                        </TouchableOpacity>
                    </View>               
                </View>
        : 
        <></>
        }
        <View style={{width:width,height:height,flex:1}}>
            {form == 'agregar' ? 
                <ScrollView showsVerticalScrollIndicator={false}>
                <View  style={{width:width * .99, height:height,alignSelf:'center',backgroundColor:'#eee'}}>
                    <View style={{width:width,height:'auto'}}>
                        <View style={{width:width/3,alignSelf:'flex-end',height:20}}>
                                <TouchableOpacity onPress={()=>{cambiarEstadoForm(true);cambiarForm('');}}>
                                    <View style={{width:50,height:'auto',borderRadius:20,backgroundColor:'red',alignSelf:'flex-end',marginRight:3}}><Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>X</Text></View>
                                </TouchableOpacity>
                        </View>
                    </View>
                <TextInput 
                    ref={asuntoRef}
                    style={
                        {
                            width:'auto',
                            marginLeft:4,
                            height: 'auto',
                            
                        }
                    } 
                    placeholder='Titulo de la actividad'
                    placeholderTextColor='#f8ae40'
                    onChangeText={(text) => camibarInputAct(text)}
                />
                <TextInput 
                    ref={deptRef}
                    placeholder='Departamento' 
                    style={
                        {
                            marginLeft:4,
                            width:'auto',
                            height: 'auto',
                            }
                    }
                    onChangeText={(text) => cambiarInputDept(text)}
                    placeholderTextColor='#f8ae40'
                />        
                <TextInput 
                    ref={comentRef}
                    style={
                        {
                            width: width, 
                            height: 'auto', 
                            borderWidth:1,
                            borderColor:'#828282',
                            borderRadius:5,
                            marginTop:4,
                            alignSelf:'center'
                        }
                    } 
                    placeholder='Describe detalladamente la actividad' 
                    placeholderTextColor='#f8ae40'
                    multiline={true}
                    onChangeText={(text) => cambiarInputDescripcion(text)}
                />
                  {fecha ? 
                    <View style={{width:100,height:'auto',backgroundColor:'#f8ae40',alignSelf:'center',borderRadius:10,marginTop:1}}>
                        <TouchableOpacity onPress={mostrarDatePicker}>
                            <Image source={Calendar} style={{width:30,height:30,alignSelf:'center'}}/>
                        </TouchableOpacity>
                        <Text style={{alignSelf:'center',color:'#fff',fontWeight:'bold'}}> - {fecha} - </Text>
                        <Text style={{alignSelf:'center',color:'#fff',fontWeight:'bold'}}> - {hora} - </Text>
                    </View>
                : 
                    <View style={{width:100,height:'auto',backgroundColor:'#f8ae40',alignSelf:'center',borderRadius:10,marginTop:1}}>
                        <TouchableOpacity onPress={mostrarDatePicker}>
                            <Image source={Calendar} style={{width:30,height:30,alignSelf:'center'}}/>
                        </TouchableOpacity>
                        <Text style={{color:'#fff',alignSelf:'center'}}>Fecha y hora</Text>
                    </View>
                }
                <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode='datetime'
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
                    {fecha && imagen ? 
                        <TouchableOpacity onPress={subirImagen}>
                            <View style={{backgroundColor:'green',width:'auto',borderRadius:5,marginTop:10,height: 'auto',alignSelf:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                    :<></>}
            </View>
            </ScrollView>
            :
            <View style={{width:'auto',height:'auto'}}>
                  <ListaActividades />
            </View>
            }
        </View>
        </View>
    );   
}

export default ActividadesAdmin;