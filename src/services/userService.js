import { get, post } from "./apiService";

let baseUrl = 'http://localhost:3030';

export let loginUser = (email, password) => {
    return post(`${baseUrl}/users/login`, { email, password });
}

export let registerUser = (email, password) => {
    return post(`${baseUrl}/users/register`, { email, password });
}

export let logoutUser = () => {
    return get(`${baseUrl}/users/logout`);
}