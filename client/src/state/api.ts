import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface Product {
  productId: string;
  name: String;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface NewProduct {
  name: String;
  price: number;
  rating?: number;
  stockQuantity: number;
}
export interface SalesSummary {
  salesSummaryId: String;
  totalValue: number;
  changePercentage?: number;
  date: string;
}
export interface PurchaseSummary {
  purchaseSummaryId: String;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummaryId: String;
  totalExpenses: number;
  date: string;
}
export interface ExpenseByCategorySummar {
  expenseByCategoryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  saleSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummar[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/products",
        params: search ? { search} : {},
      }),
      providesTags: ["Products"],
    }),
    createProduct: build.mutation<Product, NewProduct> ({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getExpensesByCategory: build.query<ExpenseByCategorySummar[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

export const { useGetDashboardMetricsQuery, useGetProductsQuery, useCreateProductMutation, useGetUsersQuery, useGetExpensesByCategoryQuery  } = api;
