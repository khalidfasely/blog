export default (uid) => {
    return fetch(`/data/user_page/${uid}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};