import { getData, errors } from './request';

const logIn = document.querySelector('.login');
const emailInputLogin = document.querySelector('.login-form__input_email');
const passwordInputLogin = document.querySelector(
  '.login-form__input_password',
);

const errorEmailLogin = document.querySelector('.error__login-email');
const errorPasswordLogin = document.querySelector('.error__login-password');

const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

logIn.addEventListener('click', async () => {
  const emailValue = emailInputLogin.value;
  const passwordValue = passwordInputLogin.value;

  const isValidEmail = emailRegex.test(emailValue);

  if (!isValidEmail || !passwordValue) {
    try {
      await getData();

      const error = errors.find((el) => el.name === 'email');

      errorEmailLogin.textContent = error.message;
      errorPasswordLogin.textContent = '6 characters min password';

      errorEmailLogin.style.display = 'flex';
      errorPasswordLogin.style.display = 'flex';
    } catch (error) {
      throw Error(error);
    }
  }

  if (isValidEmail) {
    errorEmailLogin.style.display = 'none';
  }

  if (passwordValue.length > 5) {
    errorPasswordLogin.style.display = 'none';
  }

  if (isValidEmail && passwordValue.length > 5) {
    logIn.textContent = 'LOADING...';

    setTimeout(() => {
      emailInputLogin.value = '';
      passwordInputLogin.value = '';
      logIn.textContent = 'Log in';
    }, 2000);
  }
});
