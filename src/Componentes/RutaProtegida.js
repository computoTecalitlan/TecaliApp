import React from 'react';
import {useAuth} from '../contextos/AuthContext';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import acercaDe  from './../Pantallas/AcercaDe';
import {Image} from 'react-native';
import Logout from './../Imagenes/logout.png';
import PantallaCerrarSesion from './../Pantallas/PantallaCerrarSesion';


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
                    <Drawer.Screen name='acercaDe' component={acercaDe}
                    ></Drawer.Screen>
                        <Drawer.Screen 
                            name ="Cerrar Sesión" 
                            
                            component={PantallaCerrarSesion}
                            options={{drawerIcon: () => (
                                        <Image  style={{width:20,height:20}} 
                                            source={Logout}
                                        />),
                                    }} 
                            
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