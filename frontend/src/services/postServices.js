import axios from 'axios'

const baseUrl = 'http://localhost:5000'

export function getAllPosts() {
    const response = axios.get(`${baseUrl}/news/`)
    return response
}