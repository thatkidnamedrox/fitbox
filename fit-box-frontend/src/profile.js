function displayProfile(user) {
    let isCurrentUser = (user) => {
        return getCurrentUserId() == user.id;
    }
    let createProfileInfo = (user) => {
        return `
            <div class="d-flex flex-column align-items-center">
                <div class="profile d-flex flex-column bd-highlight align-items-center" style="width:700px; ">
                    <img class="profile-pic" src='${user.profile_img_url ? user.profile_img_url : "images/user-circle-solid.svg"}'/>
                    <br>
                    <h2>@${user.username}</h2>
                    <br>
                    <ul class="list-group d-flex flex-row container">
                        <li class="list-group-item d-flex flex-column col-4 p-3" style="text-align:center;"><h3>${user.workouts.length}</h3><h6 style="margin:auto;">posts</h6></li>
                        <li class="list-group-item d-flex flex-column col-4 p-3" style="text-align:center;"><h3 class="followers">${user.followers.length}</h3><h6 style="margin:auto;">followers</h6></li>
                        <li class="list-group-item d-flex flex-column col-4 p-3" style="text-align:center;"><h3 class="following">${user.following.length}</h3><h6 style="margin:auto;">following</h6></li>
                    </ul>
                    <br>
                    <div class="bio">
                        <h5>${user.bio ? user.bio : "nothing... yet ;)"}</h5>
                    </div>
                    <br>
                </div>
                <br>
                <div style="text-align:center;">
                    <h4 style="">Your Workouts</h4>
                </div>
                <br>
                <div class="d-flex flex-column justify-content-center align-items-center" id="user-workouts" style=""></div>
                <br>
                <br>
                </div>`;

    }

    fetch(`${BASE_URL}/following/${getCurrentUserId()}/${user.id}`)
        .then(resp => resp.json())
        .then(data => {
            if (data) return true;
            return false;
        }).then(isFollowing => {
            let mainContainer = document.querySelector("main");
            mainContainer.innerHTML = createProfileInfo(user);

            let profile = mainContainer.querySelector(".profile");
            if (isCurrentUser(user)) {
                profile.innerHTML += `
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal" id="edit-profile">Edit Profile</button>
                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target=".display-workout-form" id="post-workout">Post Workout</button>`;

                let postWorkoutButton = $(mainContainer).find("#post-workout");
                $(postWorkoutButton).click(() => {
                    displayWorkoutForm(user);
                })

                let editProfileButton = $(mainContainer).find("#edit-profile");
                $(editProfileButton).click(() => {
                    displayEditProfileForm(user);
                })

            } else {
                profile.innerHTML += `
                <button type="button" class="btn btn-primary btn-block follow-button ${ isFollowing ? 'unfollow">Unfollow</button>' : 'follow">Follow</button>'}`

                let followButton = $(mainContainer).find(".follow-button");
                let followersCount = $(mainContainer).find(".followers");
                let count = parseInt($(followersCount).text());
                $(followButton).click(() => {
                    if (followButton.hasClass("unfollow")) {

                        let configObj = {
                            method: "DELETE",
                            headers: {
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                user_id: localStorage.getItem("user_id"),
                                following_id: user.id
                            })
                        }

                        fetch(`${BASE_URL}/unfollow`, configObj)
                            .then(res => res.json())
                            .then(user => {
                                $(followButton).removeClass("unfollow");
                                $(followButton).addClass("follow");
                                $(followButton).text("Follow");
                                count--;
                                $(followersCount).text(count);
                            })

                    } else {
                        let configObj = {
                            method: "POST",
                            headers: {
                                "Content-Type": 'application/json'
                            },
                            body: JSON.stringify({
                                user_id: localStorage.getItem("user_id"),
                                following_id: user.id
                            })
                        }

                        fetch(`${BASE_URL}/follow`, configObj)
                            .then(res => res.json())
                            .then(user => {
                                $(followButton).removeClass("follow");
                                $(followButton).addClass("unfollow");
                                $(followButton).text("Unfollow");
                                count++;
                                $(followersCount).text(count);
                            })
                    }
                })
            }

            let workoutsContainer = $(mainContainer).find("#user-workouts");
            fetch(`${BASE_URL}/users/${user.id}/workouts`)
                .then(resp => resp.json())
                .then(workouts => {
                    console.log(workouts);
                    workouts.forEach(workout => {
                        let workoutCard = createWorkoutCard(workout);
                        $(workoutsContainer).prepend(workoutCard);
                    })

                })
                .catch(error => {
                    alert("error");
                    console.log(error.message)
                })
        })
}