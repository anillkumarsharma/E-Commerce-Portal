import axios from 'axios'
import type { Product } from '../types'
import type { SortOrder } from '../types'

// NOTE: Assignment requires 'got' library for API calls.
// 'got' is a Node.js-only HTTP library and CANNOT run in browser environments.
// Using 'axios' as a fully browser-compatible alternative with identical functionality.
// This limitation is documented in README.

const BASE_URL = 'https://fakestoreapi.com'

// ─── Products ─────────────────────────────────────────────────────────────────

// LOGIC: Fetch all products - optional sort param ('asc' | 'desc')
export const fetchAllProducts = async (sort?: SortOrder): Promise<Product[]> => {
  const url = sort ? `${BASE_URL}/products?sort=${sort}` : `${BASE_URL}/products`
  // LOGIC: aapko yahan apni logic likhni hai (API call karna)
  const response = await axios.get<Product[]>(url)
  return response.data
}

// LOGIC: Fetch products for a single category with optional sort
export const fetchProductsByCategory = async (
  category: string,
  sort?: SortOrder
): Promise<Product[]> => {
  const url = sort
    ? `${BASE_URL}/products/category/${encodeURIComponent(category)}?sort=${sort}`
    : `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  // LOGIC: aapko yahan apni logic likhni hai
  const response = await axios.get<Product[]>(url)
  return response.data
}

// LOGIC: Fetch products for MULTIPLE categories
// fakestoreapi only supports single category, so we call API for each
// and merge the results into one array
export const fetchProductsByCategories = async (
  categories: string[],
  sort?: SortOrder
): Promise<Product[]> => {
  // LOGIC: aapko yahan apni logic likhni hai
  // Har category ke liye alag API call karo, phir results combine karo
  const promises = categories.map((cat) => fetchProductsByCategory(cat, sort))
  const results = await Promise.all(promises)
  return results.flat()
}

// LOGIC: Fetch single product by ID (for detail page)
export const fetchProductById = async (id: number): Promise<Product> => {
  // LOGIC: aapko yahan apni logic likhni hai
  const response = await axios.get<Product>(`${BASE_URL}/products/${id}`)
  return response.data
}

// ─── Categories ───────────────────────────────────────────────────────────────

// LOGIC: Fetch all available category names
export const fetchCategories = async (): Promise<string[]> => {
  // LOGIC: aapko yahan apni logic likhni hai
  const response = await axios.get<string[]>(`${BASE_URL}/products/categories`)
  return response.data
}
