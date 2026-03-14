import React, { useState } from "react";

function ProductForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
 
 

 const addProduct = async () => {
  if (!productName || !price || !quantity || !category) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(
      "https://inventory-management-backened-1.onrender.com/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: productName,
          price: Number(price),
          quantity: Number(quantity),
          category: category,
        }),
      }
    );

    if (!response.ok) {
      alert("Product add nahi hua ❌");
      return;
    }

    const data = await response.json();
    console.log(data);

    setProductName("");
    setPrice("");
    setQuantity("");
    setCategory("");

    alert("Product Added Successfully");

  } catch (error) {
    console.error("Error:", error);
    alert("Server error ho gaya");
  }
};

 

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
            </select>
          </div>

          {/* <div className="mt-4">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />

            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 h-32 object-contain border rounded-lg"
              />
            )}
          </div> */}

          <div className="mt-6 text-center">
            <button
              onClick={addProduct}
              className="bg-blue-600 text-white px-8 py-3 rounded-full"
            >
              Add Product
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductForm;