import React, { useState, useEffect } from "react";
import {
  getPopularPlaces,
  getCityCoordinates,
  getPlaceImage,
} from "../api/travelAPI";
import DestinationCard from "../components/DestinationCard";

const Explore = () => {
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
    try {
      const randomCity = getRandomCity();
      setCity(randomCity);
      const coordinates = await getCityCoordinates(randomCity);

      if (coordinates) {
        const { lat: latitude, lon: longitude } = coordinates;
        const data = await getPopularPlaces(
          latitude,
          longitude,
          5000,
          randomCity
        );

        const placesWithImages = await Promise.all(
          data.map(async (place) => {
            const image = await getPlaceImage(place.name); // Add image
            return { ...place, image };
          })
        );

        // Filter places with images
        const filteredPlaces = placesWithImages.filter((place) => place.image);

        setPlaces(filteredPlaces);
      } else {
        setError("Failed to fetch city coordinates");
      }
    } catch (err) {
      setError("Failed to fetch places");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div>
      <h2>Explore Random Destinations</h2>
      <p>Currently showing places in {city}</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="destination-list">
        {places.map((place) => (
          <div key={place.xid}>
            <DestinationCard place={place} />
            <img src={place.image} alt={place.name} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
      <button onClick={fetchPlaces}>Get Random Places</button>
    </div>
  );
};

export default Explore;
