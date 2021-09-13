const ruleBtn = document.getElementById('rules')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('close')
const scoreDisplay = document.getElementById('score')
const rock = document.getElementById('rock')
const paper = document.getElementById('paper')
const scissors = document.getElementById('scissors')
const playAgain = document.getElementById('play-again')

window.onload = () => {
    let list = ['rock', 'paper', 'scissors']
    for (elem of list)
        insertTemplateOnPlaceholder(elem, elem)
    document.getElementById('paper').classList.toggle('mt-2')
}

function insertTemplateOnPlaceholder(id, elem) {
    let teplate = document.getElementById(`t-${elem}`)
    let content = document.importNode(teplate.content, true)
    document.getElementById(id).appendChild(content)
}

function toggleModal() {
    modal.classList.toggle('hidden')
}

function pcChoise() {
    let index = Math.floor(Math.random() * 3)
    console.log(index)
    let elem = ['rock', 'paper', 'scissors']
    return elem[index]
}

function calculate(pc, choise) {
    if (pc === choise)
        return 0

    if (choise === 'rock')
        if (pc === 'scissors')
            return 1
        else
            return -1

    if (choise === 'paper')
        if (pc === 'scissors')
            return -1
        else
            return 1

    if (choise === 'scissors')
        if (choise === 'rock')
            return -1
        else
            return 1
}

function play(choise) {
    let pc = pcChoise()
    let result = calculate(pc, choise)
    changeView(choise, pc, result)
}

function updateScore(score) {
    let actualScore = parseInt(scoreDisplay.innerText)
    if ((actualScore + score) < 0)
        return
    scoreDisplay.innerHTML = Number(scoreDisplay.innerHTML) + score
}

function toggleHidden(elemt) {
    document.getElementById(elemt).classList.toggle('hidden')
}

function resetAll() {
    for (elemt of ['options', 'picked-value', 'win-or-lose'])
        toggleHidden(elemt)
    for (elem of ['result', 'player-choise', 'pc-choise'])
        document.getElementById(elem).innerHTML = ''
    document.getElementById('play-again').classList.remove('win', 'lose', 'draw')
    document.getElementById('pc-choise').classList.toggle('placeholder')
}

function revealResults(pcChoise, score) {
    document.getElementById('pc-choise').classList.toggle('placeholder')
    insertTemplateOnPlaceholder('pc-choise', pcChoise)
    toggleHidden('win-or-lose')
    updateScore(score)
    let className;
    let text;
    switch (score) {
        case 1:
            className = 'win'
            text = 'You win!'
            break
        case -1:
            className = 'lose'
            text = 'You lose!'
            break
        case 0:
            className = 'draw'
            text = 'Draw!'
            break
    }
    document.getElementById('play-again').classList.toggle(className)
    document.getElementById('result').innerHTML = text
}

function changeView(choise, pcChoise, score) {
    toggleHidden('options')
    toggleHidden('picked-value')
    insertTemplateOnPlaceholder('player-choise', choise)
    setTimeout(() => revealResults(pcChoise, score), 1000)
}

closeModal.onclick = toggleModal
ruleBtn.onclick = toggleModal
rock.onclick = () => play('rock')
paper.onclick = () => play('paper')
scissors.onclick = () => play('scissors')
playAgain.onclick = resetAll