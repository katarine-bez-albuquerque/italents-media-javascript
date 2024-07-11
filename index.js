const prompt = require('prompt-sync')();

var aluno = new Object();
var materias = [];

function cadastrarAluno(nome, materias) {    
    aluno = new Object();
    aluno["nome"] = nome.toString().toUpperCase();
    aluno["materias"] = materias;
    return aluno;
}

function cadastrarNota() {
    let notas = [];
    for (let i = 0; i < 3; i++) {
        let nota = +prompt(`Informe a Nota ${i + 1}: `);
        validarNumero(nota);        
        notas.push(nota);
    }
    return notas;
}

function calcularMedia() {
    let notas = cadastrarNota();
    let soma = 0;

    for (let i = 0; i < notas.length; i++) {
        soma += notas[i];
    }
    return soma / notas.length;
}

function validarNumero(numero) {
    if(typeof (numero) !== 'number' || numero < 0 || !numero || Number.isNaN(numero)) {
        throw new Error("Informe somente números positivos!");
    }
}

function validarOpcao(numero) {
    validarNumero(numero);
    if (numero !== 1) {
        console.log("");
    }
}

function validarString(str) {
    if (typeof (str) !== 'string' || !str) {
        throw new Error("Informe somente texto!");
    }
}

function gerarDadosDaMateria(materias) {    
    let materia = prompt("Informe a Matéria: ");
    validarString(materia);
    materias.push({ "nome": materia.toString().toUpperCase(), "faltas": gerarFalta(materia), "media": calcularMedia().toFixed(1) });
}

function cadastrarMateria() {
    let contador = 0;

    console.log("");

    let confirma = +prompt("Deseja informar as matérias? Sim:[1] Não:[2]: ");
    validarOpcao(confirma);

    console.log("");

    while (confirma === 1) {
        if (contador === 3) {
            console.log("\nAtenção! É aceito no máximo 3 (três) Matérias!\n");
            break;
        }
        gerarDadosDaMateria(materias, contador, confirma);
        
        contador++;    
        console.log("");
        
        confirma = +prompt("Deseja informar as matérias? Sim:[1] Não:[2]: ");
        validarOpcao(confirma);
    
        console.log("");
    }
    return materias;
}

function gerarFalta(materia) {
    let qtdFaltas = +prompt(`Quantas faltas o aluno obteve na matéria ${materia}: `);
    validarNumero(qtdFaltas);    
    return qtdFaltas;
}

function contabilizarFaltas() {
    let aprovar = true;  
    console.log("");  
    const nome = prompt("Informe o nome do Aluno: ");

    validarString(nome);
    cadastrarAluno(nome,cadastrarMateria());
    
    materias.forEach(materia => {        
        if (materia.faltas <= 5) {
            if (materia.media >= 6) {
                console.log(`Aluno aprovado na matéria de ${materia.nome} com média ${materia.media}.`);
            }
            else {
                aprovar = false;
                console.log(`Aluno reprovado na matéria de ${materia.nome} com média ${materia.media}.`);
            }
        }
        else {
            aprovar = false;
            console.log(`Aluno reprovado por ter ${materia.faltas} faltas na matéria de ${materia.nome} com média ${materia.media}.`);
        }
    });
    
    aprovarAluno(aprovar);
}

function aprovarAluno(aprovar) {
    console.log("\nResultado Final do Curso:");
    console.log("Para passar é preciso ter média maior e igual a 6.0 e até 5 faltas.");
    if(aprovar) {
        console.log(`O aluno ${aluno["nome"]} foi Aprovado!\n`);
    }
    else {
        console.log(`O aluno ${aluno["nome"]} foi Reprovado!\n`);
    }
}

function resultados() {
    contabilizarFaltas();
}

try {
    resultados();
}
catch(error) {
    console.log(`\n${error.message}\n`);
}