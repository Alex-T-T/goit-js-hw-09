import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('input');
const btn = document.querySelector('button');
btn.disabled = true;
btn.addEventListener('click', runTimer);

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
      btn.disabled = false;
      Notiflix.Notify.success('Sol lucet omnibus');
      return;
    }
    else {
      btn.disabled = true;
      Notiflix.Notify.failure('Qui timide rogat docet negare');
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

  }, 1000)
}
// ==============================
// Interval

// setInterval(runTimer, 1000)

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