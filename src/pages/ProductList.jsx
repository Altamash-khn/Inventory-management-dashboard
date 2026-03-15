import React from "react";

const ProductList = ({ products }) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Product Names
      </h2>

      {products.length === 0 ? (

        <p>No product added</p>

      ) : (

        <ul>

          {products.map((product, index) => (

            <li key={index} className="border-b p-2">

              {product.name}

            </li>

          ))}

        </ul>

      )}

    </div>

  );

};

export default ProductList;