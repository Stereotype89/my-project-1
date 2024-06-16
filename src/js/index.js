import Notiflix from 'notiflix';

const mainWrap = document.querySelector('#wrap');
const sectionFirst = document.createElement('div');
sectionFirst.classList.add('section');
const sectionNext = document.createElement('div');
sectionNext.classList.add('section');

mainWrap.prepend(sectionFirst, sectionNext);

const labelMain = document.createElement('label');
labelMain.classList.add('expression');
labelMain.textContent = `Натисни - 'Старт'`;

const createBtnStart = document.createElement('button');
createBtnStart.textContent = 'СТАРТ';
createBtnStart.classList.add('start');
createBtnStart.setAttribute('type', 'button');

const createBtnCheck = document.createElement('button');
createBtnCheck.textContent = 'ПЕРЕВІРИТИ';
createBtnCheck.classList.add('check');
createBtnCheck.setAttribute('type', 'button');

const createInput = document.createElement('input');
createInput.classList.add('item');
createInput.setAttribute('placeholder', 'Введи відповідь');

sectionFirst.prepend(labelMain, createBtnStart);
sectionNext.prepend(createInput, createBtnCheck);

const label = document.querySelector('.expression');
const btnStart = document.querySelector('.start');
const btnCheck = document.querySelector('.check');
const input = document.querySelector('.item');

let valueOfInput = 0;

const onType = event => {
  valueOfInput = Number(event.currentTarget.value);
  event.preventDefault();
};

input.addEventListener('input', onType);

function createItems() {
  const op = Math.floor(Math.random() * 2);
  const x = ['+', '-'];
  const a = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  const plus = x[op] === '+';
  return { op, x, a, b, plus };
}

function checkExpression({ op, x, a, b, plus }) {
  let rez = 0;
  if (plus) {
    label.textContent = `${a} ${x[op]} ${b} = ?`;
    rez = a + b;
  } else if (!plus && a - b < 0) {
    label.textContent = `${b} ${x[op]} ${a} = ?`;
    rez = b - a;
  } else {
    label.textContent = `${a} ${x[op]} ${b} = ?`;
    rez = a - b;
  }
  return rez;
}

let aaa;
let check;

btnStart.addEventListener('click', event => {
  aaa = createItems();
  check = checkExpression({ ...aaa });
});

btnCheck.addEventListener('click', event => {
  if (valueOfInput === check) {
    Notiflix.Report.success('МОЛОДЕЦЬ !!', 'Відповідь вірна! Натисни знову кнопку "СТАРТ"', 'OK');
  } else if (valueOfInput === 0) {
    Notiflix.Report.warning('УВАГА !!', 'Введи свою відповідь в поле! ;-)', 'OK');
  } else {
    Notiflix.Report.failure('УВАГА !!', 'Перевір правильність відповіді! :))', 'OK');
  }
});
