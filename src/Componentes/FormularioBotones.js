import React, { useContext } from 'react';
import { Image,TouchableOpacity,StyleSheet,View,Text } from 'react-native';
import IconoInvitado from './../Imagenes/guest.png';
import IconoAdmin from './../Imagenes/admin.png';
import IconoEmergencia from './../Imagenes/911.png';
import {useNavigation} from '@react-navigation/native';
import {auth} from './../firebase/firebaseConfig';
import imagenFondoInicio from './../elementos/imagenFondoInicio';



const FormularioBotones = ({mostrarBotones, botones}) => {
    //Hook con el que usamos las operaciones de navegacion.
    const navigation = useNavigation();
    const imagen = imagenFondoInicio();
    const inicioSesion = async () => {
        try{
             await auth.signInAnonymously().then(navigation.navigate('Inicio'))
             .catch(error => {
                 //Errores que impiden iniciar sesion 1) No hay conexion a internet
                if(error.code = 'A network error'){ 
                    alert('¡Lo sentimos, hubo un problema al intentar ingresar! \nrevisa tu conexión de internet e intenta ingresar de nuevo');
                }
                else if (error.code != 'A network error'){
                    alert('Ocurrio un error, intentalo mas tarte');
                }
                navigation.goBack();
             });
        }catch(error){
            console.log(error.code);
        }
    }
    const cerrarSesion = () => {
        
        auth.signOut().then(() => alert('User signed out!')).catch(error => {
            console.log(error.message);
        });
    }

    return ( 
        
        <View style={estilos.contenedorFormulario}>
            
            <TouchableOpacity
                onPress={() => inicioSesion()}
            >
                <View style={estilos.contenedorBotonInvitado}>
                    <Image 
                        style={estilos.imageButtons}    
                        source={IconoInvitado}
                    />
                    <Text style={estilos.estiloTextoBoton}>Ingreso</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() => mostrarBotones(false)}
            >
                <View style={estilos.contenedorBotonInvitado}>
                    <Image 
                        style={estilos.imageButtons}    
                        source={IconoAdmin}
                    />
                    <Text style={estilos.estiloTextoBoton}>Administrador</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=> {cerrarSesion()}}
            >
                <View style={estilos.contenedorBoton911}>
                    <Image 
                        style={estilos.imageButtons}    
                        source={IconoEmergencia}
                    />
                    <Text style={estilos.estiloTextoBoton}>Emergencias</Text>
                </View>
            </TouchableOpacity>
        </View>
     );
}
 const estilos = StyleSheet.create({
    imageButtons: {
        height: 40,
        width: 40,
        marginRight: 5,
        resizeMode:"contain"
      },
      imageButtonsContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        marginBottom: 10
      },
      contenedorBotonInvitado: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#7C8B90",
        alignItems: "center",
        marginBottom: 5,
        borderRadius: 25
      },
      estiloTextoBoton:{
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
      },
        contenedorBotonAdmin: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#467393",
        alignItems: "center",
        marginBottom: 5,
        borderRadius: 10
      },
      contenedorBoton911: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#DE003D",
        alignItems: "center",
        marginBottom: 5
      },
      contenedorFormulario:{
          flex: 1,
          marginTop: 50,
          width:250,
          alignSelf:"center",
          position: "relative"
      }
 });


export default FormularioBotones;