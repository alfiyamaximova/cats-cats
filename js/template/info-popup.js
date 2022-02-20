export function buildInfoPopupContent(cat) {
    return `<img class="info-popup__content__image" src="${cat.img_link}" alt="${cat.name}">
            <div>
                <h2>${cat.name}</h2>
                <h3>${cat.age} ${getWord(cat.age, "год", "года", "лет")}</h3>
                <p>${cat.description}</p>
            </div>`;
}

function getWord(n, w1, w2, w0) {
    if (n % 100 < 11 || n % 100 > 14) {
        if (n % 10 === 1) {
            return w1;
        } else if (n % 10 >= 2 && n % 10 <= 4) {
            return w2;
        } else {
            return w0;
        }
    } else {
        return w0;
    }
}
