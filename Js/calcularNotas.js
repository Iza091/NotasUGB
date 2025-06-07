  // Variables globales
        let currentMode = '';
        let globalStep = 1;
        let selectedComputo = 0;

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            initializeModeSelector();
            generateGlobalSteps();
        });

        // Selector de modo
        function initializeModeSelector() {
            const modeCards = document.querySelectorAll('.mode-card');
            modeCards.forEach(card => {
                card.addEventListener('click', function() {
                    const mode = this.dataset.mode;
                    selectMode(mode);
                });
            });
        }

        function selectMode(mode) {
            currentMode = mode;
            
            // Update mode cards
            document.querySelectorAll('.mode-card').forEach(card => {
                card.classList.remove('active');
            });
            document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

            // Show calculator section
            setTimeout(() => {
                document.getElementById('modeSelector').style.display = 'none';
                if (mode === 'global') {
                    document.getElementById('globalCalculator').classList.add('active');
                } else {
                    document.getElementById('specificCalculator').classList.add('active');
                }
            }, 300);
        }

        // Calculadora Global
        function generateGlobalSteps() {
            const container = document.getElementById('globalSteps');
            container.innerHTML = '';

            for (let i = 1; i <= 3; i++) {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'form-card';
                stepDiv.id = `globalStep${i}`;
                stepDiv.style.display = i === 1 ? 'block' : 'none';

                stepDiv.innerHTML = `
                    <h3 class="mb-4">
                        <i class="fas fa-bookmark me-2"></i>Cómputo ${i}
                        <span class="badge bg-primary ms-2">${i}/3</span>
                    </h3>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label" for="L1C${i}">Laboratorio 1 (30%)</label>
                                <input type="number" class="form-control" id="L1C${i}" step="0.1" min="0" max="10">
                                <div class="error-message" id="L1C${i}Error"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label" for="L2C${i}">Laboratorio 2 (30%)</label>
                                <input type="number" class="form-control" id="L2C${i}" step="0.1" min="0" max="10">
                                <div class="error-message" id="L2C${i}Error"></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label" for="P1C${i}">Parcial (40%)</label>
                                <input type="number" class="form-control" id="P1C${i}" step="0.1" min="0" max="10">
                                <div class="error-message" id="P1C${i}Error"></div>
                            </div>
                        </div>
                    </div>
                `;

                container.appendChild(stepDiv);
            }
        }

        function nextGlobalStep() {
            if (globalStep < 3) {
                if (validateGlobalStep()) {
                    document.getElementById(`globalStep${globalStep}`).style.display = 'none';
                    globalStep++;
                    document.getElementById(`globalStep${globalStep}`).style.display = 'block';
                    updateGlobalProgress();
                    updateGlobalButtons();
                }
            } else if (globalStep === 3) {
                if (validateGlobalStep()) {
                    calculateGlobal();
                }
            }
        }

        function previousGlobalStep() {
            if (globalStep > 1) {
                document.getElementById(`globalStep${globalStep}`).style.display = 'none';
                globalStep--;
                document.getElementById(`globalStep${globalStep}`).style.display = 'block';
                updateGlobalProgress();
                updateGlobalButtons();
            }
        }

        function updateGlobalProgress() {
            const progress = (globalStep / 3) * 100;
            document.getElementById('globalProgress').style.width = progress + '%';
        }

        function updateGlobalButtons() {
            const prevBtn = document.getElementById('globalPrevBtn');
            const nextBtn = document.getElementById('globalNextBtn');

            prevBtn.style.display = globalStep > 1 ? 'inline-block' : 'none';
            nextBtn.innerHTML = globalStep === 3 ? 
                '<i class="fas fa-calculator me-2"></i>Calcular Final' : 
                'Siguiente<i class="fas fa-arrow-right ms-2"></i>';
        }

        function validateGlobalStep() {
            const inputs = document.querySelectorAll(`#globalStep${globalStep} input`);
            let isValid = true;

            inputs.forEach(input => {
                const errorDiv = document.getElementById(input.id + 'Error');
                if (!input.value || input.value < 0 || input.value > 10) {
                    errorDiv.textContent = 'Ingrese una nota válida entre 0 y 10';
                    isValid = false;
                } else {
                    errorDiv.textContent = '';
                }
            });

            return isValid;
        }

        function calculateGlobal() {
            const notas = [];
            for (let i = 1; i <= 3; i++) {
                const L1 = parseFloat(document.getElementById(`L1C${i}`).value);
                const L2 = parseFloat(document.getElementById(`L2C${i}`).value);
                const P1 = parseFloat(document.getElementById(`P1C${i}`).value);
                
                const promedio = (L1 * 0.3) + (L2 * 0.3) + (P1 * 0.4);
                notas.push(promedio);
            }

            const notaFinal = (notas[0] * 0.33) + (notas[1] * 0.33) + (notas[2] * 0.35);

            showGlobalResults(notas, notaFinal);
        }

        function showGlobalResults(notas, notaFinal) {
            const resultsDiv = document.getElementById('globalResults');
            
            let resultsHTML = `
                <h3 class="text-center mb-4">
                    <i class="fas fa-chart-line me-2"></i>Resultados Finales
                </h3>
            `;

            notas.forEach((nota, index) => {
                const status = getGradeStatus(nota);
                resultsHTML += `
                    <div class="result-item">
                        <div class="result-label">Cómputo ${index + 1}</div>
                        <div class="result-value ${status}">${nota.toFixed(2)}</div>
                    </div>
                `;
            });

            const finalStatus = getGradeStatus(notaFinal);
            resultsHTML += `
                <div class="result-item" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px solid #011B40;">
                    <div class="result-label" style="font-size: 1.2rem;">
                        <i class="fas fa-trophy me-2"></i>Nota Final
                    </div>
                    <div class="result-value ${finalStatus}" style="font-size: 1.5rem;">${notaFinal.toFixed(1)}</div>
                </div>
            `;

            resultsHTML += `
                <div class="text-center mt-4">
                    <button class="btn btn-secondary" onclick="resetCalculator()">
                        <i class="fas fa-redo me-2"></i>Nuevo Cálculo
                    </button>
                </div>
            `;

            resultsDiv.innerHTML = resultsHTML;
            resultsDiv.classList.add('show');
        }

        // Calculadora Específica
        function selectComputo(computo) {
            selectedComputo = computo;
            
            // Update buttons
            document.querySelectorAll('.computo-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-computo="${computo}"]`).classList.add('active');

            // Update form
            document.getElementById('specificTitle').textContent = `Cómputo ${computo}`;
            document.getElementById('specificForm').style.display = 'block';
            
            // Clear previous results
            document.getElementById('specificResults').classList.remove('show');
            
            // Clear form
            document.getElementById('specificL1').value = '';
            document.getElementById('specificL2').value = '';
            document.getElementById('specificP1').value = '';
            clearSpecificErrors();
        }

        function calculateSpecific() {
            if (!validateSpecificForm()) return;

            const L1 = parseFloat(document.getElementById('specificL1').value);
            const L2 = parseFloat(document.getElementById('specificL2').value);
            const P1 = parseFloat(document.getElementById('specificP1').value);

            const promedio = (L1 * 0.3) + (L2 * 0.3) + (P1 * 0.4);

            showSpecificResults(promedio);
        }

        function validateSpecificForm() {
            const inputs = ['specificL1', 'specificL2', 'specificP1'];
            let isValid = true;

            inputs.forEach(inputId => {
                const input = document.getElementById(inputId);
                const errorDiv = document.getElementById(inputId + 'Error');
                
                if (!input.value || input.value < 0 || input.value > 10) {
                    errorDiv.textContent = 'Ingrese una nota válida entre 0 y 10';
                    isValid = false;
                } else {
                    errorDiv.textContent = '';
                }
            });

            return isValid;
        }

        function showSpecificResults(promedio) {
            const resultsDiv = document.getElementById('specificResults');
            const status = getGradeStatus(promedio);
            
            let resultsHTML = `
                <h3 class="text-center mb-4">
                    <i class="fas fa-chart-bar me-2"></i>Resultado Cómputo ${selectedComputo}
                </h3>
                <div class="result-item" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border: 2px solid #011B40;">
                    <div class="result-label" style="font-size: 1.2rem;">
                        <i class="fas fa-star me-2"></i>Nota del Cómputo ${selectedComputo}
                    </div>
                    <div class="result-value ${status}" style="font-size: 1.5rem;">${promedio.toFixed(2)}</div>
                </div>
                <div class="text-center mt-4">
                    <button class="btn btn-secondary" onclick="clearSpecificForm()">
                        <i class="fas fa-eraser me-2"></i>Limpiar
                    </button>
                    <button class="btn btn-primary" onclick="resetCalculator()">
                        <i class="fas fa-redo me-2"></i>Nuevo Cálculo
                    </button>
                </div>
            `;

            resultsDiv.innerHTML = resultsHTML;
            resultsDiv.classList.add('show');
        }

        // Funciones de utilidad
        function getGradeStatus(grade) {
            if (grade >= 6) return 'passed';
            if (grade >= 5.6) return 'warning';
            return 'failed';
        }

        function clearSpecificErrors() {
            ['specificL1Error', 'specificL2Error', 'specificP1Error'].forEach(id => {
                document.getElementById(id).textContent = '';
            });
        }

        function clearSpecificForm() {
            document.getElementById('specificL1').value = '';
            document.getElementById('specificL2').value = '';
            document.getElementById('specificP1').value = '';
            clearSpecificErrors();
            document.getElementById('specificResults').classList.remove('show');
        }

        function resetCalculator() {
            // Reset global variables
            globalStep = 1;
            selectedComputo = 0;
            
            // Hide calculator sections
            document.getElementById('globalCalculator').classList.remove('active');
            document.getElementById('specificCalculator').classList.remove('active');
            
            // Show mode selector
            document.getElementById('modeSelector').style.display = 'block';
            
            // Reset mode cards
            document.querySelectorAll('.mode-card').forEach(card => {
                card.classList.remove('active');
            });
            
            // Reset global calculator
            document.getElementById('globalProgress').style.width = '0%';
            document.getElementById('globalResults').classList.remove('show');
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`globalStep${i}`).style.display = i === 1 ? 'block' : 'none';
                ['L1C', 'L2C', 'P1C'].forEach(prefix => {
                    document.getElementById(`${prefix}${i}`).value = '';
                    document.getElementById(`${prefix}${i}Error`).textContent = '';
                });
            }
            updateGlobalButtons();
            
            // Reset specific calculator
            document.querySelectorAll('.computo-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.getElementById('specificForm').style.display = 'none';
            document.getElementById('specificResults').classList.remove('show');
            clearSpecificForm();
        }