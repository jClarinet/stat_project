console.log("Statistics Farm loaded");

// ELEMENTS
const startButton = document.getElementById("start-button");
const appTitle = document.getElementById("app-title");
const gameContainer = document.getElementById("game-container");
const continueButton = document.getElementById("continue-button");
const speechBubble = document.getElementById("speech-bubble");
const instructionBubble = document.getElementById("instruction-bubble");
const sortingBox = document.getElementById("sorting-box");
const checkButton = document.getElementById("check-button");

// FARM POPULATION
const farmLots = [
    { id: 1, type: "Bamboo Shoot", emoji: "🎋", group: "Bamboo" },
    { id: 2, type: "Bamboo Shoot", emoji: "🎋", group: "Bamboo" },
    { id: 3, type: "Bamboo Shoot", emoji: "🎋", group: "Bamboo" },
    { id: 4, type: "Bamboo Shoot", emoji: "🎋", group: "Bamboo" },
    { id: 5, type: "Bamboo Shoot", emoji: "🎋", group: "Bamboo" },
    { id: 6, type: "Bamboo Shoot", emoji: "🎋", group: "Bamboo" },

    { id: 7, type: "Radish", emoji: "🥬", group: "Radish" },
    { id: 8, type: "Radish", emoji: "🥬", group: "Radish" },
    { id: 9, type: "Radish", emoji: "🥬", group: "Radish" },
    { id: 10, type: "Radish", emoji: "🥬", group: "Radish" },

    { id: 11, type: "Carrot", emoji: "🥕", group: "Carrot" },
    { id: 12, type: "Carrot", emoji: "🥕", group: "Carrot" },

    { id: 13, type: "Wheat Lot", emoji: "🌾", group: "Wheat" },
    { id: 14, type: "Wheat Lot", emoji: "🌾", group: "Wheat" },
    { id: 15, type: "Wheat Lot", emoji: "🌾", group: "Wheat" },
    { id: 16, type: "Wheat Lot", emoji: "🌾", group: "Wheat" },
    { id: 17, type: "Wheat Lot", emoji: "🌾", group: "Wheat" }
];

const methods = [
    "Simple Random Sample",
    "Stratified Random Sample",
    "Cluster Sample",
    "Systematic Sample",
    "Multistage Sample",
    "Bias Challenge"
];

let currentDialogueIndex = 0;
let currentMethodIndex = 0;
let selectedItems = [];
let systematicAnswer = [];

// START HIDDEN
if (sortingBox) sortingBox.style.display = "none";
if (instructionBubble) instructionBubble.style.display = "none";
if (checkButton) checkButton.style.display = "none";

// INTRO
const dialogueSequence = [
    "Quack! Welcome to Statistics Farm!",
    "I'm Angela the duck, and today our farm has 17 total plants and lots.",
    "There are 6 bamboo shoots, 4 radishes, 2 carrots, and 5 wheat lots.",
    "Let's learn sampling methods by actually sampling the farm!"
];

function setSpeech(text) {
    if (speechBubble) speechBubble.textContent = text;
}

function updateSpeechText() {
    setSpeech(dialogueSequence[currentDialogueIndex]);
}

// START BUTTON
startButton.addEventListener("click", () => {
    appTitle.style.display = "none";
    startButton.style.display = "none";
    gameContainer.style.display = "flex";

    currentDialogueIndex = 0;
    updateSpeechText();
});

// CONTINUE BUTTON
continueButton.addEventListener("click", () => {
    currentDialogueIndex++;

    if (currentDialogueIndex < dialogueSequence.length) {
        updateSpeechText();
    } else {
        continueButton.style.display = "none";
        instructionBubble.style.display = "block";
        sortingBox.style.display = "flex";
        checkButton.style.display = "block";
        loadSimpleRandomDragActivity();
    }
});

// GENERAL HELPERS
function clearActivity() {
    sortingBox.innerHTML = "";
    selectedItems = [];
    systematicAnswer = [];
    checkButton.style.display = "block";
    checkButton.textContent = "Check";
    checkButton.onclick = null;
}

