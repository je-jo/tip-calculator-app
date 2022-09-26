let bill;
let percent;
let numberOfPersons;

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
const customNumber = document.querySelector("#custom-number");
for (let i = 0; i < inputPercent.length; i++) {
    inputPercent[i].addEventListener("input", (e) => {
        percent = e.target.value / 100;
        removeActive();
        e.target.parentNode.classList.add("active");
        if (e.target.checked) { //empty custom value if button is checked
            customNumber.value = "";
        }
        updateDisplay();
    });
}

const inputPeople = document.getElementById("people");
const errorMessage = document.getElementById("error")
inputPeople.addEventListener("input", updateNumberOfPersons);
function updateNumberOfPersons(e) {
    if (e.target.value < 1) {
        errorMessage.textContent = "Can't be zero";
        return
    }
    numberOfPersons = e.target.value;
    errorMessage.textContent = "";
    updateDisplay();
}

//helper functions

// // remove active class from radio buttons labels

function removeActive() {
    for (let i = 0; i < inputPercent.length; i++) {
        inputPercent[i].parentNode.classList.remove("active");
    }
}

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

const form = document.querySelector("form");
const buttonClear = document.getElementById("clear");

form.addEventListener("input", () => {
    buttonClear.removeAttribute("disabled");
})


function clearAll() {
    bill = 0;
    percent = 0;
    numberOfPersons = 1;
    form.reset();
    buttonClear.setAttribute("disabled", true);
    removeActive();
    updateDisplay();
}
buttonClear.addEventListener("click", clearAll);

clearAll();