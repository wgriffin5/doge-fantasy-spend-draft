import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Vision from "./pages/Vision";
import Community from "./pages/Community";
import HowToPlay from "./pages/HowToPlay";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/community" element={<Community />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
      </Routes>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
        closeButton
        theme="light"
        style={{ 
          background: 'transparent', 
          border: 'none',
          position: 'relative',
          zIndex: 50
        }}
        toastOptions={{
          style: {
            background: 'var(--background)',
            border: '1px solid var(--border)',
            position: 'relative',
            zIndex: 50
          }
        }}
      />
    </Router>
  );
}

export default App;