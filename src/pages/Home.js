import React, { useState } from "react";
import {
  getPopularPlaces,
  getCityCoordinates,
  getPlaceImage,
} from "../api/travelAPI";
import DestinationCard from "../components/DestinationCard";
import "../styles/Home.css";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const cities = [
    "New York",
    "Tokyo",
    "London",
    "Paris",
    "Berlin",
    "Rome",
    "Sydney",
    "Amsterdam",
    "Barcelona",
    "Dubai",
    "Cape Town",
    "Toronto",
    "Los Angeles",
    "Rio de Janeiro",
    "Moscow",
    "Kyoto",
    "Madrid",
    "Istanbul",
    "Mumbai",
    "Bangkok",
    "Singapore",
    "Seoul",
    "Hong Kong",
    "Athens",
    "Cairo",
  ];

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  const fetchPlaces = async () => {
    setLoading(true);
    setError(null);
    const randomCity = getRandomCity();
    setCity(randomCity);
    try {
      const coordinates = await getCityCoordinates(randomCity);
      if (coordinates) {
        const { lat, lon } = coordinates;
        const data = await getPopularPlaces(lat, lon, 5000, randomCity);

        const placesWithImages = await Promise.all(
          data.map(async (place) => {
            const image = await getPlaceImage(place.name);
            return { ...place, image };
          })
        );

        setPlaces(placesWithImages);
      } else {
        setError("Failed to fetch city coordinates");
      }
    } catch (err) {
      setError("Failed to fetch places");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome to JourneyLog!</h1>

      <button onClick={fetchPlaces}>Get Random Places</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p>Currently showing places in {city}</p>
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

export default Home;
