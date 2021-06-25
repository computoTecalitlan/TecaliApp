import React,{useEffect} from 'react';
import { View,Text,Dimensions,TouchableOpacity,TextInput, ViewPropTypes } from 'react-native';
import { useState } from 'react/cjs/react.development';
import ListaSugerenciasAdmin from './../elementos/ListaSugerenciasAdmin';
import BottomSheet from 'reanimated-bottom-sheet';
import {db} from './../firebase/firebaseConfig';
import CustomHeader from '../elementos/CustomHeader';


const {width,height} = Dimensions.get('window');
const BuzonAdmin = () => {
    const [inputRespuesta,cambiarInputRespuesta] = useState('');
    let estado = '';
    const [cargando,cambiarCargando] = useState(true);
    const [nota,cambiarNota] = useState([]);
    const sheetRef = React.useRef(null);
    const [sugerencias,cambiarSugerencias] = useState([]);
    const [aceptar,cambiarAceptar] = useState(false);
    const [rechazar,cambiarRechazar] = useState(false);

    const obtenerSugerencias = () => {
        try{
            const newsRef = db.ref('suggestions');
            const consulta = [];
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                
                for(let id in Snapshot){
                        consulta.push(Snapshot[id].suggestionData);
                }
                cambiarCargando(false); 
                cambiarSugerencias(consulta);
                
            })
           }catch(error){
               alert(error.message);
           }
    
    };
    
   useEffect(()=>{
        obtenerSugerencias();
   },[]);
//Aqui renderiza el contenido de la Hoja que sale del fondo en la que el usuario escribe la respuesta al buzon.
    const renderContent = () => (
        
            <View style={{width:width ,height:height,backgroundColor:'#fff',alignSelf:'center'}}> 
                <Text style={{color:'#000',fontWeight:'bold',fontSize:20}}>Asunto:</Text>
                <Text style={{color:'#828282',fontWeight:'bold',fontSize:17}}>{nota.asunto}</Text>
                <Text style={{color:'#000',fontWeight:'bold',fontSize:20}}>Comentario:</Text>
                <Text style={{color:'#828282',fontWeight:'bold',fontSize:17}}>{nota.comentario}</Text>
                <TextInput style={{width:width * .98,alignSelf:'center',borderWidth:2,borderColor:'#828282',height:height / 4}} placeholder='Escriba aqui su respuesta' onChangeText={(text) => cambiarInputRespuesta(text)}/>
                <View style={{width:width,height:'auto'}}>
                    <View style={{width:width /3,height:'auto',alignSelf:'center',flexDirection:'row'}}>
                    <TouchableOpacity disabled={aceptar ? true : false} onPress={()=>{
                         cambiarAceptar(true);
                         cambiarRechazar(true);
                         estado = 'aceptada';
                         actualizarRegistro();
                    }}>
                        <View style={{width:'auto',height:'auto',backgroundColor:'#008f39',borderRadius:5}}><Text style={{color:'#fff',fontWeight:'bold'}}>Aceptada</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity  disabled={rechazar ? true : false} onPress={()=>{
                        cambiarRechazar(true);
                        cambiarAceptar(true)
                       estado = 'rechazada';
                        actualizarRegistro();
                    }}>
                    <View style={{marginLeft:2,width:'auto',height:'auto',backgroundColor:'#a2231d',borderRadius:5}}><Text style={{color:'#fff',fontWeight:'bold'}}>Rechazada</Text></View>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        
    )
    const renderHeader = () =>  (
        <View style={{width:width,borderTopLeftRadius:50,borderTopRightRadius:50,backgroundColor:'#828282',height:40,flexDirection:'row',alignContent:'center'
        }}>
        <Text 
        style={{
            alignSelf:'center',
            color:'#fff',
            fontWeight:'bold',
            fontSize:18,
            marginLeft:45
        }}
        >Desliza hacia abajo para cerrar la hoja</Text>
    </View>
    )
    const actualizarRegistro = () =>{
        if(nota){
            try{
            const udtRef = db.ref('suggestions/'+nota.id);
            udtRef.update({
                suggestionData:{
                                asunto: nota.asunto,
                                respuesta:inputRespuesta,
                                id:nota.id,
                                comentario:nota.comentario,
                                estado:estado
                                }
            }).then(()=>{
                alert('Se ha enviado la respuesta con exito');
               cambiarCargando(true);
                obtenerSugerencias();
                cambiarRechazar(false);
                cambiarAceptar(false);
                sheetRef.current.snapTo(2);
            });
        }catch(error){
            alert(error);
        }
        }
        

    }
    const mostrarHoja = () => {
        sheetRef.current.snapTo(0);
        
    }
    const actualizar = () => {
        obtenerSugerencias();
    }
    const filtrar = (text) => {
        if(text != ''){
           cambiarCargando(true);
           const busqueda =sugerencias.filter(sug =>{
            let ban = false;
                const filtrada = sug['asunto'];
                if(filtrada.includes(text)){
                    ban = true;
                    cambiarCargando(false);
                    if(ban){
                        return sug;
                    }
                }
               
            })
            cambiarSugerencias(busqueda);
            
        }
        else if(text == ''){
            cambiarCargando(true);
            obtenerSugerencias();
        }
     }  
    return(
        <>
        <View style={{width:width * .99, height:height}}>
            <View style={{height:height * .16}}>
                <CustomHeader nombre='noticias' actualizar={actualizar} filtrar={filtrar}/>
            </View>
           <ListaSugerenciasAdmin mostrarHoja={mostrarHoja} obtenerSugerencias={obtenerSugerencias} cambiarNota={cambiarNota} sugerencias={sugerencias} cambiarSugerencias={cambiarSugerencias} cargando={cargando} cambiarCargando={cambiarCargando}/>
        </View>
           <BottomSheet
           ref={sheetRef}
           snapPoints={[height * .95,300,0]}
           enabledHeaderGestureInteraction={true}
           renderContent={renderContent}
           renderHeader={renderHeader}
           initialSnap={2}
        />
        </>
    );   
}

export default BuzonAdmin;