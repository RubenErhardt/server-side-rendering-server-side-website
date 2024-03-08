document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progress-bar");
  const images = document.querySelectorAll(".clickable-image");
  const removeProgressButton = document.getElementById("remove-progress-button");
  const chooseCounter = document.getElementById("choose-counter");

  let remainingImages = 5;
  let clickedImages = [];

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
  }

  // Function to handle image clicks
  function handleImageClick(index) {
    if (remainingImages > 0) {
      const progressPercentage = ((5 - remainingImages + 1) / 5) * 100;
      progressBar.style.width = progressPercentage + "%";

      remainingImages--;
      clickedImages.push(index);

      if (remainingImages === 0) {
        fetch('/updateClickedImages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clickedImages }),
        })
        .then(response => response.json())
        .then(data => {
          // Redirect to vragenlijst.ejs
          window.location.href = "vragenlijst";
        })
        .catch(error => {
          console.error('Error updating clickedImages:', error);
        });
      }

      updateChooseCounter();
    }
  }

  // Function to update the "KIES X UIT 5" text
  function updateChooseCounter() {
    chooseCounter.textContent = `KIES NOG ${remainingImages} IMAGES DIE GOED BIJ JOUW BEDRIJF PASSEN`;
  }

  // Initially, remove progress and set up click handlers
  removeProgress();

  // Add an event listener to the remove progress button
  removeProgressButton.addEventListener("click", removeProgress);

  // Attach image click handlers
  images.forEach((image, index) => {
    image.addEventListener("click", function () {
      handleImageClick(index);
    });
  });
});
