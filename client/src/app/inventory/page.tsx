"use client";
import { useGetProductsQuery } from "@/state/api";
import React from "react";
import Header from "../(components)/Header";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const columns: GridColDef[] = [
      {field: 'productId', headerName: 'ID', width: 90 },
      {field: 'name', headerName: 'Product Name', width:200},
      {field: 'price', headerName: 'Price', type: 'number', valueGetter: (value, row)=> `$ ${row.price}` ,  width: 110 },
      {field: 'rating', headerName: 'Rating', type: 'number', valueGetter: (value, row)=> row.rating ? row.rating : "N/A" ,  width: 110 },
      {field: 'stockQuantity', headerName: 'Stock Quantity', type: 'number',  width: 150 },
     
   
    ];


const Inventrory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
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
    <div className="flex flex-col ">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row)=> row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200  mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventrory;
