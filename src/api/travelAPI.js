const BASE_URL = "https://api.opentripmap.com/0.1/en/places";
const API_KEY = process.env.REACT_APP_OPENTRIPMAP_API_KEY;
const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;
const PEXELS_URL = "https://api.pexels.com/v1/search";

const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export const getPlaceImage = async (placeName) => {
  try {
    const response = await fetch(
      `${PROXY_URL}${PEXELS_URL}?query=${placeName}&per_page=1`,
      {
        headers: {
          Authorization: `Bearer ${PEXELS_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch place image");
    }

    const data = await response.json();

    console.log("Pexels API Response:", data);
    return data.photos && data.photos[0] ? data.photos[0].src.large : null;
  } catch (error) {
    console.error("Error fetching place image:", error);
    return null;
  }
};

export const getCityImage = async (cityName) => {
  try {
    const response = await fetch(`${PEXELS_URL}?query=${cityName}&per_page=1`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch city image");
    }
    const data = await response.json();
    return data.photos[0]?.src?.large || null;
  } catch (error) {
    console.error("Error fetching city image:", error);
    return null;
  }
};

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

export const getPopularPlaces = async (
  lat,
  lon,
  radius = 5000,
  cityName = ""
) => {
  try {
    const url = `${BASE_URL}/autosuggest?name=${
      cityName || "random"
    }&radius=${radius}&lon=${lon}&lat=${lat}&format=json&apikey=${API_KEY}`;
    const response = await fetch(url);
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
