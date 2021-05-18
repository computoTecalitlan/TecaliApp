import React, {} from 'react';


//Hacemos las importaciones de los componentes de la aplicacion
import ContenedorInicio from './src/Componentes/ContenedorInicio';
import {NavigationContainer} from '@react-navigation/native';



const App = () => {
 
  return (
    
           <NavigationContainer >
            <ContenedorInicio/>  
          </NavigationContainer>
      
         
  );
}
export default App;
