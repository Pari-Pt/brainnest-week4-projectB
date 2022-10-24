// Target and reach Elements
const DISPLAY = document.getElementById("display");
const WARNING = document.getElementById("warning");
const EQUALS_SIGN = document.getElementById("equals-sign");
const operatorOptions = ["+", "-", "*", "/"];


//Fetch value when a digit is clicked
const getValue = (value) => {
    const array = DISPLAY.value.split("");
    const arrayLength = array.length;
    const characterLimit = 28;
    const verifyIsNumber = !isNaN(value);

    //Warning: If first character is zero
    const lastElementOfTheArrayIsNumber = !isNaN(array[arrayLength - 1]);

    if (!lastElementOfTheArrayIsNumber && value === 0) {
        WARNING.innerText = "Can only write a zero after a number";
        return;
    }

    //Warning: If exceeding display length
    if (arrayLength >= characterLimit) {
        WARNING.innerText = "You have reached the character limit";
        return;
    }


    //Warning: If last character of display is an operator/not a number
    if (arrayLength === characterLimit && !verifyIsNumber) {
        WARNING.innerText = "You cannot end the calculation with an operator"
        return;
    }

    //Ensure the first character is NOT 0 or + or * or /
    const firstArrayElementAcceptable = (arrayLength === 0 && value !== "0" && value !=="+" && value !=="*" && value !=="/");
    const subsequentArrayElement = (arrayLength > 0 && verifyIsNumber);

    if (firstArrayElementAcceptable || subsequentArrayElement) {
        updateDisplay(value);
        return;
    }

    if (!verifyIsNumber && lastElementOfTheArrayIsNumber) {
        updateDisplay(value)

    }    
}

//Populates the display based on input
const updateDisplay = (value) => {
    DISPLAY.value += value;
    removeWarnings();
}

//Occurs when an operator is clicked 
const operatorSelect = (value) => {
    calculate();
    getValue(value);
}


//Involves switch case based on the operators selected, and carries out said operation
const operation = (result, arrayElement, operatorInUse) => {
    //Check the data type of the result, if it is not a number, it is converted to a number
    const numberA = typeof result === "number" ? result : Number(result);
    const numberB = Number(arrayElement);

    //Switch statement for different operator scenarios
    switch (operatorInUse) {
        case "+":
            return numberA + numberB;
        case "-":
            return numberA - numberB;
        case "*":
            return numberA * numberB;
        case "/":
            return numberA / numberB;
    }
}


const calculate = () => {
    const displayArray = DISPLAY.value.split("");
    const calculationArray = [];


    //Warning: If user attempts to use the Equals sign before inputting digits
    if (operatorOptions.includes(displayArray[displayArray.length - 1]) || displayArray.length === 0) {
        WARNING.innerText = "Please provide a calculation to equalise"
        return;
    }

    //Warning: If user attempts to use Equals sign before inputting an operator
    if(!operatorOptions.includes(displayArray)) {
        WARNING.innerText = "Please provide an operator to calculate with"
    }
    

    //If numbers involved in subsequent calculations have a decimal point, it will be added to the array
    displayArray.forEach((element, index) => {
        const lastIndexOfCalculationArray = calculationArray.length - 1;
        if(element === "."){
            arrayToCalculate[lastIndexOfArrayToCalculate] += element;
            return;
        }

        const verifyArrayElementIsNumber = !isNaN(element);

        //Inserts item with index 0 of the displayArray into index 0 of calculationArray
        if (index === 0) {
           calculationArray[0] = element;
            return;
        }

        //Pushes each non-number (operator) into the calculationArray
        if (!verifyArrayElementIsNumber) {
            calculationArray.push(element);
            return;
        }

        //If the last array element is a number or if the index position is 1, then the element is added to the calculationArray
        if (verifyArrayElementIsNumber) {
        const lastArrayElement= calculationArray[lastIndexOfCalculationArray];

            if (!isNaN(lastArrayElement) || index === 1) {
                calculationArray[lastIndexOfCalculationArray] += element;
                return;
            }
            calculationArray.push(element)
        }

    })



    let operatorInUse = "";
    let result = 0;

    //For loop, until the index is not less than the length of the calculation Array

    for (let i= 0; i < calculationArray.length; i++) {
        const arrayElement = calculationArray[i];

        if (i === 0) {
            result = arrayElement;
            continue;
        }

        const isANumber = !isNaN(arrayElement);

        if(!isANumber) {
            operatorInUse = arrayElement;
            continue;
        }

        if (operatorInUse === "/" && arrayElement === "0" ) {
            WARNING.innerText = "Owch! That's an Infinite number, don't divide by 0";
            return;
        }

        result = operation(result, arrayElement, operatorInUse);
    }

    //Transform array to string, and split if it contains a decimal point, identify whether first decimal place is greater than 0
    const arrayContainingResult = result.toString().includes(".") && result.toString().split(".");

    if (arrayContainingResult.length > 1) {
        const firstDecimalPlaceGreaterThanZero = Number(arrayContainingResult[1]) > 0;
        //Round to 2 decimal places
        const resultForDisplay = firstDecimalPlaceGreaterThanZero ? result.toFixed(2): arrayContainingResult[0];
        DISPLAY.value = resultForDisplay;
        return;
    }
    DISPLAY.value = result;
}

//Clears display 
const fullClear = () => {
    DISPLAY.value = "";
    removeWarnings();
}

//Pops the last item from the array to delete by one space
const backspace = () => {
    removeWarnings();
    const array = DISPLAY.value.split("");
    const arrayContainsElements = array.length > 0;


    if (arrayContainsElements) {
        array.pop();
        DISPLAY.value = array.join("");
    }
}

//Clears all red warnings
const removeWarnings = () => {
    WARNING.innerText = "";
}

