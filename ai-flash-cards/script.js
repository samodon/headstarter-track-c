const flashcards = document.querySelectorAll('.flashcard');

// Function to shuffle the flashcards
function shuffleFlashcards() {
    const container = document.querySelector('.flashcard-container');
    for (let i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

// Initial shuffle
shuffleFlashcards();

// Variable to keep track of the last clicked card
let lastClickedCard = null;

// Add click event to each flashcard
flashcards.forEach(flashcard => {
    flashcard.addEventListener('click', () => {
        // If the last clicked card is not the current one, flip it back
        if (lastClickedCard && lastClickedCard !== flashcard) {
            lastClickedCard.classList.remove('flipped');
        }

        // Toggle the current flashcard
        flashcard.classList.toggle('flipped');

        // Update the last clicked card
        lastClickedCard = flashcard;
    });
});
