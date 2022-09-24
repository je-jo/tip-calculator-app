let bill = 0;
let percent = 0;
let numberOfPersons = 1;

//main functions

let calculateIndividualBill = () => bill / numberOfPersons;
let calculateIndividualTip = () => calculateIndividualBill() * percent;
let calculateTotalBillPerPerson = () => calculateIndividualBill() + calculateIndividualTip();

//get values from input

const inputBill = document.getElementById("bill");
inputBill.addEventListener("input", updateBillValue);
function updateBillValue(e) {
    bill = e.target.value;
    updateDisplay();
}

const inputPercent = [...document.querySelectorAll('input[name="percentage"]')];
for (let i = 0; i < inputPercent.length; i++) {
    inputPercent[i].addEventListener("input", (e) => {
        if (e.currentTarget.getAttribute("id") == "custom") {
            percent = e.currentTarget.value / 100;
        } else {
            percent = e.currentTarget.value;
        }
        updateDisplay();
    });
}

const inputPeople = document.getElementById("people");
inputPeople.addEventListener("input", updateNumberOfPersons);
function updateNumberOfPersons(e) {
    numberOfPersons = e.target.value;
    updateDisplay();
}

//helper functions

function formatPrice(num) {
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

const displayTip = document.getElementById("tip");
const displayTotalBill = document.getElementById("total-bill");
function updateDisplay() {
    displayTip.textContent = formatPrice(calculateIndividualTip());
    displayTotalBill.textContent = formatPrice(calculateTotalBillPerPerson());
}

const buttonClear = document.getElementById("clear");
const form = document.querySelector("form");
function clearAll() {
    bill = 0;
    percent = 0;
    numberOfPersons = 1;
    form.reset();
    updateDisplay();
}
buttonClear.addEventListener("click", clearAll);