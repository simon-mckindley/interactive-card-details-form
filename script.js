const cardName = document.querySelector(".card-name");
const cardNum = document.querySelector(".card-number");
const cardExpMonth = document.querySelector(".card-month");
const cardExpYear = document.querySelector(".card-year");
const cardCvc = document.querySelector(".card-cvc");
const outputList = [cardName, cardNum, cardExpMonth, cardExpYear, cardCvc];

const nameInput = document.getElementById("name");
const numInput = document.getElementById("number");
const expMonthInput = document.getElementById("exp-month");
const expYearInput = document.getElementById("exp-year");
const cvcInput = document.getElementById("cvc");
const inputList = [nameInput, numInput, expMonthInput, expYearInput, cvcInput];

const form = document.querySelector("form");
const complete = document.querySelector(".complete-wrapper");

let cardNumLength = 0;


function validateName(index) {
    let value = inputList[index].value;
    if (!testName(value) || value.length > 30) {
        inputList[index].value = value = value.slice(0, value.length - 1);
    }

    if (inputList[index].value.length === 0) {
        value = "Jane Appleseed";
    }

    return value;
}

function validateCardNumber(index) {
    let value = inputList[index].value;
    if (!testNumber(value.slice(-1)) || value.length > 19) {
        inputList[index].value = value = value.slice(0, value.length - 1);
    }

    if (inputList[index].value.length === 0) {
        value = "0000 0000 0000 0000";
    } else {
        newValue = inputList[index].value.replace(/\s/g, "");
        value = "";

        for (let i = 0; i < newValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                value += " ";
            }
            value += newValue[i];
        }
        inputList[index].value = value;
    }

    return value;
}

function validateExpCvc(index) {
    let value = inputList[index].value;
    const maxLength = (index === 4) ? 3 : 2;
    if (!testNumber(value) || value.length > maxLength) {
        inputList[index].value = value = value.slice(0, value.length - 1);
    }

    if (inputList[index].value.length === 0) {
        value = (index === 4) ? "000" : "00";
    }

    return value;
}

function testName(value) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(value);
}

function testNumber(value) {
    const regex = /^[0-9]+$/;
    return regex.test(value);
}

function switchView(isComplete) {
    if (isComplete) {
        form.style.display = "none";
        complete.style.display = "grid";
    } else {
        form.style.display = "";
        complete.style.display = "";
    }
}


for (let i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener("input", (event) => {
        inputList.forEach((input) => {
            input.classList.remove("has-error");
        });

        let value = event.target.value;
        switch (event.target.id) {
            case "name":
                value = validateName(i);
                break;
            case "number":
                value = validateCardNumber(i);
                break;

            default:
                value = validateExpCvc(i);
                break;
        }

        outputList[i].textContent = value;
    });
}


document.getElementById("submit-btn").addEventListener("click", () => {
    let hasError = false;

    inputList.forEach((input) => {
        const errorField = input.nextElementSibling;
        errorField.textContent = "";
        if (input.value.length === 0) {
            errorField.textContent = "Can't be blank";
        } else {

            switch (input.id) {
                case "name":
                    if (!testName(input.value)) {
                        errorField.textContent = "Wrong format, letters only";
                    } else if (input.value.length > 30) {
                        errorField.textContent = "Too long";
                    } else if (input.value.replace(/\s/g, "").length < 3) {
                        errorField.textContent = "Too short";
                    }
                    break;
                case "number":
                    if (!testNumber(input.value.replace(/\s/g, ""))) {
                        errorField.textContent = "Wrong format, numbers only";
                    } else if (input.value.replace(/\s/g, "").length != 16) {
                        errorField.textContent = "Must be 16 numbers";
                    }
                    break;
                case "exp-month":
                    if (!testNumber(input.value)) {
                        errorField.textContent = "Numbers only";
                    } else if (input.value.replace(/\s/g, "").length != 2) {
                        errorField.textContent = "Must be 2 numbers";
                    } else if (input.value < 1 || input.value > 12) {
                        errorField.textContent = "Invalid month";
                    }
                    break;
                case "exp-year":
                    if (!testNumber(input.value)) {
                        errorField.textContent = "Numbers only";
                    } else if (input.value.replace(/\s/g, "").length != 2) {
                        errorField.textContent = "Must be 2 numbers";
                    } else if (input.value < 24 || input.value > 34) {
                        errorField.textContent = "Invalid year";
                    }
                    break;
                case "cvc":
                    if (!testNumber(input.value)) {
                        errorField.textContent = "Numbers only";
                    } else if (input.value.replace(/\s/g, "").length != 3) {
                        errorField.textContent = "Must be 3 numbers";
                    }
                    break;

                default:
                    break;
            }
        }

        if (errorField.textContent != "") {
            input.classList.add("has-error");
            hasError = true;
        }
    });

    if (hasError) {
        console.log("ERROR");
    } else {
        console.log("CORRECT");
        switchView(true);
    }
});


document.getElementById("continue-btn").addEventListener("click", () => {
    cardName.textContent = "Jane Appleseed";
    cardNum.textContent = "0000 0000 0000 0000";
    cardExpMonth.textContent = "00";
    cardExpYear.textContent = "00";
    cardCvc.textContent = "000";

    inputList.forEach((input) => {
        input.value = "";
    })

    switchView(false);
});