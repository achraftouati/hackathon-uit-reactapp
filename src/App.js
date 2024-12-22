import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [incidentDescription, setIncidentDescription] = useState('');

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

  const reportIncident = async () => {
    if (!userLocation) {
      alert('Unable to fetch your location. Please try again.');
      return;
    }

    const incidentData = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      description: incidentDescription || 'No description provided',
    };

    try {
      const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData),
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Incident reported successfully!');
        setIncidentDescription('');
      } else {
        alert('Failed to report the incident. Please try again.');
      }
    } catch (error) {
      console.error('Error reporting incident:', error);
      alert('An error occurred while reporting the incident.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline mb-4">User Location on Map</h1>
      <MapComponent />

      {}
      <div className="mt-4 w-3/4">
        <textarea
          value={incidentDescription}
          onChange={(e) => setIncidentDescription(e.target.value)}
          placeholder="Describe the incident (optional)"
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={reportIncident}
          className="p-2 bg-red-500 text-white rounded w-full"
        >
          Report Incident
        </button>
      </div>
    </div>
  );
}

export default App;