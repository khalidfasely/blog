export default (blog_id) => {
    return fetch(`/data/unlike_blog/${blog_id}`)
    .then(res => res.json())
    .then(result => result)
    .catch(er => console.log(er))
};