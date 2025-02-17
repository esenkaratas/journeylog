import React from "react";

const DestinationCard = ({ place }) => {
  return (
    <div className="destination-card">
      <h3>{place.name || "Unnamed Place"}</h3>
      <p>{place.description || "No description available"}</p>
      <img src={place.imageUrl || "default-image-url"} alt={place.name} />
    </div>
  );
};

export default DestinationCard;
