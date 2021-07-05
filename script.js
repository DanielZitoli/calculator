addEventListener('DOMContentLoaded', function(){


    function calculate(){




    }



    let buttons = document.querySelectorAll('.button');

    buttons.forEach(function(button){
        //When 
        button.addEventListener('mousedown', function(e){
            
            this.style.backgroundColor = '#777';
           
            this.addEventListener('mouseleave', function(){
                leaveButton(this)
            });


            this.addEventListener('mouseup', function(){
                clickButton(this)
            });

           
        });


        function clickButton(button){
            button.style.backgroundColor = '#444';
        };
        
        
        
        
        function leaveButton(button){
            
            button.style.backgroundColor = '#444';
            button.removeEventListener('mouseleave', leaveButton(button));
        }
        
        
     
    
    });

        















});