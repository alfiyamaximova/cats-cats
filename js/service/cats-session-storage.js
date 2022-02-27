const userNameKey = 'userName';

export function saveUserName(userName) {
    if (!userName) {
        return;
    }

    sessionStorage.setItem(userNameKey, userName);
}

export function loadUserName() {
    return sessionStorage.getItem(userNameKey);
}