export default ({ username, email, password, confirmation }) => {
    return fetch('/data/register', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password,
            confirmation
        })
    })
    .then(res => res.json())
    .then(result => {
        return result;
        //if (result.message !== "Register") {
        //    setError(result.message);
        //} else {
        //    setError('');
        //    history.push('/');
        //}
    })
    .catch(er => console.log(er));
};