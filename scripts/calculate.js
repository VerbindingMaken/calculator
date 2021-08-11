/* SELECT BUTTONS */
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

for(let i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', select)
    };
/* MAIN VARIABLES */
let nO = [];
let nT = [];
let calcFunc = "none"

/* START */
function select(e) {
    let buttonValue =  e.target.getAttribute('value');
    let buttonClass =  e.target.getAttribute('class');
    if (buttonClass == "number") {
    writeArray(buttonValue);    
    }
    else if (nO.length) {
        if (buttonClass == "adjust") {
            doAdjust(buttonValue);
            console.log(`We hebben een nummer, dus ${buttonValue}`);

        }
        if (buttonClass == "calculate") {
            doCalculate(buttonValue);
            console.log(`We hebben een nummer, dus ${buttonValue}`);

        }
    }
}


function writeArray(inputValue) {
    let currentNumber;
    if (calcFunc == "none") {
        currentNumber = [...nO];
        nO = write(currentNumber);
        console.log("Write one", nO);
    } else {
        currentNumber = [...nT];
        nT = write(currentNumber);
        console.log("Write two", nT);
    }
    function write(inputNumber) {
        if (inputValue === "." && (inputNumber.findIndex(dot => dot === ".")) !== -1) {
            console.log("er staat al een punt");
        } else {
            inputNumber.push(inputValue);
            return inputNumber;
        }
    }
    showNumber(currentNumber);
    currentNumber = [];
}
function showNumber(inputArray) {
    /* What is postion dot */
    let displayArray = [...inputArray];
    let i;
    if (displayArray.indexOf(".") === -1) {
        i = displayArray.length;
    } else {
        i = displayArray.indexOf(".");
        /* Insert comma at instead of dot */
        displayArray.splice(i, 1, ",");
    }
    let dots = [];
    let start;
    console.log("Wel of niet een -", displayArray[0]);
    if (displayArray[0] === "-") {
        start = 1
    } else {start = 0};
    for (let t = 0; t < i - start; t++) {
        if (t!== 0 && ((i -t - start) % 3) === 0) {
            dots.push(t + start);
        }
    } 
    /* Insert dots at each 1000 */
    let count = 0;
    for (let x = 0; x < dots.length; x++) {
        displayArray.splice((dots[x] + count), 0, ".");
        count++
    }
    /* console.log("output", displayArray); */
    display.value = displayArray.join('');
}
function doAdjust(inputValue) {   
    switch(inputValue) {
        case "clear":
            console.log("clear");
            doClear();
        break;
        case "sign":
            doSign();
        break;
        case "percentage":
            console.log("percentage");
        break;
        default:
            break;
    }
    function doClear() {
        nO = [];
        nT = [];
        calcFunc = "none";
        display.value = 0;
    }
    function doSign() {
        console.log("start doSign")
        let changeNumber = [];  
        if (nT.length === 0) {
            changeNumber = nO;
            console.log("doSign one")
        } else {
            changeNumber = nT;
            console.log("doSign two")
        }
        if (changeNumber[0] == "-") {
            console.log(changeNumber[0], "haal de min eraf");
            changeNumber.shift();
        } else {
            console.log(changeNumber[0], "Doe een - erbij");
            changeNumber.unshift("-");
        }
        console.log(changeNumber);
        showNumber(changeNumber);
    }
    function doPercentage() {
        console.log("doPercentage")
    }
}
function doCalculate(inputValue) {
    if (nT.length) {
        /* doCalcFunction 
            nextCalc ??? */
    } else if (inputValue !== "return") {
        calcFunc = inputValue;
        console.log(calcFunc);
    }
}



