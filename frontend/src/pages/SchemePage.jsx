import { useState } from 'react'
import apiClient from '../api/apiClient'

function SchemePage() {
  const [form, setForm] = useState({
    state: '',
    craft_type: '',
    business_stage: 'new',
    gender: '',
  })
  const [schemes, setSchemes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSchemes(null)
    try {
      const res = await apiClient.post('/api/schemes/match', form)
      setSchemes(res.data.matched_schemes)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Government Scheme Recommendation</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Craft Type</label>
          <input
            type="text"
            name="craft_type"
            value={form.craft_type}
            onChange={handleChange}
            required
            placeholder="e.g. woodwork, pottery"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Business Stage</label>
          <select
            name="business_stage"
            value={form.business_stage}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="new">New</option>
            <option value="established">Established</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Gender (optional)</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Finding Schemes...' : 'Find Matching Schemes'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {schemes && (
        <div className="mt-6 max-w-2xl space-y-4">
          <h2 className="font-semibold text-lg">
            {schemes.length} Matching Scheme{schemes.length !== 1 ? 's' : ''} Found
          </h2>
          {schemes.map((scheme, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded p-4">
              <h3 className="font-bold text-blue-700">{scheme.name}</h3>
              <p className="text-gray-700 mt-1">{scheme.description}</p>
              <p className="mt-2"><strong>Benefits:</strong> {scheme.benefits}</p>
              <p className="mt-1"><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p className="mt-1"><strong>Documents:</strong> {scheme.documents_required.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SchemePage