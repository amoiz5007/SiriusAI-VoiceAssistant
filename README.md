# Sirius AI - Voice Assistant

Sirius AI is a next-generation voice assistant that allows users to interact with various functionalities through voice commands. This project is built using Flask for the backend and vanilla JavaScript for the frontend.

## Features

- Voice command recognition
- Real-time responses
- Number guessing game
- Rock-paper-scissors game
- Wikipedia search
- Weather information
- Open popular websites

## Project Structure
Sirius/ ├── app.py ├── requirements.txt ├── static/ │ ├── css/ │ │ ├── style.css │ │ └── test.css │ ├── images/ │ ├── js/ │ │ └── script.js ├── templates/ │ └── index.html


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/sirius-ai-voice-assistant.git
    cd sirius-ai-voice-assistant
    ```

2. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

## Running the Application

1. Start the Flask server:
    ```sh
    python app.py
    ```

2. Open your web browser and navigate to `The URL wll be given in the terminal`.

## Usage

- Click the "Activate Voice Assistant" button to start giving voice commands.
- Use commands like "play number guessing game", "play rock paper scissors", "show schedule", "weather in [city]", "wikipedia [topic]", and "open [website]".

## File Descriptions

- [app.py](http://_vscodecontentref_/6): Main Flask application file that handles routes and voice command processing.
- [requirements.txt](http://_vscodecontentref_/7): List of Python packages required for the project.
- [style.css](http://_vscodecontentref_/8): Custom CSS styles for the application.
- [script.js](http://_vscodecontentref_/9): JavaScript file for handling speech recognition and UI interactions.
- [index.html](http://_vscodecontentref_/10): Main HTML template for the application.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [Flask](https://flask.palletsprojects.com/)
- [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- [Weather API](https://www.weatherapi.com/)
- [Wikipedia API](https://pypi.org/project/wikipedia/)
- [G4F Library](https://pypi.org/project/g4f/)

## Authors

- Abdul Moiz
- Shahzaib Khan
- Ammar Jaffri
- Ghania Siddiqui
