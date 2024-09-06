// Funktion um eine karte zu erstellen
const createFlashcard = (question, answer) => ({
    question,
    answer,
    rating: 0,
    id: Date.now()
});

// Funktion zum Hinzufügen Karte
const addFlashcard = (flashcards, question, answer) => [
    ...flashcards,
    createFlashcard(question, answer)
];

// Funktion zum Löschen einer Karte
const deleteFlashcard = (flashcards, id) =>
    flashcards.filter(card => card.id !== id);

// Funktion um Umschalten der Antwortanzeige
const toggleAnswer = (id) => {
    const answerElement = document.getElementById(`answer-${id}`);
    if (answerElement) {
        answerElement.style.display = answerElement.style.display === 'none' ? 'block' : 'none';
    }
};

// Funktion zum Rendern der Karten
const render = (flashcards) => {
    const currentFlashcardContainer = document.getElementById('current-flashcard');
    const flashcardsContainer = document.getElementById('flashcards');

    if (flashcards.length > 0) {
        const currentCard = flashcards[0];
        currentFlashcardContainer.innerHTML = `
            <div class="card flashcard" id="flashcard-${currentCard.id}">
                <div class="card-body">
                    <button class="btn-close" onclick="handleDelete(${currentCard.id})"></button>
                    <h5 class="card-title">Frage</h5>
                    <p class="card-text">${currentCard.question}</p>
                    <button class="btn btn-link" onclick="toggleAnswer(${currentCard.id})">Antwort anzeigen</button>
                    <p class="card-text answer" id="answer-${currentCard.id}">${currentCard.answer}</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" onclick="handleRate(${currentCard.id}, 0)">Schlecht</button>
                    <button class="btn btn-primary" onclick="handleRate(${currentCard.id}, 1)">Gut</button>
                    <button class="btn btn-success" onclick="handleRate(${currentCard.id}, 2)">Perfekt</button>
                </div>
            </div>
        `;
    } else {
        currentFlashcardContainer.innerHTML = "<p>Keine Quizkarten vorhanden.</p>";
    }

    flashcardsContainer.innerHTML = flashcards.slice(1).map(card => `
        <div class="card flashcard" id="flashcard-${card.id}">
            <div class="card-body">
                <button class="btn-close" onclick="handleDelete(${card.id})"></button>
                <h5 class="card-title">Frage</h5>
                <p class="card-text">${card.question}</p>
                <button class="btn btn-link" onclick="toggleAnswer(${card.id})">Antwort anzeigen</button>
                <p class="card-text answer" id="answer-${card.id}">${card.answer}</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-danger" onclick="handleRate(${card.id}, 0)">Schlecht</button>
                <button class="btn btn-primary" onclick="handleRate(${card.id}, 1)">Gut</button>
                <button class="btn btn-success" onclick="handleRate(${card.id}, 2)">Perfekt</button>
            </div>
        </div>
    `).join('');
};

// flashcard array initialisieren
let flashcards = [];

// Event-Handler für das Hinzufügen einer neuen Karte
document.getElementById('new-flashcard-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const question = document.getElementById('flashcard-question').value;
    const answer = document.getElementById('flashcard-answer').value;
    if (question && answer) {
        flashcards = addFlashcard(flashcards, question, answer);
        render(flashcards);
        document.getElementById('flashcard-question').value = '';
        document.getElementById('flashcard-answer').value = '';
    }
});

// Event-Handler für das Löschen einer Karte
const handleDelete = (id) => {
    flashcards = deleteFlashcard(flashcards, id);
    render(flashcards);
};

// Event-Handler für das Bewerten einer Karte
const handleRate = (id, ratingChange) => {
    flashcards = rateFlashcard(flashcards, id, ratingChange);
    render(flashcards);
};

// Initiales Rendering
render(flashcards);
