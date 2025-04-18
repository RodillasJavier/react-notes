import './style.scss';

let time = 0;
setInterval(() => {
  document.getElementById('main').innerHTML = `You've been on this page for ${time} seconds.`;
  time += 1;
}, 1000);
