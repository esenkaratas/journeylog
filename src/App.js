import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Destinations from "./pages/Destinations";
import TravelTips from "./pages/TravelTips";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/travel-tips" element={<TravelTips />} />
      </Routes>
    </Router>
  );
}

export default App;
