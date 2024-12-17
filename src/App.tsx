import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Vision from "./pages/Vision";
import About from "./pages/About";
import Community from "./pages/Community";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;