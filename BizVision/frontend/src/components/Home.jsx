import React from "react";
import Typewriter from "typewriter-effect";

function Home() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full h-[100vh] relative mb-40">
      <img
        src="/abstract-astronomy-dark-924824.jpg"
        alt="background"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-8xl font-bold mb-4 drop-shadow-lg animate-fade-in">
          BizVision
        </h1>
        <div className="text-2xl drop-shadow-md animate-fade-in mt-3">
          <Typewriter
            options={{
              strings: [
                "Empower Your Vision",
                "Bridging the Gap Between Vision and Reality",
                "Transform Blind Business Journeys",
                "Innovative Solutions for the Visually Impaired",
                "Revolutionize Business for the Blind",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </div>
        <button
          onClick={scrollToContent}
          className="mt-10 px-6 py-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition duration-300"
        >
          Enter
        </button>
      </div>
    </div>
  );
  //"Bridging the Gap Between Vision and Reality" "Elevating Lives Through Advanced Accessibility Tools"
}

export default Home;
