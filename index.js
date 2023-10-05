var form = document.getElementById("myForm");
form.addEventListener("submit", submitted);

document.addEventListener('DOMContentLoaded', function () {
    console.log("Document is loaded and ready.");
    handleSelectChange();
});

//initially we are setting to false
var validFirstName = false;
var validLastName = false;
var validEmail = false;
var validPhone = false;
var validZipcode = false;
var validCheckboxes = false;
var titleSelected = false;

var regExName = /^[a-zA-Z]+$/;
var regExEmail = /([\w\.]+)@(\bnortheastern\b)\.\bedu\b$/;
var regExPhone = /\d{3}-?\d{3}-\d{4}$/;
var regExZipcode = /^\d{5}$/;

//values
var firstName = document.getElementById("firstName");
firstName.addEventListener("input", validate);

var lastName = document.getElementById("lastName");
lastName.addEventListener("input", validate);

var emailId = document.getElementById("emailId");
emailId.addEventListener("input", validate);

var phoneNumber = document.getElementById("phoneNumber");
phoneNumber.addEventListener("input", validate);

var zipcode = document.getElementById("zipcode");
zipcode.addEventListener("input", validate);

var button = document.getElementById("button");
button.addEventListener("click", submit);


//write a function to validate my inputs
function validate(e) {

    var value = e.target.value;
    var type = this.id; //we are getting ID of the field
    var em = "error_" + type;

    console.log(type, value);

    switch (type) {
        case "firstName":
            if (value.length > 10 || value.length < 5) {
                document.getElementById(em).style.display = "block";
                document.getElementById(em).innerHTML = "The length should be between 5 and 10 characters";
                this.style.border = "2px solid red";
                validFirstName = false;
                console.log("validFirstName", validFirstName);
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validFirstName = true;
                console.log("validFirstName", validFirstName);
            }
            break;
        case "lastName":
            if (value.length > 10 || value.length < 5) {
                document.getElementById(em).style.display = "block";
                document.getElementById(em).innerHTML = "The length should be between 5 and 10 characters";
                this.style.border = "2px solid red";
                validLastName = false;
                console.log("validLastName", validLastName);
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validLastName = true;
                console.log("validLastName", validLastName);
            }
            break;
        case "emailId":
            if (!value.trim().match(regExEmail)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validEmail = false;
                console.log("valid Email", validEmail);
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validEmail = true;
                console.log("valid Email", validEmail);
            }
            break;
        case "phoneNumber":
            if (!value.trim().match(regExPhone)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validPhone = false;
                console.log("valid Phone", validPhone);
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validPhone = true;
                console.log("valid Phone", validPhone);
            }
            break;
        case "zipcode":
            if (!value.trim().match(regExZipcode)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validZipcode = false;
                console.log("valid Zipcode", validZipcode);
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validZipcode = true;
                console.log("valid Zipcode", validZipcode);
            }
            break;
    }
    validateSubmitButton();
}

function validateSubmitButton() {
    if (validPhone && validFirstName && validLastName && validEmail && validZipcode && validCheckboxes && titleSelected) {
        document.getElementById("button").disabled = false;
    }
    else {
        document.getElementById("button").disabled = true;
    }
}
//write a function submitted
function submitted(e) {

    if (validName && validEmail && validPhone && validZipcode) {
        alert("Data entered Succesful");
    }
    else {
        alert("Please enter valid and all details");
    }
}

function submit(e) {
    e.preventDefault();

    if (validFirstName && validLastName && validEmail && validPhone && validZipcode && validCheckboxes) {
        var formData = new FormData(form);

        var tableBody = document.querySelector("#formDataTable tbody");
        var tableHeaders = document.querySelector("#tableHeaders");

        // Clear previous table data and headers
        tableBody.innerHTML = "";
        tableHeaders.innerHTML = "";

        formData.forEach(function (value, key) {
            var row = document.createElement("tr");

            // Check if it's the first row, i.e., header row
            if (tableHeaders.children.length === 0) {
                var th = document.createElement("th");
                th.textContent = key;
                tableHeaders.appendChild(th);
            }

            var labelCell = document.createElement("td");
            labelCell.textContent = key;

            var valueCell = document.createElement("td");
            valueCell.textContent = value;

            row.appendChild(labelCell);
            row.appendChild(valueCell);

            tableBody.appendChild(row);
        });

        document.getElementById("myForm").reset();

        alert("Data entered successfully. Form data has been added to the table.");
    } else {
        alert("Please enter valid and all details");
    }
}

