/* SELECT BUTTONS */
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

for(let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', receiveInput)
    };
/* MAIN VARIABLES */
let numberOne = [];
let numberTwo = [];
let calculate = "none"

function receiveInput(e) {
    let buttonValue =  e.target.getAttribute('value');
    let buttonClass =  e.target.getAttribute('class');
    if (buttonClass == "number") {
    changeNumber(buttonValue);    
    }
    else if (numberOne.length) {
        console.log("We hebben een nummer");
        if (buttonClass == "adjust") {
            doAdjust(buttonValue);
        }
        if (buttonClass == "calculate") {
            doCalculate(buttonValue);
        }
    }
}

function changeNumber(inputValue) {
    function writeArray(inputValue, myArray) {
        if (inputValue === "." && (myArray.findIndex(dot => dot === ".")) !== -1) {
            console.log("er staat al een punt");
        } else {
        myArray.push(inputValue);
        let currentNumber  = myArray.join('');
        display.value = currentNumber;
        let test = parseFloat(myArray.join(''));
        console.log(test); 
        }
    }
    if (calculate == "none") {
        writeArray(inputValue, numberOne);
        console.log("one", numberOne)
    } else {
        writeArray(inputValue, numberTwo);
        console.log("two", numberTwo)
    }
   /* SHOW NUMBER */
    
}
function doAdjust(inputValue) {
    switch(inputValue) {
        case "clear":
            console.log("clear");
            doClear();
        break;
        case "sign":
            console.log("sign");
        break;
        case "percentage":
            console.log("percentage");
        break;
        default:
            break;
    }
    function doClear() {
        numberOne = [];
        numberTwo = [];
        calculate = "none";
        display.value = 0;
    }
}
function doCalculate(inputValue) {
    if (numberTwo.length) {
        /* doCalcFunction 
            nextCalc ??? */
    } else if (inputValue != "return") {
        calculate = inputValue;
        console.log(calculate);
    }
}

function showNumber (inputArray) {
    let displayNumber = inputArray;
    let i = displayNumber.findIndex(dot => dot === ".");
    if (i == -1) {
        i = displayNumber.length;
        console.log(i, "geen punt hoor");

    }
    else {
        displayNumber.splice(i, 1, ",");
        console.log(`er staat een punt op index ${i}`, displayNumber)

    }
    for (t = 0; t < i; t++) {
        if ((i - t) % 3 === 0) {
            displayNumber.splice(t, 0, ".");
            console.log("tafel van drie op", t, i);
        }
    }
    display.value = displayNumber.join('');
    displayNumber = [];
    
}

