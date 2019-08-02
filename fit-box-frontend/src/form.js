function createForm(action, method) {
    let form = document.createElement("form");
    $(form).attr("action", BASE_URL + action);
    $(form).attr("method", method);

    let submitButton = document.createElement("button");
    $(submitButton).attr("class", "btn btn-primary");
    $(submitButton).attr("type", "submit");
    $(submitButton).text("submit");

    $(form).append(submitButton);

    return form;
}

function createRadioButtons(name, options) {
    let btnGroup = document.createElement("div");
    $(btnGroup).attr("class", "btn-group btn-group-toggle");
    $(btnGroup).attr("data-toggle", "buttons");


    options.forEach(option => {
        let radioButton = `
        <label class="btn btn-secondary ${(option === "rb")?'active':''}">
            <input type="radio" name="${name}" id="${option}" autocomplete="off"  ${(option === "rb")?'checked':''}/>${option}
        </label>
        `
        $(btnGroup).append(radioButton);
    })


    return btnGroup;
}

function createRemoveButton() {
    let button = document.createElement("button");
    button.className = "remove btn btn-primary";
    button.type = "button";
    button.innerText =  "remove"
    // let button = `<button class="remove btn btn-primary" type="button">remove</button>`;
    return button;
}

function createAddButton(name) {
    let button = document.createElement("button");
    button.className = "add add-" + name + " btn btn-primary";
    button.type = "button";
    button.innerText =  "add " + name
    // let button = `<button class="add add-${name} btn btn-primary" type="button">add ${name}</button>`;
    return button;
}

function createDropdown(options) {
    let dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    let button = document.createElement("button");
    button.className = "btn btn-secondary dropdown-toggle";
    button.type = "button";
    button.id = "dropdownMenuButton";
    $(button).attr("data-toggle", "dropdown");
    $(button).attr("aria-haspopup", "true");
    $(button).attr("aria-expanded", "false");
    $(button).text("muscle groups")
    $(dropdown).append(button);
   

    let dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown-menu";
    $(dropdown).append(dropdownMenu);
    options.forEach(option => {
        let item = document.createElement("a");
        item.className = "dropdown-item";
        item.href = "#";
        item.text = option;

        $(dropdownMenu).append(item);

        $(item).click(() => {
            let tag = document.createElement("div");
            tag.className = "tag border rounded";
            tag.innerHTML = "<p>" + option + "</p>" ;

            let close = document.createElement("button");
            close.type = "button";
            close.className = "close";
            close.innerHTML = `<span aria-hidden="true">&times;</span>`;

            $(tag).append(close);
            $(dropdown).append(tag);

            $(close).click(() => {
                $(close).parent().remove();
            })

        })

    })

    return dropdown;

}

