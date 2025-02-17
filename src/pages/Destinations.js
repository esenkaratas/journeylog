import React, { useState } from "react";
import {
  getPopularPlaces,
  getCityCoordinates,
  getPlaceImage,
} from "../api/travelAPI";
import DestinationCard from "../components/DestinationCard";

const Destinations = () => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Yerleri almak için fonksiyon
  const fetchPlaces = async (latitude, longitude) => {
    try {
      const data = await getPopularPlaces(latitude, longitude, 5000, city);

      // Yalnızca benzersiz yerleri almak için 'xid' ve 'name' kombinasyonu üzerinden filtreleme yapıyoruz
      const uniquePlaces = [];
      const placeIdentifiers = new Set(); // Benzersiz yerler için bir set kullanıyoruz

      data.forEach((place) => {
        // Eğer 'xid' ve 'name' kombinasyonu daha önce eklenmediyse, onu ekliyoruz
        const identifier = `${place.xid}-${place.name}`;
        if (!placeIdentifiers.has(identifier)) {
          placeIdentifiers.add(identifier);
          uniquePlaces.push(place);
        }
      });

      // Fotoğrafları ekliyoruz
      const placesWithImages = await Promise.all(
        uniquePlaces.map(async (place) => {
          const image = await getPlaceImage(place.name);
          return { ...place, image };
        })
      );

      setPlaces(placesWithImages); // Sonuçları yerel state'e atıyoruz
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
      {error && <p>{error}</p>}
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
              <p>No image available</p> // Eğer fotoğraf yoksa, bu mesaj görünsün
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
