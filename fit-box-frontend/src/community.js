function createUserLi(user) {
    let userLi = document.createElement("li");
    $(userLi).attr("class", "media");

    let img = document.createElement("img");
    $(img).attr("class", "mr-3");
    $(img).attr("src", user.profile_img_url);
    $(img).attr("alt", "Generic placeholder image");
    $(img).attr("style", "width: 64px; height: 64px;")
    $(userLi).append(img);

    let mediaBody = document.createElement("div");
    $(mediaBody).attr("class", "media-body");
    $(userLi).append(mediaBody);


    let cardTitle = document.createElement("h5");
    $(cardTitle).attr("class", "card-title");
    $(cardTitle).text(user.username);
    $(mediaBody).append(cardTitle);

    console.log(userLi)

    return userLi;
}


function displayCommunity(user) {
    let mainContainer = document.querySelector("main");
    $(mainContainer).empty();

    let usersContainer = document.createElement("ul");
    $(usersContainer).attr("class", "list-unstyled");
    $(mainContainer).append(usersContainer);

    console.log(usersContainer)

    fetch(`${BASE_URL}/users`)
        .then(resp => resp.json())
        .then(users => {
            users.forEach(u => {
                let userLi = createUserLi(u)
                $(usersContainer).append(userLi)
                $(userLi).on("click", (e) => {
                    displayProfile(u);
                })
            })
        })




}