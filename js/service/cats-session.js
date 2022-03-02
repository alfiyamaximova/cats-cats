const userNameKey = 'userName';

export function putUserNameToSession(userName) {
    if (!userName) {
        return;
    }

    sessionStorage.setItem(userNameKey, userName);
}

export function getUserNameFromSession() {
    return sessionStorage.getItem(userNameKey);
}