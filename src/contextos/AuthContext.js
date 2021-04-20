import React, { useContext , useState, useEffect} from 'react';
import {auth} from './../firebase/firebaseConfig';


// Creamos el contexto.
const AuthContext = React.createContext();

//Hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) =>{
    const [usuario, cambiarUsuario] = useState();
    //creamos un state para saber cuando termina de cargar
    //la comprobacion de onAuthStateChanged
    const [cargando,cambiarCargando] = useState(true);

    //Efecto para ejecutar la comprobacion una sola vez.
    useEffect(() => {
        // Comprobamos si hay un usuario.
        const cancelarSubscripcion = auth.onAuthStateChanged((usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSubscripcion;
    },[]);
    return (
        <AuthContext.Provider value={{usuario: usuario}}>
            {/*Solamente retomamos los elementos hijos cuando no este cargando.
            de esta forma nos aseguramos de no cargar el resto de la app hasta que el usuario haya sido establecido
            
            Si no hacemos esto al refrescar la pagina el componente children intenta cargar inmediatanemte,
            antes de haber comprobado que existe un usuario. */}
            {!cargando && children}
        </AuthContext.Provider>
    );
}
export {AuthProvider, AuthContext, useAuth};