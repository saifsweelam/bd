const nameLetters = document.querySelectorAll('.name-letter');

function letterAnimation(letter) {
    letter.classList.add('animated', 'hinge');
}

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

function viewHeart() {
    const hiddenHeart = document.querySelector('#animated-heart');
    const overlay = document.querySelector('.overlay');
    if (hiddenHeart.classList.contains('hidden')) {
        hiddenHeart.classList.remove('hidden');
        hiddenHeart.classList.toggle('shown');
    }
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        overlay.classList.toggle('shown');
    }
    animateCSS('#animated-heart', 'zoomInRight');
}

var callback = function (e) {
    letterAnimation(e.target);
    viewHeart();
    setTimeout(function () { window.location.replace(`${e.target.id}.html`); }, 4000);
}

nameLetters.forEach(function (letter) {
    letter.addEventListener('click', callback);
    letter.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            callback(e);
        }
    });
});