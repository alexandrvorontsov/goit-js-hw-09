import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const timePicker = document.querySelector('#datetime-picker');

const timerValueRef = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const optoins = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDay = selectedDates[0];
    if (selectedDay < new Date()) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnStart.disabled = false;
  },
};

btnStart.addEventListener('click', onClickTimerMarkUp);
flatpickr(timePicker, optoins);
btnDesable();

function btnDesable() {
  btnStart.disabled = true;
}

function onClickTimerMarkUp() {
  const date = new Date(timePicker.value);
  let timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = date.getTime() - currentTime;
    countSecondsLeft(deltaTime);
    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function countSecondsLeft(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  timerValueRef.days.textContent = days;
  timerValueRef.hours.textContent = hours;
  timerValueRef.minutes.textContent = minutes;
  timerValueRef.seconds.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
