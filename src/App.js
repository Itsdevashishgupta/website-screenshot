const form = document.querySelector('#form');
const screenshot = document.querySelector('#screenshot');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const url = document.querySelector('#url').value;
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = `https://www.exponentialhost.com/api/website-screenshot/?url=${url}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.success) {
      screenshot.innerHTML = `<img src="${data.url}" alt="Screenshot of ${url}">`;
    } else {
      screenshot.innerHTML = 'Error: ' + data.message;
    }
  } catch (error) {
    screenshot.innerHTML = 'Error: ' + error.message;
  }
});
