import showError from './showError';

const emailInput = document.querySelector('.launching__form__input_email');
const addressInput = document.querySelector('.launching__form__input_address');
const passwordInput = document.querySelector(
  '.launching__form__input_password',
);

const arrowRight = document.querySelector('.launching__arrow-right');
const arrowRightNext = document.querySelector('.launching__arrow-right--full');
const arrowRightStart = document.querySelector(
  '.launching__arrow-right--start',
);

const arrowLeft = document.querySelector('.launching__arrow-left');
const sections = document.querySelectorAll('.launching__form-wrapper');
const stepItem = document.querySelectorAll('.launching__step-item');
const error = document.querySelector('.error__launching');

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let counter = 0;

function checkValidEmail(email) {
  return emailRegex.test(email);
}

arrowRightNext.addEventListener('click', async () => {
  const emailValue = emailInput.value;
  const addressValue = addressInput.value;
  const isEmailValid = checkValidEmail(emailValue);

  const labelStep = document.querySelector('.active');

  if (
    (counter === sections.length - 1 || counter === sections.length - 2)
    && isEmailValid
  ) {
    arrowRightNext.style.display = 'none';
    arrowRightStart.style.display = 'flex';
  }

  if (labelStep.textContent.includes('What is your age?')) {
    document.querySelector('.launching__form__address-example').style.display = 'flex';
  }

  if (!addressValue && labelStep.textContent.includes('I am from')) {
    addressInput.focus();
    await showError('location');

    return;
  }

  if (addressValue) {
    emailInput.focus();
  }

  if (!isEmailValid && labelStep.textContent.includes('Your email address')) {
    emailInput.focus();
    await showError('email');
    return;
  }

  if (counter < sections.length - 1) {
    error.style.display = 'none';
    error.textContent = '';
    counter += 1;

    sections[counter].classList.add('active');
    sections[counter - 1].classList.remove('active');
    stepItem[counter].classList.add('launching__step-item--active');

    if (counter > 0) {
      arrowLeft.removeAttribute('disabled');
    }
  }
});

arrowRightStart.addEventListener('click', async () => {
  const passwordValue = passwordInput.value;
  const labelStep = document.querySelector('.active');

  if (
    !passwordValue
    && labelStep.textContent.includes('Creater your password')
  ) {
    await showError('password');
    return;
  }

  if (emailInput.value && addressInput.value && passwordInput.value) {
    document.querySelector('.arrow__completed').style.display = 'none';
    document.querySelector('.loader').style.display = 'block';
    error.style.display = 'none';

    setTimeout(() => {
      counter = 0;

      sections.forEach((el) => el.classList.remove('active'));
      sections[counter].classList.add('active');

      emailInput.value = '';
      addressInput.value = '';
      passwordInput.value = '';

      document.querySelector('.arrow__completed').style.display = 'flex';
      document.querySelector('.loader').style.display = 'none';

      arrowRightNext.style.display = 'flex';
      arrowRightStart.style.display = 'none';
    }, 3000);
  }
});

arrowLeft.addEventListener('click', async () => {
  checkValidEmail(emailInput.value);
  error.style.display = 'none';

  arrowRight.removeAttribute('style');
  if (arrowRightStart.style.display === 'flex') {
    arrowRightStart.style.display = 'none';
  }

  if (counter > 0) {
    sections[counter].classList.remove('active');
    sections[counter - 1].classList.add('active');
    stepItem[counter].classList.remove('launching__step-item--active');
    counter -= 1;

    if (counter === 0) {
      arrowLeft.setAttribute('disabled', '');
    }
  }
});
