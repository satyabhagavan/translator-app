# **Indic Language Assist**

This project allows users to process audio files, extract the spoken text, and translate it into a target language. The app provides an intuitive interface to record audio, processes the audio using Sarvam AI APIs, and displays the translated results.

---

## **Features**

### **Frontend**

- **Record Audio**: Users can record audio directly in the browser.
- **Preview Audio**: Users can preview the recorded audio before submission.
- **Display Results**: The app shows:
  - The extracted English transcript from the audio.
  - The translated text in the selected target language.

### **Backend**

- **Speech-to-Text Translation**: Extracts English text from the audio using the Sarvam API.
- **Text Translation**: Translates the English text into the desired target language using the Sarvam API.

---

## **APIs Used**

### 1. **Speech-to-Text Translate API**

- **Endpoint**: `/speech-to-text-translate`
- **Purpose**: Converts audio into English text.
- **Request Data**:
  - `file`: Audio file (e.g., `.wav`, `.mp3`).
  - `model`: Speech-to-text translation model (`saaras:v1`).
- **Response**:
  - `transcript`: Extracted text in English.
  - `language_code`: Detected language code.

### 2. **Text Translation API**

- **Endpoint**: `/translate`
- **Purpose**: Translates English text to the desired target language.
- **Request Data**:
  - `input`: Text to be translated.
  - `source_language_code`: Source language (always `en-IN` for English).
  - `target_language_code`: Target language (e.g., `hi-IN` for Hindi).
  - `model`: Translation model (`mayura:v1`).
  - `mode`: Translation tone (`formal`).
- **Response**:
  - `translated_text`: Translated text in the target language.

---

## **Data Flow**

1. **Frontend**:

   - Sends the recorded audio file to the backend.
   - Sends the selected target language as a parameter.
   - Receives the English transcript and the translated text.

2. **Backend**:
   - **Step 1**: Sends the audio file to the Speech-to-Text Translate API to extract English text.
   - **Step 2**: Sends the English text and target language to the Text Translation API.
   - Returns both the English transcript and the translated text to the frontend.

---

## **How to Run the Project**

### **Backend**

1. Install dependencies:
   ```bash
   pip install flask flask-cors requests
   ```
2. Run the backend server:
   ```bash
   python app.py
   ```

### **Frontend**

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm start
   ```

---

## **Technologies Used**

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Backend**: Flask
- **APIs**: Sarvam AI Speech-to-Text Translate and Text Translation APIs

---
