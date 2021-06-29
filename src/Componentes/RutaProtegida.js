import React from 'react';
import {useAuth} from '../contextos/AuthContext';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Actividades  from './../Pantallas/ActividadesAdmin';
import {Dimensions, Image} from 'react-native';
import Logout from './../Imagenes/logout.png';
import Actividad from './../Pantallas/Actividades';
import Activities from './../Imagenes/activities.png';
import PantallaCerrarSesion from './../Pantallas/PantallaCerrarSesion';
import Buzon from './../Pantallas/BuzonAdmin';
import Reporte from './../Pantallas/ReportesAdmin';
import Mapa from './../Pantallas/MapaAdmin';
import Noticias from './../Pantallas/NoticiasAdmin';
import Eventos from './../Pantallas/EventosAdmin';
import Turismo from './../Pantallas/TurismoAdmin';
import EventsIcon from './../Imagenes/events.png';
import Noticia from './../Pantallas/Noticia.js';
import MailBoxIcon from './../Imagenes/mailbox.png';
import MapsIcon from './../Imagenes/maps.png';
import NewsIcon from './../Imagenes/news.png';
import ReportIcon from './../Imagenes/report.png';
import TourismIcon from './../Imagenes/tourism.png'
import Evento from './../Pantallas/Evento.js';
import MapaAgregar from './../Pantallas/MapaAgregar';
import MapaEliminar from './../Pantallas/MapaEliminar';
import EditarLugar from './../Pantallas/EditarLugar';

//Este componente divide las de navegacion del usuario, si es anonimo lo manda a un drawer que contiene las pantallas de los usuarios anonimos o
//En este caso la poblacion en general,
//Si el usuario contiene email, se reconoce como administrador y entra a las pantallas del administrador, con permisos de lectura y escritura a la bd
const RutaProtegida = ({children, ...restoDePropiedades}) =>{
    const {usuario} = useAuth();
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    if(usuario){
        if(usuario.isAnonymous){
            return (<Drawer.Navigator {...restoDePropiedades}>
                    {children}
                    </Drawer.Navigator>);
        }else if(usuario.email){
            return(
                <Drawer.Navigator {...restoDePropiedades}>
                    <Drawer.Screen name="Actividades" component={Actividades}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={Activities}
                            />),headerTintColor:'#fff',headerStyle:{backgroundColor:'#f8ae40'},
                        }} 
                    />
                        <Drawer.Screen name='Buzón' component={Buzon}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={MailBoxIcon}
                            />),headerShown:false,
                        }} 
                    />
                        <Drawer.Screen name='Eventos' component={Eventos}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={EventsIcon}
                            />),headerStyle:{backgroundColor:'#f8ae40'},headerTintColor:'#fff'
                        }} 
                    />
                        <Drawer.Screen name='Mapa' component={Mapa}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={MapsIcon}
                            />),headerShown:false
                        }} 
                    />
                        <Drawer.Screen name='Noticias' component={Noticias}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={NewsIcon}
                            />),headerStyle:{backgroundColor:'#f8ae40'},headerTintColor:'#fff'
                        }} 
                    />
                        <Drawer.Screen name='Reportes ciudadanos' component={Reporte}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={ReportIcon}
                            />),headerShown:false
                        }} 
                    />
                        <Drawer.Screen name='Turismo' component={Turismo}
                        options={{drawerIcon: () => (
                            <Image  style={{width:20,height:20}} 
                                source={TourismIcon}
                            />),headerStyle:{backgroundColor:'#f8ae40'},headerTintColor:'#fff'
                        }} 
                    />
                    <Drawer.Screen 
                            name ="Cerrar Sesión" 
                            component={PantallaCerrarSesion}
                            options={{drawerIcon: () => (
                                        <Image  style={{width:20,height:20}} 
                                            source={Logout}
                                        />),
                                    }}             
                    />
                    <Drawer.Screen
                        name='act'
                        component={Actividad}
                        options={{drawerLabel:null,headerShown:false}}
                    />
                     <Drawer.Screen
                        name='evento'
                        component={Evento}
                        options={{drawerLabel:null,headerShown:false}}
                    />
                    <Drawer.Screen
                        name='agregarMap'
                        component={MapaAgregar}
                        options={{drawerLabel:null,headerShown:false}}
                    />
                      <Drawer.Screen
                        name='noticia'
                        component={Noticia}
                        options={{drawerLabel:null,headerShown:false}}
                    />
                    <Drawer.Screen
                        name='mapaEliminar'
                        component={MapaEliminar}
                        options={{drawerLabel:null,headerShown:false}}
                    />
                     <Drawer.Screen
                        name='editarLugar'
                        component={EditarLugar}
                        options={{drawerLabel:null,headerShown:false}}
                    />
                </Drawer.Navigator>
            );
        }
    }
    else if(!usuario){
        return(null);
    }
}
export default RutaProtegida;