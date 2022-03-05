export function buildDeletePopupContent(cat) {
    return `<img class="modal-popup__content__image" src="${cat.img_link}" alt="${cat.name}">
            <div>
                <div class="modal-popup__message">
                    <h3>Вы действительно хотите удалить данные о коте ${cat.name} из базы данных?</h3>
                </div>
                <div>
                    <button class="button_yes" onclick="deleteCatData(${cat.id})">Да</button>
                    <button class="button_no" onclick="closeModalPopup()">Нет</button>
                </div>
            </div>
            <div class="modal-popup__close-button" onclick="closeModalPopup()">
            </div>`;
}
