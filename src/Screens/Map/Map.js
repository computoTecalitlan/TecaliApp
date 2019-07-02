import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Dimensions,
	BackHandler,
    Image,
    Text,	
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import HeaderToolbar from '../../components/HeaderToolbar/HeaderToolbar';
import StatusBar from '../../UI/StatusBar/StatusBar';

export default class Map extends Component {
	state = {
        food: [
            polloSJ = {
                latLong: {
                    latitude: 19.465856, 
                    longitude: -103.302558,
                },
                name: 'Pollo San Juan',
                address: 'Ocampo 217-227, Platanarillo, 49870 Tecalitlán, Jal.',
                schedule: 'Abierto de 9:00 – 16:00',
                phone: '01 341 121 5166',

            },
            taqueriaDany = {
                latLong: {
                    latitude: 19.470739, 
                    longitude: -103.307949
                },
                name: 'Taquería Dani',
                address: 'Manuel Ávila Camacho Sn, Tecalitlán, 49900 Tecalitlán, Jalisco.',
                schedule: 'Abierto de 17:00 – 22:00',
                phone: '01 371 418 0474',

            },
            barbacoaMeza = {
                latLong: {
                    latitude: 19.476793, 
                    longitude: -103.303031
                },
                name: 'Barbacoa Meza',
                address: '49870, Benito Juárez 289, San Isidro, 49870 Tecalitlán, Jal.',
                schedule: 'Abierto de 8:00 – 14:00',
                phone: '01 341 131 0962',
            },
            betosPizza = {
                latLong: {
                    latitude: 19.467492, 
                    longitude: -103.308441
                },
                name: "Beto's Pizza And Beers",
                address: 'Chávez Madrueño 6, Naranjitos, 49900 Tecalitlán, Jal.',
                phone: '01 341 112 9926',
            },
            sanBlasMariscos = {
                latLong: {
                    latitude: 19.470575, 
                    longitude: -103.308020
                },
                name: "El muelle de san blas mariscos",
                address: 'Ávila Camacho 30, Tecalitlán, 49900 Tecalitlán, Jal.',
                phone: '01 341 437 1583',
            },
            hamburguesaTecaHidalgo = {
                latLong: {
                    latitude: 19.470924, 
                    longitude: -103.306265
                },
                name: "Hamburguesas Teca Hidalgo",
                address: 'Calle Miguel Hidalgo 19A, Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 10:00 – 23:00',
                phone: '01 341 111 4260',
            },
            hamburguesaTeca = {
                latLong: {
                    latitude: 19.468969, 
                    longitude: -103.306620
                },
                name: "Hamburguesas Teca",
                address: 'Ocampo, Platanarillo, 49870 Tecalitlán, Jal.',
                schedule: 'Abierto de 9:00 – 23:00',
                phone: '01 371 418 2247',
            },
            vivaPaleta = {
                latLong: {
                    latitude: 19.469794, 
                    longitude: -103.306173
                },
                name: "Viva paleta",
                address: 'Francisco I. Madero #69, Centro, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 11:00 – 19:30',
                phone: '01 33 3108 0427',
            },
            birrieriaHermanosVargas = {
                latLong: {
                    latitude: 19.471051, 
                    longitude: -103.307620
                },
                name: "Birrieria Hermanos Vargas",
                address: 'Ávila Camacho 20-C, Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 7:30 – 13:00',
            },
            bacano = {
                latLong: {
                    latitude: 19.470882, 
                    longitude: -103.306561
                },
                name: "Bacano Restaurant-bar",
                address: 'Calle Guadalupe Victoria, Naranjitos, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 7:30 – 16:30',
                phone: '01 341 109 3012'
            },
            santino = {
                latLong: {
                    latitude: 19.471505, 
                    longitude: -103.307224
                },
                name: "Santino Cocina & Copeo",
                address: 'Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 18:00 – 23:45',
                phone: '01 371 418 0011'
            },
            taqueriaSanMartin = {
                latLong: {
                    latitude: 19.474399, 
                    longitude: -103.304592
                },
                name: "Taquería San Martin",
                address: 'Benito Juárez 175, Sta Cruz, 49870 Tecalitlán, Jal.',
            },
            kalon = {
                latLong: {
                    latitude: 19.471920, 
                    longitude: -103.307261
                },
                name: "K_ALON",
                address: 'Calle Ponce de León 24 Colonia Centro, Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 12:00 – 23:00',
                phone: '044 341 134 5639'
            },
            peperoniPizza = {
                latLong: {
                    latitude: 19.472498, 
                    longitude: -103.306076
                },
                name: "Peperoni's Pizza",
                address: 'Benito Juárez 62, Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 10:00 – 21:45',
                phone: '01 371 418 2233'
            },
            carnitasElMarra = {
                latLong: {
                    latitude: 19.491668, 
                    longitude: -103.326412
                },
                name: "Carnitas El Marra",
                address: '49900 La Purísima, Jal.',
                phone: '044 341 135 2714'
            },
            paleteriaMichoacana = {
                latLong: {
                    latitude: 19.471168, 
                    longitude: -103.306566
                },
                name: "Paletería y Nevería La Michoacana",
                address: 'Calle Miguel Hidalgo 11, Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 9:00 – 21:00',
                phone: '01 371 418 0166'
            }
        ],//Food
        medicServices: [
            centroSalud = {
                latLong: {
                    latitude: 19.477998, 
                    longitude: -103.303197
                },
                name: "Centro de Salud",
                address: 'Calle Cristóbal Colón, Ejidal, 49902 Tecalitlán, Jal.',
            },
            seguroSocial = {
                latLong: {
                    latitude: 19.475517, 
                    longitude: -103.303211
                },
                name: "Instituto Mexicano del Seguro Social",
                address: 'Benito Juárez, Sta Cruz, 49870 Tecalitlán, Jal.',
            },
            unidadRegionalRehabilitacion = {
                latLong: {
                    latitude: 19.471131, 
                    longitude: -103.308654
                },
                name: "Unidad Regional de Rehabilitación",
                address: 'Niños Heroes 5, Tecalitlán, 49900 Tecalitlán, Jal.',
                schedule: 'Abierto de 8:00 – 15:00',
            },
        ], //Hospitals
        pharmacys: [
            farmaciasSimilares = {
                latLong: {
                    latitude: 19.470757, 
                    longitude: -103.306196
                },
                name: "Farmacia de Similares",
                address: 'Miguel Hidalgo 20, Tecatitlan Centro, Tecalitlán, 49900 Tecalitlán, Jal.',
                phone: '01 371 418 2889',
            },
        ], //Pharmacys
        hotels: [
            hotelColonial = {
                latLong: {
                    latitude: 19.470443, 
                    longitude: -103.308291
                },
                name: "Hotel El Colonial",
                address: 'Tecalitlán, 49900 Tecalitlán, Jal.',
                phone: '01 371 418 0280',
            },
            hotelPlazaVictoria = {
                latLong: {
                    latitude: 19.470624, 
                    longitude: -103.307186
                },
                name: "Hotel Plaza Victoria",
                address: 'Portal Victoria 18, Tecalitlán, 49900 Tecalitlán, Jal.',
                phone: '044 341 437 3430',
            },
            hotelSanFrancisco = {
                latLong: {
                    latitude: 19.471176, 
                    longitude: -103.307612
                },
                name: "Hotel San Francisco",
                address: 'Portal Guerrero, Tecalitlán, 49900 Tecalitlán, Jal.',
                phone: '01 371 418 2467',
            },
        ], //hotels
	};

