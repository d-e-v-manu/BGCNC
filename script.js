let historyArray = [];

// Lade Historie aus LocalStorage beim Start
window.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    updateHistoryDisplay();
});

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display.value === '0' || display.value === '') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLastChar() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;
    
    if (!expression) return;
    
    try {
        // Berechne das Ergebnis
        const result = eval(expression);
        
        // Füge zur Historie hinzu
        addToHistory(expression, result);
        
        // Zeige Ergebnis an
        display.value = result;
        
    } catch (error) {
        display.value = 'Fehler';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleString('de-DE')
    };
    
    // Füge am Anfang hinzu (neueste zuerst)
    historyArray.unshift(historyItem);
    
    // Begrenze auf 10 Einträge
    if (historyArray.length > 10) {
        historyArray.pop();
    }
    
    // Speichere in LocalStorage
    saveHistory();
    
    // Aktualisiere Anzeige
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    
    if (historyArray.length === 0) {
        historyList.innerHTML = '<p class="empty-message">Keine Berechnungen vorhanden</p>';
        return;
    }
    
    historyList.innerHTML = historyArray.map(item => `
        <div class="history-item" onclick="loadCalculation('${item.expression}')">
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${item.result}</div>
        </div>
    `).join('');
}

function loadCalculation(expression) {
    document.getElementById('display').value = expression;
}

function clearHistory() {
    if (historyArray.length === 0) return;
    
    if (confirm('Möchten Sie die gesamte Historie löschen?')) {
        historyArray = [];
        saveHistory();
        updateHistoryDisplay();
    }
}

function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(historyArray));
}

function loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
        historyArray = JSON.parse(saved);
    }
}

// Enter-Taste für Berechnung
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    display.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});

