console.log('Script is running');


document.addEventListener("DOMContentLoaded", function () {

  const progressBar = document.getElementById("progress-bar");
  const images = document.querySelectorAll(".clickable-image");
  const removeProgressButton = document.getElementById("remove-progress-button");
  const chooseCounter = document.getElementById("choose-counter");
  const submitButton = document.getElementById("submit-button");

  let remainingImages = 5;
  let clickedImages = [];

  // Functions

  // Function to fill the progress bar
  function fillProgressBar() {
    progressBar.style.width = "100%";
    progressBar.classList.add('filled');
  }

  // Function to remove the progress
  function removeProgress() {
    progressBar.style.width = "0%";
    progressBar.classList.remove('filled');
    remainingImages = 5;
    clickedImages = [];
    updateChooseCounter();
    resetImageStyles();
  }

  // Function to reset image styles
  function resetImageStyles() {
    images.forEach(image => {
      image.style.filter = "grayscale(0%)"; // Reset grayscale filter
    });
  }

  // Function to handle image clicks
  function handleImageClick(index) {
    const isSelected = images[index].classList.contains('selected');

    if (isSelected) {
      // Deselect the image
      images[index].classList.remove('selected');
      images[index].style.filter = "grayscale(0%)";
      remainingImages++;
      clickedImages = clickedImages.filter(clickedIndex => clickedIndex !== index);
    } else if (remainingImages > 0) {
      // Select the image
      images[index].classList.add('selected');
      remainingImages--;
      clickedImages.push(index);
      images[index].style.filter = "grayscale(100%)";
    }


    updateProgressBar();
    updateChooseCounter();

    if (remainingImages === 0) {
      // Disable the submit button to prevent automatic redirection
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  // Function to update progress bar
  function updateProgressBar() {
    const progressPercentage = ((5 - remainingImages) / 5) * 100;
    progressBar.style.width = progressPercentage + "%";
  }

  // Function to update the "KIES X UIT 5" text
  function updateChooseCounter() {
    chooseCounter.textContent = `KIES NOG ${remainingImages} SDG'S DIE GOED BIJ JOUW BEDRIJF PASSEN`;
  }
  removeProgress();
  // Function to handle submission
  function handleSubmit() {
    if (remainingImages === 0) {
      // Perform the desired action when the submit button is clicked and all images are selected
      fetch('/updateClickedImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clickedImages }),
      })
      .then(response => response.json())
      .then(data => {
        window.location.href = "vragenlijst";
      })
    } else {
      // Display a message or take other action if not all images are selected
      alert('Please select all 5 images before submitting.');
    }
  }

  removeProgressButton.addEventListener("click", removeProgress);

  // Attach image click handlers
  images.forEach((image, index) => {
    image.addEventListener("click", function () {
      handleImageClick(index);
    });
  });

  // Add an event listener to the submit button
  submitButton.addEventListener("click", handleSubmit);
});