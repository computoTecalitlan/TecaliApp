import React,{useState} from 'react';
import { View,Text,Dimensions,TextInput,Image,Alert,ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListaEventos from '../elementos/ListaEventos';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Calendar from './../Imagenes/calendar.png';
import Galeria from './../Imagenes/image-white.png';
import {launchImageLibrary} from 'react-native-image-picker';
import {db} from './../firebase/firebaseConfig';
import axios from 'axios';

const {width,height} = Dimensions.get('window');
const EventosAdmin = () => {
    const [eventos,cambiarEventos] = useState([]);
    const [estadoForm,cambiarEstadoForm] = useState(true);
    const [form,cambiarForm] = useState('');
    const [datePickerVisible,cambiarDatePickerVisible] = useState(false);
    const [fecha,cambiarFecha] = useState();
    const [hora, cambiarHora] = useState();
    const [imagen,cambiarImagen] = useState(null);
    const [inputEvento,cambiarInputEvento] = useState();
    const [inputTipo,cambiarInputTipo] = useState();
    const [inputDia,cambiarInputDia] = useState();
    const [inputDescripcion,cambiarInputDescripcion] = useState();
 
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
        cambiarFecha(dd+'/'+mm+'/'+yyyy);
        cambiarHora(hr);
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
                depositarEvento();//Llamo la funcion para ahora si enviar todos los datos a la base de datos en firebase.
            })
            .catch(error => {
                alert(error);
            })
   }
   const depositarEvento = () => {
       //Hago un alert que le pide al usuario una conifirmación de que los datos son correctos
    Alert.alert("Confirmación","¿Los datos son correctos? \n Evento: "+inputEvento+"\n Tipo: "+inputTipo+"\n Día: "+inputDia+"\n Descripción: "+inputDescripcion+"\n Fecha: " + fecha + "\n Hora: " + hora,[
        {
            text:"No", //Si presiona 'No', simplemente se cierra el alert y le da oportunidad de modificar los datos.
            style: 'cancel'
        },
        {
            text:"Enviar", //Si presiona enviar se ejecuta la funcion de enviar los datos
            onPress:()=>{
                if(inputEvento && inputDescripcion && inputTipo && fecha && hora  && urlImagen){    
                  const sendRef =  db.ref('events').push()
                  let id = sendRef.key;
                       sendRef.set({
                           eventData:{
                                nombre:inputEvento,
                                tipo:inputTipo,
                                descripcion:inputDescripcion,
                                dia:inputDia,
                                fecha:fecha,
                                hora:hora,
                                imagen:urlImagen,
                                id:id
                           }})
                       .then(() => {
                           alert('Se registró con exito el evento');
                            cambiarEstadoForm(true);
                            cambiarForm('');
                            cambiarImagen(null);
                            cambiarInputDescripcion('');
                            cambiarInputDia('');
                            cambiarInputEvento('');
                            cambiarInputTipo('');
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
        <>
        {estadoForm == true ? 
            <View style={{width:width,height:'auto'}}>
                <View style={{width:'auto',height:'auto',flexDirection:'row',alignSelf:'center'}}>
                <TouchableOpacity onPress={()=>{
                     cambiarForm('agregar');
                     cambiarEstadoForm(false);
                     cambiarEventos([]); 
                     }}>
                    <View style={{width:'auto',height:'auto',borderRadius:10,backgroundColor:'#45b39d'}}><Text style={{fontWeight:'bold'}}>Agregar nuevo</Text></View>
                </TouchableOpacity>
                </View>
            </View>
        : 
        <></>
        }
       
        {form == 'agregar' ? 
            <View style={{width:width,height:height,backgroundColor:'#fff'}}>
                  <View style={{width:width/3,alignSelf:'flex-end',height:20}}>
                                <TouchableOpacity onPress={()=>{cambiarEstadoForm(true);cambiarForm('');}}>
                                    <View style={{width:50,height:'auto',borderRadius:20,backgroundColor:'red',alignSelf:'flex-end',marginRight:3}}><Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>X</Text></View>
                                </TouchableOpacity>
                    </View>
                <TextInput 
                    style={
                        {
                            borderBottomWidth:2,
                            borderColor:'#828282', 
                            height:'auto',
                            marginTop:5,
                            fontWeight:'bold',
                            alignSelf:'center',
                            width:width * .96
                        }
                    } 
                    placeholder='Nombre del evento'
                    placeholderTextColor='#f8ae40'
                    onChangeText={text => cambiarInputEvento(text)}
                />
                    <TextInput 
                    style={
                        {
                            borderBottomWidth:2,
                            borderColor:'#828282', 
                            height:'auto',
                            marginTop:5,
                            fontWeight:'bold',
                            alignSelf:'center',
                            width:width * .96
                        }
                    } 
                    placeholder='Tipo de evento'
                    placeholderTextColor='#f8ae40'
                    onChangeText={text => cambiarInputTipo(text)}
                />
                    <TextInput 
                    style={
                        {
                            borderBottomWidth:2,
                            borderColor:'#828282', 
                            height:'auto',
                            marginTop:5,
                            fontWeight:'bold',
                            alignSelf:'center',
                            width:width * .96
                        }
                    } 
                    placeholder='Dia del evento(1,2,3....,etc)'
                    placeholderTextColor='#f8ae40'
                    onChangeText={text => cambiarInputDia(text)}
                />
                <TextInput 
                  
                    style={
                        {
                            width: width * .97, 
                            height: 'auto', 
                            borderWidth:2,
                            borderColor:'#828282',
                            borderRadius:5,
                            marginTop:4,
                            alignSelf:'center',
                            fontWeight:'bold'
                        }
                    } 
                    placeholder='Describe detalladamente la actividad' 
                    multiline={true}
                    placeholderTextColor='#f8ae40'

                    onChangeText={text => cambiarInputDescripcion(text)}
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
                        <Text style={{color:'#fff',alignSelf:'center'}}>Fecha</Text>
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
                                    <Text style={{alignSelf:'center',color:'#fff'}}> - No has seleccionado ninguna imagen - </Text>
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
        :
        <>
            <ListaEventos/>
        </>
        
        }
        </>
    );   
}

export default EventosAdmin;