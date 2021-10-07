export default () => {
    return fetch('/data/user')
    .then(res => res.json())
    .then(result => {
        //console.log(result.user);
        if (result.user !== "AnonymousUser") {
            return result;
        } else {
            return undefined;
        }
    })
    .catch(er => console.log(er));
};