	//Style of drawer navigation
	static navigationOptions = {
		drawerIcon: ({ tintColor }) => (
			<Image 
				source={require('../../assets/images/Drawer/maps.png')}
				style={styles.drawerIcon}
				resizeMode='contain' />
		)
	};
	async componentDidMount() {
		//BackHandler
        BackHandler.addEventListener('hardwareBackPress', this.goBackHandler);
	}
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.goBackHandler);
	};
	// Enable native button
	goBackHandler = () => {
		console.log('this.props: ', this.props);
		const { closeDrawer } = this.props.navigation;
		closeDrawer();
		return true;
    };

    componentWillUpdate() {
        this.getPlaces();
    };

	render() {
        const initialRegion = {
            latitude: 19.471510,
            longitude: -103.307060,
            latitudeDelta: 0.0122,
            longitudeDelta: width / height * 0.0122
        };

        const map = (
            <MapView 
                style={styles.map} initialRegion={initialRegion}>
                    {/* Food */}
                    {this.state.food.map((rst, index) => (
                        <Marker
                            key={index + rst.latLong}
                            coordinate={rst.latLong}
                            title={rst.name}>
                            <View style={{ flex: 1 }}>
                                <Image style={styles.marker} source={require('../../assets/images/Drawer/maps.png')} />
                            </View>
                            <Callout>
                                <View style={{ flex: 1, width: 250 }}>
                                    {rst.name && <Text>{rst.name}</Text>}
                                    {rst.address && <Text>{rst.address}</Text>}
                                    {rst.schedule && <Text>{rst.schedule}</Text>}
                                    {rst.phone && <Text>Telefono: {rst.phone}</Text>}
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                    {/* Medic Services */}
                    {this.state.medicServices.map((rst, index) => (
                        <Marker
                            key={index + rst.latLong}
                            coordinate={rst.latLong}
                            title={rst.name}>
                            <View style={{ flex: 1 }}>
                                <Image style={styles.marker} source={require('../../assets/images/Map/hospital.png')} />
                            </View>
                            <Callout>
                                <View style={{ flex: 1, width: 250 }}>
                                    {rst.name && <Text>{rst.name}</Text>}
                                    {rst.address && <Text>{rst.address}</Text>}
                                    {rst.schedule && <Text>{rst.schedule}</Text>}
                                    {rst.phone && <Text>Telefono: {rst.phone}</Text>}
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                    {/* Pharmacys */}
                    {this.state.pharmacys.map((rst, index) => (
                        <Marker
                            key={index + rst.latLong}
                            coordinate={rst.latLong}
                            title={rst.name}>
                            <View style={{ flex: 1 }}>
                                <Image style={styles.marker} source={require('../../assets/images/Map/pharmacy.png')} />
                            </View>
                            <Callout>
                                <View style={{ flex: 1, width: 250 }}>
                                    {rst.name && <Text>{rst.name}</Text>}
                                    {rst.address && <Text>{rst.address}</Text>}
                                    {rst.schedule && <Text>{rst.schedule}</Text>}
                                    {rst.phone && <Text>Telefono: {rst.phone}</Text>}
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                    {/* hotels */}
                    {this.state.hotels.map((rst, index) => (
                        <Marker
                            key={index + rst.latLong}
                            coordinate={rst.latLong}
                            title={rst.name}>
                            <View style={{ flex: 1 }}>
                                <Image style={styles.marker} source={require('../../assets/images/Map/hotels.png')} />
                            </View>
                            <Callout>
                                <View style={{ flex: 1, width: 250 }}>
                                    {rst.name && <Text>{rst.name}</Text>}
                                    {rst.address && <Text>{rst.address}</Text>}
                                    {rst.schedule && <Text>{rst.schedule}</Text>}
                                    {rst.phone && <Text>Telefono: {rst.phone}</Text>}
                                </View>
                            </Callout>
                        </Marker>
                    ))}
            </MapView>
        );

		return (
			<SafeAreaView style={styles.container}>
					<View>
						<HeaderToolbar open={this.props} title="Mapa" color="#e2487d" />
					</View>
					<StatusBar color="#c7175b" />
					<View style={styles.mapContainer}>{map}</View>
			</SafeAreaView>
		);
	}
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
	map: {
		width: '100%',
		height: height * .88,
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
    },
    drawerIcon: {
		height: width * .07,
		width: width * .07,
    },
    container: {
        flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'column',
		overflow: 'scroll'
    },
    marker: {
		height: width * .08,
		width: width * .08,
    },
});
