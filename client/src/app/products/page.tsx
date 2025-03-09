"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductsModal from "./CreateProductsModal";

type ProductFormData = {
      name: string;
      price: number;
      stockQuantity: number;
      rating: number;
    };

const Products = () => {
  const [searchTerm, setSaerchTerm] = useState("");
  const [isModalOpen, setIsMedalOpan] = useState(false);
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);
  const [ createProduct ] = useCreateProductMutation()

const handleCreateProduct = async (productData: ProductFormData) => {
      await createProduct(productData);
}

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Fail to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 boder-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-4  rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSaerchTerm(e.target.value)}
            type="text"
          />
        </div>
      </div>
      {/* Header bar */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-3 px-3"
          onClick={() => setIsMedalOpan(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" />
          Create Product
        </button>
      </div>
      {/* Body Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between ">
        {isLoading ? (
          <div> Loading... </div>
        ) : (
          products.slice().reverse().map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-sm p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)} </p>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Stock: {product.stockQuantity}
              </div>
              {
              product.rating && (<div className="flex items-center mt-2"> 
              <Rating rating={product.rating || 0}/>
              </div>)
              }
            </div>
          ))
        )}
      </div>
      {/* Modal */}
      <CreateProductsModal isOpen={isModalOpen} onClose={()=> setIsMedalOpan(false)}  onCreate={handleCreateProduct}/>
    </div>
  );
};

export default Products;
