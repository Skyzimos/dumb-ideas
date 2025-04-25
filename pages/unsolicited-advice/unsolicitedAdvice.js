const adviceArray = [
    "Always wear socks with sandals. People are weird, you know.",
    "If you can’t find your keys, try looking in the fridge.",
    "The best way to stay dry in the rain is to never go outside.",
    "If you can’t figure out where you left your phone, it’s probably in your pocket.",
    "If you’re ever lost, just get un-lost. Or someone will eventually find you.",
    "Don’t worry about the weather, you've definitely got other... more important things... to worry about.",
    "If you ever feel lonely, just talk to a plant. They may not talk back, but it’s a good start.",
    "The key to happiness is pretending that everything is going according to plan. Even when your life is in shambles like right now.",
    "Put your phone in airplane mode. It helps you ignore people you absolutely hate.",
    "Always check under your bed for monsters. They'll nibble your toes when you least expect it.",
    "If someone tells you to stop daydreaming, remind them to shut up and worry about themself.",
    "Wear sunglasses at night, just because you can.",
    "If life gives you lemons, make lemonade. Or don't, because that's dangerous and you'll probably get lemon juice in your eyes.",
    "Don’t put all your eggs in one basket, especially if you're allergic to eggs. They're too expensive to break.",
    "Sometimes the best way to solve a problem is to stop having problems.",
    "Make sure to always carry a banana. You never know when it could save your life.",
    "Always look both ways before crossing the street, even if it’s just a sidewalk.",
    "If at first you don’t succeed, try again. But if that fails, give up.",
    "Remember, the only thing more important than your dreams is realizing they will never happen.",
    "Avoid traffic by walking everywhere, but never leave your house.",
];

let lastEightAdvice = [];

function getNewAdvice() {
    let randomIndex;
    let newAdvice;

    do {
        randomIndex = Math.floor(Math.random() * adviceArray.length);
        newAdvice = adviceArray[randomIndex];
    } while (lastEightAdvice.includes(newAdvice));

    // Add the new advice to the list and remove the oldest if the array reaches 9
    lastEightAdvice.push(newAdvice);
    if (lastEightAdvice.length > 8) {
        lastEightAdvice.shift(); // Remove the oldest piece of advice
    }

    return newAdvice;
}

document.getElementById("getAdviceButton").addEventListener("click", function() {
    const newAdvice = getNewAdvice();
    document.getElementById("advice").textContent = newAdvice;
});