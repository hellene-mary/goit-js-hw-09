//TODO
//Напиши скрипт таймера, який здійснює зворотний відлік до певної дати. Такий таймер може використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій, під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const dayValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minValueEl = document.querySelector('[data-minutes]');
const secValueEl = document.querySelector('[data-seconds]');

let selectTime = 0;
let intervalID = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectTime = selectedDates[0].getTime();
    if (selectTime > Date.now()) {
      Notiflix.Notify.info('Push on Start');
      btnStart.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  Notiflix.Notify.success('Timer start');
  intervalID = setInterval(() => {
    if (selectTime >= Date.now()) {
      const timerIndicator = selectTime - Date.now();
      const { days, hours, minutes, seconds } = convertMs(timerIndicator);
      // console.log('~ Time for end', `${days}:${hours}:${minutes}:${seconds}`);
      dayValueEl.textContent = days;
      hoursValueEl.textContent = hours;
      minValueEl.textContent = minutes;
      secValueEl.textContent = seconds;
    } else {
      Notiflix.Notify.info('Time is up');
      clearInterval(intervalID);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
