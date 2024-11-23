import React, { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import LanguageSelector from "./components/LanguageSelector";
import ResultDisplay from "./components/ResultDisplay";
import axios from "axios";

function App() {
  // Use Sarvam API language codes for initial state
  const [sourceLang, setSourceLang] = useState("te-IN"); // Telugu
  const [targetLang, setTargetLang] = useState("hi-IN"); // Hindi
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [translatedAudio, setTranslatedAudio] = useState(null);

  const handleProcessAudio = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("sourceLang", sourceLang);
    formData.append("targetLang", targetLang);
    console.log("Source Language:", sourceLang);
    console.log("Target Language:", targetLang);

    try {
      const response = await axios.post(
        "http://localhost:5000/process-audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { originalText, translatedText, translatedAudioUrl } =
        response.data;
      setOriginalText(originalText);
      setTranslatedText(translatedText);
      setTranslatedAudio(translatedAudioUrl);
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">
          Indic Language Assist
        </h1>
        <p className="text-gray-600 mt-2">
          Translate and Generate Audio in Indic Languages
        </p>
      </header>
      <main className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <LanguageSelector
          sourceLang={sourceLang}
          targetLang={targetLang}
          setSourceLang={setSourceLang}
          setTargetLang={setTargetLang}
        />
        <AudioRecorder onAudioSubmit={handleProcessAudio} />
        <ResultDisplay
          originalText={originalText}
          translatedText={translatedText}
          translatedAudio={translatedAudio}
        />
      </main>
    </div>
  );
}

export default App;
