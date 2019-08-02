// function createForm(user) {
//     let form = document.createElement("form");
//     $(form).attr("action", "/workouts");
//     $(form).attr("method", "POST");

//     $(form).append(createWorkout());

    // let submitButton = document.createElement("button");
    // $(submitButton).attr("type", "submit");
    // $(submitButton).text("SUBMIT");
    // $(form).append(submitButton);

//     $(".modal-body").empty();
//     $(".modal-body").append(form);
//     // console.log($(".form-container"))

//     $(form).on("click", "#add-bundle", () => {
//         let bundleAttributes = ["name"];
//         let bundle = createBundle(bundleAttributes, nBs);
//         nBs++;
//         $("#bundles").append(bundle);
//     })

//     $(form).on("click", ".add-exercise", (e) => {
//         let exerciseAttributes = ["name"];
//         let bundle = $(e.target).parent()
//         let name = $(bundle).attr("id")

//         let format = $(bundle).find("input[name=" + $(bundle).attr("id") + "]:checked").attr("class");

//         let exercise = createExercise(exerciseAttributes, nEs, format);
//         nEs++;
//         $(bundle).children(".exercises").append(exercise);
//     })

//     $(form).on("click", ".add-set", (e) => {

//         // identify exercise
//         let exercise = $(e.target).parent();
//         let className = $(exercise).attr("id");

//         // identify format 
//         let format = $(exercise).attr("class").split(" ")[1];

//         let formatOptions = {
//             rb: ["sets", "reps", "rest", "execution", "tempo"],
//             tb: ["sets", "time", "rest", "execution", "tempo"],
//             db: ["sets", "distance", "rest", "execution", "tempo"]
//         }

//         let setsAttributes = formatOptions[format];
//         let set = createSet(setsAttributes, nSs);
//         nSs++;

//         // get setsUl from exercise
//         let setsUl = $(exercise).children(".sets")
//         $(setsUl).append(set);
//     })

//     $(form).on("click", ".remove", (e) => {
//         $(e.target).parent().remove()
//         console.log("hey");
//     })

//     $(form).submit((e) => {
//         e.preventDefault();

//         let formData = {}
//         formData["workout"] = {
//             user_id: user.id
//         }
//         let workout = $("form").children("#workout");
//         let workoutAttributesUl = $(workout).children("#workout-attributes");
//         for (let attributeLi of workoutAttributesUl.children()) {
//             let inputs = $(attributeLi).children("input");
//             for (let input of inputs) {
//                 let val = $(input).val();
//                 let key = $(input).attr("name");

//                 formData["workout"][key] = val;
//             }
//         }

//         formData["workout"]["bundles_attributes"] = []
//         let bundlesUl = $(workout).children("#bundles");
//         for (let bundle of bundlesUl.children()) {

//             let bundleAttributes = createAttributesHash(bundle, "bundle");
//             bundleAttributes["exercise_sets_attributes"] = []

//             let exercisesUl = $(bundle).children(".exercises");
//             for (let exercise of exercisesUl.children()) {



//                 let exerciseAttributes = createAttributesHash(exercise, "exercise");

//                 let setsUl = $(exercise).children(".sets");
//                 for (let set of setsUl.children()) {
//                     let setAttributes = createAttributesHash(set, "set");
//                     setAttributes["exercise_attributes"] = exerciseAttributes;
//                     bundleAttributes["exercise_sets_attributes"].push(setAttributes);
//                 }

//             }
//             formData["workout"]["bundles_attributes"].push(bundleAttributes);

//         }

//         configObj = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(formData)
//         }

//         fetch(`$(BASE_URL)/workouts`, configObj)
//             .then(resp => resp.json())
//             .then(data => {
//                 console.log(data);
//                 //$(form).remove();
//             })
//             .catch(error => {
//                 alert("Error.");
//                 console.log(error.message);
//             })

//     })


// }


// // helper functions
// function createAttributesHash(element, name) {
//     let attributesHash = {}
//     let attributesUl = $(element).children("." + name + "-attributes");
//     for (let attributeLi of attributesUl.children()) {
//         let inputs = $(attributeLi).children("input");
//         for (let input of inputs) {
//             let val = $(input).val();
//             let key = $(input).attr("name");

//             attributesHash[key] = val;
//             //console.log(key);
//         }
//     }
//     return attributesHash;
// }

// let nBs = 0;
// let nEs = 0;
// let nSs = 0;

// function createWorkout() {
//     let workout = document.createElement("ul");
//     $(workout).attr("id", "workout");

//     let attributes = ["name"]
//     let attributesUl = createAttributesUl(attributes, "workout");

//     let bundlesUl = document.createElement("ul");
//     $(bundlesUl).attr("id", "bundles");

