const baseUrl = 'https://sb-cats.herokuapp.com/api';

export async function fetchAllCats() {
    const response = await fetch(`${baseUrl}/show`);

    return response?.json();
}
