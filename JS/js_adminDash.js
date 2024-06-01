// Function to show the video pop-up
function showVideoPopup(videoURL) {
    var videoPopup = document.getElementById("videoPopup");
    var videoSource = document.getElementById("videoSource");

    // Set the video source
    videoSource.src = videoURL;

    // Show the pop-up container
    videoPopup.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the close button element
    var popupClose = document.getElementById("popupClose");
    var videoPopup = document.getElementById("videoPopup");
    var video = document.querySelector("video");

    // Add click event listener to the close button
    popupClose.addEventListener("click", function() {
        // Pause the video
        video.pause();
        
        // Hide the pop-up container
        videoPopup.style.display = "none";
    });
});
