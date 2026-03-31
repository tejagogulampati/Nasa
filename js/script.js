const API_KEY = "DEMO_KEY"; // Replace with your NASA API key if needed

const button = document.getElementById("fetchBtn");
const gallery = document.getElementById("gallery");

// Event listener for button click
button.addEventListener("click", fetchImages);

async function fetchImages() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  // Validation
  if (!startDate || !endDate) {
    alert("Please select both start and end dates.");
    return;
  }

  if (startDate > endDate) {
    alert("Start date cannot be after end date.");
    return;
  }

  // Show loading message
  gallery.innerHTML = `<p>Loading space images...</p>`;

  try {
    // Fetch data from NASA APOD API
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );

    const data = await response.json();
    console.log(data); // For debugging

    displayImages(data.reverse()); // Reverse to show newest first

  } catch (error) {
    gallery.innerHTML = `<p>Error loading images. Please try again later.</p>`;
    console.error(error);
  }
}

// Function to display images in the gallery
function displayImages(items) {
  gallery.innerHTML = ""; // Clear previous content

  let hasImages = false;

  items.forEach(item => {
    if (item.media_type !== "image") return; // Ignore videos

    hasImages = true;

    const div = document.createElement("div");
    div.classList.add("gallery-item"); // Matches your CSS

    div.innerHTML = `
      <img src="${item.url}" alt="${item.title}">
      <p><strong>${item.title}</strong></p>
      <p>${item.explanation.substring(0, 120)}...</p>
      <p><em>${item.date}</em></p>
    `;

    gallery.appendChild(div);
  });

  if (!hasImages) {
    gallery.innerHTML = `<p>No images found for this date range.</p>`;
  }
}