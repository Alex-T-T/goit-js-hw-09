const body = document.querySelector('body');
const buttons = document.querySelectorAll('button');
const btnStart = buttons[0];
const btnEnd = buttons[1];
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', startOfGhangeColor);
btnEnd.addEventListener('click', endOfChangeColor);


function startOfGhangeColor() {

    timerId = setInterval(() => {
        const color = getRandomHexColor();
        // console.log(color);
        body.style.backgroundColor = color;
        btnStart.removeEventListener('click', startOfGhangeColor);
    }
        , 1000);

} 

function endOfChangeColor() {
    clearInterval(timerId);
    btnStart.addEventListener('click', startOfGhangeColor);
}