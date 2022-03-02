const catsArrayStorageKey = 'loadedCats';

export function getCatsFromStorage() {
    const catsStr = localStorage.getItem(catsArrayStorageKey);

    if (!catsStr) {
        return null;
    }

    return JSON.parse(catsStr);
}

export function putCatsToStorage(catsArray) {
    if (!catsArray) {
        return;
    }

    localStorage.setItem(catsArrayStorageKey, JSON.stringify(catsArray));
}

export function addNewCatToStorage() {

    const existingCats = getCatsFromStorage() || [];

    const data = new FormData(addCatForm);

    const newCat = {
        id: nextId(existingCats),
        name: data.get('name'),
        img_link: data.get('img_link'),
        age: +data.get('age'),
        rate: +data.get('rate'),
        favourite: (data.get('favourite') === 'on'),
        description: data.get('description')
    }

    existingCats.push(newCat);

    putCatsToStorage(existingCats);

    window.location.href = 'index.html'
}

function nextId(catsArray) {
    return Math.max(...catsArray.map(cat => cat.id)) + 1;
}

window.addNewCatToStorage = addNewCatToStorage;
