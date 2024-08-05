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

for (let i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener("keyup", (event)=>{
        console.log(i + " " + event.target.value);
        outputList[i].textContent = event.target.value;
    });
}


document.getElementById("submit-btn").addEventListener("click", () => {

});