let currentPage = 1;
const pageSize = 5;
let allMessages = [];

document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#messagesTable tbody");

  try {
    const response = await fetch("/api/contact/messages", {
      headers: {
        Authorization: "Bearer shiku-infra-admin-token",
      },
    });
    allMessages = await response.json();
    renderTable();
  } catch (error) {
    console.error("❌ Failed to load messages", error);
    tableBody.innerHTML = `<tr><td colspan="6">Error loading messages</td></tr>`;
  }

  document.getElementById("searchInput").addEventListener("input", renderTable);
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage * pageSize < filteredMessages().length) {
      currentPage++;
      renderTable();
    }
  });
  document.getElementById("exportExcelBtn").addEventListener("click", exportToExcel);
});

function filteredMessages() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  return allMessages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(query) ||
      msg.email.toLowerCase().includes(query) ||
      msg.message.toLowerCase().includes(query)
  );
}

function renderTable() {
  const tableBody = document.querySelector("#messagesTable tbody");
  tableBody.innerHTML = "";

  const messages = filteredMessages();
  const start = (currentPage - 1) * pageSize;
  const paginated = messages.slice(start, start + pageSize);

  paginated.forEach((msg) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${msg.date || new Date().toLocaleString()}</td>
      <td>${msg.name}</td>
      <td>${msg.email}</td>
      <td>${msg.phone}</td>
      <td>${msg.message}</td>
      <td><button class="delete-btn" onclick="deleteMessage('${msg._id}')">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

async function deleteMessage(id) {
  const confirmDelete = confirm("Are you sure you want to delete this message?");
  if (!confirmDelete) return;

  try {
    await fetch(`/api/contact/messages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer shiku-infra-admin-token",
      },
    });
    allMessages = allMessages.filter((msg) => msg._id !== id);
    renderTable();
  } catch (error) {
    alert("Failed to delete message.");
    console.error(error);
  }
}

function exportToExcel() {
  const rows = [["Date", "Name", "Email", "Phone", "Message"]];
  filteredMessages().forEach((msg) => {
    rows.push([
      msg.date || new Date().toLocaleString(),
      msg.name,
      msg.email,
      msg.phone,
      msg.message,
    ]);
  });

  let csvContent = "data:application/vnd.ms-excel;charset=utf-8,";
  rows.forEach((row) => {
    csvContent += row.join(",") + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "shiku-infra-messages.xls");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
