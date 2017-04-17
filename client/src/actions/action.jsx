

export const matchGoogleToken = (accessToken) => dispatch => {
    fetch('/api/me',
        {
            headers: {'Authorization': `Bearer ${accessToken}`}
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
}
