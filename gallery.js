let mCurrentIndex = 0; // Tracks the current image index
let mImages = []; // Array to hold GalleryImage objects
const mUrl = 'images.json'; // Replace with actual JSON URL
const mWaitTime = 5000; // Timer interval in milliseconds
let timer; // Timer variable for slideshow

$(document).ready(() => {
  $('.details').hide(); // Hide details initially

  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', () => {
    showNextPhoto();
  });

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', () => {
    showPrevPhoto();
  });

  // Call fetchJSON() to load the initial set of images
  fetchJSON();

  // Start the timer for the slideshow
  startTimer();
});

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl, // Request JSON data from mUrl
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      console.log(data); // Log the entire JSON data to verify it's loaded correctly
      mImages = data.images; // Access the "images" array in the JSON
      swapPhoto(); // After JSON is loaded, call swapPhoto() to display the first image
    },
    error: (xhr, status, error) => {
      console.error("Error fetching JSON data:", error);
    }
  });
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  if (mImages.length > 0) {
    // Access mImages[mCurrentIndex] to update the image source and details
    const currentImage = mImages[mCurrentIndex];

    // Update the #photo element's src attribute with the current image's path
    $('#photo').attr('src', currentImage.imgPath);

    // Log metadata to console to check if it's being accessed properly
    console.log('Location:', currentImage.imgLocation);
    console.log('Description:', currentImage.description);
    console.log('Date:', currentImage.date);

    // Update the .location, .description, and .date elements with the current image's details
    $('.location').text(`Location: ${currentImage.imgLocation}`);
    $('.description').text(`Description: ${currentImage.description}`);
    $('.date').text(`Date: ${currentImage.date}`);
    
    $('.details').show(); // Ensure details section is visible
  } else {
    console.error("No images to display.");
  }
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  mCurrentIndex = (mCurrentIndex + 1) % mImages.length; // Increment index and loop back to the start
  swapPhoto(); // Update the photo
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  mCurrentIndex = (mCurrentIndex - 1 + mImages.length) % mImages.length; // Decrement index and loop to the end
  swapPhoto(); // Update the photo
}

// Function to start the timer for automatically switching photos
function startTimer() {
  clearInterval(timer); // Ensure no duplicate timers are running
  timer = setInterval(() => {
    showNextPhoto(); // Automatically show the next photo
  }, mWaitTime);
}
