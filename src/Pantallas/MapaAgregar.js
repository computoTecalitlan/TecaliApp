import React, {useEffect,useState} from 'react';
import {Text,View,TextInput,TouchableOpacity,Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {db} from './../firebase/firebaseConfig';
import {useNavigation} from '@react-navigation/native';

const {width,height} = Dimensions.get('window');

const MapaAgregar = ({route}) => {
    const navigator = useNavigation();
    const {latitude,longitude} = route.params;
    const [tipo,cambiarTipo] = useState('');
    const [direccion,cambiarDireccion]= useState();
    const [nombre,cambiarNombre] = useState();
    const [telefono,cambiarTelefono] = useState();
    const [horario,cambiarHorario] = useState();
    const [scroll,ocultarScroll] = useState(true)

    const enviarMarker = () =>{
        let id;
        const insertar = db.ref('mapmarkers').push();
        id = insertar.key;
        insertar.set({
            mapMarkerData:{
                address:direccion,
                categoria:tipo,
                latitude:latitude,
                longitude:longitude,
                name:nombre,
                phone:telefono,
                schedule:horario,
                id:id
            }
        }).then(()=>{
            cambiarDireccion('');
            cambiarHorario('');
            cambiarNombre('');
            cambiarTelefono('')
            ocultarScroll(true);
            navigator.goBack();
        }
        ).catch(error => alert(error))
    };
    const locations = [
        {name:'Alimentos'},
        {name:'Templo'},
        {name:'Cultura'},
        {name:'Hotel'},
        {name:'Educación'},
        {name:'Servicios medicos'},
        {name:'Deporte'},
        {name:'Servicios publicos'},
        {name:'Farmacia'},
        {name:'Gasolinera'}];
    return (
        <View style={{width:width,height:height,backgroundColor:'#eee'}}>
            <View style={{width:width,height:height / 2, marginTop:50}}>
                <View style={{width:width/3,alignSelf:'flex-end',height:20}}>
                    <TouchableOpacity onPress={()=>{
                        cambiarDireccion('');
                        cambiarHorario('');
                        cambiarTelefono('');
                        cambiarNombre('');
                        ocultarScroll(true);
                        navigator.goBack();

                    }}>
                        <View style={{width:50,height:'auto',borderRadius:20,backgroundColor:'red',alignSelf:'flex-end',marginRight:3}}><Text style={{color:'#fff',fontWeight:'bold',alignSelf:'center'}}>X</Text></View>
                    </TouchableOpacity>
                </View>
            <TextInput placeholder='Nombre del negocio' value={nombre} onChangeText={(text)=>cambiarNombre(text)} />
            <TextInput placeholder='Direccion' value={direccion} onChangeText={(text)=>cambiarDireccion(text)}/>
            <TextInput placeholder='Telefono' value={telefono} onChangeText={(text)=>cambiarTelefono(text)} keyboardType='phone-pad'/>
            <TextInput placeholder='Horario' value={horario} onChangeText={(text)=>cambiarHorario(text)}/>
            {scroll ? 
                <RNPickerSelect onValueChange={value => {cambiarTipo(value);ocultarScroll(false)}} 
                items={[
                    {label: 'Alimentos', value: 'Alimentos'},
                    {label: 'Cultura', value: 'Cultura'},
                    {label: 'Templo',value:'Templo'},
                    {label: 'Hotel', value:'Hotel'},
                    {label: 'Educación', value:'Educación'},
                    {label: 'Servicios medicos', value:'Servicios medicos'},
                    {label: 'Deporte', value:'Deporte'},
                    {label: 'Servicios publicos', value: 'Servicios publicos'},
                    {label: 'Farmacia', value:'Farmacia'},
                    {label: 'Gasolinera', value:'Gasolinera'}
                ]}
                />
            : 
            <Text>Seleccionaste: {tipo}</Text>
            }
            
            <Text>{latitude}</Text>
            <Text>{longitude}</Text>
            <TouchableOpacity onPress={enviarMarker}>
                <View style={{marginTop:100,backgroundColor:'#45b39d',borderRadius:10,width:80,height:20,alignSelf:'center'}}>
                        <Text style={{alignSelf:'center',color:'#fff'}}>Guardar</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default MapaAgregar;