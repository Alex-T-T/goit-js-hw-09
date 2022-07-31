import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', createPromiseOnClick);


function createPromiseOnClick(event) {
      
      event.preventDefault();

      const delayInputValue = Number(formEl.delay.value);
      const stepInputValue = Number(formEl.step.value);
      const amountInputValue = Number(formEl.amount.value);
      
      setTimeout(() => {
          qwerty(amountInputValue, stepInputValue, delayInputValue)
          }, delayInputValue)
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
   
    setInterval(() => {
        if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
      }, delay)
      })
    }

function qwerty(position, delay, firstDelay) {
      
          for (let i = 1; i <= position; i += 1) {

            delayFinal = firstDelay + delay*i;
            createPromise(i, delayFinal).then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }) 
          }
}
