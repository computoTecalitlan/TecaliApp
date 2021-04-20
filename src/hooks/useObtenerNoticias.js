import {useEffect,useState} from 'react';
import {db} from './../firebase/firebaseConfig';
import {useAuth} from './../contextos/AuthContext';

const useObtenerNoticias = ({cambiarCargando}) => {
    const listaNoticias = [];
    const mensaje = 'Ocurrio un error de autenticacion'
    const {usuario} = useAuth();
    
    useEffect(() => {
        if(usuario){
        try{
          const newsRef = db.ref('news').limitToLast(3);

          newsRef.on('value',(snapshot)=>{
              const noticiasSnap = snapshot.val()
              
              for(let id in noticiasSnap){
                    listaNoticias.push(noticiasSnap[id].newData);
              }
             
              cambiarCargando(false);
            
          })
         }catch(error){
             console.log(error.message);
         }
        }
        else if(!usuario){
            return mensaje;
        }
     },[usuario]);
    return [listaNoticias];
}
 
export default useObtenerNoticias;