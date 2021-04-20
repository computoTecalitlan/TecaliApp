import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { Item, Input, Label, Textarea } from 'native-base';
import {normalize} from '../Auxiliar/FontResponsive';

const { height, width } = Dimensions.get('window');

const customInput = (props) => {	

	//Esta funcion es para controlar los estados de la imagen y de los inputs, mantienen la imagen oculta cuando editamos]
	//Y evitan recaga del componente cuando dejamos de editar el primer input y pasamos al segundo.
	const estadoInput = () => {
		props.mostrarImagen(false);
		props.cambiarEditando(!props.editando);
	} 
	
	let input = null;
	let image = props.image && (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				marginBottom: 10
			}}
		>
			<Image source={props.image} style={{ height: 160, width: 200 }} />
			<Text style={{ fontSize: 16, color: 'grey' }}>{props.name}</Text>
		</View>
	);
	switch (props.itemType) {
		case 'InlineLabel':
			input = (
				<Item style={{ alignItems: 'center', width: width * 0.8, height: width * 0.1 }}>
					<Input style={{ color: '#676766', fontSize: 17 }} placeholder={props.holder} value={props.value} onChangeText={props.changed} />
				</Item>
			);
			break;
		case 'FloatingLabel':
			console.log('floatingValue: ', props.value);
			input = (
				<Item floatingLabel>
					<Label style={{ color: '#676766', fontSize: 17 }}>{props.holder}</Label>
					<Input value={props.value} style={{ color: '#676766', fontSize: 17 }} onChangeText={props.changed} secureTextEntry={props.password} />
				</Item>
			);
			break;
		case 'FloatingLabelWhite':
			input = (
				<Item floatingLabel>
					<Label style={{ color: 'white', fontSize: normalize(15) }}>{props.holder}</Label>
					<Input onFocus={()=> props.mostrarImagen(!props.imagen)} editable={props.editando} onEndEditing={estadoInput} style={{ color: 'white' }} onChangeText={props.changed} secureTextEntry={props.password} />
				</Item>
			);
			break;
		case 'Textarea':
			input = <Textarea style={{ color: '#676766', fontSize: 17 }} rowSpan={8} bordered placeholder={props.holder} onChangeText={props.changed} />;
			break;
		case 'Fecha':
			input = null;
			break;
		default:
			input = null;
			break;
	}
	return <View style={styles.inputElement}>{input}</View>;
};

const styles = StyleSheet.create({
	inputElement: {
		padding: 5,
	},
	photoText: {
		fontWeight: 'bold',
		color: 'white',
		alignSelf: 'center'
	},
	mapMarkerPicker: {
		width: '100%',
		height: 250,
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	},
	scrollDataListIcons: {
		flex: 2,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap'
	}
});

export default customInput;