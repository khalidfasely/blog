export default ({ username, password }) => {
    return fetch('/data/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(result => {
        return result;
        //if (result.message !== "Login Successfully.") {
        //    setError(result.message);
        //} else {
        //    setError('');
        //    setUsername('');
        //    setPassword('');
        //    history.push('/');
        //}
    })
    .catch(er => console.log(er));
};