const catObjectRequiredFields = [
    'id',
    'name',
    'img_link',
    'age'
];

export function isNotEmptyCatObject(obj) {
    if (!obj) {
        return false;
    }

    return catObjectRequiredFields.every(field => obj.hasOwnProperty(field));
}
