import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const btnOn = document.querySelector('button[data-start]');
btnOn.disabled = true;
btnOn.addEventListener('click', runTimer);

let intervalId = null;
const leftDays = document.querySelector('span[data-days]');
const leftHours = document.querySelector('span[data-hours]');
const leftMinutes = document.querySelector('span[data-minutes]');
const leftSeconds = document.querySelector('span[data-seconds]');
// ==============================
let chosenDate = null;
// ==============================
// add if (today < selectedDate) + notiflix
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,  
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    if (Date.now() < selectedDates[0]) {
      btnOn.disabled = false;
      Notiflix.Notify.success('Sol lucet omnibus');
      return;
    }
    else {
      btnOn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    };
    
  },
};
// ==============================
// initialization flatpickr

flatpickr(input, options);

// ==============================

// ==============================
// timer

function runTimer() {

setInterval(() => {
      const today = Date.now();
      const leftTime = chosenDate - today;
        if (leftTime <= 0) {
          return;
        }
    const convertedLeftTime = convertMs(leftTime);
    const {days, hours, minutes, seconds} = convertedLeftTime
    
    leftDays.textContent = days //< 10 ? `0${days}`: days;
    leftHours.textContent = hours //< 10 ? `0${hours}`: hours;
    leftMinutes.textContent = minutes //< 10 ? `0${minutes}`: minutes;
    leftSeconds.textContent = seconds //< 10 ? `0${seconds}`: seconds;

      console.log(`${days}:${hours}:${minutes}:${seconds}`);
  
  }, 1000)
}

// ==============================
// convertation of date

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

// ==============================
// add 0 before value

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// ==============================


// // ==============================
// // Leo 

// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// let timeoutId = null;
// const daysEl = document.querySelector("span[data-days]");
// const hoursEl = document.querySelector("span[data-hours]");
// const minutesEl = document.querySelector("span[data-minutes]");
// const secondsEl = document.querySelector("span[data-seconds]");
// const buttonStart = document.querySelector("button[data-start]");
// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
//   const days = addLeadingZero(Math.floor(ms / day));
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
//   return { days, hours, minutes, seconds };
// }
// let finalDate = null; 

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     if(new Date() >= selectedDates[0]) {
//       buttonStart.disabled = true;
//       window.alert("Please choose a date in the future");
//       } else {
//       buttonStart.disabled = false;
//       finalDate = selectedDates[0].getTime();
//           };
//       console.log(selectedDates[0]);
//   }
// };
// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// };
// class Timer {
//   constructor() {
//     this.intervalId = null;
//     this.isActive = false;
//     buttonStart.disabled = true;
//   }
//     start() {
//     if (this.isActive) {
//       return
//       }
//     const startTime = finalDate;
//     this.isActive = true;
//       this.intervalId = setInterval(() => {
//         const currentTime = Date.now();
//         const deltaTime = startTime - currentTime;
//         const result = convertMs(deltaTime);
//         const { days, hours, minutes, seconds } = result;
//         if ( deltaTime <= 0 ) {
//           this.stop();
//         }
//         daysEl.textContent = days;
//         hoursEl.textContent = hours;
//         minutesEl.textContent = minutes;
//         secondsEl.textContent = seconds;
//         console.log(`${days}:${hours}:${minutes}:${seconds}`);
//       }, 1000);
//     }
  
//     stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//     }
//   }
// const timer = new Timer();
// buttonStart.addEventListener('click', () => { timer.start() });
// flatpickr("input#datetime-picker", options);