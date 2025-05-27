const questions = [
    { text: "Is it something you can touch?", filter: (w) => w.tags.includes("tangible") },
    { text: "Is it an animal?", filter: (w) => w.tags.includes("animal") },
    { text: "Does it have more than 5 letters?", filter: (w) => w.word.length > 5 },
    { text: "Is it used in technology?", filter: (w) => w.tags.includes("tech") },
    { text: "Is it a concept or idea?", filter: (w) => w.tags.includes("concept") },
    { text: "Is it something alive?", filter: (w) => w.tags.includes("living") },
    { text: "Is it man-made?", filter: (w) => w.tags.includes("manmade") },
    { text: "Is it smaller than a basketball?", filter: (w) => w.tags.includes("small") },
    { text: "Is it commonly found in nature?", filter: (w) => w.tags.includes("natural") },
    { text: "Is it a place?", filter: (w) => w.tags.includes("place") },
    { text: "Is it an emotion?", filter: (w) => w.tags.includes("emotion") },
    { text: "Does it exist on the internet?", filter: (w) => w.tags.includes("internet") }
  ];
  
  const wordList = [
    { word: "elephant", tags: ["animal", "tangible", "living", "large", "natural"] },
    { word: "dog", tags: ["animal", "tangible", "living", "small", "natural"] },
    { word: "cat", tags: ["animal", "tangible", "living", "small", "natural"] },
    { word: "rock", tags: ["tangible", "natural", "small"] },
    { word: "tree", tags: ["living", "natural", "tangible"] },
    { word: "computer", tags: ["tech", "tangible", "manmade", "internet"] },
    { word: "phone", tags: ["tech", "tangible", "manmade", "small", "internet"] },
    { word: "internet", tags: ["tech", "concept", "manmade", "internet"] },
    { word: "email", tags: ["tech", "concept", "internet"] },
    { word: "robot", tags: ["tech", "tangible", "manmade"] },
    { word: "happiness", tags: ["emotion", "concept"] },
    { word: "freedom", tags: ["concept"] },
    { word: "love", tags: ["emotion", "concept"] },
    { word: "anger", tags: ["emotion", "concept"] },
    { word: "city", tags: ["place", "manmade"] },
    { word: "forest", tags: ["place", "natural"] },
    { word: "beach", tags: ["place", "natural"] },
    { word: "car", tags: ["tangible", "manmade", "tech"] },
    { word: "airplane", tags: ["tangible", "manmade", "tech", "large"] },
    { word: "chair", tags: ["tangible", "manmade", "small"] },
    { word: "table", tags: ["tangible", "manmade"] },
    { word: "book", tags: ["tangible", "manmade"] },
    { word: "idea", tags: ["concept"] },
    { word: "cloud", tags: ["natural", "concept"] },
    { word: "virus", tags: ["natural", "small"] },
    { word: "music", tags: ["concept"] },
    { word: "website", tags: ["internet", "tech", "concept"] },
    { word: "school", tags: ["place", "manmade"] },
    { word: "river", tags: ["natural", "place"] },
    { word: "pencil", tags: ["tangible", "small", "manmade"] }
  ];
  
  let allWords = [...wordList];
  let remainingWords = [...wordList];
  let currentQuestionIndex = 0;
  
  const questionDiv = document.getElementById("question");
  const yesBtn = document.getElementById("yes");
  const noBtn = document.getElementById("no");
  const resultDiv = document.getElementById("result");
  
  function showQuestion() {
    if (currentQuestionIndex >= questions.length || remainingWords.length <= 1) {
      makeGuess();
      return;
    }
  
    questionDiv.textContent = questions[currentQuestionIndex].text;
  }
  
  function makeGuess() {
    const guess = remainingWords[0];
  
    questionDiv.textContent = `Is your word "${guess.word}"?`;
    yesBtn.textContent = "Yes";
    noBtn.textContent = "No, keep trying";
  
    yesBtn.onclick = () => {
      questionDiv.textContent = `🎉 I guessed it! Your word was "${guess.word}".`;
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
    };
  
    noBtn.onclick = () => {
      currentQuestionIndex++;
      showQuestion();
    };
  }
  
  yesBtn.onclick = () => {
    const filterFunc = questions[currentQuestionIndex].filter;
    remainingWords = remainingWords.filter(filterFunc);
  
    currentQuestionIndex++;
    if (remainingWords.length === 0) {
      handleFailure();
    } else {
      showQuestion();
    }
  };
  
  noBtn.onclick = () => {
    currentQuestionIndex++;
    showQuestion();
  };
  
  function handleFailure() {
    questionDiv.innerHTML = `
      😔 I couldn't guess it.<br>
      What was your word?
      <input id="newWordInput" placeholder="Type it here" />
      <button id="saveWordBtn">Save & Teach Me</button>
    `;
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  
    document.getElementById("saveWordBtn").onclick = () => {
      const newWord = document.getElementById("newWordInput").value.trim().toLowerCase();
      if (newWord) {
        alert(`Thanks! You taught me the word: "${newWord}"`);
        // You can store it in localStorage or console.log it for now:
        console.log("Missed word:", newWord);
      }
    };
  }
  
  // Start the game
  showQuestion();