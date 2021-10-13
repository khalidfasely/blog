export default (comment, blog_id) => {
    return fetch('/data/new_comment', {
        method: 'POST',
        body: JSON.stringify({
            comment,
            blog_id
        })
    })
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};