var selectbox = document.getElementById("selectbox");
selectbox.addEventListener("change", handleSelectChange);

function handleSelectChange() {
    var selectedOption = selectbox.value;
    var checkboxContainer = document.getElementById("checkboxContainer");

    var textContainer = document.getElementById("textContainer");

    // Clear any existing text field
    while (textContainer.firstChild) {
        textContainer.removeChild(textContainer.firstChild);
    }

    // Clear any existing checkboxes
    while (checkboxContainer.firstChild) {
        checkboxContainer.removeChild(checkboxContainer.firstChild);
    }

    if (selectedOption === "volvo") {
        createCheckbox("volvoCheckbox", "Red");
        createCheckbox("volvoCheckbox", "Blue");
        createCheckbox("volvoCheckbox", "Green");
    } else if (selectedOption === "saab") {
        createCheckbox("saabCheckbox", "Beige");
        createCheckbox("saabCheckbox", "Black");
        createCheckbox("saabCheckbox", "White");
        createCheckbox("saabCheckbox", "Silver");
    } else if (selectedOption === "mercedes") {
        createCheckbox("mercedesCheckbox", "Dark Red");
        createCheckbox("mercedesCheckbox", "Dark Blue");
    } else if (selectedOption === "audi") {
        createCheckbox("audiCheckbox", "Orange");
        createCheckbox("audiCheckbox", "Blue");
        createCheckbox("audiCheckbox", "Purple");
    } else if (selectedOption === "bmw") {
        createCheckbox("audiCheckbox", "Orange");
        createCheckbox("audiCheckbox", "Blue");
    }
}

function mandatoryCheckboxes() {
    validCheckboxes = false;
    var checkboxesList = document.getElementsByName('source');
    console.log(checkboxesList);
    for (var i = 0; i < checkboxesList.length; i++) {
        console.log(checkboxesList[i]);
        if (checkboxesList[i].checked) {
            validCheckboxes = true;
            break;
        }
    }

    validateSubmitButton();
}

function mandatoryRadioButton() {
    var titleRadios = document.getElementsByName("title");
    titleSelected = false;

    console.log('titelndfjsndofjno')

    for (var i = 0; i < titleRadios.length; i++) {
        if (titleRadios[i].checked) {
            titleSelected = true;
            break;
        }
    }
    validateSubmitButton();
}

function createCheckbox(id, label) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.name = "carOptions";

    checkbox.onclick = function () {
        if (checkbox.checked) {
            var checkboxesList = document.getElementsByName('carOptions');
            for (var i = 0; i < checkboxesList.length; i++) {
                checkboxesList[i].checked = false;
            console.log(checkboxesList[i]);
            checkbox.checked = true;
            createTextField();
            }
        }
        else {
                var textContainer = document.getElementById("textContainer");
                textContainer.removeChild(textContainer.firstChild);
                textContainer.removeChild(textContainer.firstChild);
            }
        };

        var checkboxLabel = document.createElement("label");
        checkboxLabel.setAttribute("for", id);
        checkboxLabel.appendChild(document.createTextNode(label));

        var br = document.createElement("br");

        var checkboxContainer = document.getElementById("checkboxContainer");
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);
        checkboxContainer.appendChild(br);
    }

    function createTextField() {
        var textField = document.createElement("input");
        textField.type = "text";
        textField.id = "textField";
        textField.name = "textField";
        textField.placeholder = "Enter text*";
        textField.required = true;
        textField.classList.add("textfield");

        var br = document.createElement("br");

        var textContainer = document.getElementById("textContainer");
        textContainer.innerHTML = "";
        textContainer.appendChild(textField);
        textContainer.appendChild(br);
    }

