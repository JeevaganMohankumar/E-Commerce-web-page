import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data));

  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>

          <button>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
