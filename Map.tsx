import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region, Circle } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import * as Location from 'expo-location'; // Import Location module from Expo

const INITIAL_REGION = {
    latitude: 12.9336212655,
    longitude: 77.5340178639,
    latitudeDelta: 2,
    longitudeDelta: 2
};

export default function App() {
    const mapRef = useRef<MapView>(null);
    const navigation = useNavigation();
    const [userLocation, setUserLocation] = useState<any>(null); // State to hold user's location
    const [hospitals, setHospitals] = useState<any[]>([]); // State to hold nearby hospitals
    const [diseaseData, setDiseaseData] = useState<any[]>([]); // State to hold disease data
    const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]); // State to hold selected diseases
    const [top10Zones, setTop10Zones] = useState<any[]>([]);

    const selectDisease = (disease: string) => {
        if (selectedDiseases.includes(disease)) {
            setSelectedDiseases(selectedDiseases.filter(item => item !== disease));
        } else {
            setSelectedDiseases([...selectedDiseases, disease]);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.backButton}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={focusMap} style={styles.headerButton}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 16, color: 'blue' }}>Focus</Text>
                    </View>
                </TouchableOpacity>
            )
        });

        getUserLocation(); // Call function to get user's location when the component mounts
    }, []);

    useEffect(() => {
        // Simulated disease data
        const simulatedData = [
			{ "latitude": 12.9333166734, "longitude": 77.4546759345, "cases": 20 , "disease": "Dengue"},
			{ "latitude": 12.9842631865, "longitude": 77.5452170186, "cases": 50 , "disease": "Typhoid"},
			{ "latitude": 12.8433461101, "longitude": 77.6536548906, "cases": 80 , "disease": "Malaria"},
			{ "latitude": 12.7441428136, "longitude": 77.7534711479, "cases": 45 , "disease": "Chikungunya"},
			{ "latitude": 12.9243597218, "longitude": 77.4356894535, "cases": 30 , "disease": "Dengue"},
			{ "latitude": 12.9730338459, "longitude": 77.5534954084, "cases": 60 , "disease": "Typhoid"},
			{ "latitude": 12.8433930979, "longitude": 77.6435262225, "cases": 70 , "disease": "Malaria"},
			{ "latitude": 12.7531034877, "longitude": 77.7730830271, "cases": 55 , "disease": "Chikungunya"},
			{ "latitude": 12.9439398478, "longitude": 77.4744428677, "cases": 25 , "disease": "Dengue"},
			{ "latitude": 12.9927377411, "longitude": 77.5635361897, "cases": 40 , "disease": "Typhoid"},
			{ "latitude": 12.8641708295, "longitude": 77.6736189269, "cases": 85 , "disease": "Malaria"},
			{ "latitude": 12.7237122295, "longitude": 77.7934641191, "cases": 50 , "disease": "Chikungunya"},
			{ "latitude": 12.9533481282, "longitude": 77.4938451062, "cases": 15 , "disease": "Dengue"},
			{ "latitude": 12.9738280534, "longitude": 77.5736389121, "cases": 70 , "disease": "Typhoid"},
			{ "latitude": 12.8229464532, "longitude": 77.6557683417, "cases": 90 , "disease": "Malaria"},
			{ "latitude": 12.7641967791, "longitude": 77.7652622759, "cases": 60 , "disease": "Chikungunya"},
			{ "latitude": 12.9646088188, "longitude": 77.5150492346, "cases": 35 , "disease": "Dengue"},
			{ "latitude": 12.9528496827, "longitude": 77.5840405367, "cases": 80 , "disease": "Typhoid"},
			{ "latitude": 12.8023734593, "longitude": 77.6642107504, "cases": 75 , "disease": "Malaria"},
			{ "latitude": 12.7843517073, "longitude": 77.7848661871, "cases": 65 , "disease": "Chikungunya"},
			{ "latitude": 12.9737304754, "longitude": 77.5340224175, "cases": 45 , "disease": "Dengue"},
			{ "latitude": 12.9334241377, "longitude": 77.6041747157, "cases": 60 , "disease": "Typhoid"},
			{ "latitude": 12.7836107752, "longitude": 77.6839580415, "cases": 60 , "disease": "Malaria"},
			{ "latitude": 12.8032085002, "longitude": 77.8039910574, "cases": 70 , "disease": "Chikungunya"},
			{ "latitude": 12.9945474324, "longitude": 77.5538282952, "cases": 55 , "disease": "Dengue"},
			{ "latitude": 12.9045641293, "longitude": 77.6239892752, "cases": 70 , "disease": "Typhoid"},
			{ "latitude": 12.7642341262, "longitude": 77.7039525822, "cases": 80 , "disease": "Malaria"},
			{ "latitude": 12.8226708193, "longitude": 77.8245863689, "cases": 75 , "disease": "Chikungunya"},
			{ "latitude": 12.9641578422, "longitude": 77.5731905898, "cases": 65 , "disease": "Dengue"},
			{ "latitude": 12.8739841386, "longitude": 77.6436761446, "cases": 80 , "disease": "Typhoid"},
			{ "latitude": 12.7330053155, "longitude": 77.7239544314, "cases": 85 , "disease": "Malaria"},
			{ "latitude": 12.8440093336, "longitude": 77.8436461515, "cases": 80 , "disease": "Chikungunya"},
			{ "latitude": 12.9849193873, "longitude": 77.5936824235, "cases": 75 , "disease": "Dengue"},
			{ "latitude": 12.8930133132, "longitude": 77.6638087388, "cases": 90 , "disease": "Typhoid"},
			{ "latitude": 12.7543576509, "longitude": 77.7434229641, "cases": 95 , "disease": "Malaria"},
			{ "latitude": 12.8624267318, "longitude": 77.8636259069, "cases": 85 , "disease": "Chikungunya"},
			{ "latitude": 12.9247001158, "longitude": 77.6138284923, "cases": 85 , "disease": "Dengue"},
			{ "latitude": 12.8343002979, "longitude": 77.6844957984, "cases": 95 , "disease": "Typhoid"},
			{ "latitude": 12.6939179985, "longitude": 77.7638088626, "cases": 100 , "disease": "Malaria"},
			{ "latitude": 12.8827684232, "longitude": 77.8838241213, "cases": 90 , "disease": "Chikungunya"},
			{ "latitude": 12.9440951431, "longitude": 77.6340767323, "cases": 95 , "disease": "Dengue"},
			{ "latitude": 12.8540152482, "longitude": 77.7040420675, "cases": 100 , "disease": "Typhoid"},
			{ "latitude": 12.7136126448, "longitude": 77.7837116161, "cases": 105 , "disease": "Malaria"},
			{ "latitude": 12.9030734695, "longitude": 77.9038620015, "cases": 95 , "disease": "Chikungunya"},
			{ "latitude": 12.9632684371, "longitude": 77.6538173051, "cases": 105 , "disease": "Dengue"},
			{ "latitude": 12.8727264021, "longitude": 77.7239067613, "cases": 110 , "disease": "Typhoid"},
			{ "latitude": 12.7333695535, "longitude": 77.8034251946, "cases": 115 , "disease": "Malaria"},
			{ "latitude": 12.8230310387, "longitude": 77.9246342522, "cases": 105 , "disease": "Chikungunya"},
			{ "latitude": 12.9931746376, "longitude": 77.6741450678, "cases": 110 , "disease": "Dengue"},
			{ "latitude": 12.9026291381, "longitude": 77.7437792219, "cases": 120 , "disease": "Typhoid"},
			{ "latitude": 12.7646724051, "longitude": 77.8238517501, "cases": 125 , "disease": "Malaria"},
			{ "latitude": 12.8543970057, "longitude": 77.9439159241, "cases": 115 , "disease": "Chikungunya"},
			{ "latitude": 12.9235492641, "longitude": 77.7736091375, "cases": 125 , "disease": "Dengue"},
			{ "latitude": 12.8325144991, "longitude": 77.8439187028, "cases": 130 , "disease": "Typhoid"},
			{ "latitude": 12.6928760895, "longitude": 77.8233033897, "cases": 135 , "disease": "Malaria"},
			{ "latitude": 12.7832126568, "longitude": 77.9432352357, "cases": 125 , "disease": "Chikungunya"},
			{ "latitude": 12.9537220185, "longitude": 77.7936705841, "cases": 135 , "disease": "Dengue"},
			{ "latitude": 12.8637450948, "longitude": 77.8643329498, "cases": 140 , "disease": "Typhoid"},
			{ "latitude": 12.7244561422, "longitude": 77.9445001065, "cases": 145 , "disease": "Malaria"},
			{ "latitude": 12.8132042032, "longitude": 78.0640514286, "cases": 135 , "disease": "Chikungunya"},
			{ "latitude": 12.9832762865, "longitude": 77.8135660636, "cases": 145 , "disease": "Dengue"},
			{ "latitude": 12.8934903729, "longitude": 77.8840721519, "cases": 150 , "disease": "Typhoid"},
			{ "latitude": 12.7535361702, "longitude": 77.9639266403, "cases": 155 , "disease": "Malaria"},
			{ "latitude": 12.8440191949, "longitude": 78.0838740526, "cases": 145 , "disease": "Chikungunya"},
			{ "latitude": 12.9121992682, "longitude": 77.7136698699, "cases": 155 , "disease": "Dengue"},
			{ "latitude": 12.8237459079, "longitude": 77.8834181744, "cases": 160 , "disease": "Typhoid"},
			{ "latitude": 12.6832069726, "longitude": 77.9635930057, "cases": 165 , "disease": "Malaria"},
			{ "latitude": 12.7728093158, "longitude": 78.0846581521, "cases": 155 , "disease": "Chikungunya"},
			{ "latitude": 12.9426962043, "longitude": 77.8239249595, "cases": 165 , "disease": "Dengue"},
			{ "latitude": 12.8527482777, "longitude": 77.8940987036, "cases": 170 , "disease": "Typhoid"},
			{ "latitude": 12.7122165906, "longitude": 77.9737576128, "cases": 175 , "disease": "Malaria"},
			{ "latitude": 12.8026717304, "longitude": 78.0940281559, "cases": 165 , "disease": "Chikungunya"}
		];

        setDiseaseData(simulatedData);
        calculateTop10Zones();
    }, []);

    useEffect(() => {
        calculateTop10Zones();
    }, [diseaseData]);

    const calculateTop10Zones = () => {
        const sortedData = [...diseaseData].sort((a, b) => b.cases - a.cases);
        const top10 = sortedData.slice(0, 10);
        setTop10Zones(top10);
    };

    const diseases = ['Dengue', 'Typhoid', 'Malaria', 'Chikungunya', 'Top 10'];

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync(); // Request permission to access user's location

        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({}); // Get user's current location

        setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });

        getNearbyHospitals(location.coords.latitude, location.coords.longitude);
    };

    const getNearbyHospitals = async (latitude: number, longitude: number) => {
        // Use Google Places API or any other service to fetch nearby hospitals
        // Example using Google Places API (replace YOUR_xAPI_KEY with your actual API key)
        const apiKey = 'AIzaSyDDH4irAPMes4eRowUO7d3BGWdyTPrLtdg';
        const radius = 5000; // 5km radius
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${apiKey}&keyword=Multispecality`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results) {
                // Sort hospitals by rating
                data.results.sort((a: any, b: any) => b.rating - a.rating);

                // Limit to 10 best-rated hospitals
                const bestHospitals = data.results.slice(0, 10);
                setHospitals(bestHospitals);
            }
        } catch (error) {
            console.error('Error fetching nearby hospitals:', error);
        }
    };

    const focusMap = () => {
        if (userLocation) {
            mapRef.current?.animateToRegion(userLocation, 2000); // Animating to user's location with a duration of 2000ms
        }
    };

    const renderDiseaseCircles = () => {
        const filteredData = selectedDiseases.length > 0
            ? diseaseData.filter((area) => selectedDiseases.includes(area.disease))
            : diseaseData;

        let circlesToRender = filteredData.map((area, index) => (
            <Circle
                key={index}
                center={{ latitude: area.latitude, longitude: area.longitude }}
                radius={2000} // Adjust the radius based on your requirement
                strokeColor={getCircleColor(area.cases)}
                fillColor={getCircleColor(area.cases, true)}
            />
        ));

        // Check if "Top 10" button is selected, then render top 10 zones
        if (selectedDiseases.includes('Top 10')) {
            circlesToRender = top10Zones.map((area, index) => (
                <Circle
                    key={index}
                    center={{ latitude: area.latitude, longitude: area.longitude }}
                    radius={2000} // Adjust the radius based on your requirement
                    strokeColor={getCircleColor(area.cases)}
                    fillColor={getCircleColor(area.cases, true)}
                />
            ));
        }

        return circlesToRender;
    };

    const getCircleColor = (cases: number, fill: boolean = false) => {
        // Define thresholds for different colors
        const highThreshold = 100;
        const mediumThreshold = 50;

        if (cases >= highThreshold) {
            return fill ? 'rgba(255, 0, 0, 0.3)' : 'red';
        } else if (cases >= mediumThreshold) {
            return fill ? 'rgba(255, 255, 0, 0.3)' : 'yellow';
        } else {
            return fill ? 'rgba(0, 255, 0, 0.3)' : 'green';
        }
    };

    const onMarkerSelected = (marker: any) => {
        Alert.alert(marker.name);
    };

    const calloutPressed = async (hospital: any) => {
        try {
            // Fetch additional information about the selected hospital
            const apiKey = 'AIzaSyDDH4irAPMes4eRowUO7d3BGWdyTPrLtdg';
            const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${hospital.place_id}&fields=name,formatted_address,formatted_phone_number&key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();

            Alert.alert(
                data.result.name,
                `${data.result.formatted_address}\n${data.result.formatted_phone_number}`
            );
        } catch (error) {
            console.error('Error fetching hospital details:', error);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={INITIAL_REGION}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}
                        title="Your Location"
                        pinColor="blue"
                    />
                )}
                {hospitals.map((hospital, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: hospital.geometry.location.lat,
                            longitude: hospital.geometry.location.lng
                        }}
                        title={hospital.name}
                        onPress={() => onMarkerSelected(hospital)}
                    >
                        <Callout onPress={() => calloutPressed(hospital)}>
                            <Text>{hospital.name}</Text>
                        </Callout>
                    </Marker>
                ))}
                {renderDiseaseCircles()}
            </MapView>
            <View style={styles.buttonGroup}>
                {diseases.map((disease, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.button,
                            selectedDiseases.includes(disease) && styles.selectedButton
                        ]}
                        onPress={() => selectDisease(disease)}
                    >
                        <Text style={styles.buttonText}>{disease}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    buttonGroup: {
        flexDirection: 'row',
        position: 'absolute',
        top: 14,
        left: 3
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginHorizontal: 1
    },
    selectedButton: {
        backgroundColor: 'rgba(0, 0, 255, 0.7)'
    },
    buttonText: {
        fontSize: 11,
        color: 'black',
        textAlign: 'center'
    },
    backButton: {
        marginLeft: 2
    },
    backButtonText: {
        fontSize: 11,
        color: 'blue'
    },
    headerButton: {
        marginRight: 10
    }
});
