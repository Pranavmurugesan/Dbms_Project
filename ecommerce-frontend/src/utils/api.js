import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
}

export const productAPI = {
  getAll: () => apiClient.get('/public/products'),
  getById: (id) => apiClient.get(`/public/products/${id}`),
  create: (data) => apiClient.post('/admin/products', data),
  update: (id, data) => apiClient.put(`/admin/products/${id}`, data),
  delete: (id) => apiClient.delete(`/admin/products/${id}`),
}

export const orderAPI = {
  create: (data) => apiClient.post('/user/orders', data),
  getMyOrders: () => apiClient.get('/user/orders'),
  getProfile: () => apiClient.get('/user/profile'),
}

export const adminAPI = {
  getAnalytics: () => apiClient.get('/admin/analytics'),
}

export default apiClient
