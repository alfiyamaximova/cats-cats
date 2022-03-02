import {buildCard} from "./template/card.js";
import {buildInfoPopupContent} from "./template/info-popup.js";

import {getUserNameFromSession} from "./service/cats-session.js";
import {fetchAllCats} from "./service/cats-api.js";
import {getCatsFromStorage, putCatsToStorage} from "./service/cats-storage.js";
import {isNotEmptyCatObject} from "./service/cats-validator.js";

const infoPopup = document.querySelector('.info-popup');

const userName = getUserNameFromSession();
if (!userName) {
    window.location.replace('auth.html');
}

let cats = getCatsFromStorage();
if (!cats) {
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

        elementToAppend.onclick = e => showCatInfoWindow(cat);

        cardsGrid.appendChild(elementToAppend);
    });
}

function showCatInfoWindow(cat) {
    infoPopup.classList.add('info-popup_active');

    infoPopup.firstElementChild.innerHTML = buildInfoPopupContent(cat);

    const closeButton = document.createElement('div');
    closeButton.classList.add('info-popup__close-button');
    closeButton.onclick = closeInfo;
    infoPopup.firstElementChild.appendChild(closeButton);
}

function closeInfo() {
    infoPopup.classList.remove('info-popup_active');
}