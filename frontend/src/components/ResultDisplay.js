import React from "react";

function ResultDisplay({ originalText, translatedText, translatedAudio }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-gray-700">Translation Results</h2>

      <div className="mt-4">
        <p className="font-bold text-gray-600">Original Text:</p>
        <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
          {originalText || "Processing..."}
        </p>
      </div>

      <div className="mt-4">
        <p className="font-bold text-gray-600">Translated Text:</p>
        <p className="bg-gray-100 p-4 rounded-lg text-gray-700">
          {translatedText || "Processing..."}
        </p>
      </div>

      {translatedAudio && (
        <div className="mt-4">
          <p className="font-bold text-gray-600">Translated Audio:</p>
          <audio controls className="w-full">
            <source src={translatedAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;