function shuffleArray(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function makeButton(text, id, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;
    button.className = "game-action-button";
    button.addEventListener("click", onClick);
    return button;
}

function addTitle(text) {
    const title = document.createElement("div");
    title.className = "activity-title";
    title.textContent = text;
    sortingBox.appendChild(title);
}

function addExplanation(text) {
    const explanation = document.createElement("div");
    explanation.className = "activity-explanation";
    explanation.textContent = text;
    sortingBox.appendChild(explanation);
}

function addNextButton() {
    const existing = document.getElementById("next-method-button");
    if (existing) return;

    const nextButton = makeButton("➡️ Continue to Next Method", "next-method-button", () => {
        currentMethodIndex++;

        if (currentMethodIndex >= methods.length) {
            currentMethodIndex = 0;
            setSpeech("You finished the full Statistics Farm lesson! You can replay from the beginning.");
        }

        loadCurrentMethod();
    });

    sortingBox.appendChild(nextButton);
}

function loadCurrentMethod() {
    const method = methods[currentMethodIndex];

    if (method === "Simple Random Sample") {
        loadSimpleRandomGenerateActivity();
    } else if (method === "Stratified Random Sample") {
        loadStratifiedActivity();
    } else if (method === "Cluster Sample") {
        loadClusterActivity();
    } else if (method === "Systematic Sample") {
        loadSystematicActivity();
    } else if (method === "Multistage Sample") {
        loadMultistageActivity();
    } else if (method === "Bias Challenge") {
        loadBiasChallenge();
    }
}

// SIMPLE RANDOM SAMPLE DRAG ACTIVITY
function loadSimpleRandomDragActivity() {
    clearActivity();

    currentMethodIndex = 0;

    setSpeech("Simple random sample: every plant or lot has an equal chance of being selected.");
    instructionBubble.textContent = "Drag the steps into the correct order.";

    addTitle("Simple Random Sample: Order the Steps");

    const steps = [
        {
            step: 1,
            text: "Label the 6 bamboo shoots, 4 radishes, 2 carrots, and 5 wheat lots with numbers 1 through 17."
        },
        {
            step: 2,
            text: "Use a random number generator to choose numbers from 1 through 17."
        },
        {
            step: 3,
            text: "Ignore repeated numbers so the same plant or lot cannot be chosen twice."
        },
        {
            step: 4,
            text: "Match each selected number to its bamboo shoot, radish, carrot, or wheat lot."
        },
        {
            step: 5,
            text: "Use those selected plants and lots as the simple random sample."
        }
    ];

    shuffleArray(steps).forEach(stepObj => {
        const item = document.createElement("div");
        item.className = "sortable-item";
        item.draggable = true;
        item.dataset.step = stepObj.step;
        item.innerHTML = `<span>${stepObj.text}</span>`;
        sortingBox.appendChild(item);
    });

    initDragAndDrop();

    checkButton.textContent = "Check Order";
    checkButton.onclick = () => {
        const items = Array.from(document.querySelectorAll(".sortable-item"));
        let allCorrect = true;

        items.forEach((item, index) => {
            if (item.dataset.step === String(index + 1)) {
                item.classList.add("correct");
                item.classList.remove("incorrect");
            } else {
                item.classList.add("incorrect");
                item.classList.remove("correct");
                allCorrect = false;
            }
        });

        if (allCorrect) {
            setSpeech("Perfect! Now let's actually generate a simple random sample.");
            checkButton.style.display = "none";

            items.forEach(item => {
                item.draggable = false;
                item.style.cursor = "default";
            });

            const generateButton = makeButton("🎲 Generate Simple Random Sample", "sample-button", loadSimpleRandomGenerateActivity);
            sortingBox.appendChild(generateButton);
        } else {
            setSpeech("Not quite. Try dragging the steps into the correct order.");
        }
    };
}

// DRAG AND DROP
function initDragAndDrop() {
    const items = document.querySelectorAll(".sortable-item");
    let draggedItem = null;

    items.forEach(item => {
        item.addEventListener("dragstart", e => {
            draggedItem = item;
            item.classList.add("dragging");
            e.dataTransfer.setData("text/plain", "");
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
            draggedItem = null;
        });

        item.addEventListener("dragover", e => {
            e.preventDefault();
        });

        item.addEventListener("drop", e => {
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

// SIMPLE RANDOM SAMPLE GENERATOR
function loadSimpleRandomGenerateActivity() {
    clearActivity();

    setSpeech("SRS: every numbered item has the same chance of being picked.");
    instructionBubble.textContent = "Click the dice to randomly select 4 of the 17 numbered plants/lots.";

    addTitle("🎲 Simple Random Sample");
    addExplanation("All 17 items are placed into one big population. The dice randomly chooses 4 unique numbers.");

    createFarmGrid(farmLots);

    const generateButton = makeButton("🎲 Roll for SRS", "sample-button", () => {
        const sample = shuffleArray(farmLots).slice(0, 4);
        highlightItems(sample.map(item => item.id));

        setSpeech("SRS selected: " + sample.map(item => `#${item.id} ${item.type}`).join(", ") + ".");
    });

    sortingBox.appendChild(generateButton);
    addNextButton();
    checkButton.style.display = "none";
}

// STRATIFIED RANDOM SAMPLE
function loadStratifiedActivity() {
    clearActivity();
    setSpeech(
    "In a stratified random sample, we divide the population into homogeneous strata based on an important characteristic. Here the strata are crop types. We then perform a simple random sample within each stratum and combine the results."
);
  instructionBubble.textContent = "Click the dice to collect a simple random sample from each crop group.";

    addTitle("Stratified Random Sample");
    addExplanation("Strata are homogenous subgroups with shared characteristic(s): bamboo, radish, carrot, and wheat. We randomly select within each group, then combine the results.");

    createGroupedFarmGrid();

    const generateButton = makeButton("🎲 Run SRS in Each Stratum", "sample-button", () => {
        const bamboo = farmLots.filter(item => item.group === "Bamboo");
        const radish = farmLots.filter(item => item.group === "Radish");
        const carrot = farmLots.filter(item => item.group === "Carrot");
        const wheat = farmLots.filter(item => item.group === "Wheat");

        const sample = [
            randomItem(bamboo),
            randomItem(radish),
            randomItem(carrot),
            randomItem(wheat)
        ];

        highlightItems(sample.map(item => item.id));

        setSpeech("Stratified sample selected one random item from each stratum: " +
            sample.map(item => `#${item.id} ${item.type}`).join(", ") + ".");
    });

    sortingBox.appendChild(generateButton);
    addNextButton();
    checkButton.style.display = "none";
}

// CLUSTER SAMPLE
function loadClusterActivity() {
    clearActivity();

 
    setSpeech("Cluster sample: randomly choose an entire cluster, then include everything inside that cluster.");
    instructionBubble.textContent = "Click the dice to randomly select one whole crop cluster.";

    addTitle("🧺 Cluster Sample");
    addExplanation("Each crop type is treated as a cluster. The dice randomly chooses one cluster, and every item inside that cluster is included.");

    createGroupedFarmGrid();

    const generateButton = makeButton("🎲 Randomly Choose a Cluster", "sample-button", () => {
        const groups = ["Bamboo", "Radish", "Carrot", "Wheat"];
        const chosenGroup = randomItem(groups);
        const clusterItems = farmLots.filter(item => item.group === chosenGroup);

        highlightItems(clusterItems.map(item => item.id));

        setSpeech("Cluster sample selected the entire " + chosenGroup +
            " cluster: " + clusterItems.map(item => `#${item.id}`).join(", ") + ".");
    });

    sortingBox.appendChild(generateButton);
    addNextButton();
    checkButton.style.display = "none";
}

// SYSTEMATIC SAMPLE
function loadSystematicActivity() {
    clearActivity();

    const interval = 4;
    const start = Math.floor(Math.random() * interval) + 1;
    systematicAnswer = [];

    for (let id = start; systematicAnswer.length < 4; id += interval) {
        systematicAnswer.push(((id - 1) % 17) + 1);
    }

    setSpeech(`Systematic sample: randomly start at #${start}, then select every ${interval}th item.`);
    instructionBubble.textContent = `Click the correct items: start at #${start}, then count every ${interval}th item.`;

    addTitle("🔢 Systematic Sample");
    addExplanation(`Random start = #${start}. Interval = ${interval}. Select every ${interval}th item.`);

    createFarmGrid(farmLots);

    checkButton.textContent = "Check Systematic Sample";
    checkButton.onclick = () => {
        const selectedIds = selectedItems.map(item => item.id).sort((a, b) => a - b);
        const answerIds = [...systematicAnswer].sort((a, b) => a - b);

        if (JSON.stringify(selectedIds) === JSON.stringify(answerIds)) {
            setSpeech("Correct! You followed the systematic pattern.");
            highlightItems(systematicAnswer);
            checkButton.style.display = "none";
            addNextButton();
        } else {
            setSpeech("Not quite. Start at the random start number, then count every 4th item.");
        }
    };
}

// MULTISTAGE SAMPLE
function loadMultistageActivity() {
    clearActivity();

    setSpeech("Multistage sample: first randomly choose a cluster, then randomly sample inside that cluster.");
    instructionBubble.textContent = "Click the dice for stage 1. Then click again for stage 2.";

    addTitle("🎯 Multistage Sample");
    addExplanation("Stage 1: randomly choose a crop group. Stage 2: randomly choose items inside that group.");

    createGroupedFarmGrid();

    let chosenGroup = null;

    const stageOneButton = makeButton("🎲 Stage 1: Choose Group", "sample-button", () => {
        const groups = ["Bamboo", "Radish", "Carrot", "Wheat"];
        chosenGroup = randomItem(groups);
        const groupItems = farmLots.filter(item => item.group === chosenGroup);

        highlightItems(groupItems.map(item => item.id));

        setSpeech("Stage 1 chose the " + chosenGroup + " group. Now run a random sample inside it.");
        stageTwoButton.style.display = "block";
    });

    const stageTwoButton = makeButton("🎲 Stage 2: Sample Inside Group", "sample-button-2", () => {
        if (!chosenGroup) {
            setSpeech("Choose a group first.");
            return;
        }

        const groupItems = farmLots.filter(item => item.group === chosenGroup);
        const sampleSize = Math.min(2, groupItems.length);
        const sample = shuffleArray(groupItems).slice(0, sampleSize);

        highlightItems(sample.map(item => item.id));

        setSpeech("Multistage sample selected from " + chosenGroup + ": " +
            sample.map(item => `#${item.id} ${item.type}`).join(", ") + ".");

        addNextButton();
    });

    stageTwoButton.style.display = "none";

    sortingBox.appendChild(stageOneButton);
    sortingBox.appendChild(stageTwoButton);

    checkButton.style.display = "none";
}

// BIAS CHALLENGE
function loadBiasChallenge() {
    clearActivity();

    setSpeech("Bias challenge: this sample only uses wheat lots. Is that representative of the whole farm?");
    instructionBubble.textContent = "Click the biased items, then check why the sample is bad.";

    addTitle("Bias Challenge!");
    addExplanation("A sample can be random-looking but still biased if it overrepresents one part of the population.");

    createFarmGrid(farmLots);

    const wheatIds = farmLots.filter(item => item.group === "Wheat").map(item => item.id);
    highlightItems(wheatIds);

    checkButton.textContent = "Why Is This Biased?";
    checkButton.onclick = () => {
        setSpeech("This sample is biased because it only includes wheat lots. If our goal is to estimate the quality of the entire farm, bamboo shoots, radishes, and carrots are completely excluded, making the sample unrepresentative of the population.");
        checkButton.style.display = "none";

        const restartButton = makeButton("🔁 Review From Beginning", "next-method-button", () => {
            currentMethodIndex = 0;
            loadSimpleRandomDragActivity();
        });

        sortingBox.appendChild(restartButton);
    };
}

// FARM GRID
function createFarmGrid(items) {
    const grid = document.createElement("div");
    grid.className = "farm-grid";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "crop-card";
        card.dataset.id = item.id;
        card.dataset.group = item.group;
        card.textContent = `${item.emoji} #${item.id}`;

        card.addEventListener("click", () => {
            toggleCropSelection(card, item);
        });

        grid.appendChild(card);
    });

    sortingBox.appendChild(grid);
}

function createGroupedFarmGrid() {
    const groups = [
        { name: "Bamboo Stratum", group: "Bamboo" },
        { name: "Radish Stratum", group: "Radish" },
        { name: "Carrot Stratum", group: "Carrot" },
        { name: "Wheat Stratum", group: "Wheat" }
    ];

    groups.forEach(groupObj => {
        const groupBox = document.createElement("div");
        groupBox.className = "crop-group-box";

        const label = document.createElement("div");
        label.className = "crop-group-label";
        label.textContent = groupObj.name;

        const miniGrid = document.createElement("div");
        miniGrid.className = "farm-grid mini";

        farmLots
            .filter(item => item.group === groupObj.group)
            .forEach(item => {
                const card = document.createElement("div");
                card.className = "crop-card";
                card.dataset.id = item.id;
                card.dataset.group = item.group;
                card.textContent = `${item.emoji} #${item.id}`;

                card.addEventListener("click", () => {
                    toggleCropSelection(card, item);
                });

                miniGrid.appendChild(card);
            });

        groupBox.appendChild(label);
        groupBox.appendChild(miniGrid);
        sortingBox.appendChild(groupBox);
    });
}

function toggleCropSelection(card, item) {
    const alreadySelected = selectedItems.some(selected => selected.id === item.id);

    if (alreadySelected) {
        selectedItems = selectedItems.filter(selected => selected.id !== item.id);
        card.classList.remove("selected-crop");
    } else {
        selectedItems.push(item);
        card.classList.add("selected-crop");
    }
}

function highlightItems(ids) {
    document.querySelectorAll(".crop-card").forEach(card => {
        card.classList.remove("selected-crop");
        card.classList.remove("glow-crop");
    });

    ids.forEach(id => {
        const card = document.querySelector(`.crop-card[data-id="${id}"]`);
        if (card) {
            card.classList.add("selected-crop");
            card.classList.add("glow-crop");
        }
    });
}
