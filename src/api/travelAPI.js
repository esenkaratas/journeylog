const BASE_URL = "https://api.opentripmap.com/0.1/en/places";
const API_KEY = process.env.REACT_APP_OPENTRIPMAP_API_KEY;

export const getPlaces = async (lat, lon, radius = 5000) => {
  try {
    const response = await fetch(
      `${BASE_URL}/radius?radius=${radius}&lon=${lon}&lat=${lat}&format=json&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export const getPlaceDetails = async (xid) => {
  try {
    const response = await fetch(`${BASE_URL}/xid/${xid}?apikey=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Failed to fetch place details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

export const getPopularPlaces = async (lat, lon, radius = 5000, cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/autosuggest?name=${cityName}&radius=${radius}&lon=${lon}&lat=${lat}&format=json&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular places");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular places:", error);
    return [];
  }
};

export const getCityCoordinates = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch city coordinates");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    return null;
  }
};
