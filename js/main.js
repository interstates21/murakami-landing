const TypeWriter = function(textArea, words, wait = 1000) {
    this.textArea = textArea
    this.words = words
    this.wait = wait
    this.isErasing = false
    this.textState = ''
    this.currentIndex = 0
    this.type();
}

TypeWriter.prototype.type = function () {
    let word = this.words[this.currentIndex]

    if (this.isErasing) {
        this.textState = word.substring(0, (this.textState.length - 1))
    }   else {
        this.textState = word.substring(0, (this.textState.length + 1))
    }

    this.textArea.innerHTML = `<span id="typing-area"> ${this.textState} </span>`

    let typeSpeed = 300;

    if (this.isErasing) {
        typeSpeed /= 2
    }

    if (!this.isErasing && word === this.textState) {
        typeSpeed = this.wait
        this.isErasing = true
    }
    else if (this.isErasing && this.textState === '') {
        this.currentIndex = (this.currentIndex + 1) % this.words.length
        this.isErasing = false
        typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed)
}

function init () {
    const textArea =  document.getElementById('text-area');
    const words = JSON.parse(textArea.getAttribute('data-words'))
    const wait = JSON.parse(textArea.getAttribute('data-wait'))
    new TypeWriter(textArea, words, wait)
}

document.addEventListener('DOMContentLoaded', init)