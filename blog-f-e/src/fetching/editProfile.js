export default (uname, { bio }) => {
    return fetch('/data/edit_profile', {
        method: 'POST',
        body: JSON.stringify({
            uname,
            bio
        })
    })
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};