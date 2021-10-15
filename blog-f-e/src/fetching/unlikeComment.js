export default (comment_id) => {
    return fetch(`/data/unlike_comment/${comment_id}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};