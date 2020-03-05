const cards = document.querySelectorAll('.card');
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');

nextBtn.addEventListener('click', function () {
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId < cards.length) {
        let nextCard = document.getElementById(`${currentCardId + 1}`);
        currentCard.classList.remove('shown');
        currentCard.classList.toggle('hidden');
        nextCard.classList.remove('hidden');
        nextCard.classList.toggle('shown');
    }
})

backBtn.addEventListener('click', function () {
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId > 1) {
        let prevCard = document.getElementById(`${currentCardId - 1}`);
        currentCard.classList.remove('shown')
        currentCard.classList.toggle('hidden')
        prevCard.classList.remove('hidden')
        prevCard.classList.toggle('shown')
    } else {
        window.location.replace('index.html');
    }
})