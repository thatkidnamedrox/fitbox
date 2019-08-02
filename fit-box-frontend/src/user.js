function displayLogin() {
    let head = document.querySelector("head");
    head.innerHTML += `
    <link rel="stylesheet" href="css/landing.css">
    `

    let header = document.querySelector("header");
    header.innerHTML = "";
    let mainContainer = document.querySelector('main');
    mainContainer.innerHTML = `
    <div class="text-center">
    <form class="form-signin" method="POST" action="${BASE_URL}/login">
        <h1>:)</h1>
        <label for="username" class="sr-only">username</label> 
        <input type="text" name="username" class="form-control" placeholder="username" required autofocus/>
        <label for="password" class="sr-only">password</label>
        <input type="password" name="password" class="form-control" placeholder="password" required/>
        <button class="btn btn-lg btn-primary btn-block" type="submit">login</button>
    </form>
    <a href="#" class="sign-in">Don't have an account?</a>
    </div>
    `



    $("a.sign-in").click(() => {
        displaySignUp();
    })

    const loginForm = mainContainer.querySelector('form');
    $(loginForm).on('submit', (e) => {
        e.preventDefault();


        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: $(loginForm).children("input[name='username']").val(),
                password: $(loginForm).children("input[name='password']").val()
            })
        }

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch(`${BASE_URL}/login`, configObj)
            .then(handleErrors)
            .then(res => res.json())
            .then(user => {
                localStorage.setItem("user_id", user.id);
                displayPage(user);
            })
            .catch(err => {
                console.log(err);
            })
    })
}

function displayNavBar() {
    let header = document.querySelector('header');
    header.innerHTML = `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top container">
    <a class="navbar-brand" href="#">fitbox</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#" id="home">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="community">Community</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#" id="profile">Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="logout">Logout</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
    ` + header.innerHTML
}

function displayPage(user) {
    let mainContainer = document.querySelector("main");
    mainContainer.innerHTML = ""
    displayNavBar();

    const logoutButton = document.getElementById('logout');
    $(logoutButton).on('click', (e) => {

        localStorage.removeItem('user_id')
        let configObject = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE"
            },
            body: JSON.stringify({
                id: user.id
            })
        }

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch(`${BASE_URL}/logout`, configObject)
            .then(handleErrors)
            .then(resp => resp.text())
            .then(res => {

                console.log(res);
            })

        displayLogin();



    })
    const navBar = document.querySelector(".navbar-nav");
    // const profileButton = document.getElementById('profile');

    console.log(user);
    displayProfile(user);

    $(navBar).on('click', (e) => {
        fetch(`${BASE_URL}/users/${user.id}`)
            .then(res => res.json())
            .then(data => user = data)
            .then(u => {
                const nav = $(e.target).parent();
                let navLis = $(navBar).children("li");
                for (let navLi of navLis) {
                    $(navLi).removeClass("active");
                }
                $(nav).addClass("active");

                if ($(e.target).attr("id") === "profile") {
                    displayProfile(u);
                }

                if ($(e.target).attr("id") === "home") {
                    displayFeed(u);
                }

                if ($(e.target).attr("id") === "community") {
                    displayCommunity(u);
                }
            })



    })


}

function displayFeed(user) {
    let mainContainer = document.querySelector("main");
    $(mainContainer).empty();

    fetch(`${BASE_URL}/workouts`)
        .then(resp => resp.json())
        .then(workouts => {
            // console.log(userWorkouts);
            workouts.forEach(workout => {
                let workoutCard = createWorkoutCard(workout);
                $(mainContainer).append(workoutCard);
            })
        })
        .catch(error => {
            alert("error");
            console.log(error.message)
        })

    // fetch(`${BASE_URL}/follows/${user.id}`)
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data)
    // })
}

function displaySignUp() {
    let mainContainer = document.querySelector('main');
    mainContainer.innerHTML = `
    <div class="text-center">
    <form class="form-signup" action="${BASE_URL}/users" method="POST">
        <h1>;)</h1>
        <label for="username" class="sr-only">username</label> 
        <input type="text" name="username" class="form-control" placeholder="username" required autofocus/>
        <label for="email" class="sr-only">email</label>
        <input type="email" name="email" class="form-control" placeholder="email"/>
        <label for="password" class="sr-only">password</label>
        <input type="password" name="password" class="form-control" placeholder="password" required/>
        <label for="password_confirmation" class="sr-only">password_confirmation</label>
        <input type="password" name="password_confirmation" class="form-control" placeholder="confirm password"/>
        <button class="btn btn-lg btn-primary btn-block" type="submit">register</button>
    </form>
    <a href="#" class="login">Already have an account?</a>
    </div>
    `
    $("a.login").click(() => {
        displayLogin();
    })

    const signUpForm = mainContainer.querySelector('form');
    $(signUpForm).on('submit', (e) => {
        e.preventDefault();

        let form = e.target;

        let user = {
            username: "alsoknownasrox",
            email: "roxanne.harris@yale.edu",
            password: "palace",
            password_confirmation: "palace"
        }

        let inputs = $(form).children("input");


        for (let input of inputs) {
            user[input.name] = $(input).val();
        }

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                user
            })
        }

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        fetch(`${BASE_URL}/users`, configObj)
            .then(handleErrors)
            .then(res => res.json())
            .then(user => {
                console.log(user);
                localStorage.setItem("user_id", user.id)
                displayHomePage(user);
            })
            .catch(err => {
                console.log(err);
            })
    })
}


function getCurrentUserId() {
    return localStorage.getItem("user_id");
}