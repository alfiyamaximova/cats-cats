import {cats} from "./data/cats.js";
import {buildCard} from "./template/card.js";
import {buildInfoPopupContent} from "./template/info-popup.js";
import {loadUserName} from "./service/cats-session-storage.js";

const userName = loadUserName();
if (!userName) {
    window.location.replace('auth.html');
}

const cardsGrid = document.getElementsByTagName('main')[0];
const infoPopup = document.querySelector('.info-popup');

// creation of the cats cards
cats.forEach(cat => {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = buildCard(cat);

    const elementToAppend = templateElement.content.firstChild;

    elementToAppend.onclick = e => showCatInfoWindow(cat);

    cardsGrid.appendChild(elementToAppend);
});

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