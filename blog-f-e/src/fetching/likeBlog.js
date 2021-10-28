export default (blog_id) => {
    return fetch(`/data/like_blog/${blog_id}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er))
};