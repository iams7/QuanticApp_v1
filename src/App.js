import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ColorPicker from "./components/ColorPicker";
import FacemeshLandmarks from "./components/FacemeshLandmarks";

import "./App.css";

function App() {
  const [showFaceMesh, setShowFaceMesh] = useState(false);
  const [selfieMode, setSelfieMode] = useState(false);
  const [eyeColorSwap, setEyeColorSwap] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkFacemeshLoaded = (value) => {
    setLoading(value);
  };

  return (
    <React.Fragment>
      <div className="App mt-4">
        <Button className="my-3" onClick={() => setShowFaceMesh(!showFaceMesh)}>
          {showFaceMesh ? "Open " : "Close "}Facemesh
        </Button>

        <FacemeshLandmarks
          load={checkFacemeshLoaded}
          showFaceMesh={showFaceMesh}
          selfieMode={selfieMode}
          eyeColorSwap={eyeColorSwap}
        />

        {!loading ? (
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
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default App;
