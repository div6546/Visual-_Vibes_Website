document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("otpLoginForm");
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  const otpSection = document.getElementById("otpSection");
  const errorBox = document.getElementById("login-error");

  let loginPayload = {};

  // ✅ Send OTP button click handler
  sendOtpBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!username || !password || !phone) {
      errorBox.style.color = "red";
      errorBox.textContent = "Please fill all fields.";
      return;
    }

    try {
      const res = await fetch("/api/admin/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, phone }),
      });

      const result = await res.json();

      if (res.ok) {
        errorBox.style.color = "green";
        errorBox.textContent = result.message;
        otpSection.style.display = "block";

        // ✅ Store username and phone for OTP verification
        loginPayload = { username, phone };
      } else {
        errorBox.style.color = "red";
        errorBox.textContent = result.message || "Invalid credentials.";
      }
    } catch (err) {
      console.error("OTP Request Error:", err);
      errorBox.style.color = "red";
      errorBox.textContent = "Server error. Please try again.";
    }
  });

  // ✅ OTP Form submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp").value.trim();

    if (!otp) {
      errorBox.style.color = "red";
      errorBox.textContent = "Please enter OTP.";
      return;
    }

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...loginPayload, otp }),
      });

      const result = await res.json();

      if (res.ok) {
        // ✅ Save token to localStorage
        localStorage.setItem("shiku-token", result.token);

        // ✅ Redirect to admin dashboard
        window.location.href = "admin-dashboard.html";
      } else {
        errorBox.style.color = "red";
        errorBox.textContent = result.message || "Invalid OTP.";
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      errorBox.style.color = "red";
      errorBox.textContent = "Server error. Please try again.";
    }
  });
});
