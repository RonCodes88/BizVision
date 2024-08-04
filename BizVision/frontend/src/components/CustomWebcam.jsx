import Webcam from "react-webcam";
import React, { useRef, useState } from "react"; // import useRef

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const fileInputRef = React.useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    sendToBackend(imageSrc);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const chooseImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
        sendToBackend(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const sendToBackend = async (imageData) => {
    try {
      const response = await fetch("http://localhost:5000/upload-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        console.error("Failed to upload image");
        const errorText = await response.text();
        console.error("Server response:", errorText);
        return;
      }

      const result = await response.json();
      console.log("Image uploaded successfully");

      // Use the Web Speech API to read out the text
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(result.result);
      synth.speak(utterance);
      console.log(result.result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ml-10 mt-10">
      <h1 className="text-8xl font-bold mb-10 mt-24">AuraLens</h1>
      <div className="flex">
      <Webcam
        className="mb-10"
        height={8000}
        width={800}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {imgSrc && (
        <img
          className="ml-10"
          src={imgSrc}
          alt="User"
          style={{ width: "500px", height: "500px" }}
        />
      )}
      </div>
      <button
        className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        onClick={capture}
      >
        Take Photo
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={chooseImage}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full text-2xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-4">
        Choose Image
      </button>
      
    </div>
  );
};

export default CustomWebcam;
