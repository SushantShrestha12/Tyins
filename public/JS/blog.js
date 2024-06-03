window.onload = async function () {
  async function generateBlog() {
    try {
      var baseUrl = "https://localhost:7168/BlogContentGenerator/start";
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.error("Failed to start blog content generation");
        return null;
      }
      // return await response.json();
    } catch (error) {
      console.error("Error starting blog content generation:", error);
      return null;
    }
  }

  async function fetchLatestBlog() {
    try {
      var baseUrl = "https://localhost:7168/BlogContentGenerator/latest";
      const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (!response.ok) {
        console.error("Failed to fetch latest blog content");
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching latest blog content:", error);
      return null;
    }
  }

  async function blogCard() {
    // Start the blog generation process
    await generateBlog();

    // Wait for a short period to ensure the content is generated
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Fetch the latest blog content
    const latestBlog = await fetchLatestBlog();

    if (!latestBlog) {
      console.error("No latest blog content available");
      return;
    }

    var title = `
            <div class="blog-card">
                <a class="article_ref" href="../HTML/gpt_blog.html">
                    <div class="box-details">
                        <img class="download_photos" src="../Images/download_youtube.png" alt="Download from Youtube" />
                        <h3>${latestBlog.title}</h3>
                        <div class="read_more">
                            <p>READ MORE</p>
                        </div>
                    </div>
                </a>
            </div>
        `;

    document.getElementById("blog_box").innerHTML += title;
  }

  // Call the function to generate the blog card
  blogCard();
};
