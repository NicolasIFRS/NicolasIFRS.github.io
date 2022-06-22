function tema_escuro(){
    var element1 = document.body;
    element1.classList.toggle("dark-mode");
}

function Selecionar_OPS(){
    var fall = document.getElementById("operadores").options[document.getElementById("operadores").selectedIndex].value;			
    var set_texto;
    var visualizar;
    if ( [ 'raiz', 'calc' ].indexOf(fall) > -1 ){			
        visualizar = "hidden";
        document.getElementById("txtValor1").value = ""
        switch(fall){
            case "raiz":
                set_texto = "49 (ex: √49 = 7)"; break;
            case "calc":
                set_texto = "7+3*(8-2)"; break;
            default:
                break;
        }
    }else{

        visualizar = "visible";
        set_texto = "Primeiro Número";
    }			
    document.getElementById("txtValor2").style.visibility = visualizar;
    document.getElementById("txtValor1").placeholder = set_texto;
}
function Limpar(id1, id2){
    document.getElementById(id1).value = "";
    document.getElementById(id2).value = "";
}	
function Calcular(id1, id2){
    var operador = document.getElementById("operadores").options[document.getElementById("operadores").selectedIndex].value;
    var num1 = document.getElementById(id1).value;
    var num2 = document.getElementById(id2).value;
    var resultado = new Number();
    var calcular = {
        porcentagem: function (){
            function inputN(id, n1, n2){
                return `<input 	type="number" style="width: 3em" id="pct" step="5" value="100" onchange="document.getElementById('${id}').innerHTML = ((${n1} * this.value) / ${n2}).toFixed(2); document.getElementById('nud${id}').innerHTML = this.value;">`;		
            }
            function details(result, how){
                return 	`
                    <details>
                              <summary>${result}</summary>
                              <p>${how}</p>
                    </details>
                        `;
            }
            var strRes = details(num1+"% de " +num2+" é " + (num2 * (num1 / 100)).toFixed(2), `(${num2} * ( ${num1} / 100 )`);
            strRes += details(num2+"% de " +num1+" é " + (num1 * (num2 / 100)).toFixed(2),  `(${num1} * (${num2} / 100) `);
            strRes += details(num1+" é "+((num1 * 100) / num2).toFixed(2)+"% de "+num2, `(${num1} * 100) / ${num2}`);
            strRes += details(num2+" é "+((num2 * 100) / num1).toFixed(2)+"% de "+num1, `(${num2} * 100) / ${num1}`);
            strRes += details("se "+num1+" é "+num2+"% entao o montante total é "+((num1 * 100) / num2).toFixed(2), `(${num1} * 100) / ${num2}`);	
            strRes += details("se "+num2+" é "+num1+"% entao o montante total é "+((num2 * 100) / num1).toFixed(2), `(${num2} * 100) / ${num1}`); //inverso
            strRes += details(num1+" + "+num2+"% = "+((num2/100+1) * num1).toFixed(2), `(${num2}/100+1) * ${num1}`);
            strRes += details(num1+" - "+num2+"% = "+((1-num2/100) * num1).toFixed(2), `(${num1}/100+1) * ${num2}`);
            return strRes;
        },
    }
    switch(operador)
    {
        case "+":
        case "-":
        case "/":
        case "*":
            var StrExpressao = num1 + operador + num2;
            resultado = eval(StrExpressao); break;					
        case "raiz":
            resultado = "&radic;"+num1 + " = " + Math.sqrt(num1); break;					
        case "potencia":
            resultado = num1+"<sup>"+num2 +"</sup> = "+ Math.pow(num1, num2); break;										
        case "porcento":
            resultado = calcular['porcentagem'](); break;
        case "calc":
            resultado = eval(num1); break;
        default:
            break;   
    }
    document.getElementById("saida").innerHTML = "Resultado: "+ resultado;
}