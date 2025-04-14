// Where all the magic happens. Animations are fully handled here.

const sphere = document.getElementById('sphere');
const eyes = document.querySelectorAll('.eye');
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const pupils = document.querySelectorAll('.pupil');
const mouth = document.querySelector('.mouth');
const eyebrows = document.querySelectorAll('.eyebrow');
const leftEyebrow = document.querySelector('.left-eyebrow');
const rightEyebrow = document.querySelector('.right-eyebrow');
console.log(sphere, eyes, leftEye, rightEye, pupils, mouth, eyebrows, leftEyebrow, rightEyebrow)

// CONFIG
const expressions = [
    { type: 'happy', duration: 1500 },
    { type: 'excited', duration: 1500 },
    { type: 'sad', duration: 1500 },
    // { type: 'surprised', duration: 1200 },
    { type: 'angry', duration: 1300 },
    { type: 'blink', duration: 1500 },
    { type: 'yikes', duration: 1800 },
    { type: 'confused', duration: 1400 },
    // { type: 'sleepy', duration: 14000 },
    // { type: 'neutral', duration: 2000 },
];

let currentExpression = null;

function setExpression(type) {
    switch (type) {
        case 'happy':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '14.5%';
            });
            leftEyebrow.style.transform = 'rotate(-10deg)';
            rightEyebrow.style.transform = 'rotate(10deg)';
            mouth.style.transform = 'translateX(-50%) scaleY(1)';
            mouth.style.borderRadius = '0 0 50% 50%';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, -50%) scale(1.2)';
            });
            sphere.style.transform = 'rotateY(-10deg) rotateX(5deg)';
            document.body.style.backgroundColor = '#FFDB14';
            break;

        case 'excited':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '10.5%';
            });
            leftEyebrow.style.transform = 'rotate(-13deg)';
            rightEyebrow.style.transform = 'rotate(13deg)';
            mouth.style.transform = 'translateX(-50%) translateY(20%) scaleY(1.5)';
            mouth.style.borderRadius = '0 0 50% 50%';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.4)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
            sphere.style.transform = 'rotateY(-10deg) rotateX(5deg)';
            document.body.style.backgroundColor = '#FFDB14';
            break;

        case 'sad':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '23%';
            });
            leftEyebrow.style.transform = 'rotate(-15deg)';
            rightEyebrow.style.transform = 'rotate(15deg)';
            mouth.style.transform = 'translateX(-50%) scaleY(0.5)';
            mouth.style.borderRadius = '50% 50% 0 0';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, -30%)';
            });
            sphere.style.transform = 'rotateY(10deg) rotateX(-5deg)';
            document.body.style.backgroundColor = '#14C2FF';
            break;

        case 'surprised':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '16%';
            });
            leftEyebrow.style.transform = 'rotate(-5deg)';
            rightEyebrow.style.transform = 'rotate(5deg)';
            mouth.style.transform = 'translateX(-50%) scale(1.2)';
            mouth.style.borderRadius = '50%';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
            sphere.style.transform = 'rotateY(0deg) rotateX(10deg)';
            document.body.style.backgroundColor = '#FFDF14';
            break;

        case 'angry':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '21%';
            });
            leftEyebrow.style.transform = 'rotate(7deg)';
            rightEyebrow.style.transform = 'rotate(-7deg)';
            mouth.style.transform = 'translateX(-50%) scaleY(0.8)';
            mouth.style.borderRadius = '50% 50% 0 0';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, 10%)';
            });
            sphere.style.transform = 'rotateY(15deg) rotateX(-5deg)';
            document.body.style.backgroundColor = '#FF4A14';
            break;

        case 'blink':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '17%';
            });
            leftEyebrow.style.transform = 'rotate(-5deg)';
            rightEyebrow.style.transform = 'rotate(5deg)';
            mouth.style.transform = 'translateX(-50%) scaleY(1)';
            mouth.style.borderRadius = '0 0 50% 50%';
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, -50%) scale(1.05)';
            });
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2) scaleY(0%)';
            });
            setTimeout(() => {
                eyes.forEach((eye) => {
                    eye.style.transform = 'scale(1) scaleY(1)';
                });
            }, 500);
            sphere.style.transform = 'rotateY(-5deg)';
            document.body.style.backgroundColor = '#FFDF14';
            break;

        case 'yikes':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '19%';
            });
            leftEyebrow.style.transform = 'rotate(-15deg)';
            rightEyebrow.style.transform = 'rotate(15deg)';
            // mouth.style.transform = 'translateX(-50%) rotate(10deg) scaleY(0.7)';
            mouth.style.transform = 'translateX(-50%) scale(0.6) scaleY(0.7) scaleX(0.4)';
            mouth.style.borderRadius = '100%';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-5%, -50%)';
            });
            sphere.style.transform = 'rotateY(20deg)';
            document.body.style.backgroundColor = '#FFDB14';
            break;

        case 'confused':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '19%';
            });
            leftEyebrow.style.transform = 'rotate(-15deg)';
            rightEyebrow.style.transform = 'rotate(-10deg)';
            // mouth.style.transform = 'translateX(-50%) rotate(10deg) scaleY(0.7)';
            mouth.style.transform = 'translateX(-50%) rotate(10deg) scaleY(0.7)';
            mouth.style.borderRadius = '50% 50% 0 0';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-30%, -50%)';
            });
            sphere.style.transform = 'rotateY(20deg)';
            document.body.style.backgroundColor = '#FFDB14';
            break;

        case 'sleepy':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '21%';
            });
            leftEyebrow.style.transform = 'rotate(-5deg)';
            rightEyebrow.style.transform = 'rotate(5deg)';

            let mouthDroop = 0;
            function mouthAnimation() {
                if (mouthDroop < 1) {
                    mouthDroop += 0.05;
                    mouth.style.transform = `translateX(-50%) scaleY(${1 - mouthDroop})`;
                    mouth.style.borderRadius = '50% 50% 0 0';  // Slightly drooping corners
                }
            }
            const mouthInterval = setInterval(mouthAnimation, 2000);

            let eyeDroop = 0;
            function droopEyes() {
                if (eyeDroop < 10) {
                    eyeDroop++;
                    pupils.forEach((pupil) => {
                        pupil.style.transform = `translate(-50%, ${-50 + eyeDroop}%)`;
                    });
                }
            }
            const droopEyesInterval = setInterval(droopEyes, 1500);

            let headTilt = 0;
            function headNod() {
                if (headTilt < 5) {
                    headTilt += 0.1;
                    sphere.style.transform = `rotateY(-5deg) rotateX(${headTilt}deg)`;
                }
            }
            const headNodInterval = setInterval(headNod, 2000);

            let bgColorChange = 0;
            function dimBackground() {
                if (bgColorChange < 40) {
                    bgColorChange++;
                    document.body.style.backgroundColor = `rgb(216, 58, 255, ${1 - (bgColorChange / 100)})`;
                }
            }
            const dimBgInterval = setInterval(dimBackground, 2000);

            let eyebrowDroop = 0;
            function droopEyebrows() {
                if (eyebrowDroop < 5) {
                    eyebrowDroop += 0.1;
                    eyebrows.forEach((eyebrow) => {
                        eyebrow.style.top = `${21 + eyebrowDroop}%`;  // Lower eyebrows to simulate drowsiness
                    });
                }
            }
            const eyebrowInterval = setInterval(droopEyebrows, 1500);

            // **Blink interval for sleepy effect** - slow and fast blinks alternated
            let blinkSequenceCount = 0;  // To alternate between slow and fast blinks
            let blinkInterval;

            function sleepyBlink() {
                if (blinkSequenceCount % 3 === 0) { // Slow blink
                    // Slow blink with pupils looking downward
                    pupils.forEach((pupil) => {
                        pupil.style.transform = 'translate(-50%, 10%)';  // Looking down
                    });
                    eyes.forEach((eye) => {
                        eye.style.transform = 'scale(1.2) scaleY(0%)';
                    });
                    blinkInterval = setTimeout(() => {
                        eyes.forEach((eye) => {
                            eye.style.transform = 'scale(1) scaleY(1)';
                        });
                        blinkSequenceCount++; // Move to fast blinks after the slow blink
                        sleepyBlink();  // Continue the blink sequence
                    }, 1000);  // Slow blink duration (1 second)
                } else { // Fast blink
                    // Fast blink with pupils looking upwards
                    pupils.forEach((pupil) => {
                        pupil.style.transform = 'translate(-50%, -50%)';  // Looking upwards
                    });
                    eyes.forEach((eye) => {
                        eye.style.transform = 'scale(1) scaleY(1)';
                    });
                    blinkInterval = setTimeout(() => {
                        eyes.forEach((eye) => {
                            eye.style.transform = 'scale(1) scaleY(1)';
                        });
                        blinkSequenceCount++; // Continue the blink sequence
                        if (blinkSequenceCount % 3 === 0) {
                            sleepyBlink(); // Start the sequence again after 2 fast blinks
                        }
                    }, 500);  // Fast blink duration (0.5 seconds)
                }
            }

            sleepyBlink();

            sphere.style.transform = 'rotateY(-5deg)';
            document.body.style.backgroundColor = '#D83AFF';

            setTimeout(() => {
                clearTimeout(blinkInterval);
                clearInterval(mouthInterval);
                clearInterval(droopEyesInterval);
                clearInterval(headNodInterval);
                clearInterval(dimBgInterval);
                clearInterval(eyebrowInterval);
            }, 14000);

            break;

        case 'neutral':
            eyebrows.forEach((eyebrow) => {
                eyebrow.style.top = '21%';
            });
            mouth.style.transform = 'translateX(-50%) scaleY(0.5)';
            mouth.style.borderRadius = '50% / 100%';
            eyes.forEach((eye) => {
                eye.style.transform = 'scale(1.2)';
            });
            pupils.forEach((pupil) => {
                pupil.style.transform = 'translate(-50%, -50%)';
            });
            sphere.style.transform = 'rotateY(0deg) rotateX(0deg)';
            document.body.style.backgroundColor = '#FFDB14';
            break;
    }
}

function changeExpression() {
    let newExpression;

    do {
        newExpression = expressions[Math.floor(Math.random() * expressions.length)];
    } while (currentExpression === newExpression.type);

    currentExpression = newExpression.type;
    setExpression(currentExpression);

    setTimeout(changeExpression, newExpression.duration);
}

changeExpression();