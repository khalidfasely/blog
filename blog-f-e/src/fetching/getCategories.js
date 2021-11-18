export default () => {
    return fetch('/data/categories')
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};