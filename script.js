addEventListener('DOMContentLoaded', function(){


    let number1 = '0';
    let Num1isNegative = false;
    let number2 = '';
    let Num2isNegative = false;
    let operator = '';

    let screen = document.querySelector('#screen');
    console.log(screen);

   
    function recordClick(id){
        if(id === 'clear'){
            let number1 = '0';
            let Num1isNegative = false;
            let number2 = '';
            let Num2isNegative = false;
            let operator = '';;
        }
        if(id === 'delete'){

        }
        if(id === 'equal'){
            if(number2){
                calculate(number1, number2);
            }else if(operator){
                calculate(number1, number1);
            }

        }
        if(id === 'plusminus'){
            if(operator){
                if(Num2isNegative){
                    Num2isNegative = false;
                    number2.replace('-', '');
                }else{
                    if(!number2){
                        number2 = '-0'
                    }

                }
            }else{
                if(Num1isNegative){
                    
                }else{

                }
            }
        }
        if(id === 'point'){
            if(!isPoint){
                if(operator){
                    if(number2){
                        number2 = number2 + '.'
                    }else{
                        number2 = '0.'
                    }
                }else{
                    number1 = number1 + '.'
                }
            }
        }
        if(id === 'add' || id === 'minus' || id === 'multiply' || id === 'divide'){
            if(number2){
                calculate(number1, number2)
            }
            operator = id;
        }else{
            if(operator){
                number2 = number2 + id;
            }else{
                number1 = number1 + id;
            }
        }
        updateScreen();
    }

    function calculate(Num1, Num2){
        if(operator === 'add'){
            number1 = Num1 + Num2;
        }else if(operator === 'minus'){
            number1 = Num1 - Num2; 
        }else if(operator === 'multiply'){
            number1 = Num1 * Num2;
        }else if(operator === 'divide'){
            number1 = Num1 / Num2;
        }

    }   


    function updateScreen(){
        document.querySelector('#screen').innerHTML = number1;
        console.log(number1)
    }


    function isPoint(){
        if(operator){
            return number2.includes('.');
        }else{
            return number1.includes('.');
        }
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
        console.log(ID)
        if(mode == 'on'){
            if(ID == 'clear' || ID == 'delete'){
                Button.style.backgroundColor = '#FF8080'
            }else if(ID === 'plusminus' || ID === 'add' || ID === 'minus' || ID === 'divide' || ID === 'multiply' || ID === 'equal'){
                Button.style.backgroundColor = '#a0b0ff'
            }else{   
                Button.style.backgroundColor = '#777'
            }
        }else{
            if(ID == 'clear' || ID == 'delete'){
                Button.style.backgroundColor = '#FF5050'
            }else if(ID === 'plusminus' || ID === 'equal'){
                Button.style.backgroundColor = '#4765ff'
            }else if(ID === 'minus' || ID === 'divide' || ID === 'multiply' || ID === 'add'){
                Button.style.color = '#4765ff';
                Button.style.backgroundColor = 'white'; 
                if(operator){
                    let preOperator = document.getElementById(operator);
                    //to do; complete RecordClick
                    preOperator.style.color = 'white';
                    preOperator.style.backgroundColor = '#4765ff';
                }
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
        















});