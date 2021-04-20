import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PantallaInicioSesion from './../Pantallas/PantallaInicioSesion';
import DrawerInicio from './ContenedorApp';



    

const Stack = createStackNavigator();

const ContenedorInicio = () => {
    return (         
            <Stack.Navigator initialRouteName="PantallaInicioSesion" headerMode="none">
                <Stack.Screen name="PantallaInicioSesion" component={PantallaInicioSesion}/>
                <Stack.Screen name="Inicio" component={DrawerInicio}/>
            </Stack.Navigator>
     );
}
 
export default ContenedorInicio;
