addEventListener('DOMContentLoaded', function(){


    let number1 = '0';
    let number2 = '';
    let operator = '';
    let equalLastPressed = false;
    //equalLastPressed is set to true whenever the equal button is presed, and to false when an operator is pressed 
    //or when clear is pressed (which happens when a number or point ispressed while equalLatsPressed is true)
    
    let displayCalculation = false;
    //displaycalculation is set to false whenever 'clear' is clicked or when number2 is true, and it set to true whenever
    //the calculate function is called

    let justCalculated = 0;
    //justCalculated stops the delete button from deleting a calculated answer, it
    //is set to 2 when the calculate function is called, decremented every time a button is clicked, 
    // ad incremented everytime delete is clicked, when justcalculated is more than 0.

    let screen = document.querySelector('#screen');

   
    function recordClick(id){
        if(id === 'clear'){
            equalLastPressed = false;
            displayCalculation = false
            number1 = '0';
            number2 = '';
            operator = '';
            
        }else if(id === 'delete'){
            if(!justCalculated){
                if(operator){
                if(number2){
                        if(number2 === '0' || number2 === '-0'){

                        }else if(number2.length === 2 && number2[0] === '-'){
                            number2 = '-0'
                        }else if(number2.length === 1){
                            number2 = '0';
                        }else{
                            number2 = number2.substr(0, number2.length-1) 
                        }
                } 
                }else{
                    if(number1 === '0' || number1 === '-0'){

                    }else if(number1.length === 2 && number1[0] === '-'){
                        number1 = '-0'
                    }else if(number1.length === 1){
                        number1 = '0';
                    }else{
                        number1 = number1.substr(0, number1.length-1);
                    }
                }
            }else{justCalculated++}
        }else if(id === 'equal'){
            equalLastPressed = true;
            if(number2){
                calculate(number1, number2);
            }else if(operator){
                calculate(number1, number1);
            }else{
                //nothing
            }
        }else if(id === 'plusminus'){
            if(operator){
                if(number2){
                    if(number2[0] === '-'){
                        number2 = number2.substring(1);
                    }else{
                        number2 = '-' + number2
                    } 
                }else{
                    number2 = '-0'
                }
            }else{
                if(number1[0] === '-'){
                    number1 = number1.substring(1);
                }else{
                    number1 = '-' + number1
                }
            }
        }else if(id === 'point'){
            if(!(isPoint())){
                if(operator){
                    if(number2){
                        if(howManyNumbers(number2) < 9){
                            number2 = number2 + '.';
                        }
                    }else{
                        number2 = '0.';
                    }
                }else{
                    if(equalLastPressed){
                        recordClick('clear');
                        recordClick('point');
                    }else{
                        if(howManyNumbers(number1) < 9){
                            number1 = number1 + '.';
                        }
                    }
                }
            }
        }else if(id === 'add' || id === 'minus' || id === 'multiply' || id === 'divide'){
            equalLastPressed = false;
            if(number2){
                calculate(number1, number2)
            }
            operator = id;
        }else{
            if(operator){
                if(number2 === '0'){
                    number2 = id;
                }else if(number2 === '-0'){
                    number2 = '-' + id
                }else{
                    if(howManyNumbers(number2) < 9){
                        number2 = number2 + id;
                    }
                }
            }else{
                if(number1 === '0'){
                    number1 = id;
                }else if(number1 === '-0'){
                    number1 = '-' + id
                }else if(equalLastPressed){
                    recordClick('clear');
                    recordClick(id);
                }else{
                    if(howManyNumbers(number1) < 9){
                        number1 = number1 + id;
                    }
                }
            }
        }
        if(justCalculated){justCalculated--};
        if(number2){displayCalculation = false}
        updateScreen();
    }

    function calculate(Num1, Num2){
        Num1 = parseFloat(Num1);
        Num2 = parseFloat(Num2);
        
        let answer;
        if(operator === 'add'){
            answer = Num1 + Num2;
        }else if(operator === 'minus'){
            answer = Num1 - Num2; 
        }else if(operator === 'divide'){
            answer = Num1 / Num2;
        }else if(operator === 'multiply'){
            answer = Num1 * Num2;
        }

        number1 = answer.toString();
        number2 = '';
        operator = '';
        justCalculated = 2;
        displayCalculation = true;
    }   


    function updateScreen(){
        let number = (number2) ? number2 : number1;
        screen.innerHTML = displayNumber(number);
    }

    function displayNumber(number){
        if(number === 'Infinity' || number === 'NaN'){return number};
        number = number.toString();
        let wholePart = '', decimalPart = '', pointFound = false;
        for(let i = 0; i < number.length; i++){
            if(number[i] === '.'){pointFound = true};
            if(pointFound){
                decimalPart = decimalPart + number[i];
            }else{
                wholePart = wholePart + number[i];
            }
        }
        wholeLength = wholePart.length;

       
        screenNumber = '';

        let len = wholePart.length;
        for(let i = 0; i < len; i++){
            screenNumber = screenNumber + wholePart[i];
            if((len-i-1) % 3 == 0 && wholePart[i] !== '-' && i !== len-1){
                screenNumber = screenNumber + ',';
            }
        }

        if(displayCalculation && decimalPart){
            decimalPart = parseFloat(decimalPart);
            decimalPart = decimalPart.toFixed(9-wholeLength);

            while(true){
                if(decimalPart[decimalPart.length-1] === '.' || decimalPart[decimalPart.length-1] === '0'){
                    decimalPart = decimalPart.substring(0, decimalPart.length-1);
                }else{
                    break;
                }
            }
            decimalPart = decimalPart.substring(1)
        }
        decimalLength = (decimalPart)? decimalPart.length-1 : 0;

        screenNumber = screenNumber + decimalPart;

        if(wholeLength + decimalLength > 9){
            if(screenNumber[0] === '-' && wholeLength + decimalLength === 10){
                screen.style.fontSize = '75px'
                screen.style.marginTop = '35px'
            }else{
                screen.style.fontSize = '110px'
                screen.style.marginTop = '0px' 
                screenNumber = scienticNotation(wholePart); 
            }

        }else if(wholeLength + decimalLength > 6){
            screen.style.fontSize = '' + 110 - (wholeLength + decimalLength -6)*10 + 'px'
            screen.style.marginTop = '' + (wholeLength + decimalLength -6)*10 + 'px'
        }else{
            screen.style.fontSize = '110px'
            screen.style.marginTop = '0px' 
        }


       
        return screenNumber;
    }

    function scienticNotation(number){
        let screenNumber = ''
        for(let i = 0; i < 4; i++){
            if(number[i]){
                screenNumber = screenNumber + number[i];
                if(i===0 && number[0] !== '-' || i === 1 && number[0] === '-'){
                    screenNumber = screenNumber + '.'
                }
            }   
        }
        if(number[0] === '-'){screenNumber = screenNumber + number[5]};
        screenNumber = screenNumber + 'e' + number.length;
        return screenNumber;
    }

    function howManyNumbers(number){
        let total = 0;
        for(let i = 0; i < number.length; i++){
            if(number[i] !== '-' && number[i] !== '.'){
                total++;
            }
        }
        return total;
    }

    function indexOfPoint(number){
        len = number.length;
        for(let i = 0; i < len; i++){
            if(number[i] === '.'){
                return i;
            }
        }
        return false;
    }

    function isPoint(){
        let isThere
        if(operator){
            isThere = number2.includes('.');
        }else{
            isThere = number1.includes('.');
        }
        return isThere;
    }



    let buttons = document.querySelectorAll('.button');
    let removes = document.querySelectorAll('.removes');
    let operators = document.querySelectorAll('.operator');
    let clickActive = false

    buttons.forEach(function(button){ 
        button.addEventListener('mousedown', function(e){
            clickActive = true;  
            changeColor(this, 'on'); 
            changeTransition(button, false);
        });

        button.addEventListener('mouseup', function(e){
            if(clickActive){
                changeColor(this, 'off');
                changeTransition(button, true);
                recordClick(this.id);
            }
        });

        button.addEventListener('mouseleave', function(e){
            if(clickActive){
                changeColor(this, 'off');
                changeTransition(button, true);
            }
        });

        button.addEventListener('mouseenter', function(e){
            if(clickActive){
                changeColor(this, 'on');
                changeTransition(button, false);
            }
        });
    });

    //In case mouse in lifted outside of a button
    document.addEventListener('mouseup', function(){
        clickActive = false;
    });



    //Keyboard Support
    let pressActive = false
    window.addEventListener('keydown', event => {
        if(!pressActive){
            pressActive = true;
            let keyID = keyToID(event.key);
            if(keyID){
                let buttonKey = document.getElementById(keyID);
                changeColor(buttonKey, 'on');
                changeTransition(buttonKey, false);
            }
        }
    });
    window.addEventListener('keyup', event => {
        pressActive = false
        let keyID = keyToID(event.key);
        console.log(event)
        if(keyID){
            let buttonKey = document.getElementById(keyID);
            changeColor(buttonKey, 'off');
            changeTransition(buttonKey, true);
            recordClick(keyID);
        }
    });

    function keyToID(key){
        if(key === 'c'){return 'clear';}
        else if(key === 'Shift'){return 'plusminus';}
        else if(key === 'Backspace'){return 'delete';}
        else if(key === '/'){return 'divide';}
        else if(key === 'x'){return 'multiply';}
        else if(key === '-'){return 'minus';}
        else if(key === '='){return 'add';}
        else if(key === 'Enter'){return 'equal';}
        else if(key === '.'){return 'point';}
        else if(!isNaN(key)){return key;}
        else{return ''}
    }

    function changeColor(Button, mode){
        let ID = Button.id;
        
        if(mode == 'on'){
            if(ID == 'clear' || ID == 'delete'){
                Button.style.backgroundColor = '#FF8080'
                if(ID === 'clear'){changePreviousOperator(ID)}
            }else if(ID === 'plusminus' || ID === 'add' || ID === 'minus' || ID === 'divide' || ID === 'multiply' || ID === 'equal'){
                Button.style.backgroundColor = '#a0b0ff'
            }else if((ID === 'point') && (!isPoint())){
                Button.style.backgroundColor = '#777' 
            }else{   
                Button.style.backgroundColor = '#777'
            }
        }else{
            if(ID == 'clear' || ID == 'delete'){
                Button.style.backgroundColor = '#FF5050'
            }else if(ID === 'plusminus' || ID === 'equal'){
                Button.style.backgroundColor = '#4765ff'
                if(ID === 'equal'){
                    changePreviousOperator(ID);
                }
            }else if(ID === 'minus' || ID === 'divide' || ID === 'multiply' || ID === 'add'){
                Button.style.color = '#4765ff';
                Button.style.backgroundColor = 'white';
                changePreviousOperator(ID);
            }else if((ID === 'point') && (!isPoint())){
                Button.style.backgroundColor = '#444' 
            }else{   
                Button.style.backgroundColor = '#444'
            } 
        }
    }

    function changeTransition(button, mode){
        if(mode){
            button.classList.add('transition');
        }else{
            button.classList.remove('transition');
        }
    };

    function changePreviousOperator(ID){
        if(operator){
            let prevOperator = document.getElementById(operator);
            if(!(prevOperator.id === ID)){
                prevOperator.style.color = 'white';
                prevOperator.style.backgroundColor = '#4765ff'
            }
        }
    }
        















});