export default ({ title, description, content, category }) => {
    return fetch('/data/new_blog', {
        method: 'POST',
        body: JSON.stringify({
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