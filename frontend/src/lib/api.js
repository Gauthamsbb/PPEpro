import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

export const fetchProduct = async (slug) => {
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

export const fetchProductsMeta = async () => {
  const { data } = await api.get("/products/meta");
  return data;
};

export const submitQuote = async (payload) => {
  const { data } = await api.post("/quotes", payload);
  return data;
};

export const submitContact = async (payload) => {
  const { data } = await api.post("/contact", payload);
  return data;
};

export const submitOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const fetchOrder = async (orderNumber) => {
  const { data } = await api.get(`/orders/${orderNumber}`);
  return data;
};
