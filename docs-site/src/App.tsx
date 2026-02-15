import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WebMCP from './components/WebMCP'
import Landing from './pages/Landing'
import Explorer from './pages/Explorer'
import Entities from './pages/Entities'
import JsonViewer from './pages/JsonViewer'

export default function App() {
  return (
    <>
      <WebMCP />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explorer />} />
        <Route path="/entities" element={<Entities />} />
        <Route path="/json" element={<JsonViewer />} />
      </Routes>
      <Footer />
    </>
  )
}
