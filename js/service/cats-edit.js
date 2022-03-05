import {getCatsFromStorage, putCatsToStorage} from "./cats-storage.js";
import {nextId, addNewCatToRemoteDb, updateCatInRemoteDb} from "./cats-api.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const catId = +params.id;

const formHeader = document.getElementById('formHeader');

if (!!catId) { // edit cat
    formHeader.innerText = 'Редактирование данных кота';
    fillForm(catId)
    window.saveChanges = saveChangesForExistingCat;
} else { // add new cat
    formHeader.innerText = 'Ввод данных нового кота';
    window.saveChanges = saveChangesForNewCat;
}

function fillForm(catId) {
    const allCats = getCatsFromStorage();

    const cat = allCats.find(cat => cat.id === catId);

    const formElements = document.forms['form'].elements;

    formElements['name'].value = cat.name;
    formElements['img_link'].value = cat.img_link;
    formElements['age'].value = cat.age;
    formElements['rate'].value = cat.rate;
    formElements['favourite'].checked = cat.favourite;
    formElements['description'].value = cat.description;
}

function saveChangesForNewCat() {

    const existingCats = getCatsFromStorage() || [];

    const newCatData = getFormData();

    nextId().then(newId => {
        newCatData.id = newId;

        existingCats.push(newCatData);

        putCatsToStorage(existingCats);

        addNewCatToRemoteDb(newCatData)
            .then(() => window.location.href = 'index.html');
    });
}

function getFormData() {
    const data = new FormData(form);

    return {
        name: data.get('name'),
        img_link: data.get('img_link'),
        age: +data.get('age'),
        rate: +data.get('rate'),
        favourite: (data.get('favourite') === 'on'),
        description: data.get('description')
    }
}

function saveChangesForExistingCat() {
    const existingCats = getCatsFromStorage() || [];

    const updatedCatData = getFormData();
    updatedCatData.id = catId;

    const index = existingCats.findIndex(cat => cat.id === catId);
    if (index !== -1) {
        existingCats[index] = updatedCatData;
    } else {
        existingCats.push(updatedCatData);
    }

    putCatsToStorage(existingCats);

    updateCatInRemoteDb(updatedCatData)
        .then(() => window.location.href = 'index.html')
}
