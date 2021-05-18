import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Animated,Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {height,width} = Dimensions.get('window');
import {db} from '../firebase/firebaseConfig';

const CustomSwiperNoticias = () => {
   const [actividades,cambiarActividades] = useState([]);
    const [cargando,cambiarCargando] = useState(true);

   useEffect(()=>{
       consultarActividades();
   },[])
   

   const consultarActividades = () =>{
    try{
        const newsRef = db.ref('activities').limitToLast(5);

        newsRef.on('value',(snapshot)=>{
            const noticiasSnap = snapshot.val()
            
            for(let id in noticiasSnap){
                  actividades.push(noticiasSnap[id].activityData);
            }
            cambiarCargando(false);
            
        })
       }catch(error){
           alert(error.message);
       }

   }
   //------------------------------------------------------------------------------- CODIGO DE ANIMACION DEL COMPONENTE--------------------------------------
 //-----------------------------------------------------------------------------------------------------------------------------------------------------
   if(cargando == false){
   return ( 
        //Se declara de tipo animated todo el contenedor de las actividades para que este aparezca y desaparezca cuando el usuario lo arrastre.
    <View style={[estilo.contenedor]}> 
            <View style={{marginTop:10}}>
                <Text style={{color:'#ffff',alignSelf:'center',fontWeight:'bold'}}>Las actividades más recientes:</Text>
            </View>
            <ScrollView   style={{}} horizontal={true}>
                {actividades.reverse().map((actividad,index) => {
                    return(
                        <TouchableOpacity onPress={() => {alert('Presionaste la actividad')}} key={index}>
                            <View style={estilo.card}>
                                <Image source={{uri:actividad.imagen}} style={estilo.imageCard}/>
                                <View style={estilo.tituloCard}>
                                    <Text style={{alignSelf:'center',color:"#fff",fontWeight:"bold"}}>{actividad.actividad}</Text>
                                </View>
                                <Text style={{color:"#828282",fontWeight:"bold"}}>{actividad.descripcion}</Text>
                            </View>
                        </TouchableOpacity> 
                    );
                })}            
            </ScrollView>
        </View> 
    );}
    else if(cargando == true ){
        return(
            <Animated.View style={[estilo.contenedor]}>
                {/*Si no hay actividades muestra una tarjeta vacia y un texto que dice cargando.*/}
                <View style={estilo.card}>
                    <Text style={{alignSelf:'center',color:'#f8ae40'}}> Cargando ...</Text>   
                </View>
            </Animated.View>
        );
    }
    else return null;
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
        backgroundColor: '#ffff',
        borderRadius:10,
        height: height * .33,
        width: width * .90,
        alignSelf:'center'
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
 
export default CustomSwiperNoticias;