import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import FacemeshLandmarks from "./components/FacemeshLandmarks";
import injectScript from "./injector/injectScript";

import "./App.css";

// Application initialization (a root function)
function App() {
  // useState Hooks to maintain the state of the current component
  const [cvObject, setCvObject] = useState({});
  const [showFaceMesh, setShowFaceMesh] = useState(false);
  const [selfieMode, setSelfieMode] = useState(false);
  const [eyeColorSwap, setEyeColorSwap] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load openCV
  const OPENCV_URL = window.location.origin + "/assets/js/opencv.js";

  useEffect(() => {
    const promise = injectScript("opencv-injected-js", OPENCV_URL);
    // const cv = OPENCV_URL

    // console.log(cv);
    promise
      .then(() => {
        console.log(`success to load ${OPENCV_URL}`);

        // eslint-disable-next-line no-undef
        setCvObject(cv);
        // this.playerRef.trigger("opencvReady");
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(`Failed to load ${OPENCV_URL}`, e);
      });
  }, []);

  // set load trigger
  const checkFacemeshLoaded = (value) => {
    setLoading(value);
  };

  console.log(cvObject);
  useEffect(() => {
    console.log(cvObject);
    if (cvObject && Object.keys(cvObject)?.length > 0)
      console.log("imread() response", cvObject?.imread("img"));
  }, [cvObject]);

  // Return the component as JSX to browser (babel will convert the JSX to JS on browser)
  return (
    <React.Fragment>
      <div className="App mt-4">
        <Button className="my-3" onClick={() => setShowFaceMesh(!showFaceMesh)}>
          {showFaceMesh ? "Open " : "Close "}Facemesh
        </Button>

        <img
          id="img"
          src={window.location.origin + "/assets/images/testImage.jpg"}
          hidden
        />

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
