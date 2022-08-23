//Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerID = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
    btnStart.disabled = true;
    btnStop.disabled = false;
    console.log('Start coloring!');
    bodyEl.style.backgroundColor = getRandomHexColor();
    timerID = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onBtnStopClick() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerID);
    console.log('Stop coloring!');
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
