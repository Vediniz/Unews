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

export function updateUser(id, data){
    // delete data.confirmPassword;
    const response = axios.patch(`${baseUrl}/user/${id}`, data, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        }
    });
    return response;
}

export function recoverQuestion(data){
    const response = axios.post(`${baseUrl}/user/recover-question`, data)
    return response;
}

export function validateAnswer(data){
    const response = axios.post(`${baseUrl}/user/validate-answer`, data)
    return response;
}