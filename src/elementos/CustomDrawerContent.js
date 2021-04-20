import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import {View, Image, StyleSheet, SafeAreaView, Dimensions, } from 'react-native';
import HeaderDrawer from './../Imagenes/prs-logo.png';


const ContenidoDrawer = (props) => {

    const{state,...rest} = props;
    const newState = {...state}
    newState.routes = newState.routes.filter(item => item.name !== 'Salir')
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
