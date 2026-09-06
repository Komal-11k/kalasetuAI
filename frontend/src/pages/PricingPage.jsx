import { useState } from 'react'
import apiClient from '../api/apiClient'

function PricingPage() {
  const [form, setForm] = useState({
    material_cost: '',
    labor_hours: '',
    hourly_rate: '',
    packaging_cost: '',
    transport_cost: '',
    desired_margin_percent: '',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
      )
      const res = await apiClient.post('/api/pricing/calculate', payload)
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'material_cost', label: 'Material Cost (₹)' },
    { name: 'labor_hours', label: 'Labor Hours' },
    { name: 'hourly_rate', label: 'Hourly Rate (₹)' },
    { name: 'packaging_cost', label: 'Packaging Cost (₹)' },
    { name: 'transport_cost', label: 'Transport Cost (₹)' },
    { name: 'desired_margin_percent', label: 'Desired Margin (%)' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Fair Pricing Engine</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-xl">
        {fields.map((f) => (
          <div key={f.name} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{f.label}</label>
            <input
              type="number"
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate Fair Price'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded p-4 max-w-xl">
          <h2 className="font-semibold text-lg mb-2">Recommended Pricing</h2>
          <p>Cost Floor: <strong>₹{result.cost_floor}</strong></p>
          <p>Retail Range: <strong>₹{result.recommended_min} – ₹{result.recommended_max}</strong></p>
          <p>Bulk Range: <strong>₹{result.bulk_min} – ₹{result.bulk_max}</strong></p>
        </div>
      )}
    </div>
  )
}

export default PricingPage