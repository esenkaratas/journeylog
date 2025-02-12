import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="products-grid">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
