document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progress-bar");
  const images = document.querySelectorAll(".clickable-image");
  const removeProgressButton = document.getElementById("remove-progress-button");
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
    clickedImages = [];
  }

  // Function to handle image clicks
  function handleImageClick(index) {
    if (clickedImages.length < 5) {
      clickedImages.push(index);
      const progressPercentage = (clickedImages.length / 5) * 100;
      progressBar.style.width = progressPercentage + "%";

      if (clickedImages.length === 5) {
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
    }
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
