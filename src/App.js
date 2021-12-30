import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ColorPicker from "./components/ColorPicker";
import FacemeshLandmarks from "./components/FacemeshLandmarks";

import "./App.css";

// Application initialization (a root function)
function App() {
  // useState Hooks to maintain the state of the current component

  const [showFaceMesh, setShowFaceMesh] = useState(false);
  const [selfieMode, setSelfieMode] = useState(false);
  const [eyeColorSwap, setEyeColorSwap] = useState(false);
  const [loading, setLoading] = useState(true);

  // set load trigger
  const checkFacemeshLoaded = (value) => {
    setLoading(value);
  };

  // Return the component as JSX to browser (babel will convert the JSX to JS on browser)
  return (
    <React.Fragment>
      <div className="App mt-4">
        <Button className="my-3" onClick={() => setShowFaceMesh(!showFaceMesh)}>
          {showFaceMesh ? "Open " : "Close "}Facemesh
        </Button>

        {/* Loading Facemesh Landmark component inside App with required properties. Here's where rhe camera screen appears on the browser window. */}
        <FacemeshLandmarks
          load={checkFacemeshLoaded}
          showFaceMesh={showFaceMesh}
          selfieMode={selfieMode}
          eyeColorSwap={eyeColorSwap}
        />

        {/* Ignore for now */}
        {/* {!loading ? (
          <div>
            <Button
              className="mx-1 my-3"
              onClick={() => setSelfieMode(!selfieMode)}
            >
              Turn {!selfieMode ? " on " : " off "} Selfie mode
            </Button>

            <Button
              className="mx-1 my-3"
              onClick={() => setEyeColorSwap(!eyeColorSwap)}
            >
              {!eyeColorSwap ? "Swap" : "Reset"}
            </Button>
          </div>
        ) : null} */}
      </div>
    </React.Fragment>
  );
}

export default App;
