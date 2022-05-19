import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours'),
  mins: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let countDown = null;
let intervalId = null;
let isActiveCountDown = false;
refs.startBtn.setAttribute('disabled', 'true');

refs.startBtn.addEventListener('click', handleStartBtnClick);

const configOptions = {
  enableTime: true,
  defaultDate: new Date(),
  time_24hr: true,
  minuteIncrement: 1,
  defaultDate: new Date(),

  onClose(userChosenDueDates) {
    if (userChosenDueDates[0].getTime() <= configOptions.defaultDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      countDown = userChosenDueDates[0];
    }
  },

  onOpen() {
    clearInterval(intervalId);
    isActiveCountDown = false;
    refs.startBtn.setAttribute('disabled', 'true');

    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.mins.textContent = '00';
    refs.seconds.textContent = '00';
  },
};

const timer = {
  start() {
    if (isActiveCountDown) {
      return;
    }

    isActiveCountDown = true;
    intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = countDown - currentTime;
      const { days, hours, mins, secs } = getTimeComponents(deltaTime);

      if (deltaTime <= 1000) {
        this.stop();
      }

      updateClockFace({ days, hours, mins, secs });
    }, 1000);
  },

  stop() {
    clearInterval(intervalId);
    isActiveCountDown = false;
  },
};

function handleStartBtnClick() {
  timer.start();
  refs.startBtn.setAttribute('disabled', 'true');
}

flatpickr('#datetime-picker', configOptions);

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.seconds.textContent = secs;
}
