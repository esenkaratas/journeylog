import React from "react";

const DestinationCard = ({ place }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${place.point.lat},${place.point.lon}`;

  return (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="link-text"
    >
      <div className="destination-card">
        {" "}
        <h3>{place.name || "Unnamed Place"}</h3>
        {place.image ? (
          <img src={place.image} alt={place.name} style={{ width: "100%" }} />
        ) : (
          <p>No image available</p>
        )}
      </div>
    </a>
  );
};

export default DestinationCard;
