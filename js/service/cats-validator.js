const catObjectRequiredFields = [
    'id',
    'name',
    'img_link',
    'age',
    'rate',
    'favourite',
    'description'
];

export function isNotEmptyCatObject(obj) {
    if (!obj) {
        return false;
    }

    return catObjectRequiredFields.every(field => obj.hasOwnProperty(field));
}
