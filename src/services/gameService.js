let baseUrl = 'http://localhost:3030';

export let getAllGames = () => {
    return fetch(`${baseUrl}/data/games`)
        .then(res => res.json())
}