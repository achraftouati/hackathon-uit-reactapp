import React, { useEffect, useState } from 'react';
import screenshot from './assets/images/screenshot.png'; 

const StaticMap = () => {
  return (
    <div>
      <img
                src={screenshot}
                alt="Streamlit App"
                className="cursor-pointer"
                style={{ width: '100%', borderRadius: '8px' }}
                onClick={() => window.open('https://gdp-dashboard-m01lwv2d4cj.streamlit.app', '_blank')}
              />
    </div>
  );
};

export default StaticMap;
