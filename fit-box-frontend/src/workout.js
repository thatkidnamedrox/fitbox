function createWorkoutCard(workout) {
    let card = document.createElement("div");
    $(card).attr("class", "card");
    $(card).attr("data-id", workout.id);
    $(card).attr("style", "width:600px; margin-bottom: 30px;")

    let cardHeader = document.createElement("div");
    $(cardHeader).attr("class", "card-header");
    $(card).append(cardHeader);

    let cardHeader2 = $(cardHeader).clone();

    let cardBody = document.createElement("div");
    $(cardBody).attr("class", "card-body");
    $(card).append(cardBody);

    let cardTitle = document.createElement("h5");
    $(cardTitle).attr("class", "card-title");
    $(cardTitle).text(workout.name);
    $(cardBody).append(cardTitle);

    console.log(workout.description)
    let cardText = document.createElement("p");
    $(cardText).attr("class", "card-text d-flex flex-column");
    if (workout.description) {
        $(cardText).text(workout.description);
    } else {
        $(cardText).text(";)");
    }

    $(cardBody).append(cardText);

    if (workout.video_link) {
        let videoLink = document.createElement("a");
        videoLink.href = "#";
        videoLink.className = "card-link";
        videoLink.innerText = "watch video";
        videoLink.style = "margin-top: 10px; margin-left: 15px;"

        $(videoLink).attr("data-toggle", "modal");
        $(videoLink).attr("data-target", ".display-workout-form");
        $(cardText).append(videoLink);
        $(videoLink).click(() => {
            displayVideo(workout.video_link);
        })
    }

    if (workout.bundles !== []) {
        let cardLink = document.createElement("button");
        cardLink.href = "#";
        cardLink.className = "btn btn-link collapsed";
        cardLink.innerText = "view details";
        $(cardLink).attr("data-toggle", "collapse");
        $(cardLink).attr("data-target", "#details-" + workout.id);
        $(cardLink).attr("aria-expanded", "false");
        $(cardLink).attr("aria-controls", "details-" + workout.id)

        let details = document.createElement("div");
        details.id = "details-" + workout.id;
        details.className = "collapse";
        $(details).attr("data-parent", ".card");
        details.innerHTML = `<div class="card-body"></div>`

        $(cardHeader2).append(cardLink);
        $(cardHeader2).append(details);
        $(card).append(cardHeader2);

        let muscles = [];
        let detailsBody = details.querySelector(".card-body");
        workout.bundles.forEach(bundle => {

            let exercisesUl = document.createElement("ul");
            exercisesUl.className = "list-group";
            bundle.exercises.forEach(exercise => {

                exercise.muscle_groups.forEach(muscle => {
                    muscles.push(muscle);
                })
                let exerciseLi = `
            <li class="list-group-item">
                ${exercise.name}
            </li>
            `
                $(exercisesUl).append(exerciseLi);
            })

            let title = "<h6>" + bundle.name + "</h6>";
            $(detailsBody).append(title);
            $(detailsBody).append(exercisesUl);
            $(detailsBody).append("<br>")

        })

        let cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";

        // console.log(muscles);
        let buttonContainer = document.createElement("div");
        buttonContainer.className = "container";
        buttonContainer.style = "display: flex; flex-flow: row wrap;"
        muscles.forEach(muscle => {
            let button = `<button type="button" class="btn btn-outline-secondary" style="margin:10px;">${muscle.name}</button>`;
            $(buttonContainer).append(button);
        })
        $(cardHeader).append(buttonContainer);

    }

    let removeButton = createRemoveButton();
    $(card).append(removeButton);

    $(removeButton).click(() => {
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            }
        }
        fetch(`${BASE_URL}/workouts/${workout.id}`, configObj)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                $(removeButton).parent().remove();
            })
    })



    return card;
}

function displayVideo(videoLink) {


    let modal = document.querySelector(".display-workout-form");
    let modalHeader = modal.querySelector(".modal-header");
    let modalBody = modal.querySelector(".modal-body");
    // let modalFooter = modal.querySelector(".modal-footer");

    let videoId = videoLink.slice(17);
    let embed = document.createElement("div");
    embed.className = "embed-responsive embed-responsive-16by9";
    embed.innerHTML = `<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videoId}"  allowfullscreen></iframe>`

    $(modalHeader).empty();
    $(modalBody).empty();
    $(modalBody).append(embed);





}