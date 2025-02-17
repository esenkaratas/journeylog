import React, { useState } from "react";
import { getPopularPlaces, getCityCoordinates } from "../api/travelAPI";
import DestinationCard from "../components/DestinationCard";
import "../styles/Destinations.css";

const Destinations = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = async (latitude, longitude) => {
    try {
      const data = await getPopularPlaces(latitude, longitude, 5000, city);

      const uniquePlaces = Array.from(
        new Map(data.map((place) => [place.xid, place])).values()
      );

      setPlaces(uniquePlaces);
    } catch (err) {
      setError("Failed to fetch places");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const coordinates = await getCityCoordinates(city);
      if (coordinates) {
        const { lat, lon } = coordinates;
        fetchPlaces(lat, lon);
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
      <h2>Destinations</h2>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <p>Currently showing places in {city}</p>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="destination-list">
        {places.map((place) => (
          <div key={place.xid}>
            <DestinationCard place={place} />
            {place.image ? (
              <img
                src={place.image}
                alt={place.name}
                style={{ width: "100%" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
