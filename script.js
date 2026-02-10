document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('counterBtn');
    const info = document.getElementById('info');
    let count = 0;

    btn.addEventListener('click', function() {
        count++;
        btn.textContent = `Geklickt! (${count})`;
        btn.style.background = `hsl(${count % 360}, 70%, 60%)`; // Farbwechsel
        
        if (count % 5 === 0) {
            info.textContent = `Wow, ${count} Klicks! Du bist fleißig. 😊`;
        } else {
            info.textContent = `Noch ${5 - (count % 5)} Klicks bis zum nächsten Meilenstein.`;
        }
    });
});
