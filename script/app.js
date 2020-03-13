const cards = document.querySelectorAll('.card');
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const music = document.querySelector('audio');
const overlay = document.querySelector('.overlay');
const clickHereBtn = document.querySelector('#click-here');


function animateCSS(node, animationName, callback) {
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

var goNext = function () {
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId < cards.length) {
        let nextCard = document.getElementById(`${currentCardId + 1}`);
        animateCSS(currentCard, 'zoomOutLeft', function () {
            currentCard.classList.remove('shown');
            currentCard.classList.toggle('hidden');
            nextCard.classList.remove('hidden');
            nextCard.classList.toggle('shown');
            animateCSS(nextCard, 'zoomInRight');
        })
    } else {
        const currentPage = location.href.split("/").pop().split('.')[0]
        window.location.replace(`index.html?${currentPage}=1`)
    }
    if (currentCardId === cards.length - 1) {
        nextBtn.textContent = 'Return Home >>';
        nextBtn.classList.toggle('return');
    }
}

var goBack = function () {
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId > 1) {
        let prevCard = document.getElementById(`${currentCardId - 1}`);
        animateCSS(currentCard, 'zoomOutRight', function () {
            currentCard.classList.remove('shown');
            currentCard.classList.toggle('hidden');
            prevCard.classList.remove('hidden');
            prevCard.classList.toggle('shown');
            animateCSS(prevCard, 'zoomInLeft');
        })
    } else {
        window.location.replace('index.html')
    }
}

backBtn.addEventListener('click', goBack)
nextBtn.addEventListener('click', goNext)
document.addEventListener('keydown', function(e) {
    switch(e.which) {
        case 37: {
            goBack()
            break;
        }
        case 39: {
            goNext()
            break;
        }
    }
})