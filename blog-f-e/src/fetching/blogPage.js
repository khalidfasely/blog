export default (id) => {
    return fetch(`/data/blog_page/${id}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
}