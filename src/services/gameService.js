import { get } from "./apiService";

let baseUrl = 'http://localhost:3030';

export let getAllGames = () => {
    return get(`${baseUrl}/data/games?sortBy=_createdOn%20desc`)
        .then(res => res.json())
}

export let getGameDetails = (id) => {
    return get(`${baseUrl}/data/games/${id}`)
        .then(res => res.json())
}