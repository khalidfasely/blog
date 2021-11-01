export default () => {
    return fetch('/data/blogs_saved')
    .then(res => res.json())
    .then(result => {
        if (result.message !== "No Profile!") {
            return result;
        }
    })
    .catch(er => console.log(er));
};