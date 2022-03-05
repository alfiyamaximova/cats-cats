const baseUrl = 'https://sb-cats.herokuapp.com/api';

export async function fetchAllCatsFromRemoteDb() {
    const response = await fetch(`${baseUrl}/show`);

    return response?.json();
}

export async function nextId() {
    return await fetch(`${baseUrl}/ids`)
        .then(result => result.json())
        .then(json => json.data.filter(id => !!id).reduce((a, b) => (a > b) ? a : b) + 1);
}

export async function addNewCatToRemoteDb(cat) {
    const response = await fetch(`${baseUrl}/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    });

    return response?.json();
}

export async function updateCatInRemoteDb(cat) {
    const response = await fetch(`${baseUrl}/update/${cat.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cat)
    });

    return response?.json();
}
