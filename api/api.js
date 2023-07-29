// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000', // Substitua pela URL do seu servidor backend
});

export async function getDados() {
  try {
    const response = await api.get('/dados'); // Substitua "/dados" pelo endpoint correto
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    throw error;
  }
}
