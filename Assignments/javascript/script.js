document.getElementById(num1).innerHTML=""
document.getElementById(num2).innerHTML=""


function calc(num1,num2,sign){
    switch(sign){
        case 1 :
           { sign=="+"
           result= num1+num2
            break;}
            case 2 :
               { sign=="-"
                result= num1-num2
                break;}
                case 3 :
                    { sign=="*"
                        result=num1*num2  
                        break;}
                     case 4 :
                    { sign=="/"
                        result=num1/num2
                     break;}
            
    
    }
    
    
}
