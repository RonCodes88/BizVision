import { useEffect, useRef } from "react";
import "./index.css";
import CustomWebcam from "./components/CustomWebcam";
import Inventory from "./components/Inventory";
import Home from "./components/Home";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    
  },
});

function App() {
  const lastReadText = useRef("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    function handleMouseMove(event) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        const range = document.caretRangeFromPoint(
          event.clientX,
          event.clientY
        );
        if (range) {
          const node = range.startContainer;
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent.trim();
            if (text && text !== lastReadText.current) {
              lastReadText.current = text;
              const utterance = new SpeechSynthesisUtterance(text);
              window.speechSynthesis.speak(utterance);
            }
          }
        }
      }, 300);
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex justify-center items-center">
            <Home />
          </div>
          <CustomWebcam />
          <div className="mt-56">
            <Inventory />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
