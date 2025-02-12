import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToFavorites, removeFromFavorites, favorites } =
    useContext(FavoritesContext);

  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      {isFavorite ? (
        <button
          className="remove-fav"
          onClick={() => removeFromFavorites(product.id)}
        >
          Remove from Favorites
        </button>
      ) : (
        <button className="add-fav" onClick={() => addToFavorites(product)}>
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default ProductCard;
