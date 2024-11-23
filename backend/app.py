import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

SARVAM_API_KEY = "c1efbb52-e991-4728-b61d-9482b231fc1a"
SARVAM_STT_URL = "https://api.sarvam.ai/speech-to-text"

@app.route("/")
def home():
    return {"message": "Flask backend is running!"}

@app.route('/process-audio', methods=['POST'])
def process_audio():
    # Extract the audio file and source language from the request
    audio_file = request.files.get('file')
    source_lang = request.form.get('sourceLang')  # Language of the audio (e.g., te-IN)
    print(source_lang)

    if audio_file:
        print(f"Uploaded File Name: {audio_file.filename}")
        print(f"Uploaded File MIME Type: {audio_file.mimetype}")  # MIME type of the file
        print(f"Uploaded File Content Type: {audio_file.content_type}")  # Same as mimetype
        
    if not audio_file or not source_lang:
        return jsonify({"error": "Audio file and sourceLang are required"}), 400

    try:
        # call for translation
        print("calling sarvam")
        stt_response = send_to_sarvam_stt(audio_file, source_lang)
        print("got response from sarvam")
        if "error" in stt_response:
            return jsonify({"error": "Speech-to-Text failed", "details": stt_response}), 500

        original_text = stt_response.get("transcript")

        # For now, return the transcribed text to the frontend
        return jsonify({
            "originalText": original_text,
            "translatedText": "Dummy translated text",
            "translatedAudioUrl": "https://example.com/dummy-audio.mp3"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to interact with Sarvam Speech-to-Text API
def send_to_sarvam_stt(audio_file, language_code):
    try:
        # Prepare the payload for Sarvam API
        files = {
            "file": (audio_file.filename, audio_file.stream, audio_file.content_type)
        }
        data = {
            "language_code": language_code,
            "model": "saarika:v1",  # Default model
            "with_timestamps": "false"  # Disable timestamps
        }
        headers = {
            "api-subscription-key": SARVAM_API_KEY
        }

        # Send the POST request to Sarvam's Speech-to-Text API
        response = requests.post(SARVAM_STT_URL, headers=headers, files=files, data=data)

        # Return the parsed JSON response
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": f"Sarvam API error: {response.status_code}", "details": response.text}
    except Exception as e:
        return {"error": str(e)}


@app.route("/translate", methods=["POST"])
def translate():
    return {"message": "Translate endpoint is working!"}

if __name__ == "__main__":
    app.run(debug=True)
