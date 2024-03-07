document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progress-bar");
    const images = document.querySelectorAll(".clickable-image");
    let clickedImages = [];
  
    images.forEach((image, index) => {
      image.addEventListener("click", function () {
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
      });
    });
  });
  
