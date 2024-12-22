import React, { useState } from "react";

const Switcher1 = () => {
  const [isSafeMode, setIsSafeMode] = useState(true);

  const toggleMode = () => {
    setIsSafeMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex items-center gap-4">
      <span
        className={`text-lg font-bold ${
          isSafeMode ? "text-green-500" : "text-red-500"
        }`}
      >
        {isSafeMode ? "Mode securisé" : "Alert Mode"}
      </span>
      <button
        onClick={toggleMode}
        className={`w-12 h-6 rounded-full flex items-center ${
          isSafeMode ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
            isSafeMode ? "translate-x-0" : "translate-x-6"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Switcher1;
