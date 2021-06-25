import React, {useState} from 'react';
import {Text,Dimensions,View,Image,TouchableOpacity,StyleSheet, ViewPropTypes,TextInput, Alert} from 'react-native';
import {Item,Input,Label} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import iconoAdd from './../Imagenes/add-orange.png';
import {db,storage} from './../firebase/firebaseConfig';
import Camara from './../Imagenes/camera.png';
import Galeria from './../Imagenes/image-white.png';
import ArrowUp from './../Imagenes/arrow-up.png';
import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

//Este componente recibe una cadena de identificacion y dependiendo de la cadena, este devuelve un formulario diferente
const {width,height} = Dimensions.get('window');

const FormulariosPersonalizados = ({nombreFormulario}) => {

    const asuntoRef = React.createRef();
    const deptoRef = React.createRef();
    const comentRef = React.createRef();
    const calleRef = React.createRef();
    const coloniaRef = React.createRef();
    const localRef = React.createRef();

    //CONEXION A BD Y DEPOSITO A SUGERENCIAS
    const [inputAsunto,cambiarInputAsunto] = useState(null);
    const [inputComentario,cambiarInputComentario] = useState(null);
    const [imagen,cambiarImagen] = useState(null);
    let urlImagen = '';
    const [dept,cambiarDept] = useState(null);
    const [calle,cambiarCalle] =  useState(null);
    const [colonia,cambiarColonia] = useState(null);
    const [localidad,cambiarLocalidad] = useState(null);
    const [confirmar,cambiarConfirmar] = useState(false);
//Arrelgo de las opciones del picker en la pantalla del reporte ciudadano
    const directions = [
        { name: 'Reglamentos' },
        { name: 'Secretario general' },
        { name: 'Comunicación social' },
        { name: 'Obras públicas' },
        { name: 'Educación' },
        { name: 'Planeación y participación ciudadana' },
        { name: 'Turismo' },
        { name: 'Fomento agropecuario' },
        { name: 'Agua potable' },
        { name: 'Servicios generales' },
        { name: 'Parques y jardines' },
        { name: 'Alumbrado público' },
        { name: 'Cementerio' },
        { name: 'Ecología' },
        { name: 'Seguridad pública' },
        { name: 'Protección civil' },
        { name: 'Vialidad' },
    ];
    //Esta funcion de map llena los items del picker con el arreglo antes declarado.
    const catItems = directions.map((dir, index) => (
        <Picker.Item key={index} label={dir.name} value={dir.name} />
    ));
    //Funcion para depositrar la sugerencia a la base de datos.
    const depositarSugerencia = (inputAsunto,inputComentario) => {
        if(inputAsunto != '' && inputComentario != ''){    
        const sugRef = db.ref('suggestions').push();
            sugRef.set({
               suggestionData:{
                    asunto: inputAsunto,
                    comentario: inputComentario,
                    respuesta: '',
                    estado:'espera',
                    id:sugRef.key
               }})
           .then(() => {
               alert('Se deposito con exito tu sugerencia \n espera una respuesta pronto');
               asuntoRef.current.clear();
               comentRef.current.clear();
                })
            .catch(error => {console.error(error)})
        }else {
            alert('No puedes dejar los campos vacios');
        }
       }

       //Funcion que se encarga de cargar la imagen desde la galeria
       const handleImageLib = () =>{
           const options = {
               mediaType:'photo'
           };
           launchImageLibrary(options,response => {
                if(response.uri){
                    cambiarImagen(response);
                }
           })
       }

       //Funcion que se encarga de cargar la imagen desde la camara 
       const handleImageCam = () => {
           const options = {
               maxWidt: 1280,
               maxHeight:720
           };
           launchCamera(options, response => {
               console.log(response);
               if(response.didCancel == true){
                alert('Has cancelado la operación, por favor intenta de nuevo.')
                }
               if(response.uri){
                   cambiarImagen(response);
               }
              
           })
       }
       //Funcion que se encarga de depositar la imagen en la nube
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
                    urlImagen = url;
                    depositarReporte();
                })
                .catch(error => {
                    alert(error);
                })
       }
       //Funcion que se encarga de depositar el reporte en la BD
       const depositarReporte = () => {
           var fecha = new Date();
           let dd = fecha.getDate();
           let mm = fecha.getMonth();
           let yyyy = fecha.getFullYear();
            fecha = dd + '/' + mm + '/' + yyyy;
            Alert.alert("Confirmación","¿Los datos son correctos? \n Departamento: "+dept+"\n Asunto: "+inputAsunto+"\n Comentario: "+inputComentario+"\n Calle: "+calle+"\n Colonia: "+colonia+"\n Localidad: "+ localidad,[
                {
                    text:"No",
                    style: 'cancel'
                },
                {
                    text:"Enviar",
                    onPress:()=>{
                        if(inputAsunto && inputComentario && dept && calle && colonia && localidad && urlImagen){    
                            db.ref('incidents').push()
                               .set({
                                   incidentData:{
                                        asunto: inputAsunto,
                                        calle: calle,
                                        colonia: colonia,
                                        descripcion: inputComentario,
                                        direccion: dept,
                                        fecha: fecha,
                                        imagen:urlImagen,
                                        localidad:localidad
                                   }})
                               .then(() => {
                                   alert('Se deposito con exito tu reporte \n espera una respuesta pronto');
                                    
                                    cambiarImagen('');
                                    })
                                .catch(error => {console.error(error)})
                            }else {
                                alert('Tienes que completar todos los datos');
                            }
                    }
                }
            ]);//Termina Alert
       }

      

    switch(nombreFormulario){
        case 'depSugerencia':
             return(
                <>
                <View style={estilo.carta}>
                    <View style={estilo.cartaImagen}>
                        <Image source={iconoAdd} style={estilo.icono}></Image>
                    </View>
                    <View style={estilo.cartaTexto}>
                        <Text style={{color:'#f8ae40',alignSelf:'center',fontSize:15,fontWeight:'bold',marginTop:50}}>DEPOSITAR{'\n'}Sugerencia</Text>
                    </View>
                </View>
                <View style={estilo.contenedorRespuestas}>   
                        <TextInput style={{width: width * .90,alignSelf:'center',borderBottomWidth:2,borderColor:'#828282',height:'auto'}} 
                                    placeholder='Asunto'
                                    placeholderTextColor='#828282'
                                    onChangeText={(text) => cambiarInputAsunto(text)}
                                    ref={asuntoRef}
                                    />
                                    
                       <TextInput placeholder='Escriba su sugerencia'
                                    multiline={true}
                                    numberOfLines={10}
                                    placeholderTextColor='#828282'
                                    style={{borderColor:'#828282',borderWidth:2,height:150,fontWeight:'bold',textAlign:'justify',marginTop:5,width:width * .90,alignSelf:'center',borderRadius:2}}
                                    onChangeText={(text) => cambiarInputComentario(text)}
                                    ref={comentRef}
                        />
                        <TouchableOpacity onPress={() => depositarSugerencia(inputAsunto,inputComentario)}>
                            <View style={{borderRadius:10, backgroundColor:'#f8ae40', height:40,width:width * .40,alignSelf:'center',flexDirection:'row',marginTop:10,position:'absolute'}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontWeight:'bold'}}>Depositar Sugerencia</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                </>
             );
            case 'reporte':
                return(
                    <ScrollView>
                    <View style={estilo.contenedor} >
                    <Picker 
                            onValueChange={(text) => cambiarDept(text)}
                          prompt='Selecciona el departamento'
                          ref={deptoRef}
                          style={{width:width *.50,alignSelf:'center'}}
                       >{catItems}</Picker>
                    <Item >
                            <Input id='asunto'
                                   style={{color:'#828282'}} 
                                   placeholder={'Asunto(sobre que trata): '}
                                   onChangeText={(text) => cambiarInputAsunto(text)}
                                   ref={asuntoRef}
                                   ></Input>
                        </Item>
                        <TextInput placeholder='Escriba una descripción detallada.'
                                    multiline={true}
                                    numberOfLines={10}
                                    placeholderTextColor='#828282'
                                    style={{width:width * .90,alignSelf:'center',borderRadius:2,borderColor:'#828282',borderWidth:1,height:150,fontWeight:'bold',textAlign:'justify'}}
                                    onChangeText={(text) => cambiarInputComentario(text)}
                                    ref={comentRef}
                        ></TextInput>
                          <Item >
                            <Input id='calle'
                                   style={{color:'#828282'}} 
                                   placeholder={'Calle: '}
                                   onChangeText={(text) => cambiarCalle(text)}
                                   ref={calleRef}
                                   ></Input>
                        </Item>
                        <Item >
                            <Input id='colonia'
                                   style={{color:'#828282'}} 
                                   placeholder={'Colonia: '}
                                   onChangeText={(text) => cambiarColonia(text)}
                                   ref={coloniaRef}
                                   ></Input>
                        </Item>
                        <Item >
                            <Input id='localidad'
                                   style={{color:'#828282'}} 
                                   placeholder={'Localidad: '}
                                   onChangeText={(text) => cambiarLocalidad(text)}
                                   ref={localRef}
                                   ></Input>
                        </Item>
                            <View style={{width: width *.92,height:50,marginTop:10}}>
                                <View style={{alignSelf:'center',width: 110, height: 50,flexDirection:'row'}}>
                                <TouchableOpacity onPress={()=> handleImageLib()}>
                                    <View style={{width: 55,backgroundColor:'#f8ae40',height:50,borderRadius:4}}>
                                        <Image source={Galeria}  style={{width:30,height:30,alignSelf:'center'}}/>
                                        <Text style={{color:'#fff',alignSelf:'center'}}>Galería</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> handleImageCam()}>
                                    <View style={{width: 55,marginLeft:5,backgroundColor:'#f8ae40',height:50,borderRadius:4}}>
                                        <Image source={Camara}  style={{width:30,height:30,alignSelf:'center'}}/>
                                        <Text style={{color:'#fff',alignSelf:'center'}}>Camara</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
                            </View>
                        <View style={{marginTop:2,width:width * .92,height:150,alignSelf:'center',borderStyle:'dashed',borderWidth:1,borderColor:'#828282'}}>
                            {imagen ? 
                                <Image source={{uri:imagen.uri}} style={{width:width * .92,height:150,borderRadius:5}}/>
                            :
                            <View style={{width:width *.92}}>
                                <Image source={ArrowUp} style={{width:20,height:20,alignSelf:'center'}}/>
                                <Text style={{alignSelf:'center'}}> - No has seleccionado ninguna imagen - </Text>
                            </View>
                            }
                        </View>
                        <View style={{width:width * .93,height: 57}}>
                                <TouchableOpacity onPress={() => subirImagen()}>
                                    <View style={{flexDirection:'row',width: 60, height: 30,backgroundColor:'#f8ae40',alignSelf:'center',borderRadius:4,marginTop:3}}>
                                        <Text style={{color:'#fff',marginLeft:12,alignSelf:'center'}}>Enviar</Text>
                                    </View>
                                </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                );
    }
    return null;
}
const estilo = StyleSheet.create({
    carta:{
        width: width * .95,
        height:height * .25,
        alignSelf:'center',
        marginTop:1,
        borderRadius:2,
        borderWidth:4,
        borderColor: '#828282',
        flexDirection: 'row'
        
    },
    cartaImagen:{
        width: width *.42,
        height: height * .0,   
    },
    cartaTexto:{
        width: width *.53,
        height: height * .25,
        marginRight:2,
        marginTop:10,
        
    },
    contenedorRespuestas:{
        width: width * .95,
        height: height * .55,
        backgroundColor: '#eee',
        borderRadius: 1,
        borderWidth:4,
        borderColor: '#828282',
        alignSelf:'center',
        marginTop:2,
        flex:1
        
    },
    icono:{
        resizeMode:'contain',
        width: width *.42,
        height: height * .15,
        marginTop:25
        
    },
    contenedor:{
        width: width * .95,
        height: height  * 1.13,
        backgroundColor: '#eee',
        borderRadius: 1,
        borderWidth:4,
        borderColor: '#828282',
        alignSelf:'center',
        marginTop:2,
        flex:1
    }
})
export default FormulariosPersonalizados;