import React, { useEffect, useRef } from 'react'
import * as faceapi from "face-api.js" 

export const NewPost = ({ image }) => {

    const { url, width, height } = image;

    const imgRef = useRef()
    const canvasRef = useRef()

    const handleImg = async () => {
        const detections = await faceapi
        .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

        // console.log(detections);
        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);

        faceapi.matchDimensions(canvasRef.current, {
            width,
            height
        })

        const resized = faceapi.resizeResults(detections, {
            width,
            height
        })

        faceapi.draw.drawDetections(canvasRef.current, resized)
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized)
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized)

    }

    useEffect(() => {
        const loadModel = () => {
            Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            ])
            .then(handleImg)
            .catch((e) => console.log(e));
        }

        imgRef.current && loadModel();

    }, [])

    
  return (
    <>
    <div className="relative overflow-hidden">
        <img 
        src={url} 
        alt="post" 
        crossOrigin='anonymous'
        ref={imgRef}
        className={`w-[450px] h-[420px]`}
        />
        <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
    </>
  )
}
