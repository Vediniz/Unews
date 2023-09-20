import axios from 'axios'
import Cookies from 'js-cookie'

const baseUrl = 'http://localhost:5000'

export function signup(data) {
    const response = axios.post(`${baseUrl}/user/create`, data)
    return response
}

export function signin(data) {
    const response = axios.post(`${baseUrl}/auth/`, data)
    return response
}

export function userLogged() {
    const response = axios.get(`${baseUrl}/user/`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    });
    return response;
} 