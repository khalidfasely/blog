export default (bid, {
        uname,
        title,
        description,
        content,
        category
    }) => {
    return fetch('/data/edit_blog', {
        method: 'POST',
        body: JSON.stringify({
            bid,
            uname,
            title,
            description,
            content,
            category
        })
    })
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};