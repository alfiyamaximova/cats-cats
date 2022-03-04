import {buildCard} from "./template/card.js";
import {buildInfoPopupContent} from "./template/info-popup.js";

import {getUserNameFromSession} from "./service/cats-session.js";
import {fetchAllCats} from "./service/cats-api.js";
import {getCatsFromStorage, putCatsToStorage, removeCatsFromStorage} from "./service/cats-storage.js";
import {isNotEmptyCatObject} from "./service/cats-validator.js";
import {isEmptyArray} from "./utils/arrays.js";

const infoPopup = document.querySelector('.info-popup');

const userName = getUserNameFromSession();
if (!userName) {
    window.location.replace('auth.html');
}

let cats = getCatsFromStorage();
if (isEmptyArray(cats)) {
    fetchAllCats().then(result => {
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
            .onclick = e => onDeleteCat(cat.id);

        cardsGrid.appendChild(elementToAppend);
    });
}

function showCatInfoWindow(e, cat) {
    if (e.target instanceof HTMLButtonElement) {
        e.stopPropagation();
        return;
    }

    infoPopup.classList.add('info-popup_active');

    infoPopup.firstElementChild.innerHTML = buildInfoPopupContent(cat);

    const closeButton = document.createElement('div');
    closeButton.classList.add('info-popup__close-button');
    closeButton.onclick = closeInfo;
    infoPopup.firstElementChild.appendChild(closeButton);
}

function onEditCat(catId) {
    window.location.href = `edit-cat.html?id=${catId}`;
}

function onDeleteCat(catId) {
    console.log('delete: ', catId);
}

function closeInfo() {
    infoPopup.classList.remove('info-popup_active');
}

function regetAllCatsFromAPI() {
    removeCatsFromStorage();
    window.location.reload();
}

window.regetAllCatsFromAPI = regetAllCatsFromAPI;
