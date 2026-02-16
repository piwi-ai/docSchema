import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebMCP from './components/WebMCP';
import Landing from './pages/Landing';
import Documents from './pages/Documents';
import Verticals from './pages/Verticals';

export default function App() {
    return (
        <>
            <WebMCP />
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/verticals" element={<Verticals />} />
            </Routes>
            <Footer />
        </>
    );
}
