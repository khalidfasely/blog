export default (bid) => {
    return fetch(`/data/unsave_blog/${bid}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};