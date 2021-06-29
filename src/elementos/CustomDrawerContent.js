import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import {View, Image, StyleSheet, SafeAreaView, Dimensions, } from 'react-native';
import HeaderDrawer from './../Imagenes/prs-logo.png';


const ContenidoDrawer = (props) => {

    const{state,...rest} = props;
    const newState = {...state}
    //En la constante state se guardan las screens y sus propiedades que se declaran en ContenedorApp.js y RutaProtegida.js
    // Se guardan en otra variable llamada newState que se encarga de filtrar las Screens del drawer
    // todas las Screens filtradas no heredaran el diseño del drawer, tendran su propio estilo
    // en este caso son para renderizar pantallas de modificacion de datos, por lo que no necesitamos mostrarlas en el drawer.
    newState.routes = newState.routes.filter(item => 
        item.name !== 'act' 
        && item.name !== 'actividad' 
        && item.name !== 'evento'
        && item.name !== 'agregarMap'
        && item.name !== 'noticia'
        && item.name !== 'mapaEliminar'
        && item.name !==  'listaReporte'
        && item.name !== 'editarLugar')
   
   //Aqui comienza la construccion del drawer, con la imagen del ciudadano siendo lo primero en ser renderizado, y despues le sigue la lista de pantallas filtradas
        return ( 
        <SafeAreaView style={styles.sAV} >
            <View style={styles.view} >
                <Image
                    style={styles.image}
                    source={HeaderDrawer}
                />
            </View>
            <DrawerContentScrollView {...props} >
               <DrawerItemList state={newState} {...rest}itemStyle={{borderBottomWidth: 1 * 0.5,borderColor: '#676766'}} >   
               </DrawerItemList>
            </DrawerContentScrollView>
        </SafeAreaView>
     );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	sAV: {
		flex: 1,
        marginTop:10,
        marginBottom:5
	},
	view: {
		height: 150,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		height: width * 0.4,
		width: width * 0.4,
        resizeMode:"contain"
	}
});
export default ContenidoDrawer;
