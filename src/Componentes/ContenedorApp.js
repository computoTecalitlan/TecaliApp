import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AcercaDe from './../Pantallas/AcercaDe';
import Actividades from './../Pantallas/ActividadCiudadano';
import BuzonCiudadano from './../Pantallas/BuzonCiudadano';
import Eventos from './../Pantallas/Eventos';
import MapaTeclalitlan from './../Pantallas/MapaTecalitlan';
import Noticias from './../Pantallas/Noticias';
import PantallaCerrarSesion from './../Pantallas/PantallaCerrarSesion';
import ReporteCiudadano from './../Pantallas/ReporteCiudadano';
import Transparencia from './../Pantallas/Transparencia';
import Turismo from './../Pantallas/Turismo';
import Inicio from './../Pantallas/Inicio';
import ContenidoDrawer from '../elementos/CustomDrawerContent';
import HomeIcon from './../Imagenes/home-icon.png';
import AboutIcon from './../Imagenes/about.png'
import EventsIcon from './../Imagenes/events.png';
import LogoutIcon from './../Imagenes/logout.png';
import MailBoxIcon from './../Imagenes/mailbox.png';
import MapsIcon from './../Imagenes/maps.png';
import NewsIcon from './../Imagenes/news.png';

import ReportIcon from './../Imagenes/report.png';
import TourismIcon from './../Imagenes/tourism.png'
import TransparencyIcon from './../Imagenes/transparency.png';
import { Image} from 'react-native';
import {AuthProvider} from './../contextos/AuthContext';
import RutaProtegida from './RutaProtegida';
import ListaReporteCiudadanos from './../Pantallas/ListaReporteCiudadanos';

const Drawer = createDrawerNavigator();
//El navegador drawer que contiene las pantallas de los usuarios anonimos, esta cubierto por el componente de authProvider que
//Retorna las credenciales del usuario y de ahi entra a la ruta protegida, si la ruta protegida encuentra al usuario anonimo,
//Entonces renderiza los Screen aqui mostrados.
const DrawerInicio = () => {
		return(   
			<AuthProvider>			
			<RutaProtegida initialRouteName="Inicio"   
							drawerContent={props => <ContenidoDrawer{...props}/> } 
							drawerContentOptions={{activeBackgroundColor: "#f8ae40", activeTintColor:"#676766"}} //Propiedades de estilo del drawer.
							screenOptions={{headerShown:true,screenLeft:false}}
							
			>	 
				
						{/*Inicia la construccion del Drawer y las pantallas que en las que se navega*/}
					<Drawer.Screen 
						name="Inicio" 
						component={Inicio}
						options={{drawerIcon: () => (<Image  style={{width:20,height:20}} source={HomeIcon}/>),
									headerShown:false
								}}
						screenOptions={{statusBarBackgroundColor:'#ffff'}}
						 
					/>
					<Drawer.Screen 
						name="Transparencia" 
						component={Transparencia}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={TransparencyIcon}/>),
									headerTitle: 'Transparencia',
									headerStyle:{backgroundColor:'#e2487b'},	
									headerTintColor:'#ffff'
									
								}} 
					/>
					<Drawer.Screen 
						name="Buzón Ciudadano" 
						component={BuzonCiudadano}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={MailBoxIcon}/>),
									headerStyle:{backgroundColor:'#f8ae40'},
									headerTintColor:'#ffff',
								}} 
					/>
					<Drawer.Screen 
						name="Noticias" 
						component={Noticias}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={NewsIcon}/>),
									headerShown:false
								}} 
					/>
					<Drawer.Screen 
						name="Reporte Ciudadano" 
						component={ReporteCiudadano}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={ReportIcon}/>),
									headerShown:false
								}} 
					/>
					<Drawer.Screen 
						name="Mapa de Tecalitlán" 
						component={MapaTeclalitlan}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={MapsIcon}/>),
									headerShown:false,
								}} 
					/>
					<Drawer.Screen 
						name="Eventos" 
						component={Eventos}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={EventsIcon}
									/>),
									headerShown:false
								}} 
					/>
					<Drawer.Screen 
						name="Turismo" 
						component={Turismo}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={TourismIcon}
									/>),
									headerShown:false,
								}}
						
						
					/>
					<Drawer.Screen
						name="Acerca de" 
						component={AcercaDe}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={AboutIcon}
									/>),
									headerStyle:{backgroundColor:'#828282'},
									headerTintColor:'#ffff'
								}} 
					/>
					<Drawer.Screen 
						name="Cerrar Sesión" 
						
						component={PantallaCerrarSesion}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={LogoutIcon}
									/>),
								}} 
						
					/>
					<Drawer.Screen
						name="actividad"
						component={Actividades}
						options={{drawerLabel:null,drawerIcon:null,headerShown:false}}
					/>
					<Drawer.Screen
						name="listaReporte"
						component={ListaReporteCiudadanos}
						options={{drawerLabel:null,drawerIcon:null,headerShown:false}}
					/> 
				</RutaProtegida>
				</AuthProvider>
    	);
	
    	
	}

 
export default DrawerInicio;

