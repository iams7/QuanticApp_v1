import React, { useState, useEffect, useRef } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import * as facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";

const webcamStyle = {
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  textAlign: "center",
  zIndex: 9,
  width: 640,
  height: 480,
};

function FacemeshLandmarks(props) {
  // Access all the properties from parent (App) component.
  const { load, showFaceMesh, selfieMode, eyeColorSwap } = props;

  // Set reference variables
  // It's similar to document.getElementById() method used in Vanilla JS)
  const loadingRef = useRef(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Set states of the components (states are similar to variables)
  const [leftEyeColor, setLeftEyeColor] = useState("#30FF30");
  const [rightEyeColor, setRightEyeColor] = useState("#FF3030");

  // Local variables
  let camera = null;
  const connect = window.drawConnectors;
  const utils = window.drawingUtils;

  // Load facemesh at the first instance
  // This useEffect loads the loadFaceMeshLandmarks() only at the first instance when this component gets called from parent since there's no dependencies are set.
  useEffect(() => {
    loadFaceMeshLandmarks();
  }, []);

  // Trigger load property (obtained from parent (App)) when loadingRef object
  useEffect(() => {
    load(loadingRef.current);
  }, [loadingRef.current]);

  // Test useEffects (please ignore)
  // useEffect(() => {
  //   // loadFaceMeshLandmarks();
  // }, [selfieMode]);

  // useEffect(() => {
  //   setLeftEyeColor(rightEyeColor);
  //   setRightEyeColor(leftEyeColor);
  // }, [eyeColorSwap]);

  // Main function
  const loadFaceMeshLandmarks = () => {
    // Initialise faceMesh class with an object and load the input bytes read from camera as file
    const faceMeshObject = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    // Set facemesh options
    faceMeshObject.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: selfieMode,
    });

    // show stuff on the face when gets result
    faceMeshObject.onResults(onResults);

    try {
      if (
        typeof webcamRef.current !== undefined &&
        webcamRef.current !== null
      ) {
        camera = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            await faceMeshObject.send({ image: webcamRef.current.video });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    } catch (error) {
      console.error("ERROR: WebCam reference has no object to fetch", error);
    }
    loadingRef.current = false;
  };

  const onResults = (results) => {
    // set camera picture ratio
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    // Init canvas
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    // Set canvas
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    // log results on browser console to verify the results
    console.log(results);

    // Obtain the landmarks from the result's multiFaceLandmarks property and pass it to the backend function
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        // get read landmarks and pass to the backend function
        bacKEndCall(landmarks);

        // Draw rectangle on face
        // utils.drawRectangle(canvasCtx, landmarks.boundingBox, {
        //   color: "blue",
        //   lineWidth: 4,
        //   fillColor: "#00000000",
        // });
        // utils.drawLandmarks(canvasCtx, landmarks.landmarks, {
        //   color: "red",
        //   radius: 5,
        // });

        // plot landmark dlibs on face
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_TESSELATION, {
        //   color: "#C0C0C070",
        //   lineWidth: 1,
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_RIGHT_EYE, {
        //   color: rightEyeColor,
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_RIGHT_EYEBROW, {
        //   color: rightEyeColor,
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_RIGHT_IRIS, {
        //   color: "#F8FC03",
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_LEFT_EYE, {
        //   color: leftEyeColor,
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_LEFT_EYEBROW, {
        //   color: leftEyeColor,
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_LEFT_IRIS, {
        //   color: "#f8fc03",
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_FACE_OVAL, {
        //   color: "#EBFA98", // #E0E0E0
        // });
        // connect(canvasCtx, landmarks, facemesh.FACEMESH_LIPS, {
        //   color: "#FC03E7",
        // });
      }
    }
    // canvasCtx.restore();
  };

  // This is the temp back end function to verify the required parameters are received
  const bacKEndCall = (landmarks) => {
    // log the landmark (array) on browser console.
    console.log(landmarks);
  };

  // Render the vision camera on the browser window
  return (
    <div className="App">
      <Webcam ref={webcamRef} style={{ webcamStyle }} hidden />
      <canvas
        ref={canvasRef}
        style={{ webcamStyle }}
        hidden={showFaceMesh}
      ></canvas>
    </div>
  );
}

export default FacemeshLandmarks;
