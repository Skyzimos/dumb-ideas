const referenceObjects = [
    { label: "🦆 Ducks", height: 0.5 },
    { label: "🦊 Arctic Foxes", height: 0.92 },
    { label: "🐸 Kermit the Frogs", height: 2 },
    { label: "🧼 Bars of Soap", height: 0.2 },
    { label: "🧃 Capri Suns", height: 0.3 }
];

function convertHeight() {
    const feet = parseFloat(document.getElementById("feetInput").value) || 0;
    const inches = parseFloat(document.getElementById("inchesInput").value) || 0;
    const totalFeet = feet + (inches / 12);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (totalFeet <= 0) {
        resultsDiv.innerHTML = `<p>👀 Enter a valid height, bestie.</p>`;
        return;
    }

    referenceObjects.forEach(obj => {
        let count;
        if (obj.height === Infinity) {
            count = 1;
        } else {
            count = (totalFeet / obj.height).toFixed(2);
        }
        resultsDiv.innerHTML += `<p>You are approximately <strong>${count}</strong> ${obj.label} tall.</p>`;
    });
}
