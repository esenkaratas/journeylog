import React, { useState, useEffect } from "react";
import { getCityImage } from "../api/travelAPI";
import "../styles/TravelTips.css";

const TravelTips = () => {
  const travelTips = {
    paris:
      "Visit the Eiffel Tower, explore the Louvre Museum, and don't miss trying French pastries like croissants.",
    "new york":
      "Explore Central Park, take a trip to Times Square, and visit the Statue of Liberty for an iconic New York experience.",
    amsterdam:
      "Take a canal cruise, visit the Anne Frank House, and explore the Van Gogh Museum for a cultural experience.",
    tokyo:
      "Check out the Shibuya Crossing, visit the Meiji Shrine, and indulge in delicious sushi and ramen.",
    london:
      "Tour the British Museum, see the Tower of London, and take a ride on the London Eye for amazing views of the city.",
    berlin:
      "Explore the Berlin Wall Memorial, visit Brandenburg Gate, and enjoy the vibrant art scene in East Berlin.",
    rome: "Visit the Colosseum, explore the Roman Forum, and don’t miss the Sistine Chapel in the Vatican City.",
    sydney:
      "Climb the Sydney Harbour Bridge, relax on Bondi Beach, and visit the famous Sydney Opera House.",

    barcelona:
      "Admire the works of Gaudí, like the Sagrada Familia and Park Güell, and enjoy tapas at local restaurants.",
    dubai:
      "Visit the Burj Khalifa, shop at the Dubai Mall, and enjoy the desert safari experience.",
    "cape town":
      "Climb Table Mountain for stunning views, visit Robben Island, and explore the vibrant V&A Waterfront.",
    toronto:
      "Explore the CN Tower, visit the Royal Ontario Museum, and check out the scenic High Park.",
    "los angeles":
      "Relax at Venice Beach, see the Hollywood Walk of Fame, and take a studio tour in Hollywood.",
    "rio de janeiro":
      "Visit the iconic Christ the Redeemer statue, relax on Copacabana Beach, and explore the beautiful Tijuca Forest.",
    moscow:
      "Visit the Red Square, explore the Kremlin, and admire the beautiful St. Basil’s Cathedral.",
    "tel aviv":
      "Relax on the beaches, explore the Carmel Market, and visit the ancient port city of Jaffa.",
    kyoto:
      "See the stunning Kinkaku-ji (Golden Pavilion), explore Arashiyama Bamboo Grove, and visit Fushimi Inari Shrine.",
    madrid:
      "Visit the Royal Palace, stroll around El Retiro Park, and explore the art collection at the Prado Museum.",
    istanbul:
      "Visit the Hagia Sophia, take a boat trip on the Bosphorus, and explore the bustling Grand Bazaar.",
    mumbai:
      "Visit the Gateway of India, relax at Marine Drive, and explore the colorful street markets.",
    bangkok:
      "Visit the Grand Palace, explore Wat Pho (Temple of the Reclining Buddha), and enjoy authentic Thai street food.",
    singapore:
      "Take a walk through Gardens by the Bay, visit the Marina Bay Sands SkyPark, and enjoy the bustling Chinatown.",
    seoul:
      "Visit Gyeongbokgung Palace, stroll around Bukchon Hanok Village, and try Korean BBQ in Myeongdong.",
    "hong kong":
      "Take the tram up to Victoria Peak for a breathtaking view, shop at the bustling markets, and visit Hong Kong Disneyland.",
    athens:
      "Visit the Parthenon, explore the Acropolis Museum, and enjoy the view from Lycabettus Hill.",
    cairo:
      "Explore the Pyramids of Giza, visit the Egyptian Museum, and take a boat ride on the Nile River.",
  };

  const cityNames = Object.keys(travelTips);
  const perPage = 3;
  const totalPages = Math.ceil(cityNames.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null);

  const [cityImages, setCityImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const indexOfLastCity = currentPage * perPage;
  const indexOfFirstCity = indexOfLastCity - perPage;
  const currentCities = cityNames.slice(indexOfFirstCity, indexOfLastCity);

  useEffect(() => {
    currentCities.forEach((cityName) => {
      if (!cityImages[cityName]) {
        getCityImage(cityName)
          .then((url) =>
            setCityImages((prev) => ({ ...prev, [cityName]: url }))
          )
          .catch((err) =>
            console.error("Error fetching image for", cityName, err)
          );
      }
    });
  }, [currentCities, cityImages]);

  const handleCityClick = (cityName) => {
    if (selectedCity === cityName) {
      setSelectedCity(null);
    } else {
      setSelectedCity(cityName);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    setSelectedCity(null);
  };

  return (
    <div className="travel-tips">
      <h2>Travel Tips</h2>
      <p className="intro">Discover travel tips for top destinations.</p>
      <div className="cities-grid">
        {currentCities.map((cityName) => (
          <div
            key={cityName}
            className={`city-card ${selectedCity === cityName ? "active" : ""}`}
            onClick={() => handleCityClick(cityName)}
          >
            <h3>{cityName}</h3>
            {cityImages[cityName] ? (
              <img
                className="place-image"
                src={cityImages[cityName]}
                alt={cityName}
              />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
            {selectedCity === cityName && (
              <p className="city-tip">{travelTips[cityName.toLowerCase()]}</p>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={i + 1 === currentPage ? "active" : ""}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
export default TravelTips;
