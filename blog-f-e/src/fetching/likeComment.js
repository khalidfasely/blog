export default (comment_id) => {
    return fetch(`/data/like_comment/${comment_id}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er));
};