import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6">
      <span className="font-bold text-lg">KalaSetu AI</span>
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/catalog" className="hover:underline">Cataloging</Link>
      <Link to="/pricing" className="hover:underline">Pricing</Link>
      <Link to="/schemes" className="hover:underline">Schemes</Link>
    </nav>
  )
}

export default Navbar