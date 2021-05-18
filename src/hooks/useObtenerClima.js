import axios from 'axios';
import  {useEffect,useState} from 'react';
import {useAuth} from './../contextos/AuthContext';

const useObtenerClima = ({cambiarCargando}) => {
   
const{usuario} = useAuth();
    const [clima,cambiarClima] = useState([])
    useEffect(() => {     
        fetch(`api.openweathermap.org/data/2.5/weather?lat=19.4715&lon=-103.3071&appid=7ea4512e4de74d48626efecb2b0ce5f1&units=metric`)
		.then(resp => resp.json())
		.then(json => {      
			cambiarClima({temperatura:json.main.temp,icono: json.weather[0].icon});
            cambiarCargando(false);
		})
        .catch(error => alert(error))
    },[usuario]);
    return clima;
}
 
export default useObtenerClima;