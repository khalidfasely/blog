export default () => {
    return fetch('/data/logout')
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};