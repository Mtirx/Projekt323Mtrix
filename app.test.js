// Test für createFlashcard
test('createFlashcard should create a flashcard object with the provided question, answer, rating of 0, and a unique id', () => {
    const question = 'Was ist die Hauptstadt von Deutschland?';
    const answer = 'Berlin';
    const flashcard = createFlashcard(question, answer);

    expect(flashcard).toHaveProperty('question', question);
    expect(flashcard).toHaveProperty('answer', answer);
    expect(flashcard).toHaveProperty('rating', 0);
    expect(flashcard).toHaveProperty('id');
    expect(typeof flashcard.id).toBe('number');
});

// Test für addFlashcard
test('addFlashcard should add a new flashcard to the flashcards array', () => {
    const initialFlashcards = [];
    const question = 'Was ist die Hauptstadt von Deutschland?';
    const answer = 'Berlin';

    const updatedFlashcards = addFlashcard(initialFlashcards, question, answer);

    expect(updatedFlashcards.length).toBe(1);
    expect(updatedFlashcards[0]).toHaveProperty('question', question);
    expect(updatedFlashcards[0]).toHaveProperty('answer', answer);
});

// Test für deleteFlashcard
test('deleteFlashcard should remove the flashcard with the specified id from the flashcards array', () => {
    const flashcard1 = createFlashcard('Frage 1', 'Antwort 1');
    const flashcard2 = createFlashcard('Frage 2', 'Antwort 2');
    const flashcards = [flashcard1, flashcard2];

    const updatedFlashcards = deleteFlashcard(flashcards, flashcard1.id);

    expect(updatedFlashcards.length).toBe(1);
    expect(updatedFlashcards[0]).toBe(flashcard2);
});

// Test für rateFlashcard
test('rateFlashcard should update the rating of the specified flashcard', () => {
    const flashcard1 = createFlashcard('Frage 1', 'Antwort 1');
    const flashcards = [flashcard1];

    const updatedFlashcards = rateFlashcard(flashcards, flashcard1.id, 2);

    expect(updatedFlashcards[0].rating).toBe(2);
});

// Test für toggleAnswer
test('toggleAnswer should toggle the display of the answer element', () => {
    // Simuliere das DOM-Element
    document.body.innerHTML = `
        <div id="answer-123" style="display: none;">Antwort 1</div>
    `;

    toggleAnswer(123);
    expect(document.getElementById('answer-123').style.display).toBe('block');

    toggleAnswer(123);
    expect(document.getElementById('answer-123').style.display).toBe('none');
});


//alle test sind fail da ich nicht alles funktional programmiert habe.