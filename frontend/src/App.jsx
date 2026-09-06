import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import CatalogingPage from './pages/CatalogingPage'
import PricingPage from './pages/PricingPage'
import SchemePage from './pages/SchemePage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<CatalogingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/schemes" element={<SchemePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App