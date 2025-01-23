// Initialize speech recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false; // Set to false to stop after one command
recognition.interimResults = false;
recognition.lang = 'en-US';

// Initialize variables
let isListening = false;
const startButton = document.getElementById('start-button');
const responseBox = document.getElementById('response');
const listeningIndicator = document.getElementById('listening-indicator');

// Array to store previous commands
let previousCommands = [];

// Initialize the UI
document.addEventListener('DOMContentLoaded', function () {
    responseBox.classList.remove('active'); // Initially hide response box
});

// Handle start button click
startButton.addEventListener('click', function () {
    if (!isListening) {
        startListening();
    } else {
        stopListening();
    }
});

// Function to start listening
function startListening() {
    try {
        recognition.start();
        isListening = true;
        responseBox.classList.add('active');
        listeningIndicator.classList.remove('hidden');
        startButton.innerHTML = '<i class="fas fa-stop mr-2"></i>Stop Listening';
        startButton.classList.add('bg-red-600', 'hover:bg-red-700');
        startButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    } catch (error) {
        console.error('Speech recognition error:', error);
    }
}

// Function to stop listening
function stopListening() {
    recognition.stop();
    isListening = false;
    listeningIndicator.classList.add('hidden');
    startButton.innerHTML = '<i class="fas fa-microphone mr-2"></i>Activate Voice Assistant';
    startButton.classList.remove('bg-red-600', 'hover:bg-red-700');
    startButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
}

// Initialize speech synthesis
const synth = window.speechSynthesis;

// Handle voices loaded
let availableVoices = [];
window.speechSynthesis.onvoiceschanged = function () {
    availableVoices = synth.getVoices();
    console.log('Available voices:', availableVoices);
};

// Function to speak the response
function speakResponse(text) {
    if (synth.speaking) {
        console.error('SpeechSynthesisUtterance.speaking');
        synth.cancel(); // Cancel ongoing speech to clear the queue
    }
    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        const preferredVoice = availableVoices.find(v => v.name === 'Google US English') || availableVoices[0];

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        utterance.rate = 1; // Normal speaking rate
        utterance.pitch = 1; // Normal pitch

        utterance.onend = () => console.log('SpeechSynthesisUtterance.onend');
        utterance.onerror = (event) => console.error('SpeechSynthesisUtterance.onerror', event);

        synth.speak(utterance);
    }
}

// Handle speech recognition results
recognition.onresult = function (event) {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    console.log("Transcript:", transcript);

    stopListening(); // Stop the listening animation and process

    // Send command to server
    fetch('/api/voice-command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: transcript }),
    })
        .then(response => response.json())
        .then(data => {
            updateResponseDisplay(transcript, data.response);
            speakResponse(data.response);
        })
        .catch(error => {
            console.error("Error:", error);
            updateResponseDisplay(transcript, "Sorry, there was an error processing your command.");
        });
};

// Function to update response display
function updateResponseDisplay(command, response) {
    previousCommands.push({ command, response });
    if (previousCommands.length > 5) {
        previousCommands.shift(); // Keep only the last 5 commands
    }

    const responseContent = previousCommands
        .map(
            item => `
        <div class="mb-4">
            <strong class="text-blue-300">You:</strong> ${item.command}<br>
            <strong class="text-blue-300">Sirius:</strong> ${item.response}
        </div>`
        )
        .join('');

    responseBox.innerHTML = responseContent;
}

// Handle speech recognition errors
recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
    updateResponseDisplay('Error', 'There was an error with the speech recognition. Please try again.');
    stopListening();
};

// Handle when recognition ends
recognition.onend = function () {
    if (isListening) {
        stopListening(); // Ensure the UI updates correctly
    }
};
