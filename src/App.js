import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import StaticMap from './StaticMap';
import Switcher1 from './Switcher1';

function App() {
  const [showStreamlit, setShowStreamlit] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(true);
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const safeZones = [
    { latitude: 36.8065, longitude: 10.1815 }, // Safe Zone 1
    { latitude: 36.8028, longitude: 10.1796 }, // Safe Zone 2
    { latitude: 36.8000, longitude: 10.1700 }, // Safe Zone 3
  ];

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };
  const isInSafeZone = () => {
    if (!userLocation) return false;
    return safeZones.some((zone) => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        zone.latitude,
        zone.longitude
      );
      return distance < 0.5; 
    });
  };

  const toggleAlertMode = () => {
    const newAlertMode = !isAlertMode;
    setIsAlertMode(newAlertMode);

    if (newAlertMode) {
      const message = isInSafeZone()
        ? 'You are in a safe zone.'
        : 'Warning: You are NOT in a safe zone!';
      alert(message);
    }
  };

  const toggleStreamlit = () => setShowStreamlit(true);
  const toggleMap = () => setShowStreamlit(false);
  const toggleSideMenu = () => setSideMenuVisible((prev) => !prev);

  return (
    <div className="h-screen flex">
      {}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline mb-4">User Location on Map</h1>
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`text-lg font-bold ${
              isAlertMode ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {isAlertMode ? 'Alert Mode' : 'Safe Mode'}
          </span>
          <button
            onClick={toggleAlertMode}
            className={`w-12 h-6 rounded-full flex items-center ${
              isAlertMode ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
                isAlertMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></div>
          </button>
        </div>
        {showStreamlit ? <StaticMap /> : <MapComponent />}
      </div>

      {}
      {sideMenuVisible && (
        <div className="side-menu w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <button
            onClick={toggleMap}
            className="block mb-2 p-2 w-full bg-blue-500 text-white rounded"
          >
            Show My Location
          </button>
          <button
            onClick={toggleStreamlit}
            className="block p-2 w-full bg-green-500 text-white rounded"
          >
            Show Streamlit App
          </button>
        </div>
      )}

      {}
      <button
        onClick={toggleSideMenu}
        className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded"
      >
        {sideMenuVisible ? 'Hide Menu' : 'Show Menu'}
      </button>
    </div>
  );
}

export default App;