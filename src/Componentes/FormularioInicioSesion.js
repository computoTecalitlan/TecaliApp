import React, { useEffect, useState } from 'react';
import { View,StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Item, Input, Label, Textarea } from 'native-base';
import {auth} from './../firebase/firebaseConfig';
import IconoRegresar from './../Imagenes/back-white.png';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';


const FormularioInicioSesion = ({botones, mostrarBotones, imagen, mostrarImagen}) => {
    const [editando,cambiarEditando] = useState(false);
    const [estadoEditable,cambiarEstadoEditable] = useState(true);
    const navigator = useNavigation();
    const [inputUsuario,cambiarInputUsuario]= useState('');
    const [inputPassword,cambiarInputPassword] = useState('');

    
    
    //Utilizo el hook para el momento en que se presione cancelar el estado editable vuelva a true
    //para que no bloquee los inputs
    useEffect(() => {
        if(estadoEditable=== false){
            cambiarEstadoEditable(!estadoEditable);
            
        }
    },[estadoEditable])

    //Esta funcion para el boton cancelar, vuelve a mostrar la imagen y el boton de volver al inicio
    //Ademas de que cancela los inputs
    const estadoInput = () => {
        cambiarEditando(!editando)
        mostrarImagen(!imagen);
        cambiarEstadoEditable(!estadoEditable);
       
        
    }
    //Mientras se editan los inputs se esconde la imagen, pero solo si la imagen se esta mostrando, de lo contrario no hace nada
    const handleOnFocus = () =>{
        
        if(imagen === false){ 
            cambiarEditando(!editando);
            mostrarImagen(!imagen);
        }
    }

    const handleInicioSesion =  async () => {
       await auth.signInWithEmailAndPassword(inputUsuario,inputPassword)
        .then(() => {
            alert('Datos correctos')
            navigator.navigate('Inicio');
        })
        .catch(error => {
            if(error.code === 'auth/email-already-in-use'){
                alert('Este usuario esta activo actualmente');
            }
            if(error.code === 'auth/invalid-email'){
                alert('Esta direccion de correo es invalida!');
            }
            console.error(error);
        });
    }
    return (
        <>
            {editando === false ? 
                <TouchableOpacity
                    onPress={() => mostrarBotones(!botones)}
                    style={estilos.contenedorBoton}
                >
                    <View style={estilos.BotonRegresar}>
                        <Image 
                            style={estilos.IconoBoton}    
                            source={IconoRegresar}
                        />
                            <Text style={estilos.TextoBoton}>Regresar al inicio</Text>
                    </View>
                </TouchableOpacity>
            :
            <TouchableOpacity
                onPress={estadoInput}
                style={estilos.contenedorBoton}
            >
                <View style={estilos.BotonRegresar}>
                    <Image 
                        style={estilos.IconoBoton}    
                        source={IconoRegresar}
                    />
                        <Text style={estilos.TextoBoton}>Cancelar</Text>
                </View>
            </TouchableOpacity>
            }
            
            {/*Formulario para captura de datos de inicio de sesion*/}
            <View style={estilos.contenedorFormulario}>
                    {/*TxtInicioSesion editando={editando} cambiarEditando={cambiarEditando} imagen={imagen} mostrarImagen={mostrarImagen} estadoEditable={estadoEditable} cambiarEstadoEditable={cambiarEstadoEditable}/>
                    */}
                <Item floatingLabel>
                    <Label style={{ color: '#FFFF', fontSize: 17 }}>Correo electrónico:</Label>
                        
                            <Input 
                                placeholder='Escriba su correo electronico'
                                name='email'
                                id='email' 
                                onChangeText={(text) => cambiarInputUsuario(text)}
                                value={inputUsuario} 
                                style={estilos.input}   
                                editable={estadoEditable} 
                                onFocus={ handleOnFocus}
                            />
                </Item>
                <Item floatingLabel>
                    <Label style={{ color: '#FFFF', fontSize: 17 }}>Contraseña:</Label>
                            <Input 
                                placeholder='Escriba su contrasena'
                                name='password' 
                                id='password'
                                onChangeText={(text) => cambiarInputPassword(text)}
                                value={inputPassword} 
                                style={estilos.input}   
                                editable={estadoEditable} 
                                onFocus={handleOnFocus}
                                secureTextEntry={true}
                            />
                </Item>
                    <TouchableOpacity
                        onPress={ handleInicioSesion}
                        style={estilos.contenedorBoton}
                    >
                        <View style={estilos.BotonIniciarSesion}>
                                <Text style={estilos.TextoBoton}>Iniciar Sesión</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        </>
    );
}
const {width} = Dimensions.get('window');
 const estilos = StyleSheet.create({
    contenedorFormulario:{
        flex: 1,
        marginTop: 10,
        width:width * .90,
        alignSelf:"center",
        position: "relative"
    },
    contenedorBoton:{
        marginTop:50
    },
    BotonRegresar: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "#7C8B90",
      alignItems: "center",
      marginBottom: 5,
      borderRadius: 5,
      width: width * .55,
      alignSelf: "center"
    },
    BotonIniciarSesion: {
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "#869E25",
      alignItems: "center",
      marginBottom: 5,
      borderRadius: 5,
      width: width * .40,
      alignSelf: "center"
    },
    TextoBoton:{
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold"
    },
    IconoBoton: {
        height: 20,
        width: 20,
        marginRight: 5,
        resizeMode:"contain"
      },
      input:{
          height: 40,
          borderColor: 'white',
          borderEndWidth: 1,
          fontWeight: 'bold',
          color: 'white',
      }
 });
export default FormularioInicioSesion;
