// Get references to the form inputs and screenshot element
const form = document.querySelector('form');
const urlInput = document.querySelector('#url');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const formatInput = document.querySelector('#format');
const qualityInput = document.querySelector('#quality');
const screenshotEl = document.querySelector('#screenshot');
const YOUR_API_KEY = 'your_api_key_here';

// Listen for form submit event
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the form input values
  const url = urlInput.value;
  const width = widthInput.value;
  const height = heightInput.value;
  const format = formatInput.value;
  const quality = qualityInput.value;

  // Show the loading spinner
  screenshotEl.classList.add('loading');

  // Call the API to generate the screenshot
  const response = await fetch(`https://api.apiflash.com/v1/urlto${format}?access_key=${YOUR_API_KEY}&url=${url}&height=${height}&width=${width}&quality=${quality}`);

  // If the response is successful, show the screenshot image
  if (response.ok) {
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      screenshotEl.classList.remove('loading');
      screenshotEl.querySelector('img').setAttribute('src', objectURL);
      screenshotEl.querySelector('img').style.display = 'block';
    };
    img.src = objectURL;
  } else {
    // If the response is not successful, show an error message
    screenshotEl.classList.remove('loading');
    screenshotEl.innerHTML = `<p>Error generating screenshot. Please try again later.</p>`;
  }
});
