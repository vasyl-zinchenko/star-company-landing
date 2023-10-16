// eslint-disable-next-line import/no-mutable-exports
export let errors = [];

export async function getData() {
  try {
    const response = await fetch(
      'https://www.mocky.io/v2/5dfcef48310000ee0ed2c281',
    );

    const data = await response.json();
    errors = data.errors;
  } catch (error) {
    console.log('error', error);
  }
}
