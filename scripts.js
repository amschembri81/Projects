const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayNews(data.articles); // Added function call to display the news
  } catch (error) {
    console.error("There was an error!", error);
  }
}

fetchNews();

function displayNews(articles) {
  const newsDiv = document.querySelector("#news");
  newsDiv.innerHTML = ""; // Clear any existing news
  for (const article of articles) {
    const articleDiv = document.createElement("div");
    articleDiv.className = "article";

    // Create and append a headline to the articleDiv
    const title = document.createElement("h4");
    title.textContent = article.title;
    articleDiv.appendChild(title);

    // Create and append a description to the articleDiv
    const description = document.createElement("p");
    description.textContent = article.description;
    articleDiv.appendChild(description);

    // Create and append a source to the articleDiv
    const source = document.createElement("p");
    source.textContent = `Source: ${article.source.name}`;
    source.style.fontStyle = "italic";
    articleDiv.appendChild(source);

    // Create and append an image to the articleDiv
    if (article.urlToImage) {
      const image = document.createElement("img");
      image.src = article.urlToImage;
      image.alt = article.title;
      image.style.width = "100%"; // Set image to be responsive
      articleDiv.appendChild(image);
    }

    // Create and append a link to the full article
    const link = document.createElement("a");
    link.href = article.url;
    link.textContent = "Read more";
    link.target = "_blank";
    articleDiv.appendChild(link);

    newsDiv.appendChild(articleDiv);
  }
}
