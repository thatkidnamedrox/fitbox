function displayEditProfileForm(user) {
    let modalHeader = document.querySelector(".modal-title");
    modalHeader.innerHTML = "Edit Profile"
    let modalBody = document.querySelector(".modal-body");

    modalBody.innerHTML = `
    <form action="${BASE_URL}/users/${user.id}" method="PATCH">
       
        <div class="form-group row">
            <label class="col-sm-2 profile-img col-form-label" for="profile-img">img-url</label>
            <div class="col-sm-10">
            <input type="text" class="profile-img-input form-control-plaintext" id="profile-img" value="${user.profile_img_url}">
            </div>
        </div>
        <div class="form-group row">
            <label for="username" class="col-sm-2 col-form-label">username</label>
            <div class="col-sm-10">
                <input type="text" class="form-control-plaintext" id="username" value="${user.username}"/>
            </div>
        </div>
        <div class="form-group row">
            <label for="bio" class="col-sm-2 col-form-label">bio</label>
            <div class="col-sm-10">
                <input type="textarea" class="form-control-plaintext" id="bio" value="${user.bio ? user.bio : ""}"/>
            </div>
        </div>
        <button class="btn btn-primary" type="submit">submit</button>
    </form>
    <button class="btn btn-primary btn-block delete-button" type="button" data-dismiss="modal">delete account</button>
    `



    let form = modalBody.querySelector("form");
    let customFileLabel = form.querySelector(".custom-file-label");
    $(modalBody).on("change", function (e) {
        console.log(e.target)

        if ($(e.target).attr("class") === "custom-file-input") {
            var fileName = $(e.target).val().split("\\").pop();
            $(e.target).siblings(".custom-file-label").addClass("selected").html(fileName);
        }

    });
    $(form).submit((e) => {
        e.preventDefault();

        let inputs = $(form).find("input")


        let formData = {
            profile_img_url: $(inputs[0]).val(),
            username: $(inputs[1]).val(),
            bio: $(inputs[2]).val()
        }
        let configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        }

        fetch(`${BASE_URL}/users/${user.id}`, configObj)
            .then(res => res.json())
            .then(data => displayProfile(data))

    })

    let deleteButton = modalBody.querySelector(".delete-button");

    $(deleteButton).click(() => {
        let configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json'
            }
        }
        fetch(`${BASE_URL}/users/${user.id}`, configObj)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                localStorage.removeItem('user_id');
                displayLogin();
            })

    })



}