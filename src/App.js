import React, { useState } from 'react';
import MapComponent from './MapComponent';
import StaticMap from './StaticMap';
import Switcher1 from './Switcher1';

function App() {
  const [showStreamlit, setShowStreamlit] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(true);

  const toggleStreamlit = () => setShowStreamlit(true);
  const toggleMap = () => setShowStreamlit(false);
  const toggleSideMenu = () => setSideMenuVisible((prev) => !prev);

  return (
    <div className="h-screen flex">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline mb-4">User Location on Map</h1>
        <Switcher1 />
        {showStreamlit ? (
          // Use StaticMap instead of iframe
          <StaticMap />
        ) : (
          <MapComponent />
        )}
      </div>

      {/* Side Menu */}
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

      {/* Toggle Button for Side Menu */}
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