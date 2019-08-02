// function displayForm(user) {
//     let modalHeader = document.querySelector(".modal-title");
//     modalHeader.innerHTML = "Add Workout"
//     let modalBody = document.querySelector(".modal-body");
//     modalBody.innerHTML = `
//     <form action="${BASE_URL}/workouts" method="POST">
//     </form>
//     `
//     let form = modalBody.querySelector("form");
//     $(form).append(createGroup("workout", getSubGroupName("workout")));

//     let submitButton = document.createElement("button");
//     $(submitButton).attr("class", "btn btn-primary");
//     $(submitButton).attr("type", "submit");
//     $(submitButton).text("submit");
//     $(form).append(submitButton);

//     let count = {
//         bundle: 0,
//         exercise: 0,
//         set: 0,
//     }


//     $(form).on("click", ".add", (e) => {
//         let groupName = $(e.target).attr("class").split(" ")[1].split("-")[1];
//         count[groupName]++;

//         let group;
//         if (groupName === "exercise") {
//             group = createGroup(groupName, getSubGroupName(groupName), count[groupName]);
//             let bundle = $(e.target).parent()
//             let format = $(bundle).children("div.btn-group").find("input:checked").attr("id");
//             $(group).addClass(format);
//         } else if (groupName === "set") {
//             let exercise = $(e.target).parent();
//             let format = $(exercise).attr("class").split(" ")[2];
//             group = createGroup(groupName, null, count[groupName], format);
//         } else {
//             group = createGroup(groupName, getSubGroupName(groupName), count[groupName]);
//         }

//         let container = $(e.target).parent().children("." + groupName + "s");
//         $(container).append(group);

//     })

//     $(form).on("click", ".remove", (e) => {
//         $(e.target).parent().remove()
//     })

//     $(form).submit((e) => {
//         e.preventDefault();

//         let formData = {};
//         formData["workout"] = {
//             user_id: user.id
//         }
//         createFormData(formData);

//         configObj = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(formData)
//         }

//         console.log(formData);

//         fetch(`${BASE_URL}/workouts`, configObj)
//             .then(resp => resp.json())
//             .then(data => {
//                 console.log(data);
//             })
//             .catch(error => {
//                 alert("error");
//                 console.log(error.message);
//             })



//     })

// }

// function createFormData(formData) {

//     let workout = $("form").find(".workout");

//     let workoutAttributes = createAttributesHash(workout);
//     Object.keys(workoutAttributes).forEach((key) => {
//         formData["workout"][key] = workoutAttributes[key];
//     })

//     formData["workout"]["bundles_attributes"] = []
//     let bundles = $(workout).children(".bundles");
//     for (let bundle of $(bundles).children()) {

//         let bundleAttributes = createAttributesHash(bundle);
//         bundleAttributes["exercises_attributes"] = [];
//         let exercises = $(bundle).children(".exercises")

//         for (let exercise of $(exercises).children()) {

//             let exerciseAttributes = createAttributesHash(exercise);
//             exerciseAttributes["exercise_sets_attributes"] =[]
//             let sets = $(exercise).children(".sets");

//             for (let set of $(sets).children()) {
//                 let setAttributes = createAttributesHash(set);
//                 exerciseAttributes["exercise_sets_attributes"].push(setAttributes);
//             }

//             bundleAttributes["exercises_attributes"].push(exerciseAttributes);

//         }
//         formData["workout"]["bundles_attributes"].push(bundleAttributes);
//     }

//     return formData;
// }

// function createAttributesHash(group) {
//     let groupName = $(group).attr("class").split(" ")[0]
//     let attributesHash = {}
//     let attributesContainer = $(group).children("." + groupName + "-attributes");
//     let inputs = $(attributesContainer).find("input");
//     for (let input of inputs) {
//         let key = $(input).attr("name");
//         let val = $(input).val();
//         attributesHash[key] = val;
//     }

//     return attributesHash;
// }

// function getSubGroupName(groupName) {
//     let s = {
//         workout: "bundle",
//         bundle: "exercise",
//         exercise: "set"
//     }
//     return s[groupName];
// }

// function createGroup(groupName, subGroupName, n = 0, format = null) {
//     let identifier = groupName[0] + n

//     let group = document.createElement("div");
//     $(group).attr("class", groupName + " rounded");
//     $(group).attr("id", identifier);

    
//     let attributes;
//     if (groupName === "set") {
        
//         attributes = getFormatOptions(format);
//         console.log(attributes);
//     } else {
//         attributes = getGroupAttributes(groupName, format);
//     }


//     let attrFormGroups = createGroupAttributes(attributes, groupName);
//     $(group).append(attrFormGroups);

//     if (groupName === "exercise") {
//         let muscleGroups = createMuscleGroupSelect();
//         $(group).append(muscleGroups);
//     }


//     if (groupName !== "set") {
//         let subGroup = `
//         <div class="${subGroupName}s container"></div>`;
//         $(group).append(subGroup);

//         if (groupName === "bundle") {
//             let radioButtons = createRadioButtons(identifier);
//             $(group).append(radioButtons);
//         }

//         let addButton = createAddButton(subGroupName);
//         $(group).append(addButton);
//     }

    

