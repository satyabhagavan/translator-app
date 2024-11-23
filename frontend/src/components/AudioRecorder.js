import React, { useState } from "react";
import WavEncoder from "wav-encoder";

function AudioRecorder({ onAudioSubmit }) {
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  // Start recording audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = async (event) => {
        const recordedBlob = event.data;
        const wavBlob = await convertWebmToWav(recordedBlob); // Convert to WAV
        setAudioBlob(wavBlob);
        setAudioURL(URL.createObjectURL(wavBlob)); // Generate preview URL
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

  // Convert `audio/webm` Blob to `audio/wav` Blob
  const convertWebmToWav = async (webmBlob) => {
    setIsConverting(true);

    const audioContext = new AudioContext();
    const arrayBuffer = await webmBlob.arrayBuffer();

    // Decode the audio data from the webm blob
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Encode the audio buffer to WAV using wav-encoder
    const wavData = await WavEncoder.encode({
      sampleRate: audioBuffer.sampleRate,
      channelData: [audioBuffer.getChannelData(0)], // Mono audio
    });

    // Create a new Blob for the WAV file
    const wavBlob = new Blob([wavData], { type: "audio/wav" });

    setIsConverting(false);
    return wavBlob;
  };

  // Handle submission of the audio file (recorded or uploaded)
  const handleSubmit = () => {
    if (audioBlob) {
      onAudioSubmit(audioBlob);
    } else {
      alert("Please record or upload a valid .wav file.");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Record audio</h3>

      {/* Recording Controls */}
      <div>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`py-2 px-4 rounded-lg shadow ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={isConverting}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* Conversion Status */}
      {isConverting && (
        <p className="text-gray-500 mt-2">Converting to WAV...</p>
      )}

      {/* Audio Preview */}
      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

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
