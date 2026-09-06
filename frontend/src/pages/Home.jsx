import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      title: 'AI Smart Cataloging',
      description:
        'Turn a simple product description into a professional, market-ready listing — powered by AI.',
      path: '/catalog',
      icon: '📸',
      cta: 'Try Cataloging',
    },
    {
      title: 'Fair Pricing Engine',
      description:
        'Get a transparent, explainable price range based on material, labor, and margin — no guesswork.',
      path: '/pricing',
      icon: '💰',
      cta: 'Calculate Pricing',
    },
    {
      title: 'Government Scheme Recommendation',
      description:
        'Discover relevant government schemes based on your craft, state, and business stage.',
      path: '/schemes',
      icon: '🏛️',
      cta: 'Find Schemes',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to KalaSetu AI</h1>
        <p className="text-gray-600 mt-3 text-lg">
          From Craft to Commerce — Your AI Business Saathi.
        </p>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          An AI-powered business enablement platform helping marginalized artisans catalog
          products, price them fairly, and discover government support — all in one place.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {features.map((feature) => (
          <div
            key={feature.path}
            className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            <p className="text-gray-600 flex-1">{feature.description}</p>
            <Link
              to={feature.path}
              className="mt-4 inline-block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
            >
              {feature.cta} →
            </Link>
          </div>
        ))}
      </div>

      {/* Vision Journey */}
      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">The KalaSetu Journey</h2>
        <div className="flex flex-wrap items-center gap-2 text-gray-700 text-sm">
          <span className="bg-white border border-gray-300 rounded-full px-4 py-2">
            Photo + Voice
          </span>
          <span>→</span>
          <span className="bg-white border border-gray-300 rounded-full px-4 py-2">
            AI Cataloging
          </span>
          <span>→</span>
          <span className="bg-white border border-gray-300 rounded-full px-4 py-2">
            Fair Pricing
          </span>
          <span>→</span>
          <span className="bg-white border border-gray-300 rounded-full px-4 py-2">
            Market Linkage
          </span>
          <span>→</span>
          <span className="bg-white border border-gray-300 rounded-full px-4 py-2">
            Govt. Scheme Support
          </span>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-gray-400 text-sm mt-10">
        Prototype built for Smart India Hackathon 2026 — Problem Statement 26090
      </p>
    </div>
  )
}

export default Home