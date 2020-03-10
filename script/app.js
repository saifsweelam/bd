const cards = document.querySelectorAll('.card');
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const music = document.querySelector('audio');
const overlay = document.querySelector('.overlay');
const clickHereBtn = document.querySelector('#click-here');


function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    node.addEventListener('animationend', handleAnimationEnd);
}

clickHereBtn.addEventListener('click', function () {
    overlay.classList.toggle('hidden');
    clickHereBtn.classList.toggle('hidden');
    music.play();
})

nextBtn.addEventListener('click', function () {
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId < cards.length) {
        let nextCard = document.getElementById(`${currentCardId + 1}`);
        animateCSS('.shown', 'zoomOutLeft', function () {
            currentCard.classList.remove('shown');
            currentCard.classList.toggle('hidden');
            nextCard.classList.remove('hidden');
            nextCard.classList.toggle('shown');
            animateCSS('.shown', 'zoomInRight');
        })
    } else {
        window.location.replace('index.html');
    }
    if (currentCardId === cards.length - 1) {
        nextBtn.textContent = 'Return Home >>';
        nextBtn.classList.toggle('return');
    }
})

backBtn.addEventListener('click', function () {
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId > 1) {
        let prevCard = document.getElementById(`${currentCardId - 1}`);
        animateCSS('.shown', 'zoomOutRight', function () {
            currentCard.classList.remove('shown');
            currentCard.classList.toggle('hidden');
            prevCard.classList.remove('hidden');
            prevCard.classList.toggle('shown');
            animateCSS('.shown', 'zoomInLeft');
        })
    } else {
        window.location.replace('index.html');
    }
})