import { useState } from 'react'
import apiClient from '../api/apiClient'

function CatalogingPage() {
  const [voiceText, setVoiceText] = useState('')
  const [language, setLanguage] = useState('en')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isRecording, setIsRecording] = useState(false)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setListing(null)
    try {
      const formData = new FormData()
      formData.append('voice_text', voiceText)
      formData.append('language', language)
      if (photo) formData.append('photo', photo)

      const res = await apiClient.post('/api/catalog/generate', formData)
      setListing(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Try Chrome.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsRecording(true)
    recognition.onend = () => setIsRecording(false)
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsRecording(false)
      if (event.error === 'not-allowed') {
        alert('Microphone access was blocked. Please allow it in your browser settings.')
      }
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setVoiceText((prev) => (prev ? prev + ' ' + transcript : transcript))
    }

    recognition.start()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Smart Cataloging</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        {/* Photo Upload */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Product Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="border border-gray-300 rounded px-3 py-2"
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Product preview"
              className="mt-3 w-48 h-48 object-cover rounded border border-gray-200"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Describe your product (type or use voice)
          </label>
          <textarea
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            rows={4}
            required
            placeholder="e.g. Yeh handmade bamboo lamp hai, isko banane mein 4 ghante lagte hain"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="button"
          onClick={handleVoiceInput}
          className={`px-4 py-2 rounded text-white ${
            isRecording ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {isRecording ? '🎙️ Listening...' : '🎤 Speak Instead'}
        </button>

        <button
          type="submit"
          disabled={loading}
          className="block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating Listing...' : 'Generate Product Listing'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {listing && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded p-4 max-w-xl">
          {photoPreview && (
            <img
              src={photoPreview}
              alt={listing.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
          )}
          <h2 className="font-bold text-xl text-blue-700">{listing.title}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {listing.category} • {listing.craft_type} • {listing.material}
          </p>
          <p className="mt-3">{listing.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogingPage