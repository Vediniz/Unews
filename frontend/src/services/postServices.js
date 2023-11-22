import axios from 'axios'
import Cookies from 'js-cookie'

const baseUrl = 'http://localhost:5000'

export const getAllPosts = async (limit, offset) => {
    try {
        const response = await axios.get(`${baseUrl}/news?limit=${limit}&offset=${offset}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export function searchPosts(title) {
    const response = axios.get(`${baseUrl}/news/search?title=${title}`)
    return response
}

export function getPostByFilter(filters) {
    const response = axios.get(`${baseUrl}/news/filter?filters=${filters}`)
    return response
}

export function getPostById(id) {
    const response = axios.get(`${baseUrl}/news/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    })
    return response
}

export function createPost(data) {
    const response = axios.post(`${baseUrl}/news/`, data, 
    {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    })
    return response
}

export function updatePost(id, post) {
    const response = axios.patch(`${baseUrl}/news/${id}`, post, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    })
    return response
}

export function deletePost(id) {
    const response = axios.delete(`${baseUrl}/news/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    })
    return response
}