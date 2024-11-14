// calcularNotas.js
const container = document.querySelector('.container');

for (let i = 1; i <= 3; i++) {
    const div = document.createElement('div');
    div.id = `computo${i}`;
    div.classList.add('computo-section', 'card', 'mb-3', 'p-3');

    if (i === 1) {
        div.classList.add('show');
    }
    
    div.innerHTML = `
        <div class="text-center">
            <img src="./img/EscudoUGBBlanco.jpg" alt="Imagen" class="img-fluid mb-3" style="max-width: 150px;">
        </div>
        <h2 class="text-center">Cómputo ${i}</h2>
        <div class="mb-3">
            <label for="L1C${i}" class="form-label">Nota 1:</label>
            <input required type="number" id="L1C${i}" class="form-control">
        </div>
        <div class="mb-3">
            <label for="L2C${i}" class="form-label">Nota 2:</label>
            <input required type="number" id="L2C${i}" class="form-control">
        </div>
        <div class="mb-3">
            <label for="P1C${i}" class="form-label">Nota Parcial:</label>
            <input required type="number" id="P1C${i}" class="form-control">
        </div>
        <button onclick="siguienteComputo()" class="btn btn-primary w-100">Siguiente</button>
    `;

    container.appendChild(div);
}

const resultadosFinales = document.createElement('div');
resultadosFinales.id = 'resultadosFinales';
resultadosFinales.classList.add('resultados', 'card', 'p-3', 'mt-4');
resultadosFinales.innerHTML = '<!-- Resultados se mostrarán aquí -->';
container.appendChild(resultadosFinales);

let pasoActual = 1;

function siguienteComputo() {
    if (pasoActual < 3) {
        if (validarCampos()) {
            document.getElementById(`computo${pasoActual}`).classList.remove('show');
            pasoActual++;
            document.getElementById(`computo${pasoActual}`).classList.add('show');
        }
    } else if (pasoActual === 3) {
        calcularNotas();
    }
}

function validarCampos() {
    const inputs = document.querySelectorAll(`#computo${pasoActual} input[required]`);
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            alert('Por favor, complete todos los campos.');
            return false;
        }
    }
    return true;
}

function calcularNotas() {
    let L1C1 = parseFloat(document.getElementById("L1C1").value);
    let L2C1 = parseFloat(document.getElementById("L2C1").value);
    let P1C1 = parseFloat(document.getElementById("P1C1").value);

    let L1C2 = parseFloat(document.getElementById("L1C2").value);
    let L2C2 = parseFloat(document.getElementById("L2C2").value);
    let P1C2 = parseFloat(document.getElementById("P1C2").value);

    let L1C3 = parseFloat(document.getElementById("L1C3").value);
    let L2C3 = parseFloat(document.getElementById("L2C3").value);
    let P1C3 = parseFloat(document.getElementById("P1C3").value);

    if (isNaN(L1C1) || isNaN(L2C1) || isNaN(P1C1) ||
        isNaN(L1C2) || isNaN(L2C2) || isNaN(P1C2) ||
        isNaN(L1C3) || isNaN(L2C3) || isNaN(P1C3)) {
        alert("Ingrese valores numéricos válidos para todas las notas.");
        return;
    }

    let promedio1 = (L1C1 * 0.3) + (L2C1 * 0.3) + (P1C1 * 0.4);
    let promedio2 = (L1C2 * 0.3) + (L2C2 * 0.3) + (P1C2 * 0.4);
    let promedio3 = (L1C3 * 0.3) + (L2C3 * 0.3) + (P1C3 * 0.4);

    let notaFinal = (promedio1 * 0.33) + (promedio2 * 0.33) + (promedio3 * 0.35);

    let resultadosFinales = document.getElementById("resultadosFinales");
    resultadosFinales.innerHTML = "<h2>Resultados</h2>";
    resultadosFinales.innerHTML += "<p>C1: " + promedio1.toFixed(2) + "</p>";
    resultadosFinales.innerHTML += "<p>C2: " + promedio2.toFixed(2) + "</p>";
    resultadosFinales.innerHTML += "<p>C3: " + promedio3.toFixed(2) + "</p>";

    let notaFinalText = "NF: " + notaFinal.toFixed(1);
    let colorNotaFinal = '';
    if (notaFinal >= 6) {
        colorNotaFinal = '#04B404';
    } else if (notaFinal >= 5.6 && notaFinal < 6) {
        colorNotaFinal = '#FF8000';
    } else {
        colorNotaFinal = '#B40404';
    }

    let notaFinalElement = document.createElement('p');
    notaFinalElement.style.color = colorNotaFinal;
    notaFinalElement.style.fontWeight = 'bold';
    notaFinalElement.textContent = notaFinalText;
    resultadosFinales.appendChild(notaFinalElement);
}
