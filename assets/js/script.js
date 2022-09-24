let bill = 0;
let percent = 0.15;
let numberOfPersons = 0;
const displayTip = document.getElementById("tip");
const displayTotalBill = document.getElementById("total-bill");
const buttonClear = document.getElementById("clear");

let calculateIndividualBill = () => bill / numberOfPersons;
let calculateIndividualTip = () => calculateIndividualBill() * percent;
let calculateTotalBillPerPerson = () => calculateIndividualBill() + calculateIndividualTip();

const inputBill = document.getElementById("bill");
inputBill.addEventListener("input", updateBillValue);

function updateBillValue(e) {
    bill = e.target.value;
    calculateIndividualBill();
}

const inputPercent = [...document.querySelectorAll('input[name="percentage"]')];
for (let i = 0; i < inputPercent.length; i++) {
    inputPercent[i].addEventListener("input", (e) => {
        if (e.currentTarget.getAttribute("id") == "custom") {
            percent = e.currentTarget.value / 100;
        } else {
            percent = e.currentTarget.value;
        }
        console.log(percent)
        updateDisplay();
    });
}

const inputPeople = document.getElementById("people");
inputPeople.addEventListener("input", updateNumberOfPersons);

function updateNumberOfPersons(e) {
    numberOfPersons = e.target.value;
    calculateIndividualBill();
    updateDisplay();
}

function formatPrice(num) {
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function updateDisplay() {
    displayTip.textContent = formatPrice(calculateIndividualTip());
    displayTotalBill.textContent = formatPrice(calculateTotalBillPerPerson());
}

function clearAll() {
    bill = 0;
    percent = 0;
    numberOfPersons = 0;
    updateDisplay();
}

buttonClear.addEventListener("click", clearAll);