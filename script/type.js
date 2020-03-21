const currentCard = document.querySelector('.shown')
const text = currentCard.querySelector('.type')

const content = text.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
let counter = 0
text.textContent = ''

/*
while (counter < content.length) {
    setTimeout((function (counterCopy) {
        return function () {
            text.textContent += content[counterCopy];
        }
    }(counter)), 100 * counter++)
}
*/

var typewriter = setInterval(function(){
    text.textContent += content[counter];
    counter++;
    if (counter > (content.length-1)) {
        clearInterval(typewriter);
    }
}, 100);