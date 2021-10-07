export default () => {
    return fetch('/data/blogs')
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};