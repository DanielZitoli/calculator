addEventListener('DOMContentLoaded', function(){


    let number1 = '0';
    let Num1isNegative = false;
    let number2 = '';
    let Num2isNegative = false;
    let operator = '';
    let equalLastPressed = false

    let screen = document.querySelector('#screen');

   
    function recordClick(id){
        if(id === 'clear'){
            equalLastPressed = false;
            number1 = '0';
            Num1isNegative = false;
            number2 = '';
            Num2isNegative = false;
            operator = '';
            
        }else if(id === 'delete'){
            if(operator){
               if(number2){
                    if(number2 === '0' || number2 === '-0'){

                    }else if(number2.length === 2 && number2[0] === '-'){
                        number2 = '-0'
                    }else if(number2.length === 1){
                        number2 = '0';
                    }else{
                        number2 = number2.substring(0, number2.length-1) 
                    }
               } 
            }else{
                if(number1 === '0' || number1 === '-0'){

                }else if(number1.length === 2 && number1[0] === '-'){
                    number1 = '-0'
                }else if(number1.length === 1){
                    number1 = '0';
                }else{
                    number1 = number1.substring(0, number1.length-1)
                }
            }
        }else if(id === 'equal'){
            equalLastPressed = true;
            if(number2){
                calculate(number1, number2);
            }else if(operator){
                calculate(number1, number1, true);
            }else{
                //nothing
            }
        }else if(id === 'plusminus'){
            if(operator){
                if(number2){
                    if(number2[0] === '-'){
                        number2 = number2.substriing(1);
                    }else{
                        number2 = '-' + number2
                    } 
                }else{
                    number2 = '-0'
                }
            }else{
                if(number1[0] === '-'){
                    number1 = number1.substriing(1);
                }else{
                    number1 = '-' + number1
                }
            }
        }else if(id === 'point'){
            if(!(isPoint())){
                if(operator){
                    if(number2){
                        number2 = number2 + '.';
                    }else{
                        number2 = '0.';
                    }
                }else{
                    number1 = number1 + '.';
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
                    number2 = number2 + id;
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
                    number1 = number1 + id;
                }
            }
        }
        updateScreen();
    }

    function calculate(Num1, Num2, mode = false){
        Num1 = parseFloat(Num1);
        if(Num1isNegative){Num1 * -1};
        Num2 = parseFloat(Num2);
        if(mode){
            if(Num1isNegative){Num2 * -1};
        }else{
            if(Num2isNegative){Num2 * -1};
        }
        
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

        number1 = answer//.toFixed(3);
        Num1isNegative = (answer < 0) ? true : false; 
        number2 = '';
        Num2isNegative = false
        operator = '';
    }   


    function updateScreen(){
        let display = (number2) ? number2 : number1;
        screen.innerHTML = display;
        
    }


    function isPoint(){
        let isThere
        if(operator){
            isThere = number2.includes('.');
        }else{
            isThere = number1.includes('.');
        }
        console.log(isThere)
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
            console.log(prevOperator)
            if(!(prevOperator.id === ID)){
                prevOperator.style.color = 'white';
                prevOperator.style.backgroundColor = '#4765ff'
            }
        }
    }
        















});