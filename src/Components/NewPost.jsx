import React, { useEffect, useRef, useState } from 'react'
import * as faceapi from "face-api.js" 

export const NewPost = ({ image, caption }) => {

    const { url, width, height } = image;

    const imgRef = useRef()
    const canvasRef = useRef()

    const [faces, setFaces] = useState([]);
    const [friends, setFriends] = useState([]);

    const handleImg = async () => {
        const detections = await faceapi
        .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        // .withFaceLandmarks()
        // .withFaceExpressions();

        console.log(detections);
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

        setFaces(detections.map(d => Object.values(d.box)))
        // setFaces(detections.map(d => Object.values(d.detection.box)))

    }

    // const enter = () => {
    //     const ctx = canvasRef.current.getContext("2d");
    //     ctx.linewidth = 10;
    //     faces.map((face) => ctx.strokeRect(...face))
    // }

    // console.log(faces)

    const tag = () => {
        const name = prompt("Tag your friend");
        if(name.length > 0){
            setFriends(prev => [...prev, name])
        }
    }

    const removeTag = (index) => {
        const updatedTags = friends.splice(index, 1);
        setFaces(prev => [...prev, updatedTags]);
    }

    // console.log(friends)

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
    <div className='row'>

        <div className="relative overflow-hidden col1">
            <img 
            src={url} 
            alt="post" 
            crossOrigin='anonymous'
            ref={imgRef}
            className={`w-[450px] h-[420px] rounded-md`}
            />
            <canvas 
            // onMouseEnter={enter} 
            onClick={tag}
            ref={canvasRef} 
            width={width} 
            height={height}
            ></canvas>
        </div>

        <div className='col2 py-3'>
            <div>
                <span className='text-xl font-bold'>Caption: </span>
                <span className='text-xl font-semibold'>" {caption} "</span>
            </div>

            {
            friends.length > 0 && (
            <div className='flex gap-2 flex-wrap items-center my-2'>
                
                <span>in this post: </span>
                {
                    friends?.map((friend, idx) => (
                        <span className='relative text-md px-6 py-1 rounded-md bg-[#ccc]' key={idx}>{friend}
                        <i className='fas fa-times cursor-pointer absolute top-1 right-1'
                        onClick={() => removeTag(idx)}
                        ></i>
                        </span>
                    ))
                }
            </div>
                )
            }

        </div>

    </div>
    </>
  )
}
