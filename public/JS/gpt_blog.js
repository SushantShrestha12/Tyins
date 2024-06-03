window.onload = async function () {
    async function fetchLatestBlog() {
      try {
        var baseUrl = "https://localhost:7168/BlogContentGenerator/latest";
        const response = await fetch(baseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response status: " + response.status);
        console.log("Response status text: " + response.statusText);
        if (!response.ok) {
          console.error("Failed to fetch latest blog content");
          return null;
        }
  
        const jsonResponse = await response.json();
        console.log("Fetched blog content:", jsonResponse);
        return jsonResponse;
      } catch (error) {
        console.error("Error fetching latest blog content:", error);
        return null;
      }
    }
  
    async function generateContent() {
      // Fetch the latest blog content
      const latestBlog = await fetchLatestBlog();
  
      if (latestBlog) {
        var content = `
          <article>
              <h2>${latestBlog.title}</h2>
              <p>Posted on June 2, 2024 by Author</p>
              <p>${latestBlog.content}</p>
          </article>
        `;
  
        document.getElementById("heading").innerHTML = latestBlog.title;
        document.getElementById("gpt_content").innerHTML += content;
      } else {
        console.error("No blog content available to display.");
      }
    }
  
    generateContent();
  };
  