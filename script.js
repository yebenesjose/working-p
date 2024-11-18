// Piano key event handlers
const pianoKeys = document.querySelectorAll('.pk');
const display = document.querySelector('._display span');
const metronomeBtn = document.querySelector('.metroOnOf');
const metronomeAudio = document.querySelector('.me');
let metronomeInterval;
let isMetronomeOn = false;

// Piano key press handler
function handleKeyPress(event) {
    const key = document.querySelector(`.a${event.keyCode}`);
    const audio = document.querySelector(`.e${event.keyCode}`);
    const light = document.querySelector(`.l${event.keyCode}`);
    
    if (key && audio) {
        key.classList.add('_active');
        audio.currentTime = 0;
        audio.play();
        display.textContent = key.dataset.note || 'PLAY';
        light?.classList.add('light');
    }
}

// Piano key release handler
function handleKeyRelease(event) {
    const key = document.querySelector(`.a${event.keyCode}`);
    const light = document.querySelector(`.l${event.keyCode}`);
    
    if (key) {
        key.classList.remove('_active');
        light?.classList.remove('light');
    }
}

// Mouse click handlers for piano keys
pianoKeys.forEach(key => {
    key.addEventListener('mousedown', () => {
        key.classList.add('_active');
        const note = key.dataset.note;
        const audio = document.getElementById(note);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
            display.textContent = note;
        }
    });

    key.addEventListener('mouseup', () => {
        key.classList.remove('_active');
    });

    key.addEventListener('mouseleave', () => {
        key.classList.remove('_active');
    });
});

// Metronome controls
function toggleMetronome() {
    isMetronomeOn = !isMetronomeOn;
    metronomeBtn.classList.toggle('btnactive');
    
    if (isMetronomeOn) {
        const tempo = document.getElementById('demoInput').value;
        const interval = 60000 / (tempo * 120);
        metronomeInterval = setInterval(() => {
            metronomeAudio.currentTime = 0;
            metronomeAudio.play();
        }, interval);
    } else {
        clearInterval(metronomeInterval);
    }
}

// Demo song functionality
const song = [
    { note: 'C4', duration: 500 },
    { note: 'D4', duration: 500 },
    { note: 'E4', duration: 500 },
    { note: 'F4', duration: 500 },
    { note: 'G4', duration: 500 },
    { note: 'A4', duration: 500 },
    { note: 'B4', duration: 500 },
    { note: 'C5', duration: 1000 }
];

let isPlaying = false;
let songTimeout;

function playSong() {
    if (isPlaying) {
        clearTimeout(songTimeout);
        isPlaying = false;
        return;
    }

    isPlaying = true;
    let delay = 0;

    song.forEach(note => {
        songTimeout = setTimeout(() => {
            const key = document.querySelector(`[data-note="${note.note}"]`);
            const audio = document.getElementById(note.note);
            
            if (key && audio) {
                key.classList.add('_active');
                audio.currentTime = 0;
                audio.play();
                display.textContent = note.note;
                
                setTimeout(() => {
                    key.classList.remove('_active');
                }, note.duration - 50);
            }
        }, delay);
        
        delay += note.duration;
    });

    setTimeout(() => {
        isPlaying = false;
    }, delay);
}

// Event listeners
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);
document.querySelector('.metroOnOf').addEventListener('click', toggleMetronome);
document.getElementById('btnsong').addEventListener('click', playSong);

// Tempo controls
function increment() {
    const input = document.getElementById('demoInput');
    if (input.value < 1.25) {
        input.value = parseFloat(input.value) + 0.25;
        if (isMetronomeOn) {
            toggleMetronome();
            toggleMetronome();
        }
    }
}

function decrement() {
    const input = document.getElementById('demoInput');
    if (input.value > 0.75) {
        input.value = parseFloat(input.value) - 0.25;
        if (isMetronomeOn) {
            toggleMetronome();
            toggleMetronome();
        }
    }
}

// Export functions for global access
window.btn = toggleMetronome;
window.btn2 = playSong;
window.increment = increment;
window.decrement = decrement;