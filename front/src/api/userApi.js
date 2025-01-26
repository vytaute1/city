import axios from "axios";
import { BASE_URL } from "./BaseUrl"; 

export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData); 
    return response.data; 
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; 
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`);
    return response;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

export const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedUserData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};