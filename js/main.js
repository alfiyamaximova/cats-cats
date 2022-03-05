import {buildCard} from "./template/card.js";
import {buildInfoPopupContent} from "./template/info-popup.js";
import {buildDeletePopupContent} from "./template/delete-popup.js";

import {getUserNameFromSession} from "./service/cats-session.js";
import {deleteCatInRemoteDb, fetchAllCatsFromRemoteDb} from "./service/cats-api.js";
import {getCatsFromStorage, putCatsToStorage, removeCatsFromStorage} from "./service/cats-storage.js";
import {isNotEmptyCatObject} from "./service/cats-validator.js";
import {isEmptyArray} from "./utils/arrays.js";

const modalPopup = document.querySelector('.modal-popup');

const userName = getUserNameFromSession();
if (!userName) {
    window.location.replace('auth.html');
}

let cats = getCatsFromStorage();
if (isEmptyArray(cats)) {
    fetchAllCatsFromRemoteDb().then(result => {
        cats = result.data.filter(item => isNotEmptyCatObject(item));

        putCatsToStorage(cats);

        createCards(cats);
    });
} else {
    createCards(cats);
}

// creation of the cats cards
function createCards(cats) {
    const cardsGrid = document.getElementsByTagName('main')[0];

    cats.forEach(cat => {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = buildCard(cat);

        const elementToAppend = templateElement.content.firstChild;

        elementToAppend.onclick = e => showCatInfoWindow(e, cat);

        const cardButtonsDivChildNodes = Array.from(
            Array.from(elementToAppend.childNodes).find(child => child.className === 'card__buttons').childNodes
        );

        cardButtonsDivChildNodes
            .find(child => child.className === 'card__edit-cat-button')
            .onclick = e => onEditCat(cat.id);

        cardButtonsDivChildNodes
            .find(child => child.className === 'card__delete-cat-button')
            .onclick = e => onDeleteCat(cat);

        cardsGrid.appendChild(elementToAppend);
    });
}

function showCatInfoWindow(e, cat) {
    if (e.target instanceof HTMLButtonElement) {
        e.stopPropagation();
        return;
    }

    modalPopup.classList.add('modal-popup_active');

    modalPopup.firstElementChild.innerHTML = buildInfoPopupContent(cat);
}

function onEditCat(catId) {
    window.location.href = `edit-cat.html?id=${catId}`;
}

function onDeleteCat(cat) {
    modalPopup.classList.add('modal-popup_active');

    modalPopup.firstElementChild.innerHTML = buildDeletePopupContent(cat);
}

function closeModalPopup() {
    modalPopup.classList.remove('modal-popup_active');
}

function regetAllCatsFromAPI() {
    removeCatsFromStorage();
    window.location.reload();
}

function deleteCatData(catId) {
 if (!catId) {
     return;
 }

 const existingCats = getCatsFromStorage() || [];

 removeCatsFromStorage();
 putCatsToStorage(existingCats.filter(cat => cat.id !== catId));

 deleteCatInRemoteDb(catId)
     .then(() => window.location.href = 'index.html');
}

window.regetAllCatsFromAPI = regetAllCatsFromAPI;
window.closeModalPopup = closeModalPopup;
window.deleteCatData = deleteCatData;
