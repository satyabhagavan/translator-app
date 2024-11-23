import React from "react";

// Map human-readable names to Sarvam API language codes
const LANGUAGE_MAP = {
  Telugu: "te-IN",
  Hindi: "hi-IN",
  Bengali: "bn-IN",
  Kannada: "kn-IN",
  Malayalam: "ml-IN",
  Marathi: "mr-IN",
  Odia: "od-IN",
  Punjabi: "pa-IN",
  Tamil: "ta-IN",
  Gujarati: "gu-IN",
};

function LanguageSelector({
  sourceLang,
  targetLang,
  setSourceLang,
  setTargetLang,
}) {
  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="source-language"
      >
        Source Language
      </label>
      <select
        id="source-language"
        value={
          Object.keys(LANGUAGE_MAP).find(
            (key) => LANGUAGE_MAP[key] === sourceLang
          ) || "Telugu"
        }
        onChange={(e) => setSourceLang(LANGUAGE_MAP[e.target.value])}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      >
        {Object.keys(LANGUAGE_MAP).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="target-language"
      >
        Target Language
      </label>
      <select
        id="target-language"
        value={
          Object.keys(LANGUAGE_MAP).find(
            (key) => LANGUAGE_MAP[key] === targetLang
          ) || "Hindi"
        }
        onChange={(e) => setTargetLang(LANGUAGE_MAP[e.target.value])}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        {Object.keys(LANGUAGE_MAP).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;
