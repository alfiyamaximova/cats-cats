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

export function removeCatsFromStorage() {
    localStorage.removeItem(catsArrayStorageKey);
}


