const BASE_URL = "http:localhost:3000"

if (localStorage.getItem('user_id')) {
    const userId = localStorage.getItem('user_id');

    fetch(`${BASE_URL}/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        displayPage(user)
    })
} else {
    displayLogin()
}

