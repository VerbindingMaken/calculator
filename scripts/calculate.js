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
nextCalc = 1;

/* START */
function select(e) {
    let buttonValue =  e.target.getAttribute('value');
    let buttonClass =  e.target.getAttribute('class');
    if (buttonClass == "number") {
    writeArray(buttonValue);    
    }
    else if (nO.length || buttonValue === "clear") {
        if (buttonClass == "adjust") {
            console.log(`We hebben een nummer, dus ${buttonValue}`);
            doAdjust(buttonValue);
        }
        if (buttonClass == "calculate") {
            if (nextCalc) {
                /* e.target.classList.add('highlight'); DEZE WERKT */
            }
            console.log(`We hebben een nummer en nextCalc is ${nextCalc}, dus ${buttonValue}`);
            doCalculate(buttonValue, e);           
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
            return inputNumber;
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
    console.log(nT); 
    if (inputValue === "clear") {
        nO = [];
        nT = [];
        calcFunc = "none";
        display.value = 0;
        return;
    }   else {
        checkNumber(inputValue);
    }       
    function doClear() {

    }
    function checkNumber() {
        let changeNumber = [];
        let changeNumberName;
        if (nT.length === 0) {
            changeNumber = [...nO];
            changeNumberName = "O";
        } else {
            changeNumber = [...nT];
            changeNumberName = "T";
        }
        if (inputValue === "sign") {
            return doSign(changeNumber, changeNumberName);
        } else if (inputValue === "percentage") {
            return doPercentage(changeNumber, changeNumberName);
        }
    }
    function doSign(changeNumber, changeNumberName) {
        console.log("start doSign")
        if (changeNumber[0] == "-") {
            console.log(changeNumber[0], "haal de min eraf");
            changeNumber.shift();
        } else {
            console.log(changeNumber[0], "Doe een - erbij");
            changeNumber.unshift("-");
        }
        if (changeNumberName === "O") {
            nO = [...changeNumber];
        } else if (changeNumberName === "T") {
            nT = [...changeNumber];
        }
        return showNumber(changeNumber);
    }
    function doPercentage(changeNumber, changeNumberName) {
        toNumber = [...changeNumber];
        let percent = (parseFloat(toNumber.join(''))) / 100;
        changeNumber = String(percent).split('');
        console.log("doPercentage", percent, changeNumber);
        if (changeNumberName === "O") {
            nO = [...changeNumber];
        } else if (changeNumberName === "T") {
            nT = [...changeNumber];
        }
        return showNumber(changeNumber);
    }
}
function doCalculate(inputValue, e) {
    let highLightedButton = document.querySelector(".highlight")
    if (highLightedButton) {
        highLightedButton.className = "calculate";
    }
    if (nT.length === 0) {
        if (inputValue === "return") {
            calcFunc = "none";
            console.log("Adjust", calcFunc)
            return;
        } else {
            calcFunc = inputValue;
            nextCalc = 1;
            e.target.classList.add('highlight');
            return;
        }
    }
    console.log("we kunnen rekenen!");
    function makeNumber(inputArray) {
        return parseFloat(inputArray.join(''));
    /* Remove Higlight */

    }
    let resultNumber;
    switch(calcFunc) {
        case "divide":
            resultNumber = (makeNumber(nO) / makeNumber(nT));
        break;
        case "multiply":
            resultNumber = ("doMultiply", makeNumber(nO) * makeNumber(nT));
        break;
        case "plus":
            resultNumber = ("doPlus", makeNumber(nO) + makeNumber(nT));
        break;
        case "minus":
            resultNumber = ("doMinus", makeNumber(nO) - makeNumber(nT));
        break;
        default:
            break;
    }
    resultArray = String(resultNumber).split('');
    if (resultArray.indexOf(".") !== -1) {
        i = resultArray.indexOf(".");
        let start = i + 1
        for (let t = start; t < resultArray.length; t++){
            if (resultArray[t] !== 0) {
                i = t + 1;
                deleteZeros(i);
            }
        }
        resultArray.splice(i, (resultArray.length - i));
    }
    nO = [...resultArray];
    nT = [];
    if (inputValue === "return") {
        calcFunc = "none";
    } else {
        calcFunc = inputValue;
        e.target.classList.add('highlight');
    }
    return showNumber(nO);
}
/*  let i = index van comma 
    let start = i + 1 */

function deleteZeros(start) {
    for (let t = start; t < mijnLijst.length; t++){
        if (mijnLijst[t] !== 0) {
            i = t + 1;
            return deleteZeros(i);
        }
    }
    mijnLijst.splice(i, (mijnLijst.length - i));
    return mijnLijst;
}
mijnLijst = [1, 2, ".", 3, 0, 3, 0, 0, 0]




