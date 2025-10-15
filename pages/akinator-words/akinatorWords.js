// ------------------- DATA -------------------
const questions = [
  { text: "Is it something you can touch?", tag: "tangible" },
  { text: "Is it alive?", tag: "living" },
  { text: "Is it an animal?", tag: "animal" },
  { text: "Is it bigger than a basketball?", tag: "large" },
  { text: "Is it man-made?", tag: "manmade" },
  { text: "Is it used in technology?", tag: "tech" },
  { text: "Is it a concept or idea?", tag: "concept" },
  { text: "Is it commonly found in nature?", tag: "natural" },
  { text: "Is it a place?", tag: "place" },
  { text: "Is it an emotion?", tag: "emotion" },
  { text: "Does it exist on the internet?", tag: "internet" },
  { text: "Is it small?", tag: "small" },
  { text: "Is it large?", tag: "large" },
  { text: "Can it move on its own?", tag: "mobile" },
  { text: "Is it edible?", tag: "edible" },
  { text: "Can you buy it in a store?", tag: "buyable" },
  { text: "Does it have wheels?", tag: "wheeled" },
  { text: "Is it colorful?", tag: "colorful" },
  { text: "Is it a tool?", tag: "tool" }
];

const wordList = [
  { word: "elephant", tags: ["animal","tangible","living","large","natural","mobile"] },
  { word: "dog", tags: ["animal","tangible","living","small","natural","mobile"] },
  { word: "cat", tags: ["animal","tangible","living","small","natural","mobile"] },
  { word: "rock", tags: ["tangible","natural","small"] },
  { word: "tree", tags: ["living","natural","tangible","large"] },
  { word: "computer", tags: ["tech","tangible","manmade","small"] },
  { word: "phone", tags: ["tech","tangible","manmade","small","buyable","internet"] },
  { word: "internet", tags: ["tech","concept","manmade","internet"] },
  { word: "email", tags: ["tech","concept","internet"] },
  { word: "robot", tags: ["tech","tangible","manmade","mobile"] },
  { word: "happiness", tags: ["emotion","concept"] },
  { word: "freedom", tags: ["concept"] },
  { word: "love", tags: ["emotion","concept"] },
  { word: "anger", tags: ["emotion","concept"] },
  { word: "city", tags: ["place","manmade","large"] },
  { word: "forest", tags: ["place","natural","large"] },
  { word: "beach", tags: ["place","natural"] },
  { word: "car", tags: ["tangible","manmade","tech","wheeled","mobile"] },
  { word: "airplane", tags: ["tangible","manmade","tech","large","mobile"] },
  { word: "chair", tags: ["tangible","manmade","small"] },
  { word: "table", tags: ["tangible","manmade"] },
  { word: "book", tags: ["tangible","manmade"] },
  { word: "idea", tags: ["concept"] },
  { word: "cloud", tags: ["natural","concept"] },
  { word: "virus", tags: ["natural","small"] },
  { word: "music", tags: ["concept"] },
  { word: "website", tags: ["internet","tech","concept"] },
  { word: "school", tags: ["place","manmade"] },
  { word: "river", tags: ["natural","place","large"] },
  { word: "pencil", tags: ["tangible","small","manmade","tool"] }
];

// ------------------- STATE -------------------
let remainingWords = [...wordList];
let askedQuestions = new Set();
let wrongGuesses = 0;
const maxWrongGuesses = 3;

const questionDiv = document.getElementById("question");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const maybeBtn = document.getElementById("maybe");

// ------------------- LOGIC -------------------

// pick question that best splits remaining words
function pickNextQuestion() {
  let bestQuestion = null;
  let bestSplit = Infinity;

  for (const q of questions) {
    if (askedQuestions.has(q.tag)) continue;

    let yesCount = remainingWords.filter(w => w.tags.includes(q.tag)).length;
    let noCount = remainingWords.length - yesCount;
    let diff = Math.abs(yesCount - noCount);

    if (diff < bestSplit && yesCount > 0 && noCount > 0) {
      bestSplit = diff;
      bestQuestion = q;
    }
  }

  return bestQuestion;
}

// show next question
function showQuestion() {
  if (remainingWords.length === 1) return makeGuess();

  const nextQ = pickNextQuestion();
  if (!nextQ) return makeGuess();

  askedQuestions.add(nextQ.tag);
  questionDiv.textContent = nextQ.text;

  yesBtn.onclick = () => handleAnswer(true, nextQ.tag);
  noBtn.onclick = () => handleAnswer(false, nextQ.tag);
  maybeBtn.onclick = () => handleAnswer(null, nextQ.tag);
}

// handle answer to question
function handleAnswer(answer, tag) {
  if (answer === true) {
    remainingWords = remainingWords.filter(w => w.tags.includes(tag));
  } else if (answer === false) {
    remainingWords = remainingWords.filter(w => !w.tags.includes(tag));
  }

  if (remainingWords.length === 0) return handleFailure();
  if (remainingWords.length === 1) return makeGuess();
  showQuestion();
}

// make a guess
function makeGuess() {
  const guess = remainingWords[0];
  questionDiv.textContent = `Is your word "${guess.word}"?`;
  yesBtn.textContent = "Yes 🎉";
  noBtn.textContent = "No ❌";
  maybeBtn.style.display = "none";

  yesBtn.onclick = () => showVictory(guess.word);
  noBtn.onclick = () => {
    wrongGuesses++;
    if (wrongGuesses >= maxWrongGuesses) {
      handleFailure();
    } else {
      remainingWords.shift(); // remove wrong guess
      showQuestion();
    }
  };
}

// show victory
function showVictory(word) {
  questionDiv.textContent = `🎉 I guessed it! Your word was "${word}".`;
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  maybeBtn.style.display = "none";
}

// handle failure
function handleFailure() {
  questionDiv.innerHTML = `
    😔 I couldn't guess it.<br>
    What was your word?
    <input id="newWordInput" placeholder="Type it here" />
    <button id="saveWordBtn">Save & Teach Me</button>
  `;
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  maybeBtn.style.display = "none";

  document.getElementById("saveWordBtn").onclick = () => {
    const newWord = document.getElementById("newWordInput").value.trim().toLowerCase();
    if (newWord) {
      alert(`Thanks! You taught me the word: "${newWord}"`);
      console.log("Missed word:", newWord);
    }
  };
}

// start game
showQuestion();
