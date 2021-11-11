export default (bid) => {
    return fetch(`/data/delete_blog/${bid}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
}