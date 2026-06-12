console.log("Native script loaded successfully");

// 1. Element Selectors
const startButton = document.getElementById("start-button");
const appTitle = document.getElementById("app-title");
const gameContainer = document.getElementById("game-container");
const continueButton = document.getElementById("continue-button");
const speechBubble = document.getElementById("speech-bubble");
const instructionBubble = document.getElementById("instruction-bubble");
const sortingBox = document.getElementById("sorting-box");
const checkButton = document.getElementById("check-button");

// Hide sorting elements immediately on startup
if (sortingBox) sortingBox.style.display = "none";
if (instructionBubble) instructionBubble.style.display = "none";
if (checkButton) checkButton.style.display = "none";

// 2. Dialogue Variables
const dialogueSequence = [
    "Quack! Welcome to the statistics farm!",
    "My name is Angela the duck!",
    "I need to determine the average weight of one plot of wheat.",
    "Can you help me?"
];

let currentDialogueIndex = 0;

function updateSpeechText() {
    if (speechBubble) {
        speechBubble.textContent = dialogueSequence[currentDialogueIndex];
    }
}

// 3. Shuffle Setup
function shuffleSteps() {
    if (!sortingBox) return;

    const items = Array.from(sortingBox.children);

    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }

    sortingBox.innerHTML = "";
    items.forEach(item => sortingBox.appendChild(item));
}

// 4. Start Screen
if (startButton) {
    startButton.addEventListener("click", () => {
        if (appTitle) appTitle.style.display = "none";
        startButton.style.display = "none";

        currentDialogueIndex = 0;
        updateSpeechText();

        if (gameContainer) {
            gameContainer.style.display = "flex";
        }
    });
}

// 5. Dialogue Progression
if (continueButton) {
    continueButton.addEventListener("click", () => {
        currentDialogueIndex++;

        if (currentDialogueIndex < dialogueSequence.length) {
            updateSpeechText();
        } else {
            if (speechBubble) {
                speechBubble.textContent = "Let's get to work!";
            }

            continueButton.style.display = "none";

            shuffleSteps();

            if (instructionBubble) instructionBubble.style.display = "block";
            if (sortingBox) sortingBox.style.display = "flex";
            if (checkButton) checkButton.style.display = "block";

            initDragAndDrop();
        }
    });
}

// 6. Drag & Drop System
function initDragAndDrop() {
    const items = document.querySelectorAll(".sortable-item");

    let draggedItem = null;

    items.forEach(item => {

        item.addEventListener("dragstart", (e) => {
            draggedItem = item;

            item.classList.add("dragging");

            e.dataTransfer.setData("text/plain", "");
            e.dataTransfer.effectAllowed = "move";

            document.querySelectorAll(".sortable-item").forEach(el => {
                el.classList.remove("correct");
                el.classList.remove("incorrect");
            });
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
            draggedItem = null;
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        item.addEventListener("drop", (e) => {
            e.preventDefault();

            if (!draggedItem || draggedItem === item) return;

            const parent = item.parentNode;

            const draggedIndex = [...parent.children].indexOf(draggedItem);
            const targetIndex = [...parent.children].indexOf(item);

            if (draggedIndex < targetIndex) {
                parent.insertBefore(draggedItem, item.nextSibling);
            } else {
                parent.insertBefore(draggedItem, item);
            }
        });
    });
}

// 7. Check Answer Logic
if (checkButton) {
    checkButton.addEventListener("click", () => {

        const currentItems = Array.from(sortingBox.children);

        let allCorrect = true;

        currentItems.forEach((item, index) => {

            const expectedStep = (index + 1).toString();
            const actualStep = item.dataset.step;

            if (actualStep === expectedStep) {
                item.classList.remove("incorrect");
                item.classList.add("correct");
            } else {
                item.classList.remove("correct");
                item.classList.add("incorrect");
                allCorrect = false;
            }
        });

        if (allCorrect) {

            if (speechBubble) {
                speechBubble.textContent =
                    "Amazing! The sample steps are perfectly ordered!";
            }

            checkButton.style.display = "none";

            document.querySelectorAll(".sortable-item").forEach(item => {
                item.setAttribute("draggable", "false");
                item.style.cursor = "default";
            });

        } else {

            if (speechBubble) {
                speechBubble.textContent =
                    "Hmm, that order is not right. Try again!";
            }
        }
    });
}