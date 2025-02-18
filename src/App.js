import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TravelTips from "./pages/TravelTips";
import Destinations from "./pages/Destinations";
import Navbar from "./components/Navbar";
import { TravelProvider } from "./context/TravelContext";

function App() {
  return (
    <TravelProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          <Route path="/destinations" element={<Destinations />} />
        </Routes>
      </Router>
    </TravelProvider>
  );
}

export default App;
