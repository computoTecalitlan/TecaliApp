import React,{useState,useEffect} from 'react';
import {Text,View,Image,ScrollView,Dimensions,StyleSheet,TouchableOpacity} from 'react-native';
import {db} from './../firebase/firebaseConfig';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomHeader from '../elementos/CustomHeader';
import imgCargando from './../Imagenes/noticia.png'
const {width,height} = Dimensions.get('window');

const listaReportes = () => {
const [reportes,cambiarReportes] = useState([]);
const [nota,cambiarNota] = useState([]);
const [cargando,cambiarCargando] = useState(true);
    
const obtenerReportes = () => {
        try{
            const newsRef = db.ref('incidents');
            const consulta = [];
            newsRef.on('value',(snapshot)=>{
                const Snapshot = snapshot.val()
                
                for(let id in Snapshot){
                        consulta.push(Snapshot[id].incidentData);
                }
                cambiarCargando(false);
                cambiarReportes(consulta);
            })
           }catch(error){
               alert(error.message);
           }
    
    };
    const filtrar = (text) => {
        if(text != ''){
           cambiarCargando(true);
           const busqueda = reportes.filter(rep =>{
            let ban = false;
                const filtrada = rep['asunto'];
                if(filtrada.includes(text)){
                    ban = true;
                    cambiarCargando(false);
                    if(ban){
                        return rep;
                    }
                }
               
            })
            cambiarReportes(busqueda);
            
        }
        else if(text == ''){
            cambiarCargando(true);
            obtenerReportes();
        }
     }  
    const actualizar = () =>{
        obtenerReportes();
    }
    useEffect(()=>{
        obtenerReportes();
    },[]);

    const renderContent = () => (
        <View style={{width:width,height:height,backgroundColor:'#eee'}}>
            <Image source={{uri:nota.imagen}} style={{width:width,height:height * .30}}/>
            <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:20}}>{nota.asunto}</Text>
            <Text style={{fontWeight:'bold',color:'#828282',fontSize:18,alignSelf:'flex-start'}}>Fecha del reporte: {nota.fecha}</Text>
            <Text style={{fontWeight:'bold',alignSelf:'flex-start'}}>Dirigido al departamento de: {nota.direccion}</Text>
            <Text style={{fontWeight:'bold'}}>Descripción:</Text>
            <Text>{nota.descripcion}</Text>
            <Text>Calle: {nota.calle}</Text>
            <Text>Colonia: {nota.colonia}</Text>
            <Text>Localidad: {nota.localidad}</Text>
        </View>
    );

    const renderHeader = () => (
        <View style={{borderTopLeftRadius:50,borderTopRightRadius:50,backgroundColor:'#828282',height:40,flexDirection:'row',alignContent:'center'
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

    const sheetRef = React.useRef(null);
    return(
        <>
        <View style={{width:width,height:height}}>
             <View style={{width:width,height:height*.12}}>
            <CustomHeader nombre='noticias' actualizar={actualizar} filtrar={filtrar}/>
            </View>
            {cargando == false ?
        <View>
            
             <ScrollView>
            {reportes.reverse().map((reporte,index) =>{
                return(
                    <TouchableOpacity onPress={() => {
                        cambiarNota(reporte);
                        sheetRef.current.snapTo(0)}} key={index}>
                            <View style={estilo.card}>
                                <Image source={{uri:reporte.imagen}} style={estilo.imageCard}/>
                                <View style={estilo.tituloCard}>
                                    <Text style={{alignSelf:'center',color:"#fff",fontWeight:"bold"}}>{reporte.asunto}</Text>
                                </View>
                                <Text style={{color:"#828282",fontWeight:"bold",fontSize:13,textAlign:'justify'}}>{reporte.descripcion}</Text>
                                <Text style={{color:"#828282",fontWeight:"bold",textAlign:'center'}}>{reporte.fecha}</Text>
                            </View>
                        </TouchableOpacity> 
                );
            })}
            </ScrollView>
                 
        </View> 
        :
        <View style={{flex:1}}>
            <Image source={imgCargando} style={{width:200,height:200,alignSelf:'center',resizeMode:'contain'}}/>
            <Text style={{alignSelf:'center'}}>Estamos investigando ... </Text> 
        </View> }
        </View>
        <BottomSheet
        ref={sheetRef}
        snapPoints={[height * .95,300,0]}ç
        enabledHeaderGestureInteraction={true}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={2}
     />
     </>
    );
}
const estilo = StyleSheet.create({
    contenedor:{
        left:0,
        right:0,
        bottom: 0,
        backgroundColor: '#f8ae40',
        height: height /2.4,
        
    },
    card:{
        backgroundColor: '#eee',
        borderRadius:10,
        height: height * .25,
        width: width * .90,
        alignSelf:'center',
        marginTop:5
    },
    logo:{
        resizeMode: "center",
        height: 125,
        width: 125,
        alignSelf:'center',
        marginTop:50 
    },
    grabber:{
        width:60,
        borderTopColor:'#ffff',
        borderTopWidth:20,
        alignSelf:'center',
        borderRadius:10,
        
    },
    boton:{
        backgroundColor:'#51d1f6',
        width: 80,
        height: 25,
        marginTop:80,
        borderRadius:10,
        alignSelf:'center',
        marginLeft: 20
    },
    imageCard:{
        width:width * .90,
        height:100, 
        alignSelf:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    tituloCard:{
        width: width * .80,
        backgroundColor: "#f8ae40",
        alignSelf:'center',
        borderRadius:50,
        alignContent:'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:1
    }
})
export default listaReportes;