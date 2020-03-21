const cards = document.querySelectorAll('.card');
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const music = document.querySelector('audio');
const overlay = document.querySelector('.overlay');
const clickHereBtn = document.querySelector('#click-here');
const snackbar = document.querySelector('.snackbar')


function clearAllIntervals(w) {
        w = w || window;
        var i = w.setInterval(function () { }, 100000);
        while (i >= 0) {
            w.clearInterval(i--);
        }
}


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
    snackbar.classList.remove('hidden')
    setTimeout(function () {
        snackbar.classList.toggle('hidden')
    }, 4000)
})

let goNext = function () {
    backBtn.removeEventListener('click', goBack);
    nextBtn.removeEventListener('click', goNext);
    document.removeEventListener('keydown', keyboardCallback);
    clearAllIntervals();
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId < cards.length) {
        let nextCard = document.getElementById(`${currentCardId + 1}`);
        animateCSS(currentCard, 'zoomOutLeft', function () {
            currentCard.classList.remove('shown');
            currentCard.classList.toggle('hidden');
            nextCard.classList.remove('hidden');
            nextCard.classList.toggle('shown');
            animateCSS(nextCard, 'zoomInRight', function () {
                backBtn.addEventListener('click', goBack);
                nextBtn.addEventListener('click', goNext);
                document.addEventListener('keydown', keyboardCallback);
            });
            if (nextCard.querySelector('.type')) {
                const text = nextCard.querySelector('.type')

                const content = text.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
                let counter = 0
                text.textContent = ''

                var typewriter = setInterval(function () {
                    text.textContent += content[counter];
                    counter++;
                    if (counter > (content.length - 1)) {
                        clearInterval(typewriter);
                    }
                }, 100);
            }
        })
    } else {
        const currentPage = location.href.split("/").pop().split('.')[0];
        window.location.replace(`index.html?${currentPage}=1`);
    }
    if (currentCardId === cards.length - 1) {
        nextBtn.textContent = 'Return Home >>';
        nextBtn.classList.toggle('return');
    }
}

let goBack = function () {
    backBtn.removeEventListener('click', goBack);
    nextBtn.removeEventListener('click', goNext);
    document.removeEventListener('keydown', keyboardCallback);
    clearAllIntervals();
    let currentCard = document.querySelector('.shown');
    let currentCardId = parseInt(currentCard.id);
    if (currentCardId > 1) {
        let prevCard = document.getElementById(`${currentCardId - 1}`);
        animateCSS(currentCard, 'zoomOutRight', function () {
            currentCard.classList.remove('shown');
            currentCard.classList.toggle('hidden');
            prevCard.classList.remove('hidden');
            prevCard.classList.toggle('shown');
            animateCSS(prevCard, 'zoomInLeft', function () {
                backBtn.addEventListener('click', goBack);
                nextBtn.addEventListener('click', goNext);
                document.addEventListener('keydown', keyboardCallback);
            });
            if (prevCard.querySelector('.type')) {
                const text = prevCard.querySelector('.type')

                const content = text.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
                let counter = 0
                text.textContent = ''

                var typewriter = setInterval(function () {
                    text.textContent += content[counter];
                    counter++;
                    if (counter > (content.length - 1)) {
                        clearInterval(typewriter);
                    }
                }, 100);
            }
        })
    } else {
        window.location.replace('index.html');
    }
    if (currentCardId === cards.length) {
        nextBtn.textContent = 'Next >>';
        nextBtn.classList.remove('return');
    }
}

let keyboardCallback = function (e) {
    switch (e.which) {
        case 37: {
            goBack();
            break;
        }
        case 39: {
            goNext();
            break;
        }
    }
}

backBtn.addEventListener('click', goBack);
nextBtn.addEventListener('click', goNext);
document.addEventListener('keydown', keyboardCallback);