document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const titleInput = uploadForm.querySelector('input[name="title"]');
  const descriptionInput = uploadForm.querySelector('textarea[name="description"]');
  const imageInput = uploadForm.querySelector('input[name="image"]');
  const uploadError = document.getElementById("upload-error");
  const uploadSuccess = document.getElementById("upload-success");

  // Load uploaded content into gallery (if needed)
  async function loadUploads() {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      const galleryContainer = document.getElementById("gallery-container");
      if (!galleryContainer) return;

      galleryContainer.innerHTML = '';
      data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("gallery-item");
        div.innerHTML = `
          <img src="${item.image_url}" alt="${item.title}" />
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        `;
        galleryContainer.appendChild(div);
      });
    } catch (error) {
      console.error("Failed to load gallery:", error);
    }
  }

  // Handle form submission
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    uploadError.textContent = '';
    uploadSuccess.textContent = '';

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const image = imageInput.files[0];

    if (!title || !description || !image) {
      uploadError.textContent = "Please fill in all fields and select an image.";
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer shiku-infra-admin-token"
        }
      });

      const result = await response.json();

      if (response.ok) {
        uploadSuccess.textContent = "Upload successful!";
        uploadForm.reset();
        loadUploads(); // Reload gallery if needed
      } else {
        uploadError.textContent = result.error || "Upload failed.";
      }
    } catch (err) {
      console.error("Upload error:", err);
      uploadError.textContent = "Something went wrong during upload.";
    }
  });

  loadUploads();
});
