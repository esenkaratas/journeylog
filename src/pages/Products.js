import React from "react";
import useFetchFashion from "../api/fashionAPI";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

const Products = () => {
  const { data, loading, error } = useFetchFashion(
    "https://fakestoreapi.com/products/category/women's clothing"
  );

  if (loading)
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );

  if (error)
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="products-container">
      <h1>Products Page</h1>
      <div className="products-grid">
        {data.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
