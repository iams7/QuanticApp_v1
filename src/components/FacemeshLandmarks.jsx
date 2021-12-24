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
  const { load, showFaceMesh, selfieMode, eyeColorSwap } = props;

  const loadingRef = useRef(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [leftEyeColor, setLeftEyeColor] = useState("#30FF30");
  const [rightEyeColor, setRightEyeColor] = useState("#FF3030");

  let camera = null;
  const connect = window.drawConnectors;
  const utils = window.drawingUtils;

  useEffect(() => {
    loadFaceMeshLandmarks();
  }, []);

  useEffect(() => {
    load(loadingRef.current);
  }, [loadingRef.current]);

  useEffect(() => {
    // loadFaceMeshLandmarks();
  }, [selfieMode]);

  useEffect(() => {
    setLeftEyeColor(rightEyeColor);
    setRightEyeColor(leftEyeColor);
  }, [eyeColorSwap]);

  const loadFaceMeshLandmarks = () => {
    const faceMeshObject = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });

    faceMeshObject.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: selfieMode,
    });

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
    // console.log(results);
    canvasRef.current.width = webcamRef.current.video.videoWidth;
    canvasRef.current.height = webcamRef.current.video.videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    console.log(results);
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        bacKEndCall(landmarks);

        // TODO: Draw rectangle on face
        // utils.drawRectangle(canvasCtx, landmarks.boundingBox, {
        //   color: "blue",
        //   lineWidth: 4,
        //   fillColor: "#00000000",
        // });
        // utils.drawLandmarks(canvasCtx, landmarks.landmarks, {
        //   color: "red",
        //   radius: 5,
        // });

        // TODO: plot landmark dlibs on face
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

  const bacKEndCall = (landmarks) => {
    console.log(landmarks);
  };

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
