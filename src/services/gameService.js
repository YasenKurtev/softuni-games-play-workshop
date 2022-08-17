import { del, get, post, put } from "./apiService";

let baseUrl = 'http://localhost:3030';

export let getAllGames = () => {
    return get(`${baseUrl}/data/games?sortBy=_createdOn%20desc`)
        .then(res => res.json())
}

export let getGameDetails = (id) => {
    return get(`${baseUrl}/data/games/${id}`)
        .then(res => res.json())
}

export let createGame = (data) => {
    return post(`${baseUrl}/data/games`, data)
        .then(res => res.json())
}

export let editGame = (id, data) => {
    return put(`${baseUrl}/data/games/${id}`, data)
        .then(res => res.json())
}

export let deleteGame = (id) => {
    return del(`${baseUrl}/data/games/${id}`)
}

export let getComments = (id) => {
    return get(`${baseUrl}/data/comments?where=gameId%3D%22${id}%22`)
        .then(res => res.json())
}

export let addComment = (data) => {
    return post(`${baseUrl}/data/comments`, data)
        .then(res => res.json())
}