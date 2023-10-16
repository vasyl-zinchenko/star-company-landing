import { getData, errors } from './request';

const error = document.querySelector('.error__launching');

async function showError(errorName) {
  try {
    await getData();

    const errorMessage = errors.find((el) => el.name === errorName).message;

    error.textContent = errorMessage;
    error.style.display = 'flex';
  } catch (err) {
    console.log(err);
  }
}

export default showError;
