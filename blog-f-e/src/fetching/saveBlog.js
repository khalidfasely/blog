export default (bid) => {
    return fetch(`/data/save_blog/${bid}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};