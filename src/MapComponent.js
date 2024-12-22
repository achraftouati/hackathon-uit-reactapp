import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Papa from 'papaparse';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Sample CSV data as a string (you can replace this with a fetch call to load from a file)
const csvData = `
District,Governorate,Latitude,Longitude,Population,PovertyRate,UnemploymentRate,AvgMonthlyIncome,PoliceStations,PublicSchools,PrivateSchools,Hospitals,UrbanDensity,CrimeIncidents
Bab El Bhar,Tunis,36.8000,10.1800,75000,0.10,0.12,800,4,12,4,2,5200,43
Le Bardo,Tunis,36.8090,10.1340,65000,0.07,0.11,900,3,10,3,1,4800,37
La Marsa,Tunis,36.8781,10.3245,92000,0.05,0.09,1200,2,15,5,2,6000,29
Carthage,Tunis,36.8528,10.3233,45000,0.04,0.08,1300,1,5,5,1,3100,20
El Menzah,Tunis,36.8290,10.1500,80000,0.06,0.10,1100,2,9,4,1,5500,35
`;

const MapComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    // Parse CSV data
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        setAreas(results.data);
      },
    });

    // Check if Geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to find the nearest area
  const findNearestArea = () => {
    if (!location.latitude || !location.longitude) return null;

    let nearestArea = null;
    let minDistance = Infinity;

    areas.forEach((area) => {
      const areaLat = parseFloat(area.Latitude);
      const areaLng = parseFloat(area.Longitude);
      const distance = Math.sqrt(
        Math.pow(areaLat - location.latitude, 2) + Math.pow(areaLng - location.longitude, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearestArea = area;
      }
    });

    return nearestArea;
  };

  const nearestArea = findNearestArea();

  return (
    <div className="w-full h-3/4">
      {error && <p className="text-red-500">{error}</p>}
      {location.latitude && location.longitude ? (
        <MapContainer center={[location.latitude, location.longitude]} zoom={13} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
          {nearestArea && (
            <Circle
              center={[parseFloat(nearestArea.Latitude), parseFloat(nearestArea.Longitude)]}
              radius={5000} // Set a large radius (e.g., 5000 meters)
              color="blue"
              fillColor="blue"
              fillOpacity={0.2}
            >
              <Popup>
                {nearestArea.District}, {nearestArea.Governorate}
              </Popup>
            </Circle>
          )}
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default MapComponent;