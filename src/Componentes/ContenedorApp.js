import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AcercaDe from './../Pantallas/AcercaDe';
import Actividades from './../Pantallas/Actividades';
import BusEscolar from './../Pantallas/BusEscolar';
import BuzonCiudadano from './../Pantallas/BuzonCiudadano';
import Eventos from './../Pantallas/Eventos';
import MapaTeclalitlan from './../Pantallas/MapaTecalitlan';
import Noticias from './../Pantallas/Noticias';
import Pagos from './../Pantallas/Pagos';
import PantallaCerrarSesion from './../Pantallas/PantallaCerrarSesion';
import PantallaInicioSesion from './../Pantallas/PantallaInicioSesion';
import ReporteCiudadano from './../Pantallas/ReporteCiudadano';
import Transparencia from './../Pantallas/Transparencia';
import Turismo from './../Pantallas/Turismo';
import Inicio from './../Pantallas/Inicio';
import ContenidoDrawer from '../elementos/CustomDrawerContent';
import HomeIcon from './../Imagenes/home-icon.png';
import AboutIcon from './../Imagenes/about.png'
import ActivitiesIcon from './../Imagenes/activities.png';
import BusIcon from './../Imagenes/bus.png';
import EventsIcon from './../Imagenes/events.png';
import LogoutIcon from './../Imagenes/logout.png';
import MailBoxIcon from './../Imagenes/mailbox.png';
import MapsIcon from './../Imagenes/maps.png';
import NewsIcon from './../Imagenes/news.png';
import PaymentsIcon from './../Imagenes/payments.png';
import ReportIcon from './../Imagenes/report.png';
import TourismIcon from './../Imagenes/tourism.png'
import TransparencyIcon from './../Imagenes/transparency.png';
import { Image} from 'react-native';
import {AuthProvider} from './../contextos/AuthContext';
import RutaProtegida from './RutaProtegida';
import {useAuth} from './../contextos/AuthContext';


const Drawer = createDrawerNavigator();

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
						name ="Inicio" 
						component={Inicio}
						options={{drawerIcon: () => (<Image  style={{width:20,height:20}} source={HomeIcon}/>),
									headerShown:false
								}}
						screenOptions={{statusBarBackgroundColor:'#ffff'}}
						 
					/>
					<Drawer.Screen 
						name ="Transparencia" 
						component={Transparencia}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={TransparencyIcon}/>),
									headerTitle: 'Transparencia',
									headerStyle:{backgroundColor:'#e2487b'},	
									headerTintColor:'#ffff'
									
								}} 
					/>
					<Drawer.Screen 
						name ="Buzón Ciudadano" 
						component={BuzonCiudadano}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={MailBoxIcon}/>),
									headerStyle:{backgroundColor:'#f8ae40'},
									headerTintColor:'#ffff',
								}} 
					/>
					<Drawer.Screen 
						name ="Noticias" 
						component={Noticias}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={NewsIcon}/>),
									headerShown:false
								}} 
					/>
					<Drawer.Screen 
						name ="Bus Escolar" 
						component={BusEscolar}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={BusIcon}/>),
									headerStyle:{backgroundColor:'#d4e283'},
									headerTintColor:'#ffff'
								}} 
					/>
					<Drawer.Screen 
						name ="Reporte Ciudadano" 
						component={ReporteCiudadano}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={ReportIcon}/>),
									headerStyle:{backgroundColor:'#1dd2fc'},
									headerTintColor:'#ffff'
								}} 
					/>
					<Drawer.Screen 
						name ="Mapa de Tecalitlán" 
						component={MapaTeclalitlan}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} source={MapsIcon}/>),
									headerShown:false,
								}} 
					/>
					<Drawer.Screen 
						name ="Eventos" 
						component={Eventos}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={EventsIcon}
									/>),
								}} 
					/>
					<Drawer.Screen 
						name ="Turismo" 
						component={Turismo}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={TourismIcon}
									/>),
								}}
						
						
					/>
					<Drawer.Screen
						name ="Acerca de..." 
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
						name ="Cerrar Sesión" 
						
						component={PantallaCerrarSesion}
						options={{drawerIcon: () => (
									<Image  style={{width:20,height:20}} 
										source={LogoutIcon}
									/>),
								}} 
						
					/>
					<Drawer.Screen
						name="Salir"
						component={PantallaInicioSesion}
						options={{drawerLabel:null,drawerIcon:null}}
					/>
				 
				</RutaProtegida>
				</AuthProvider>
    	);
	
    	
	}

 
export default DrawerInicio;

