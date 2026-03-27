import axios from "axios";
import type { Product } from "../types";
import type { SortOrder } from "../types";

const BASE_URL = "https://fakestoreapi.com";

// Fetch all products
export const fetchAllProducts = async (sort?: SortOrder) => {
  const url = sort
    ? `${BASE_URL}/products?sort=${sort}`
    : `${BASE_URL}/products`;
  const response = await axios.get<Product[]>(url);
  return response.data;
};

// Fetch products for a single category with optional sort
export const fetchProductsByCategory = async (category: string,sort?: SortOrder,): Promise<Product[]> => {
  const url = sort? `${BASE_URL}/products/category/${encodeURIComponent(category)}?sort=${sort}`: `${BASE_URL}/products/category/${encodeURIComponent(category)}`;
  const response = await axios.get<Product[]>(url);
  return response.data;
};

// Fetch products for MULTIPLE categories
  export const fetchProductsByCategories = async (categories: string[],sort?: SortOrder,): Promise<Product[]> => {
    const promises = categories.map((cat) => fetchProductsByCategory(cat, sort));
    const results = await Promise.all(promises);
    return results.flat();
  };

//Fetch single product by ID (for detail page)
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
  return response.data;
};

// Fetch all available category names
export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${BASE_URL}/products/categories`);
  return response.data;
};
