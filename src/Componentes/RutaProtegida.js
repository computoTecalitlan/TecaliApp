import React from 'react';
import {useAuth} from '../contextos/AuthContext';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';


const RutaProtegida = ({children, ...restoDePropiedades}) =>{
    const {usuario} = useAuth();
    const Drawer = createDrawerNavigator();
    const navigation = useNavigation();
    if(usuario){
        return (<Drawer.Navigator {...restoDePropiedades}>
                {children}
                </Drawer.Navigator>);
    }else if(!usuario){
        return(null);
    }
}
export default RutaProtegida;