import {putUserNameToSession} from "./cats-session.js";

const userNameErrorMessageSpan = document.getElementsByClassName('user-name-error')[0];

export function onSubmitUsername() {
    const data = new FormData(userNameInputForm);
    let userName = data.get('userNameInput');

    if (!/[a-z]|[0-9]/.test(userName)) {
        showUserNameErrorMessage();
        return
    }

    userName = userName.trim();

    putUserNameToSession(userName);

    window.location.replace('index.html');
}

window.onSubmitUsername = onSubmitUsername;

function showUserNameErrorMessage() {
    userNameErrorMessageSpan.classList.add('user-name-error-active');
}