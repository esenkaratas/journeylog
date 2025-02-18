import React, { createContext, useState, useContext } from "react";

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDestinations = (city) => {
    const apiUrl = `http://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${process.env.REACT_APP_OPENTRIPMAP_API_KEY}`;
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDestinations(data);
        } else {
          setDestinations([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("There was an error fetching destinations. Please try again.");
        setLoading(false);
      });
  };

  const value = {
    city,
    setCity,
    places,
    setPlaces,
    destinations,
    setDestinations,
    loading,
    setLoading,
    error,
    setError,
    fetchDestinations,
  };

  return (
    <TravelContext.Provider value={value}>{children}</TravelContext.Provider>
  );
};

export const useTravel = () => {
  return useContext(TravelContext);
};
