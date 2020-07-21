// Vamos falar de coisas básicas da programação em JavaScript

// Variáveis: guardo em memória (primária) para usar mais trarde

// Functions:
// Dessa forma
function soma(numero1, numero2) { //NUNCA SE ESQUEÇA DOS PARÂMETROS DA FUNÇÃO!
    console.log(numero1 + numero2)
}

soma(10, 20); 
soma(1, 2);

// Ou dessa forma:
function somar(numero3, numero4) {
    const somarr = numero3 + numero4
    return somarr;
}

const somarrr = somar(10, 5)
console.log(somarrr);

// Objetos: tem propriedades (atributos) e valor
// NPM: faz parte do Node.js, e é um gerenciador de pacotes! serve p iniciar, configurar, instalar outros pacotes etc!!
// npm init -y (o y vai responder "sim" a tudo o que o terminal perguntar)
// json: javascript object notation => "propriedade": "valor",