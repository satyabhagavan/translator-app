import React, { useState } from "react";

function AudioRecorder({ onAudioSubmit }) {
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = new Blob([event.data], { type: "audio/webm" });
          setAudioBlob(blob);
          setAudioURL(URL.createObjectURL(blob));
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Could not access your microphone. Please allow microphone permissions."
      );
    }
  };

  // Stop recording audio
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Handle submission of the recorded or uploaded audio
  const handleSubmit = () => {
    if (audioBlob) {
      onAudioSubmit(audioBlob);
    } else if (audioFile) {
      onAudioSubmit(audioFile);
    } else {
      alert("Please upload or record an audio file.");
    }
  };

  const handleFileUpload = (event) => {
    setAudioFile(event.target.files[0]);
    setAudioBlob(null); // Reset recorded audio if a file is uploaded
    setAudioURL("");
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4">
        Upload or Record Audio
      </h3>

      {/* File Upload Option */}
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="file-upload"
      >
        Upload Audio File
      </label>
      <input
        id="file-upload"
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      />
      {audioFile && (
        <p className="text-gray-500">
          Selected File: <span className="font-semibold">{audioFile.name}</span>
        </p>
      )}

      {/* Recording Controls */}
      <div className="mt-6">
        <p className="text-gray-700 font-bold mb-2">Or Record Audio:</p>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`py-2 px-4 rounded-lg shadow ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {audioURL && (
          <div className="mt-4">
            <audio controls src={audioURL} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 mt-6 rounded-lg shadow hover:bg-green-600"
      >
        Submit Audio
      </button>
    </div>
  );
}

export default AudioRecorder;
