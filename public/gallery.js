document.addEventListener("DOMContentLoaded", async () => {
  const galleryContainer = document.getElementById("galleryContainer");

  try {
    // ✅ If gallery.html is served from public folder (localhost:5000/gallery.html), you can use relative path
    const res = await fetch("/api/content");

    // ✅ If you're opening gallery.html via file:// or a different domain, use full URL:
    // const res = await fetch("http://localhost:5000/api/content");

    if (!res.ok) throw new Error("Failed to fetch data. Status: " + res.status);

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      galleryContainer.innerHTML = "<p>No projects available yet.</p>";
      return;
    }

    galleryContainer.innerHTML = "";

    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `
        <figure>
          <img src="${item.image_url}" alt="${item.title}" />
          <figcaption>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </figcaption>
        </figure>
      `;
      galleryContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
    galleryContainer.innerHTML = "<p style='color:red;'>Could not load gallery items.</p>";
  }
});
