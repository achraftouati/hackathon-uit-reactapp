// src/App.js
import React from 'react';
import MapComponent from './MapComponent';
import Switcher1 from './Switcher1';

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold underline mb-4">
        User Location on Map
      </h1>
      <Switcher1 />
      <MapComponent />
    </div>
  );
}

export default App;