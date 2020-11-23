export const parser = (nom) => {
    if (nom) {
        nom = parseInt(nom.toString().replace(/[^0-9]/g, ''));
        return nom.toString().replace('.', '').split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('');
    }
    else
        return null;
};