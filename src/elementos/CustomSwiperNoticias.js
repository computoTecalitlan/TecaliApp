import React,{useEffect, useState} from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,Animated,Image} from 'react-native';
import useObtenerNoticias from './../hooks/useObtenerNoticias';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import fondo from './../Imagenes/fondo.jpg';
const {height,width} = Dimensions.get('window');
import {db} from './../firebase/firebaseConfig';

const CustomSwiperNoticias = () => {
   const [noticias,cambiarNoticias] = useState([]);
    const [cargando,cambiarCargando] = useState(true);
   const navigator = useNavigation();
   
   
  
   useEffect(()=>{
    clearTimeout(cargandoNoticias);
   },[cargando]);

   useEffect(()=>{
       consultarNoticias();
   },[])
   const cargandoNoticias = setTimeout(() => {
        if(cargando == true ){
            if(noticias.length > 0){
                //alert("Bienvenido a la TecaliApp");
            }
             else if(noticias.length == 0) {
                alert("Hubo un error al cargar las noticias");
            }
        }
   },3000);

   const consultarNoticias = () =>{
    try{
        const newsRef = db.ref('news').limitToLast(3);

        newsRef.on('value',(snapshot)=>{
            const noticiasSnap = snapshot.val()
            
            for(let id in noticiasSnap){
                  noticias.push(noticiasSnap[id].newData);
            }
            cambiarCargando(false);
        })
       }catch(error){
           alert(error.message);
       }

   }
   //------------------------------------------------------------------------------- CODIGO DE ANIMACION DEL COMPONENTE--------------------------------------
   const [alignment] = useState(new Animated.Value(0));
   const levantarHojaNoticias = () => {
       Animated.timing(alignment,{
           toValue:1,
           duration:300,
           useNativeDriver: false
       }).start();
   };
   const ocultarHojaNoticias = () => {
    Animated.timing(alignment,{
        toValue:0,
        duration:300,
        useNativeDriver: false
    }).start();
};
   const interpolarHojaNoticias =alignment.interpolate({
       inputRange:[0, 1],
       outputRange: [-height / 2.4 + 50,0]
   });

   const estiloHojaNoticias = {
       bottom:interpolarHojaNoticias
   }

   const gestureHandler = (e) => {
       if(e.nativeEvent.contentOffset.y > 0 ) {levantarHojaNoticias();}
       else if(e.nativeEvent.contentOffset.y < 0) {ocultarHojaNoticias();}
   }
   //-----------------------------------------------------------------------------------------------------------------------------------------------------
   if(cargando == false && noticias.length > 0){
   return ( 
        //Se declara de tipo animated todo el contenedor de las noticias para que este aparezca y desaparezca cuando el usuario lo arrastre.
    <Animated.View style={[estilo.contenedor,estiloHojaNoticias]}> 
        <View style={{flex:1}}>
        <ScrollView 
                    onScroll={(e) => gestureHandler(e)}
                    style={estilo.grabber}
                    showsVerticalScrollIndicator={true}
                    
                   >
                       {/*Por ahora se tiene que llenar el Scroll de items para que haga el efecto 
                          Sin los elementos no hace Scroll, y por lo tanto no se aplica la animacion de 
                          mostrar y ocultar.*/}
                              
                              <Text style={{color:'#fff'}}>*</Text>
                              <Text style={{color:'#fff'}}>*</Text>
                              <Text style={{color:'#fff'}}>*</Text>
                              <Text style={{color:'#fff'}}>*</Text>         
        </ScrollView> 
        </View>
            <View style={{marginTop:10}}>
                <Text style={{color:'#ffff',alignSelf:'center',fontWeight:'bold'}}>Las noticias más recientes:</Text>
            </View>
            <ScrollView   style={{}} horizontal={true}>
                {noticias.reverse().map((noticia,index) => {
                    return(
                        <TouchableOpacity onPress={() => {alert('Presionaste la noticia')}} key={index}>
                            <View style={estilo.card}>
                                <Image source={{uri:noticia.imagen}} style={estilo.imageCard}/>
                                <View style={estilo.tituloCard}>
                                    <Text style={{alignSelf:'center',color:"#fff",fontWeight:"bold"}}>{noticia.noticia}</Text>
                                </View> 
                            </View>
                        </TouchableOpacity> 
                    );
                })}            
                <TouchableOpacity onPress={() => {navigator.navigate('Noticias')}}>
                                <View style={estilo.boton}>
                                    <Text style={{alignSelf:'center',color:'#fff',alignSelf:'center',marginTop:2}}>Ver más</Text>
                                </View> 
                </TouchableOpacity>
            </ScrollView>
                            
            
                     

        </Animated.View> 
    );}
    else if(cargando == true && noticias.length == 0){
        return(
            <Animated.View style={[estilo.contenedor,estiloHojaNoticias]}>
                {/*Si no hay noticias muestra una tarjeta vacia y un texto que dice cargando.*/}
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
        position:'absolute',
        left:0,
        right:0,
        bottom: 0,
        backgroundColor: '#f8ae40',
        height: height /2.4,
        borderTopRightRadius:30,
        borderTopLeftRadius:30
        
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