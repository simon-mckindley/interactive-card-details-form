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

let cardNumLength = 0;

function validateName() {
    const regex = /^[A-Za-z\s]+$/;
    let value = nameInput.value;
    if (!regex.test(value) || value.length > 30) {
        nameInput.value = value = value.slice(0, value.length - 1);
    }

    if (nameInput.value.length === 0) {
        value = "Jane Appleseed";
    }

    return value;
}

function validateCardNumber() {
    let value = numInput.value;
    if (!validateNumber(value) || value.length > 19) {
        numInput.value = value = value.slice(0, value.length - 1);
    }

    if (numInput.value.length === 0) {
        value = "0000 0000 0000 0000";
    } else if (value.length > cardNumLength &&
        (value.length === 4 || value.length === 9 || value.length === 14)) {
        numInput.value = value = `${value} `;
    }

    cardNumLength = value.length;

    return value;
}

function validateExpCvc(index) {
    let value = inputList[index].value;
    const maxLength = (index === 4) ? 3 : 2;
    if (!validateNumber(value) || value.length > maxLength) {
        inputList[index].value = value = value.slice(0, value.length - 1);
    }

    if (inputList[index].value.length === 0) {
        value = (index === 4) ? "000" : "00";
    }

    return value;
}

function validateNumber(value) {
    const regex = /^[0-9\s]+$/;
    return regex.test(value);
}


for (let i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener("keyup", (event) => {
        let value = event.target.value;
        switch (event.target.id) {
            case "name":
                value = validateName();
                break;
            case "number":
                value = validateCardNumber();
                break;

            default:
                value = validateExpCvc(i);
        }

        outputList[i].textContent = value;
    });
}


document.getElementById("submit-btn").addEventListener("click", () => {

});