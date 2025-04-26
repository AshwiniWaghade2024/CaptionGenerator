import React, { useState } from "react";
import { generateCaptionWithGemini } from "../utils/gemini";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const platforms = ["Instagram", "Twitter", "LinkedIn", "Facebook", "YouTube"];

export default function CaptionGenerator() {
  const [platform, setPlatform] = useState("");
  const [context, setContext] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!platform) {
      setError(" Please select a platform first!");
      return;
    }

    setLoading(true);
    setError("");
    setCaption("");

    try {
      const generatedCaption = await generateCaptionWithGemini(platform, context);
      setCaption(generatedCaption);
    } catch (err) {
      setError("❌ Failed to generate caption. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    alert(" Caption copied to clipboard!");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-purple-80 to-pink-100 p-8 rounded-3xl shadow-2xl max-w-xl w-full text-center transition-all">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
          Creative Caption Generator
      </h1>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full p-3 mb-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
        <option value="">Select Platform</option>
        {platforms.map((plat) => (
          <option key={plat} value={plat}>
            {plat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Add context (optional)"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        className="w-full p-3 mb-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        onClick={handleGenerate}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold w-full py-3 rounded-xl hover:scale-105 transition-transform duration-300"
        disabled={loading}
      >
        {loading ? "✨ Generating..." : "Generate Caption"}
      </button>

      {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}

      {caption && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-inner">
          <p className="text-lg text-gray-800 whitespace-pre-line mb-4"><ReactMarkdown remarkPlugins={[remarkGfm]}>{caption}</ReactMarkdown></p>
          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300"
          >
             Copy Caption
          </button>
        </div>
      )}
    </div>
  );
}
