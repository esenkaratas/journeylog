import React, { useEffect } from "react";
import {
  getPopularPlaces,
  getCityCoordinates,
  getPlaceImage,
} from "../api/travelAPI";
import DestinationCard from "../components/DestinationCard";
import "../styles/Home.css";
import { useTravel } from "../context/TravelContext";

const Home = () => {
  const {
    city,
    setCity,
    places,
    setPlaces,
    loading,
    setLoading,
    error,
    setError,
  } = useTravel();

  const cities = [
    "Tokyo",
    "London",
    "Paris",
    "Berlin",
    "Rome",
    "Sydney",
    "Amsterdam",
    "Barcelona",
    "Cape Town",
    "Toronto",
    "Los Angeles",
    "Rio de Janeiro",
    "Moscow",
    "Tel Aviv",
    "Kyoto",
    "Madrid",
    "Istanbul",
    "Bangkok",
    "Singapore",
    "Seoul",
    "Hong Kong",
    "Athens",
    "Cairo",
  ];

  useEffect(() => {
    setCity("");
    setPlaces([]);
    setError(null);
  }, [setCity, setPlaces, setError]);

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
        setError(
          "We couldn't determine the city coordinates. Please try again."
        );
      }
    } catch (err) {
      setError(
        "There was a problem fetching the places. Please check your connection and try again."
      );
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

        <div className="home-page-images">
          <img
            src={require("../assets/home-page1.jpeg")}
            alt="Home Page 1"
            className="home-page-image"
          />
          <img
            src={require("../assets/home-page2.jpeg")}
            alt="Home Page 2"
            className="home-page-image"
          />
          <img
            src={require("../assets/home-page3.jpeg")}
            alt="Home Page 3"
            className="home-page-image"
          />
          <img
            src={require("../assets/home-page4.jpeg")}
            alt="Home Page 4"
            className="home-page-image"
          />
        </div>
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
