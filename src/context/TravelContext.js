import React from "react";

const TravelContext = React.createContext();

function TravelProvider({ children }) {
  const [destinations, setDestinations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
      });
  };

  return (
    <TravelContext.Provider
      value={{ destinations, loading, fetchDestinations }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export { TravelProvider, TravelContext };
