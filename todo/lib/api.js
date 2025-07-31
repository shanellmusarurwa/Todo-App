import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}?_limit=5`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, {
    title: todo.title,
    completed: todo.completed || false,
    userId: 1 // Required by API
  });
  return response.data;
};

export const updateTodo = async (id, updates) => {
  const response = await axios.patch(`${API_URL}/${id}`, {
    ...updates,
    userId: 1 // Required by API
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export const getTodoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};