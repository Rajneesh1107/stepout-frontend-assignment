import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const register = (formData) => API.post("/auth/register", formData);
export const login = (formData) => API.post("/auth/login", formData);
export const getTrains = (source, destination) =>
  API.get(`/trains/availability?source=${source}&destination=${destination}`);
export const bookSeat = (trainId, bookingData) =>
  API.post(`/trains/${trainId}/book`, bookingData);
export const getBookingDetails = (bookingId) =>
  API.get(`/bookings/${bookingId}`);
