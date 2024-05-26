var baseUrl = `https://localhost:7168/Ads/upload`;

document
  .getElementById("upload")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    var videoInput = document.getElementById("video-file");
    var video = videoInput.files[0]; // Get the file object
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modal-message");

    if (!video) {
      modalMessage.textContent = "No file selected.";
      modal.style.display = "block";
      return;
    }

    var formData = new FormData();
    formData.append("file", video);

    try {
      var response = await fetch(baseUrl, {
        method: "POST", // Specify the method
        body: formData,
      });

      if (response.ok) {
        modalMessage.textContent = "Upload Successful";
      } else {
        modalMessage.textContent = "Failed to upload file.";
      }
    } catch (err) {
      modalMessage.textContent = "Error uploading file: " + err.message;
    }

    modal.style.display = "block";
  });

// Function to add ad dynamically
async function addAd() {
    try {
        let response = await fetch(`${baseUrl}/download/random`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();
        
        var adsSection = document.querySelector(".adsSection");
        var adDetails = document.createElement("div");
        adDetails.className = "ad_details";
        adDetails.setAttribute("onclick", `showVideoPopup('${data.url}')`);

        var img = document.createElement("img");
        img.className = "ad_temp";
        img.src = "../Images/sampleAd.png";
        img.alt = "logo";

        var p = document.createElement("p");
        p.textContent = "(Lorem) Clothing Brand Ad";

        var button = document.createElement("button");
        button.className = "remove_btn";
        button.textContent = "Remove";
        button.onclick = function() {
            adsSection.removeChild(adDetails);
        };

        adDetails.appendChild(img);
        adDetails.appendChild(p);
        adDetails.appendChild(button);
        adsSection.appendChild(adDetails);
    } catch (error) {
        console.error("Error fetching video:", error);
    }
}

addAd();

// When the user clicks on any close button, close the modal
var closeModalButton = document.getElementById("close");
closeModalButton.addEventListener("click", function () {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
