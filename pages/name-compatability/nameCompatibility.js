function calculate() {
    let name1 = document.getElementById('name1').value.toLowerCase().replace(/[^a-z]/g, '');
    let name2 = document.getElementById('name2').value.toLowerCase().replace(/[^a-z]/g, '');

    const loadingScreen = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '';
    loadingScreen.classList.add('active');

    setTimeout(() => {
        let digits = [];
        let name2Arr = name2.split('');

        for (let i = 0; i < name1.length; i++) {
            let letter = name1[i];
            let matchIndex = name2Arr.indexOf(letter);
            if (matchIndex !== -1) {
                digits.push(2);
                name2Arr.splice(matchIndex, 1);
            } else {
                digits.push(1);
            }
        }

        for (let letter of name2Arr) {
            digits.push(1);
        }

        function reduce(numbers) {
            while (numbers.length > 2) {
                let newNums = [];
                for (let i = 0, j = numbers.length - 1; i <= j; i++, j--) {
                    if (i === j) {
                        newNums.push(numbers[i]);
                    } else {
                        let sum = numbers[i] + numbers[j];
                        if (sum >= 10) {
                            newNums.push(...sum.toString().split('').map(Number));
                        } else {
                            newNums.push(sum);
                        }
                    }
                }
                numbers = newNums;
            }
            return numbers.join('');
        }

        let result = reduce(digits);

        loadingScreen.classList.remove('active');
        resultDiv.textContent = `Compatibility: ${result}%`;
    }, 1800);
}