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
    "Tel Aviv",
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
        const uniqueData = Array.from(
          new Map(data.map((place) => [place.xid, place])).values()
        );
        const placesWithImages = await Promise.all(
          uniqueData.map(async (place) => {
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
    <div className="home-container">
      <div className="intro">
        <div className="logo">
          <img
            src={require("../assets/travel.png")}
            alt="Travel"
            className="logo"
          />
        </div>
        <h1>Traveler</h1>
        <p className="intro-text">
          "Discover new destinations, explore amazing places, and plan your next
          adventure!"
        </p>
        <button className="primary" onClick={fetchPlaces}>
          Get Random Places
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h2 className="city-name">{city}</h2>

      <div className="destination-list">
        {places.map((place) => (
          <DestinationCard key={place.xid} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Home;
