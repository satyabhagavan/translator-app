import React from "react";

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
        value={sourceLang}
        onChange={(e) => setSourceLang(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      >
        <option value="telugu">Telugu</option>
        <option value="hindi">Hindi</option>
        <option value="tamil">Tamil</option>
        <option value="kannada">Kannada</option>
      </select>

      <label
        className="block text-gray-700 font-bold mb-2"
        htmlFor="target-language"
      >
        Target Language
      </label>
      <select
        id="target-language"
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
      >
        <option value="telugu">Telugu</option>
        <option value="hindi">Hindi</option>
        <option value="tamil">Tamil</option>
        <option value="kannada">Kannada</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
