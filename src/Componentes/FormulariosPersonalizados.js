import React, {useState} from 'react';
import {Text,Dimensions,View,Image,TouchableOpacity,StyleSheet} from 'react-native';
import {Item,Input,Label} from 'native-base';
import iconoAdd from './../Imagenes/add-orange.png';
import {db} from './../firebase/firebaseConfig';

const {width,height} = Dimensions.get('window');

const FormulariosPersonalizados = ({nombreFormulario}) => {

    //CONEXION A BD Y DEPOSITO A SUGERENCIAS
    const [inputAsunto,cambiarInputAsunto] = useState('');
    const [inputComentario,cambiarInputComentario] = useState('');
    const depositarSugerencia = (inputAsunto,inputComentario) => {
        if(inputAsunto != '' && inputComentario != ''){    
        db.ref('suggestions').push()
           .set({
               suggestionData:{
                    asunto: inputAsunto,
                    comentario: inputComentario,
                    respuesta: '',
                    estado:'espera'
               }})
           .then(() => {
               alert('Se deposito con exito tu sugerencia \n espera una respuesta pronto');
                })
            .catch(error => {console.error(error)})
        }else {
            alert('No puedes dejar los campos vacios');
        }
       }
    //CONEXION A BD Y DEPOSITO A SUGERENCIAS
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
                        <Item >
                            <Input id='asunto'
                                   style={{color:'#828282'}} 
                                   placeholder={'Asunto:'}
                                   onChangeText={(text) => cambiarInputAsunto(text)}
                                   ></Input>
                        </Item>
                        <Item floatingLabel>
                            <Label>Comentario: </Label>
                            <Input id='comentario'
                                   style={{color:'#828282'}} 
                                   multiline={true} 
                                   onChangeText={(text) => cambiarInputComentario(text)}
                                   ></Input>
                        </Item>
                        
                        <TouchableOpacity onPress={() => depositarSugerencia(inputAsunto,inputComentario)}>
                            <View style={{borderRadius:10, backgroundColor:'#f8ae40', height:40,width:width * .40,alignSelf:'center',flexDirection:'row',marginTop:10,position:'absolute'}}>
                                <Text style={{color:'#fff',alignSelf:'center',fontWeight:'bold'}}>Depositar Sugerencia</Text>
                            </View>
                        </TouchableOpacity>
                </View>
                </>
             );
            break;
    }
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
})
export default FormulariosPersonalizados;