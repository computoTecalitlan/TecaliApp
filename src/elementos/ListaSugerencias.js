import React,{useState,useEffect} from 'react';
import {Text,View,ScrollView,StyleSheet,Dimensions} from 'react-native';
import {db} from '../firebase/firebaseConfig';

const {width,height} = Dimensions.get('window');
const ListaSugerencias = () => {

    const [sugerencias,cambiarSugerencias] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
   

    const obtenerSugerencias = () => {
        try{
            const newsRef = db.ref('suggestions').limitToLast(5);
    
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                
                for(let id in Snapshot){
                        sugerencias.push(Snapshot[id].suggestionData);
                      
                }
                cambiarCargando(false);
                
            })
           }catch(error){
               alert(error.message);
           }
    
    };
    
   useEffect(()=>{
       obtenerSugerencias();
   },[]);

   useEffect(()=> {
       return(()=>{
           cambiarSugerencias([]);
           cambiarCargando(!cargando);
       });
   },[])
    return(
        <View style={estilo.contenedorRespuestas}>
                        <View style={{flex:1}}>
                        <ScrollView >
                            {sugerencias.reverse().map((sugerencia,index)=>{
                                return(  
                                    <View style={sugerencia.estado == 'aceptada' ? estilo.sugerenciaAceptada : sugerencia.estado == 'rechazada' ? estilo.sugerenciaRechazada : estilo.sugerenciaEspera} key={index}>
                                        <Text style={{color:'#222222',fontWeight:'bold',alignSelf:'center'}}>{sugerencia.asunto}</Text>
                                        <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>{sugerencia.comentario}</Text>
                                        <Text style={{color:'#222222',fontWeight:'bold',alignSelf:'center'}}>Respuesta:</Text>
                                        <Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>{sugerencia.respuesta}</Text>
                                    </View>
                                    
                                );
                            })}
                        </ScrollView>
                        </View>
                    </View>
    );
}

const estilo = StyleSheet.create({
    contenedorRespuestas:{
        width: width * .95,
        height: height * .55,
        backgroundColor: '#eee',
        borderRadius: 1,
        borderWidth:4,
        borderColor: '#828282',
        alignSelf:'center',
        marginTop:1,
       
        
    },
    sugerenciaAceptada:{
        width: width * .90,
        height: height * .20,
        backgroundColor: '#45b39d',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:5,
        
    },
    sugerenciaRechazada:{
        width: width * .90,
        height: height * .20,
        backgroundColor: '#d61a3c',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:5,
        
    },
    sugerenciaEspera:{
        width: width * .90,
        height: height * .20,
        backgroundColor: '#B0E0E6',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:5,
        
    }
})
export default ListaSugerencias;