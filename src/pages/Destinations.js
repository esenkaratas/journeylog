import React, { useState, useEffect } from "react";
import { getPopularPlaces, getCityCoordinates } from "../api/travelAPI";

const Destinations = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = async (latitude, longitude) => {
    try {
      const data = await getPopularPlaces(latitude, longitude, 5000, city);
      setPlaces(data);
    } catch (err) {
      setError("Failed to fetch places");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const coordinates = await getCityCoordinates(city);
      if (coordinates) {
        const { lat: latitude, lon: longitude } = coordinates;
        fetchPlaces(latitude, longitude);
      } else {
        setError("Failed to fetch city coordinates");
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to fetch city coordinates");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Popular Destinations</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {places.map((place) => (
          <li key={place.xid}>{place.name || "Unnamed Place"}</li>
        ))}
      </ul>
    </div>
  );
};

export default Destinations;
