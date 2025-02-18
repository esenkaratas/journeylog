import React, { useState, useEffect } from "react";
import {
  getPopularPlaces,
  getCityCoordinates,
  getCityImage,
} from "../api/travelAPI";
import DestinationCard from "../components/DestinationCard";
import "../styles/Destinations.css";

const Destinations = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityImage, setCityImage] = useState(null);

  const fetchPlaces = async (latitude, longitude) => {
    try {
      const data = await getPopularPlaces(latitude, longitude, 5000, city);

      const uniquePlaces = Array.from(
        new Map(data.map((place) => [place.xid, place])).values()
      );

      // Fetch images for each place
      const placesWithImages = await Promise.all(
        uniquePlaces.map(async (place) => {
          const image = await getCityImage(place.name);
          return { ...place, image };
        })
      );

      setPlaces(placesWithImages);
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
        const image = await getCityImage(city);
        setCityImage(image);
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
      <header className="destinations-header">
        <h1>Discover Destinations</h1>
        <p>Explore the best places in your favorite cities.</p>
      </header>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityImage && (
        <div className="city-image-wrapper">
          <img src={cityImage} alt={city} className="city-image" />
        </div>
      )}
      <div className="destination-list">
        {places.map((place) => (
          <div key={place.xid}>
            <DestinationCard place={place} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
