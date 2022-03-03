/* Elements of Calculator */
let operations = document.querySelector(`.operations`); // the operations that the calculator do it right now
let doneOperations = document.querySelector(`.done-operations`); // the operations that the have be done
let resultSpan = document.querySelector(`.result-span`); // span show the final result
let cuncel = document.querySelector(`.cuncel`); // cuncel button  (clear the operations)
let buts = document.querySelectorAll(`.buts`); // all bttons in the calculator  
let nd = document.querySelector(`.nd`); // 2nd button (change between angle and arcAngle)
let degRad = document.querySelector(`.degRad`); // degree&Radian button (change between degree and radian) 
let equalCheck = false; // to check if the Equal button is clicked
// Set the value of Result is Zero
let result = 0;
resultSpan.textContent = `= ${result}`;
/* degRad function (onClick Event) */ // (change between degree and radian)
let rad = false, deg = true;
degRad.onclick = function() {
    if(deg) {
        rad = true;
        deg = false;
    }else if(rad) {
        deg = true;
        rad = false;
    }
    if(rad) {
        degRad.textContent = `rad`;
        nd.style.pointerEvents = `none`;
        nd.style.opacity = `.7`;
    }else if(deg) {
        degRad.textContent = `deg`;
        nd.style.pointerEvents = `all`;
        nd.style.opacity = `1`;
    }   
}
/* 2nd Function (onClick Event) */ // (change between angle and arcAngle)
let ndOn = false, ndOf = true;
nd.onclick = function() {
    if(ndOf) {
        ndOn = true;
        ndOf = false;
    }else if(ndOn) {
        ndOf = true;
        ndOn = false;
    }
    let sin = document.querySelector(`.sin`);
    let cos = document.querySelector(`.cos`);
    let tan = document.querySelector(`.tan`);
    if(ndOn) {
        sin.textContent = `arcsin`;
        cos.textContent = `arccos`;
        tan.textContent = `arctan`;
        degRad.style.pointerEvents = `none`;
        degRad.style.opacity = `.7`;
    }else if(ndOf) {
        sin.textContent = `sin`;
        cos.textContent = `cos`;
        tan.textContent = `tan`;
        degRad.style.pointerEvents = `all`;
        degRad.style.opacity = `1`;
    }   
}
/* buts Function (onClick Event) */
buts.forEach(function(but){
    but.onclick = function() {
        if(equalCheck) { // "equalCheck" check if the equal button is clicked 
            /* Creat div that will have the done operation and its result */
            let div = document.createElement(`div`);
            div.className = `done-divs`;
            let OperationsSpan = document.createElement(`div`);
            OperationsSpan.textContent = `${operations.textContent}`;
            let resSpan = document.createElement(`div`);
            resSpan.textContent = `${resultSpan.textContent}`;
            div.appendChild(OperationsSpan);
            div.appendChild(resSpan);
            doneOperations.appendChild(div);
            doneOperations.scrollTop = doneOperations.scrollHeight; // Scroll to the last done operation
        }
        /* doneDivs Function (onClick Event) */ // (set the value of the doneDiv if that clicked in it)
        let doneDivs = document.querySelectorAll(`.done-divs`);
        doneDivs.forEach(function(e){
            e.onclick = function() {
                operations.textContent = e.children.item(0).textContent;
                resultSpan.textContent = e.children.item(1).textContent;
            }
        })
        /* Copy the button in the text content of the operations */
        let clas = but.classList.item(1); 
        if(clas === `fact`) {
            operations.textContent += `!`;
        }else if(clas === `power`) {
            operations.textContent += `^`;
        }else if(clas === `square-root`) {
            operations.textContent += `√(`;
        }else if(clas === `percent`) {
            operations.textContent += `%`;
        }else if(clas === `min-power`) {
            operations.textContent += `^(-1)`;
        }else if(clas == (`sin`) || clas == (`cos`) || clas == (`tan`) || clas == (`cot`) || clas == (`lg`) || clas == (`ln`)) {
            operations.textContent += `${but.textContent}(`;
        }else{
            if(clas !== `equal` && but.classList.item(0) !== `cuncel`){
                operations.textContent += but.textContent;
            }
        }
        /* Delete button */ // (delete from the operations text content)
        if(but.classList.item(0) === `del`){
            if(operations.textContent.length > 0){
                let operations2 = [...operations.textContent];
                operations2.pop();
                operations.textContent = operations2.join(``);
            }
        }
        /* Cuncel button */ // (Clear operations)
        if(but.classList.item(0) === `cuncel`) {
            if(but.textContent == `AC`) { // "AC" to Clear the done operations
                console.log(doneOperations.replaceChildren());
            }
            if(but.textContent == `C`){ // "C" to Clear the operation that has be do it right now  
                operations.textContent = ``;
                but.textContent = `AC`;
            }
        }
        /* change between "AC" and "C" */
        if(operations.textContent !== ``){
            cuncel.textContent = `C`;
        }
        /* Change the style between "Result Span" and "Operations" */
        if(but.classList.item(1) === `equal`) {
            resultSpan.style.color = `#000`;
            resultSpan.style.fontSize = `30px`;
            operations.style.color = `#777`;
            operations.style.fontSize = `20px`;
            equalCheck = true;
        }else {
            /* Copy the button in the text content of the operations */ // (after Clicked in the "equal button")
            if(equalCheck){
                if(clas === `fact`) {
                    operations.textContent = `${result}!`;
                }else if(clas === `power`) {
                    operations.textContent =`${result}^`;
                }else if(clas === `square-root`) {
                    operations.textContent = `√(${result}`;
                }else if(clas === `percent`) {
                    operations.textContent = `${result}%`;
                }else if(clas === `min-power`) {
                    operations.textContent = `${result}^(-1)`;
                }else if(clas == (`add`) || clas == (`min`) || clas == (`mult`) || clas == (`div`)){
                    operations.textContent = `${result}${but.textContent}`;
                }else if(clas == (`sin`) || clas == (`cos`) || clas == (`tan`) || clas == (`cot`) || clas == (`lg`) || clas == (`ln`)) {
                    operations.textContent = `${but.textContent}(`;
                }else if(clas !== `equal` && but.classList.item(0) !== `cuncel`){
                    operations.textContent = but.textContent;
                }
                equalCheck = false;
            }
            operations.style.color = `#000`;
            operations.style.fontSize = `30px`;
            resultSpan.style.color = `#777`;
            resultSpan.style.fontSize = `20px`;
        }
        /* Set the value of Result From The Main Function */
        result = mainFunc(calc,calc2,filter,operations.textContent);
        if(result === Infinity || result === -Infinity) { // if the value Equal Infinity (∞)
            if(result === Infinity)
                resultSpan.textContent = `= ∞`;
                if(result === -Infinity)
                resultSpan.textContent = `= -∞`;
        }else if(operations.textContent == ``) { // if the operation of text content is Empty
            result = 0;
            resultSpan.textContent = `= ${result}`;
        }else { // Filter The Result To make it like a localNumber and just 9 number in it (12,345.6789) 
            let s = `${result}`.split(`.`);
            let localNumber = 9;
            result = Number(result);
            let beforeComma = s[0];
            let afterComma = s[1];
            if(afterComma && afterComma.length > localNumber && +afterComma != 0){
                result = result.toFixed(localNumber - beforeComma.length);
            }
            resultSpan.textContent = `= ${result.toLocaleString()}`;
        } 
        if(+result == 0) { // if The result value equal 0 we don't have to right all the number (0.000000 => 0)
            result = 0;
            resultSpan.textContent = `= ${result}`;
        }
        console.log(+result);
    }
})
/* Main Function */ // (the function that will be return the result of the operation)
function mainFunc(calc,calc2,filter,operations) { 
    return calc(filter(operations,calc2));
}
/* Filter Function */  // (Function that will be filter the operation to two Array "Number Array" and "operation Array"))
function filter(operations,calc2) {
    /* Values */
    let mainArr = {}, numArr = [] , operArr = [], num = ``, numCheck = false, PiE = false,PiENum = false, resultCheck = true, openCheck = false,openCheck2 = true, y = [], numBeforeRad = ``, arcAngle = false;
    /* Take operation Function */
    function takeOp () { // Check if that the all number have been done to take the operator
        numCheck = true;
        PiE = false;
        PiENum = false;
        num = ``;
    }
    /* Filter the opeartion  text to element*/
    operations.split(``).map(function(e,i,arr){
        /* To check if the parameters opened or closed  */
        if(e===`(`){
            openCheck = true;
        }else if(e === `)`) {
            openCheck = false;
            openCheck2 = true; // to know if the parameters close that is in another parameters (x+y-(z*s))
            y = []; // save the text between two parameter in it (x+y+z(d*f+n/g)) => y = [d,*,f,+,n,/,g]
        }
        if(openCheck) {
            y.push(e); // push the element between two parameters in y
            if(openCheck2) {
                /* "num2" : the result of the text between two parameter */
                let num2 = mainFunc(calc,calc2,filter,y.slice(1).join(``)); // Call the main function to calc num2
                num2 = calc2(operArr,num2,degRad.textContent); // Call the operation that need a parameters after it like (sin,cos,..)
                numArr.push(num2); // push the num2 in the Number Array
                console.log(num2);
            }else {
                numArr.pop(); // if the num2 has been set before we need to pop it  and put the new value of it
                let num2 = mainFunc(calc,calc2,filter,y.slice(1).join(``));
                num2 = calc2(operArr,num2,degRad.textContent);
                numArr.push(num2);
            }
            console.log(numArr);
            openCheck2 = false;
        }else {
            /* if the operation clicked before the num in the beeging of the program */
            if(i===0 && (e==`+` || e==`×` || e==`÷` || e==`!` || e==`^`)) {
                operations = `0${e}`;
                numArr.push(0);
                operArr.push(e);
                numCheck = true;
            }else if(i===0 && e==`-`){
                num += e;
            /* Set The numbers in Array Number */
            }else if( (e === `1` || e===`2` || e===`3` || e===`4` || e===`5` || e===`6` || e===`7` || e===`8` || e=== `9` || e===`0` || e===`.` || e===`π` || e===`e`)){
                if(e===`π`){
                    numBeforeRad = num; // the number before radian if we use Angle "45π" => numBeforeRad = 45
                    if(PiE && degRad.textContent === `deg`){
                        resultCheck = false;
                    }
                    if(degRad.textContent === `deg`){
                        num = 3.141519265;
                    }else {
                        radCheck = true;
                        if(numBeforeRad){
                            num = 180 * numBeforeRad; // if the degree&radian button is Radian
                            localStorage.setItem(`check`,`true`); // use local storage to save the value
                        }else {
                            localStorage.setItem(`check`,`true`);
                            num = 180;
                        }
                    }
                    if(arr[i-1] === `π` || arr[i-1] === `e`){
                        num = `Error`; // if the "e" or "π" have been reapeted
                    }
                    PiE = true;
                    PiENum = true
                }else if(e===`e`){
                    numBeforeRad = num;
                    if(PiE && degRad.textContent === `deg`){
                        resultCheck = false;
                    }
                    if(degRad.textContent === `deg`){
                        num = 2.71828183;
                    }else {
                        if(numBeforeRad){
                            num = 2.71828183;
                        }else {
                            num = 2.71828183;
                        }
                    }
                    if(arr[i-1] === `π` || arr[i-1] === `e`){
                        num = `Error`;
                    }
                    PiE = true;
                    PiENum = true;
                }else {
                    num += e;
                    PiE = true;
                    if(PiENum){
                        resultCheck = false;
                    }
                }
                if(numCheck){
                    numArr.push(num);
                    numCheck = false;
                }else {
                    numArr.pop();
                    numArr.push(num);
                }
            /* Set The operations in operations Number */
            }else if(e === `(` || e === `)`) {
                operArr = operArr;
                numArr = numArr;
            }else if(arr[i] === `c` && arr[i+1] === `s` && arr[i+2] === `i` && arr[i+3] === `n`) {
                operArr.push(`arcsin`);
                arcAngle = true; // ArcAngle : to make Error if the users make a operation with ArcAngle
                takeOp();
            }else if(arr[i] === `c` && arr[i+1] === `c` && arr[i+2] === `o` && arr[i+3] === `s`) {
                operArr.push(`arccos`);
                arcAngle = true;
                takeOp();
            }else if(arr[i] === `c` && arr[i+1] === `t` && arr[i+2] === `a` && arr[i+3] === `n`) {
                operArr.push(`arctan`);
                arcAngle = true;
                takeOp();
            }else if( arr[i-1] !== `c` && arr[i] === `s` && arr[i+1] === `i` && arr[i+2] === `n`) {
                operArr.push(`sin`);
                takeOp();
            }else if(arr[i-1] !== `c` && arr[i] === `c` && arr[i+1] === `o` && arr[i+2] === `s`) {
                operArr.push(`cos`);
                takeOp();
            }else if(arr[i-1] !== `c` && arr[i] === `t` && arr[i+1] === `a` && arr[i+2] === `n`) {
                operArr.push(`tan`);
                takeOp();
            }else if(arr[i] === `l` && arr[i+1] === `g`) {
                operArr.push(`lg`);
                takeOp();
            }else if(arr[i] === `l` && arr[i+1] === `n`) {
                operArr.push(`ln`);
                takeOp();
            }else if(e==`+` || e===`-` || e==`×` || e==`÷` || e==`!` || e==`^` || e===`%` || e===`√`) {
                operArr.push(e);
                takeOp();
            }
        }
    });
    if(arcAngle) {
        numArr[i+1] = `Error`; // set Error if the users make a operation with ArcAngle
    }
    /* Filter the operations that dont need parameters after it like (+,-,!,....) */
    operArr = operArr.filter((e) => (e == `+` || e== `-` || e== `×` || e== `÷` || e==`!` || e === `%` || e==`^`));
    /* Set the value the Main Array to use it in another function */
    mainArr.numArr = numArr;
    mainArr.operArr = operArr;
    mainArr.resultCheck = resultCheck;
    mainArr.arcAngle = arcAngle;
    console.log(mainArr);
    return mainArr;
}
/* Calc Function */
function calc(mainArr) {
    /* Operations That Need One Number */
    // the number Array lenght can be 1 because this operations need just one number
    // Percent Operation (x%)
    for(i=0;i<mainArr.operArr.length;i++) {
        if(mainArr.operArr[i] === `%`) {
            mainArr.numArr[i] = mainArr.numArr[i] / 100;
            mainArr.operArr = mainArr.operArr.filter((e,j) => j !== i);
            console.log(mainArr.operArr);
        }
    }
    // Factorial Operation (x!)
    for(i=0;i<mainArr.operArr.length;i++) {
        if(mainArr.operArr[i] === `!`) {
            let fac = 1 ;
            for(j=1;j<=mainArr.numArr[i];j++) {
                fac *= j;
            }
            mainArr.numArr[i] = fac;
            mainArr.operArr = mainArr.operArr.filter((e,j) => j !== i);
            console.log(mainArr.operArr);
        }
    }
    /* Operations That Need Two Number */
    /* We need To Code With "Order of operations" Rule,Order of operations : 1- power 2- multiplication and division 3- addition and subtraction */
    // the numArr.lenght should be bigger then 1 because we use operations need to number 
    if(mainArr.numArr.length > 1) {
        /* remove the numbers and the operations that have been calculated */
        function filterAfterOp(mainArr){
            mainArr.operArr = mainArr.operArr.filter((e,j) => j !== i); 
            mainArr.numArr = mainArr.numArr.filter((e,j) => j !== i);
            return mainArr;
        }
        // We use operation between two number so if the lenght of the Operations Array = lenght of Num Array we have to remove the last operation
        if(mainArr.numArr.length === mainArr.operArr.length) {
            mainArr.operArr.pop();
        }
        // Power Operation (x^y)
        for(i=0;i<mainArr.operArr.length;i++){
            if(mainArr.operArr[i] === `^`) {
                mainArr.numArr[i+1] = Math.pow(mainArr.numArr[i],mainArr.numArr[i+1]);
                mainArr = filterAfterOp(mainArr);
                i = -1; // To start the Loop if there another operations equal this
                console.log(mainArr.numArr);
                console.log(mainArr.operArr);
            }
        }
        /* multiplication and division operations */
        for(i=0;i<mainArr.operArr.length;i++){
            // multiplication Operation (x*y)
            if(mainArr.operArr[i] === `×`) {
                mainArr.numArr[i+1] = mainArr.numArr[i] * mainArr.numArr[i+1];
                mainArr = filterAfterOp(mainArr);
                i = -1;
                console.log(mainArr.numArr);
                console.log(mainArr.operArr);
            }
            // division Operation (x/y)
            else if(mainArr.operArr[i] === `÷`) {
                mainArr.numArr[i+1] = mainArr.numArr[i] / mainArr.numArr[i+1];
                mainArr = filterAfterOp(mainArr);
                i = -1;
                console.log(mainArr.numArr);
                console.log(mainArr.operArr);
            }
        }
        /* subtraction and addition operations */
        for(i=0;i<mainArr.operArr.length;i++){
            // subtraction Operation (x-y)
            if(mainArr.operArr[i] === `-`) {
                mainArr.numArr[i+1] = +mainArr.numArr[i] - +mainArr.numArr[i+1];  
                mainArr = filterAfterOp(mainArr);
                i = -1;
                console.log(mainArr.numArr);
                console.log(mainArr.operArr);
            }
            // addition Operation (x+y)
            else if(mainArr.operArr[i] === `+`) {
                mainArr.numArr[i+1] = +mainArr.numArr[i] + +mainArr.numArr[i+1];
                mainArr = filterAfterOp(mainArr);
                i = -1;
                console.log(mainArr.numArr);
                console.log(mainArr.operArr);
            }
        }
    }
    /* Check the result */
    if(mainArr.resultCheck) {
            return mainArr.numArr[0];
    }else {
        return `Error`; // Return "Error" if there any Error when taking number in Filter Function
    }
}
/* Calc2 Function */
function calc2(operArr,num2,degRad) {
    /* Convert To Radians Function */
    function toRadians(degrees)
    {
        return degrees * (Math.PI/180);
    }
    /* Convert To Degrees Function */
    function toDegrees (angle) {
        return angle * (180 / Math.PI);
    }
    if(operArr[operArr.length -1] === `ln`){ // Ln operation (ln(x))
        num2 = Math.log(num2);
    }else if(operArr[operArr.length -1] === `lg`){ // Lg operation (lg())
        num2 = Math.log10(num2);
    }else if(operArr[operArr.length -1] === `√`){ // Square-Root (√(x))
        num2 = Math.sqrt(num2);
    }else if(operArr[operArr.length -1] === `arcsin`){ // Arcsin operation (arcsin(x))
        /* Set the values that the js can't calculate exactly */
        if(num2 == 0.5){
            num2 = 30;
        }else if(num2 == -0.5){
            num2 = 330;
        }else { 
            num2 = toDegrees(Math.asin(num2)); // convert to degrees after calculate
        }
    }else if(operArr[operArr.length -1] === `arccos`){ // Arccos operation (arccos(x))
        /* the same thing of "Arcsin operation" */
        if(num2 == 0.5){
            num2 = 60;
        }else if(num2 == -0.5){
            num2 = 120;
        }else {
            num2 = toDegrees(Math.acos(num2));
        }
    }else if(operArr[operArr.length -1] === `arctan`){ // Arctan operation (arctan(x))
        num2 = toDegrees(Math.atan(num2));
    }else if(operArr[operArr.length -1] === `sin`){ // Sin Operation (Sin(x)) 
        if(degRad === `deg`){ // if the "deg&but Button" = "deg"
            /* Set the values that the js can't calculate exactly */  
            if(num2 == 30 || num2 == 120){
                num2 = 0.5;
            }else if(num2 == 210 || num2 == 330){
                num2 = -0.5;
            }else if(num2 == 180 || num2 == 360){
                num2 = 0;
            }else {
                num2 = Math.sin(toRadians(num2)); // convert to Radian after calculate
            }
        }else { // if the "deg&but Button" = "rad"
            if(localStorage.getItem(`check`)){ // get the item from local storage to know if there is a PI in the operation
                num2 = Math.sin(toRadians(num2)); // if there convert to Radian after calculate
                localStorage.removeItem(`check`);
            }else {
                num2 = Math.sin(num2); // if there isn't calculate it currently
            }
        }
    }else if(operArr[operArr.length -1] === `cos`){ // Cos Operation (Cos(x))
        /* The same thing of "Sin Operation" */
        if(degRad === `deg`){
            if(num2 == 60 || num2 == 300){
                num2 = 0.5;
            }else if(num2 == 120 || num2 == 240){
                num2 = -0.5;
            }else if(num2 == 90 || num2 == 270){
                num2 = 0;
            }else {
                num2 = Math.cos(toRadians(num2));
            }
        }else {
            if(localStorage.getItem(`check`)){
                num2 = Math.cos(toRadians(num2));
                localStorage.removeItem(`check`);
            }else {
                num2 = Math.cos(num2);
            }
        }
    }else if(operArr[operArr.length -1] === `tan`){ // Tan Operation (tan(x))
        /* The same thing of "Sin Operation" */
        if(degRad === `deg`){
            if(num2 == 45 || num2 == 225){
                num2 = 1;
            }else if(num2 == 135 || num2 == 315){
                num2 = -1;
            }else {
                num2 = mainFunc(calc,calc2,filter,`sin(${num2})÷cos(${num2})`);
            }
        }else {
            if(localStorage.getItem(`check`)){
                num2 = Math.tan(toRadians(num2));
                localStorage.removeItem(`check`);
            }else {
                num2 = Math.tan(num2);
            }
        }
    }
    return num2; // return the result 
}