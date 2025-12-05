let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/; // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
let zipCodeRegex = /^\d{5}(-\d{4})?$/; // US ZIP code regex

let form = null;
let successMsg = null;


const stateAbbreviations = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
    "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
    "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
    "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];


function initValidation(formID, successID) {
    form = document.getElementById(formID);
    successMsg = document.getElementById(successID);


    let inputs = form.querySelectorAll("input");
    inputs.forEach(input => input.addEventListener("change", inputChanged));

    form.addEventListener("submit", submitForm);
}

function inputChanged(event) {
    event.currentTarget.classList.add("was-validated");
    validateForm();
}

function submitForm(event) {
    event.preventDefault();
    event.stopPropagation();

    validateForm();

    if (!form.checkValidity()) {
        let inputs = form.querySelectorAll("input, textarea, select");
        inputs.forEach(input => input.classList.add("was-validated"));
    } else {
        form.classList.add("hidden-form");

        successMsg.classList.remove("hidden-form");
    }


}

function validateForm() {
    checkRequired("firstName", "First name is required.");
    checkRequired("lastName", "Last name is required.");
    checkRequired("address", "Address is required.");
    checkRequired("city", "City is required.");
    checkRequired("find-page", "You must select at least one!");

    if (checkRequired("state", "State is required.")) {
        validateState("state", "Enter a valid US state abbreviation (e.g., CA, NY).");
    }

    if (checkRequired("email", "Email is required.")) {
        checkFormat("email", "Enter a valid email address.", emailRegex);
    }

    if (checkRequired("zip", "ZIP code is required.")) {
        checkFormat("zip", `Enter a valid ZIP code. Use either "#####" or "#####-####" format`, zipCodeRegex);
    }

    if (checkRequired("phone", "Phone number is required.")) {
        checkFormat("phone", "Enter a valid phone number (e.g., 123-456-7890).", phoneRegex);
    }
}

function checkRequired(id, message) {
    const field = document.getElementById(id);
    let valid = false;

    if (!field) {            //group name rather than id
        const group = document.querySelectorAll(`input[name="${id}"]`);
        valid = [...group].some(x => x.checked);

        if (group.length > 0) {
            const first = group[0];
            const errorDiv = first.parentElement.querySelector(".errorMsg");

            group.forEach(input => input.setCustomValidity(valid ? "" : message));
            if (errorDiv) errorDiv.textContent = valid ? "" : message;
        }
        return valid;
    }

    if (field.type === "checkbox") {
        const groupName = field.name;
        const group = document.querySelectorAll(`input[name="${groupName}"]`);
        valid = [...group].some(x => x.checked);
    } else if (field.value.trim() !== ""){
        valid = true;
    }

    setElementValid(id, valid, message);
    return valid;
}

function checkFormat(id, message, regex) {
    const field = document.getElementById(id);
    const valid = regex.test(field.value.trim());

    setElementValid(id, valid, message);
    return valid;
}

function validateState(id, message) {
    const value = document.getElementById(id).value.trim().toUpperCase();
    const valid = stateAbbreviations.includes(value);

    setElementValid(id, valid, message);
    return valid;
}

function setElementValid(id, valid, message) {
    const input = document.getElementById(id);
    const errorDiv = input.nextElementSibling;

    input.setCustomValidity(valid ? "" : message);
    input.classList.remove("valid", "invalid");
    input.classList.add(valid ? "valid" : "invalid");
    errorDiv.textContent = valid ? "" : message;
}