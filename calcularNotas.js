let pasoActual = 1;

function siguienteComputo() {
    if (validarCampos()) {
        document.getElementById(`computo${pasoActual}`).classList.remove('show');
        pasoActual++;
        document.getElementById(`computo${pasoActual}`).classList.add('show');
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
    // Obtener los valores de las notas ingresadas para cada computo
    let L1C1 = parseFloat(document.getElementById("L1C1").value);
    let L2C1 = parseFloat(document.getElementById("L2C1").value);
    let P1C1 = parseFloat(document.getElementById("P1C1").value);

    let L1C2 = parseFloat(document.getElementById("L1C2").value);
    let L2C2 = parseFloat(document.getElementById("L2C2").value);
    let P1C2 = parseFloat(document.getElementById("P1C2").value);

    let L1C3 = parseFloat(document.getElementById("L1C3").value);
    let L2C3 = parseFloat(document.getElementById("L2C3").value);
    let P1C3 = parseFloat(document.getElementById("P1C3").value);

    // Verificar si se ingresaron valores válidos
    if (isNaN(L1C1) || isNaN(L2C1) || isNaN(P1C1) ||
        isNaN(L1C2) || isNaN(L2C2) || isNaN(P1C2) ||
        isNaN(L1C3) || isNaN(L2C3) || isNaN(P1C3)) {
        alert("Ingrese valores numéricos válidos para todas las notas.");
        return;
    }

    // Calcular los promedios para cada computo
    let promedio1 = (L1C1 * 0.3) + (L2C1 * 0.3) + (P1C1 * 0.4);
    let promedio2 = (L1C2 * 0.3) + (L2C2 * 0.3) + (P1C2 * 0.4);
    let promedio3 = (L1C3 * 0.3) + (L2C3 * 0.3) + (P1C3 * 0.4);

    // Calcular la nota final ponderada
    let notaFinal = (promedio1 * 0.35) + (promedio2 * 0.35) + (promedio3 * 0.30);

    // Mostrar los resultados en la página web
    let resultadosFinales = document.getElementById("resultadosFinales");
    resultadosFinales.innerHTML = "<h2>Resultados</h2>";
    resultadosFinales.innerHTML += "<p>Promedio Computo 1: " + promedio1.toFixed(2) + "</p>";
    resultadosFinales.innerHTML += "<p>Promedio Computo 2: " + promedio2.toFixed(2) + "</p>";
    resultadosFinales.innerHTML += "<p>Promedio Computo 3: " + promedio3.toFixed(2) + "</p>";
    resultadosFinales.innerHTML += "<p>Nota Final: " + notaFinal.toFixed(2) + "</p>";
}
