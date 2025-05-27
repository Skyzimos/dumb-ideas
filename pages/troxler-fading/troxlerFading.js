const startButton = document.getElementById('startButton');
const warningModal = document.getElementById('warningModal');
const infoModal = document.getElementById('infoModal');

startButton.addEventListener('click', () => {
  warningModal.classList.remove('show');

  // Start Troxler fading after 3.5 seconds
  setTimeout(() => {
    document.querySelectorAll('.fader').forEach(el => {
      el.classList.add('fade');
    });
  }, 3500);

  // Show the info modal after 5 seconds
  setTimeout(() => {
    infoModal.classList.add('show');
  }, 10000);
});
