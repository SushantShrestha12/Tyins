// ------------- Popup ad -----------------
document.getElementById("download-btn").addEventListener("click", function () {
  var videoUrl = document.getElementById("url").value;

  if (videoUrl) {
    document.getElementById("popupAd").style.visibility = "visible";
    document.getElementById("popupAd").style.opacity = "1";
    var adVideo = document.getElementById("adVideo");
    adVideo.play();

    setTimeout(function () {
      document.getElementById("skip-btn").style.visibility = "visible";
    }, 5000);
  } else {
    alert("Enter the URL.");
  }
});

function closePopup() {
  var popup = document.getElementById("popupAd");
  popup.style.opacity = "0";
  document.getElementById("adVideo").pause();
  setTimeout(function () {
    popup.style.visibility = "hidden";
  }, 500);
}

function skipAd() {
  document.getElementById("popupAd").style.opacity = "0";
  document.getElementById("adVideo").pause();
  document.getElementById("progress-container").style.visibility = "visible";
  setTimeout(function () {
    document.getElementById("popupAd").style.visibility = "hidden";
    document.getElementById("message").textContent =
      "Downloading please wait...";
    startDownload();
  }, 500);
}

async function startDownload() {
  try {
    const url = document.getElementById("url").value;
    const response = await fetch(
      `https://localhost:7168/Insta/download?url=${encodeURIComponent(
        url
      )}`
    );

    if (!response.ok) {
      document.getElementById("message").textContent =
        "Failed to download video";
      return;
    }

    const contentLength = response.headers.get("Content-Length");
    if (!contentLength) {
      document.getElementById("message").textContent =
        "Content-Length header is missing";
      return;
    }

    const total = parseInt(contentLength, 10);
    let loaded = 0;
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            break;
          }
          loaded += value.length;
          controller.enqueue(value);
          updateProgress(loaded, total);
        }
      },
    });

    const blob = await new Response(stream).blob();
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${url.split("v=")[1] || "video"}.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    document.getElementById("message").textContent = "Successfully downloaded";
  } catch (error) {
    document.getElementById("message").textContent = "Error downloading video";
  }
}

function updateProgress(loaded, total) {
  const percent = Math.round((loaded / total) * 100);
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${percent}%`;
  progressBar.textContent = `${percent}%`;
}
