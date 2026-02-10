let displayValue = '0';
let operator = '';
let previousValue = 0;

// Taschenrechner
function appendToDisplay(value) {
    if (displayValue === '0' && value !== '.') displayValue = value;
    else displayValue += value;
    document.getElementById('display').textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    document.getElementById('display').textContent = '0';
}

function calculate() {
    try {
        displayValue = eval(displayValue.replace('×', '*')).toString();
        document.getElementById('display').textContent = displayValue;
    } catch {
        displayValue = 'Fehler';
        document.getElementById('display').textContent = 'Fehler';
    }
}

// Größenrechner (wie vorher)
function berechneQuader() {
    const l = parseFloat(document.getElementById('quaderL').value) || 0;
    const b = parseFloat(document.getElementById('quaderB').value) || 0;
    const h = parseFloat(document.getElementById('quaderH').value) || 0;
    const v = l*b*h, f = 2*(l*b + l*h + b*h);
    document.getElementById('groessenErgebnis').innerHTML = `Volumen: ${v.toFixed(1)} cm³ | Fläche: ${f.toFixed(1)} cm²`;
}

function berechneZylinder() {
    const r = parseFloat(document.getElementById('zylR').value) || 0;
    const h = parseFloat(document.getElementById('zylH').value) || 0;
    const v = Math.PI * r*r * h, f = 2 * Math.PI * r * (r + h);
    document.getElementById('groessenErgebnis').innerHTML = `Volumen: ${v.toFixed(1)} cm³ | Fläche: ${f.toFixed(1)} cm²`;
}

// Theme Toggle
document.getElementById('themeToggle').onclick = () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
};

// Responsive Echtzeit
window.onload = () => {
    document.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
        if (input.id.includes('quader') || input.id.includes('zyl')) berechneQuader() || berechneZylinder();
    }));
};