//     if (groupName !== "workout") {
//         let removeButton = createRemoveButton();
//         $(group).append(removeButton);
//     }

//     return group;

// }

// function getFormatOptions(format = null) {
//     let formatOptions = {
//         rb: ["reps", "rest", "execution", "tempo"],
//         tb: ["time", "rest", "execution", "tempo"],
//         db: ["distance", "rest", "execution", "tempo"]
//     }
//     if (format) {
//         return formatOptions[format];
//     }
//     return formatOptions;
// }

// function getGroupAttributes(group, format) {
//     let groupAttributes = {
//         workout: ["name"],
//         bundle: ["name"],
//         exercise: ["name"]
//     }

//     if (format) {
//         return getFormatOptions[format];
//     }
//     return groupAttributes[group];
// }

// function createGroupAttributes(attributes, group) {
//     let attrFormGroups = document.createElement("div");
//     $(attrFormGroups).attr("class", group + "-attributes");

//     // <label for=${attr}>${group}: ${attr}</label>
//     if (group === "set") {
//         console.log(attributes);
//         let inputGroup = document.createElement("div");
//         $(inputGroup).attr("class", "input-group");
//         attributes.slice(0, 2).forEach(attr => {
//             inputGroup.innerHTML += `
//                 <input name="${attr}" placeholder="${attr.substring(0, 4)}" class="form-control"/>
//             `
//         })
//         $(attrFormGroups).append(inputGroup);

//         attributes.slice(2).forEach(attr => {
//             attrFormGroups.innerHTML += `
//                 <input name="${attr}" placeholder="${attr.substring(0, 4)}" class="form-control"/>
//             `
//         })
//     } else {
//         $(attrFormGroups).attr("class", group + "-attributes form-row");
//         // "${(group !== 'workout') ? 'sr-only' : ''}"
//         attributes.forEach(attr => {
//             attrFormGroups.innerHTML += `
//         <div class="form-group col-sm-12">
//             <label class="sr-only" for=${attr}>${group}: ${attr}</label>
//             <input name="${attr}" class="form-control"  placeholder="${group}:${attr}"/>
//         </div>
//         `
//         })
//     }

//     return attrFormGroups
// }

// function createRadioButtons(identifier) {
//     let fieldset = document.createElement("div");
//     $(fieldset).attr("class", "btn-group btn-group-toggle");
//     $(fieldset).attr("data-toggle", "buttons");
//     // let row = document.createElement("div");
//     // $(row).attr("class", "row");
//     // let column = document.createElement("div");
//     // $(column).attr("class", "col-sm-10");

//     // $(row).append(column);
//     // $(fieldset).append(row);


//     Object.keys(getFormatOptions()).forEach(format => {
//         // let radioButton = `
//         // <div class="form-check form-check-inline">
//         //     <input class="form-check-input" type="radio" name=${identifier} id="${format}"/>
//         //     <label class="form-check-label">${format}</label>
//         // </div>
//         // `
//         let radioButton = `
//         <label class="btn btn-secondary ${(format === "rb")?'active':''}">
//             <input type="radio" name="${identifier}" id="${format} autocomplete="off"  ${(format === "rb")?'checked':''}/>${format}
//         </label>
//         `;
//         $(fieldset).append(radioButton);
//     })

//     // let checked = $(field).find(`input[id="rb"]`).prop("checked", true);
//     // console.log(checked);
//     return fieldset;
// }

// function createRemoveButton() {
//     let button = `<button class="remove btn btn-primary" type="button">remove</button>`;
//     return button;
// }

// function createAddButton(subGroup) {
//     let button = `<button class="add add-${subGroup} btn btn-primary" type="button">add ${subGroup}</button>`;
//     return button;
// }

// function createMuscleGroupSelect() {
//     let muscleGroups = [
//         'quadriceps',
//         'hamstrings',
//         'calves',
//         'chest',
//         'back',
//         'shoulders',
//         'triceps',
//         'biceps',
//         'forearms',
//         'trapezius',
//         'abdominals'
//     ]
    
    
//     let dropdown = document.createElement('div');
//     $(dropdown).attr("class", "dropdown");
//     dropdown.innerHTML += `
//     <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//         Dropdown button
//     </button>
//     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    
//     </div>
//     `
   
//     let dropdownMenu = $(dropdown).find(".dropdown-menu")
//     muscleGroups.forEach(m => {
//         let item = document.createElement("a");
//         $(item).attr("class", "dropdown-item");
//         $(item).attr("href", "#");
//         $(item).text(m)

//         $(dropdownMenu).append(item);

//         $(item).click((e) => {
//             let text = $(item).text()
//             console.log($(item).text())
//             let tag = document.createElement("p");
//             $(tag).attr("class","border rounded");
//             $(tag).text(text);

//             let close = document.createElement("button");
//             $(close).attr("type", "button");
//             $(close).attr("class", "close");
//             close.innerHTML = `<span aria-hidden="true">&times;</span>`
//             $(tag).append(close);
//             $(dropdown).append(tag);

//             $(close).click(() => {
//                 $(close).parent().remove()
//             })
//         })
        
//     })

//     // console.log(dropdownMenu)
//     return dropdown;
// }

