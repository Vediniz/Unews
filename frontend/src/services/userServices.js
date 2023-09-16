import axios from 'axios'

const baseUrl = 'http://localhost:5000'

export function signup(data){
    const response = axios.post(`${baseUrl}/user/create`, data)
    return response
}

export function signin(data){
    const response = axios.post(`${baseUrl}/auth/`, data)
    return response
}