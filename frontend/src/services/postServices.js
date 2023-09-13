import axios from 'axios'

const baseUrl = 'http://localhost:5000'

export function getAllPosts() {
    const response = axios.get(`${baseUrl}/news/`)
    return response
}

export function searchPosts(title) {
    const response = axios.get(`${baseUrl}/news/search?title=${title}`)
    return response
}