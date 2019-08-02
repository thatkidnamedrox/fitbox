function displayWorkoutForm(user) {

    let numCount = {
        workout: 0,
        bundle: 0,
        exercise: 0,
        set: 0
    }

    let getModelInfo = (modelName) => {
        // could use fetch instead?
        let models = {
            workout: {
                subGroup: "bundle",
                attributes: ["name", "description", "video_link"]
            },
            bundle: {
                subGroup: "exercise",
                attributes: ["name"]
            },
            exercise: {
                subGroup: "set",
                attributes: ["name"]
            },
            set: {
                attributes: getFormatOptions()
            }
        }


        return models[modelName];
    }

    let getFormatOptions = (keysOnly = false) => {
        let options = {
            rb: ["reps", "rest", "execution", "tempo"],
            tb: ["time", "rest", "execution", "tempo"],
            db: ["distance", "rest", "execution", "tempo"]
        }

        if (keysOnly)
            return Object.keys(options);

        return options;
    }

    let createModel = (modelName, format = null) => {
        let createModelAttributes = (modelName) => {
            let atttributesContainer = document.createElement("div");
            atttributesContainer.className = modelName + "-attributes";

            let attributes = getModelInfo(modelName).attributes;

            if (modelName === "set") {
                let setAttributes = attributes[format];
                console.log(attributes);
                let inputGroup = document.createElement("div");
                inputGroup.className = "input-group";
                setAttributes.slice(0, 2).forEach(attr => {
                    inputGroup.innerHTML += `
                    <input name="${attr}" placeholder="${attr.substring(0, 4)}" class="form-control"/>`
                })
                $(atttributesContainer).append(inputGroup);
                setAttributes.slice(2).forEach(attr => {
                    atttributesContainer.innerHTML += `
                    <input name="${attr}" placeholder="${attr.substring(0, 4)}" class="form-control"/>`
                })
            } else {
                $(atttributesContainer).addClass("form-row");
                attributes.forEach(attr => {
                    atttributesContainer.innerHTML += `
                    <div class="form-group col-sm-12">
                        <label class="sr-only" for=${attr}>${modelName}: ${attr}</label>
                        ${(attr !== "description") ? `<input name="${attr}" class="form-control"  placeholder="${modelName}:${attr}"/>` :
                        `<textarea name="${attr}" class="form-control"  placeholder="${modelName}:${attr}"></textarea>`
                        }
                    </div>`
                })
            }

            return atttributesContainer;
        }

        let id = modelName[0] + numCount[modelName];

        let model = document.createElement("div");
        model.className = modelName + " rounded";
        model.id = id;

        $(model).append(createModelAttributes(modelName));

        let subGroupName = getModelInfo(modelName).subGroup;

        if (subGroupName) {

            if (modelName === "exercise") {
                let options = [
                    'quadriceps',
                    'hamstrings',
                    'calves',
                    'chest',
                    'back',
                    'shoulders',
                    'triceps',
                    'biceps',
                    'forearms',
                    'trapezius',
                    'abdominals'
                ]
                let dropdown = createDropdown(options);
                console.log(model, dropdown);
                $(model).append(dropdown);
            }

            let subGroup = document.createElement("div");
            subGroup.className = subGroupName + "s container"
            $(model).append(subGroup);

            let radioButtons;
            if (modelName === "bundle") {
                let options = getFormatOptions(true);
                radioButtons = createRadioButtons(id, options);
                $(model).append(radioButtons);
            }


            let addButton = createAddButton(subGroupName);
            $(model).append(addButton);

            $(addButton).click((e) => {

                let subModel;
                if (subGroupName === "exercise") {
                    subModel = createModel(subGroupName);
                    let selectedFormat = $(radioButtons).find("input:checked").attr("id");
                    $(subModel).addClass(selectedFormat);
                } else if (subGroupName === "set") {
                    let exerciseFormat = $(e.target).parent().attr("class").split(" ")[2];
                    subModel = createModel(subGroupName, exerciseFormat);
                } else {
                    subModel = createModel(subGroupName);
                }

                $(subGroup).append(subModel);
            })

        }

        if (modelName !== "workout") {
            let removeButton = createRemoveButton();
            $(model).append(removeButton);

            $(removeButton).click(() => {
                console.log("removed");
                $(removeButton).parent().remove()
            })
        }

        return model;
    }


    let createFormData = () => {

        let createModelAttributesHash = (model, object) => {
            let name = $(model).attr("class").split(" ")[0];
            let hash = {}
            let container = $(model).children("." + name + "-attributes");
            let inputs = $(container).find("input");
            let textareas = $(container).find("textarea");
            for (let input of inputs) {
                let key = $(input).attr("name");
                let val = $(input).val();
                hash[key] = val;
            }

            for (let textarea of textareas) {
                let key = $(textarea).attr("name");
                let val = $(textarea).val();
                hash[key] = val;
            }


            return hash;
        }

        let formData = {};
        formData["workout"] = {
            user_id: user.id
        }


        let workout = $(form).find(".workout");
        Object.assign(formData["workout"], createModelAttributesHash(workout, formData["workout"]));

        formData["workout"]["bundles_attributes"] = [];
        let bundles = $(workout).find(".bundles");
        for (let bundle of $(bundles).children()) {

            let bundleAttributes = createModelAttributesHash(bundle);
            bundleAttributes["exercises_attributes"] = [];

            let exercises = $(bundle).children(".exercises")
            for (let exercise of $(exercises).children()) {

                
                let exerciseAttributes = createModelAttributesHash(exercise);
                exerciseAttributes["exercise_sets_attributes"] = []
                exerciseAttributes["muscle_groups_attributes"] = [];

                let tags = $(exercise).find(".tag p");
                for (let tag of tags) {
                    exerciseAttributes["muscle_groups_attributes"].push({name: tag.innerText})
                    console.log(tag)
                }

                let sets = $(exercise).children(".sets");
                for (let set of $(sets).children()) {
                    let setAttributes = createModelAttributesHash(set);
                    exerciseAttributes["exercise_sets_attributes"].push(setAttributes);
                }

                bundleAttributes["exercises_attributes"].push(exerciseAttributes);

            }
            formData["workout"]["bundles_attributes"].push(bundleAttributes);
        }
        return formData;
    }

    let modal = document.querySelector(".display-workout-form");
    let modalHeader = modal.querySelector(".modal-header");
    let modalBody = modal.querySelector(".modal-body");
    let modalFooter = modal.querySelector(".modal-footer");

    modalHeader.innerHTML = "Add Workout";

    let form = createForm("/workouts", "POST");
    $(modalBody).empty();
    $(modalBody).append(form);

    let workoutGroup = createModel("workout");
    $(form).prepend(workoutGroup);



    $(form).submit((e) => {
        e.preventDefault();
        let formData = createFormData();

        configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }

        let workoutsContainer = $("main").find("#user-workouts");
        fetch(`${BASE_URL}/workouts`, configObj)
            .then(resp => resp.json())
            .then(workout => {
                let workoutCard = createWorkoutCard(workout);
                $(workoutsContainer).prepend(workoutCard);
            })
            .catch(error => {
                alert("error");
                console.log(error.message);
            })
    })



}