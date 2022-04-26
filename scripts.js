// VARIABLES

const totalBill = document.getElementById('billValue');
const numPeople = document.getElementById('numPeople');

const tips = document.querySelectorAll('.tips'); // select all the radio inputs
const resetButton = document.querySelector('.reset-btn'); // select the reset button
const inputCustom = document.getElementById("tipCustom"); // select the custom input
const cantZeroMessage = document.querySelector('.case-zero'); // select the 'cant be zero' message

// select the divs from the display
const tipResultDiv = document.querySelector(".tip.result");
const totalResultDiv = document.querySelector(".total.result");


// EVENT LISTENERS

// deselect all radios if the user clicks on the custom field
inputCustom.addEventListener('keyup', () => {
    tips.forEach(element => element.checked = false);
    callCalc();
});

// cleans the custom field if a radio button is clicked
tips.forEach(tip => tip.addEventListener('click', () => {
    resetCustom();
    callCalc();
}));

// calls the callCalc function if a key is pressed on numPeople field
numPeople.addEventListener('keyup', () => callCalc());

// calls the callCalc function if a key is pressed on totalBill field
totalBill.addEventListener('keyup', () => callCalc());

// reset all fields if the reset button is clicked
resetButton.addEventListener('click', () => {
    updateResult("0.00", "0.00", true);
})


// FUNCTIONS

// reset the Custom field
function resetCustom() {
    inputCustom.value = "";
}

// get the tip value (from radios or from custom field, both cases)
function getTipValue() {
    if (inputCustom.value == "") {
        tips.forEach(element => {
            if (element.checked == true) {
                console.log(element.value);
                tipValue = Number(element.value);
                console.log("theeeeeeeere" + tipValue);
            } 
        });
    } else {
        tipValue = inputCustom.value;
    }
    return tipValue;
}

// calculates the results (only if the number of people is not zero)
function callCalc() {
    console.log(totalBill.value);
    console.log(numPeople.value);
    if ((numPeople.value == "") || (numPeople.value == "0")) {
        console.log("Dont call any function.");
        cantZeroMessage.classList.remove('disabled');
    } else {
        cantZeroMessage.classList.add('disabled');
        console.log("Calculating..");
        tipValue = getTipValue();
        // console.log(tipValue);
        makeCalcs(tipValue);
    }
}

// update the result on display
function updateResult(tipPerPerson, totalPerPerson, reset) {
    tipResultDiv.innerHTML = `$${tipPerPerson}`;
    totalResultDiv.innerHTML = `$${totalPerPerson}`;
    if (reset == true) {
        resetCustom();
        totalBill.value = numPeople.value = "0";
    }
}

// calculate the final result and calls the update result function
function makeCalcs(tipValue) {
    
    totalBillValue = Number(totalBill.value);
    numPeopleValue = Number(numPeople.value);


    const tipTotal = totalBillValue*(tipValue/100);
   
    const tipPerPerson = (tipTotal/numPeopleValue).toFixed(2);
    
    const totalPerPerson = ((totalBillValue + tipTotal)/(numPeopleValue)).toFixed(2);
    
    updateResult(tipPerPerson, totalPerPerson, false);
}