//     let addButton = createAddButton("bundle");

//     $(workout).append(attributesUl);
//     $(workout).append(bundlesUl);
//     $(workout).append(addButton);

//     return workout;

// }

// function createExercise(attributes, n, format) {
//     // create unique identity
//     let identifier = "e" + n;

//     // create exercise container
//     let exercise = document.createElement("li");
//     $(exercise).attr("class", "exercise " + format);
//     $(exercise).attr("id", identifier);

//     // create list of bundle attributes
//     let attributesUl = createAttributesUl(attributes, "exercise");

//     // create list of sets
//     let setsUl = document.createElement("ul");
//     $(setsUl).attr("class", "sets");

//     $(exercise).append(attributesUl);
//     $(exercise).append(setsUl);

//     let addButton = createAddButton("set");

//     // append addButton
//     $(exercise).append(addButton);

//     let removeButton = createRemoveButton();
//     $(exercise).append(removeButton);
//     return exercise;
// }

// function createSet(attributes, n) {
//     // create unique identity
//     let identifier = "s" + n;

//     // create set container
//     let set = document.createElement("li");
//     $(set).attr("class", "set");
//     $(set).attr("id", identifier);

//     // create list of set attributes
//     let attributesUl = createAttributesUl(attributes, "set");

//     $(set).append(attributesUl);
//     let removeButton = createRemoveButton();
//     $(set).append(removeButton);
//     return set;

// }

// function createBundle(attributes, n) {
//     // create unique identity
//     let identifier = "b" + n;

//     // create bundle container
//     let bundle = document.createElement("li");
//     $(bundle).attr("class", "bundle");
//     $(bundle).attr("id", identifier);

//     // create list of bundle attributes
//     let attributesUl = createAttributesUl(attributes, "bundle");

//     // create list of exercises
//     let exercisesUl = document.createElement("ul");
//     $(exercisesUl).attr("class", "exercises");

//     // create list of exercise formats
//     let formatsUl = document.createElement("ul");
//     $(formatsUl).attr("class", "format-options");

//     // avaliable exercise formats
//     let formatOptions = {
//         rb: ["sets", "reps", "rest", "execution", "tempo"],
//         tb: ["sets", "time", "rest", "execution", "tempo"],
//         db: ["sets", "distance", "rest", "execution", "tempo"]
//     }

//     // declare re-used variables here
//     let label;
//     let input;

//     // create radio button for each format
//     Object.keys(formatOptions).forEach(format => {

//         // create formatLi
//         let formatLi = document.createElement("li");

//         // create label
//         label = document.createElement("label");
//         //label.attr("for", format)

//         // create input
//         input = document.createElement("input");
//         $(input).attr("type", "radio");
//         $(input).attr("name", identifier);
//         $(input).attr("class", format);

//         // check "rb" as default
//         if (format == "rb") {
//             $(input).prop("checked", true);
//         }

//         // append label and input to formatLi
//         $(formatLi).append(label);
//         $(formatLi).append(input);

//         // append formatLi to list of formats
//         $(formatsUl).append(formatLi);

//     })

//     // append lists to bundle
//     $(bundle).append(attributesUl);
//     $(bundle).append(exercisesUl);
//     $(bundle).append(formatsUl);

//     let addButton = createAddButton("exercise");

//     // append addExerciseButton
//     $(bundle).append(addButton);

//     let removeButton = createRemoveButton();
//     $(bundle).append(removeButton);

//     return bundle;
// }

// function createAddButton(type) {
//     let button = document.createElement("button");
//     if (type !== "bundle") {
//         $(button).attr("class", "add-" + type);
//     } else {
//         $(button).attr("id", "add-" + type);
//     }

//     $(button).attr("type", "button");
//     $(button).text("ADD " + type.toUpperCase());
//     return button;
// }

// function createRemoveButton() {
//     let button = document.createElement("button");
//     $(button).attr("class", "remove");
//     $(button).attr("type", "button");
//     $(button).text("REMOVE");
//     return button;
// }

// function createAttributesUl(attributes, type) {
//     let attributesUl = document.createElement("ul");
//     if (type !== "workout") {
//         $(attributesUl).attr("class", type + "-attributes");
//     } else {
//         $(attributesUl).attr("id", type + "-attributes");
//     }

//     attributes.forEach(attr => {
//         // create attributeLi
//         let attributeLi = document.createElement("li");

//         label = document.createElement("label");
//         $(label).attr("for", attr);
//         $(label).text(attr);

//         input = document.createElement("input");
//         $(input).attr("name", attr);

//         $(attributeLi).append(label);
//         $(attributeLi).append(input);

//         // append attributeLi to list of attributes
//         $(attributesUl).append(attributeLi);
//     })

//     return attributesUl;
// }