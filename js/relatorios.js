// ==================== CONFIG ====================
const API_URL = "http://localhost:8000/api"; // 🔧 Troque pelo endereço da sua API



// ==================== MOCK DE RELATÓRIOS ====================
const mockReports = [
  { id: 1, nome: "Relatório Vendas", tipo: "Financeiro", data: "2025-09-21", status: "Concluído", tamanho: "2MB", conteudo: "Conteúdo do relatório 1" },
  { id: 2, nome: "Relatório Estoque", tipo: "Logística", data: "2025-09-20", status: "Pendente", tamanho: "1.5MB", conteudo: "Conteúdo do relatório 2" },
  { id: 3, nome: "Relatório Marketing", tipo: "Marketing", data: "2025-09-19", status: "Concluído", tamanho: "3MB", conteudo: "Conteúdo do relatório 3" },
];

// ==================== ELEMENTOS ====================
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// ==================== HELPERS ====================
const getColors = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--color-primary').trim(),
    primaryHover: style.getPropertyValue('--color-primary-hover').trim(),
    success: style.getPropertyValue('--color-success').trim(),
    warning: style.getPropertyValue('--color-warning').trim(),
    info: style.getPropertyValue('--color-info').trim(),
    text: style.getPropertyValue('--color-text').trim(),
    accent: style.getPropertyValue('--color-accent').trim(),
    bgModal: style.getPropertyValue('--bg-modal').trim(),
    glowPrimary: style.getPropertyValue('--glow-primary').trim(),
  };
};

async function apiRequest(endpoint, method, body = null, token = null) {
  try {
    // Mock para login
    if (endpoint === "/login" && method === "POST") {
      if (body.username === "teste" && body.password === "123") {
        return { ok: true, data: { token: "mock-jwt-token" } };
      } else {
        return { ok: false, data: { detail: "Usuário ou senha incorretos" } };
      }
    }
    if (endpoint === "/register" && method === "POST") {
      return { ok: true, data: { message: "Usuário criado com sucesso" } };
    }

    // Requisição real
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: body ? JSON.stringify(body) : null
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { ok: false, data: { detail: "Erro de conexão com servidor." } };
  }
}

function saveToken(token) { localStorage.setItem("token", token); }
function getToken() { return localStorage.getItem("token"); }
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}




// ==================== FUNÇÕES DE RELATÓRIO ====================
function populateReportTable() {
  const tableBody = document.getElementById("reportTable");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  mockReports.forEach(r => {
    const tr = document.createElement("tr");
    tr.className = "border-b border-[var(--color-accent)] hover:bg-[rgba(124,77,255,0.1)] transition";

    const btn = document.createElement("button");
    btn.textContent = "Abrir";
    btn.className = "action-btn px-3 py-2 text-sm";
    btn.onclick = () => openReportModal(r.id);

    tr.innerHTML = `
      <td class="px-4 py-2">${r.id}</td>
      <td class="px-4 py-2">${r.nome}</td>
      <td class="px-4 py-2">${r.tipo}</td>
      <td class="px-4 py-2">${r.data}</td>
      <td class="px-4 py-2">${r.status}</td>
      <td class="px-4 py-2 text-center"></td>
    `;
    tr.querySelector("td:last-child").appendChild(btn);
    tableBody.appendChild(tr);
  });
}

function openReportModal(reportId) {
  const report = mockReports.find(r => r.id === reportId);
  if (!report) return;

  const modal = document.getElementById("reportModal");
  modal.classList.remove("hidden");
  modal.classList.add("modal-active");

  document.getElementById("modalTitle").textContent = report.nome;
  document.getElementById("modalTipo").innerHTML = `<strong>Tipo:</strong> ${report.tipo}`;
  document.getElementById("modalPeriodo").innerHTML = `<strong>Período:</strong> -`;
  document.getElementById("modalData").innerHTML = `<strong>Data:</strong> ${report.data}`;
  document.getElementById("modalTamanho").innerHTML = `<strong>Tamanho:</strong> ${report.tamanho}`;

  const editSection = document.getElementById("editReportSection");
  editSection.classList.add("hidden");
  document.getElementById("editReportTitle").value = report.nome;
  document.getElementById("editReportContent").value = report.conteudo;

  // Botões do modal também com action-btn
  const downloadBtn = document.getElementById("downloadReportBtn");
  const editBtn = document.getElementById("editReportBtn");

  downloadBtn.classList.add("action-btn");
  editBtn.classList.add("action-btn");

  downloadBtn.onclick = () => alert(`Baixando relatório: ${report.nome}`);
  editBtn.onclick = () => editSection.classList.remove("hidden");
}

// ==================== FECHAR MODAL ====================
document.getElementById("closeReportModalBtn")?.addEventListener("click", () => {
  document.getElementById("reportModal").classList.add("hidden");
});

// ==================== SALVAR / CANCELAR EDIÇÃO ====================
document.getElementById("saveReportBtn")?.addEventListener("click", () => {
  const title = document.getElementById("editReportTitle").value;
  const content = document.getElementById("editReportContent").value;
  alert(`Salvando relatório: ${title}\nConteúdo: ${content}`);
  document.getElementById("editReportSection").classList.add("hidden");
});

document.getElementById("cancelEditReportBtn")?.addEventListener("click", () => {
  document.getElementById("editReportSection").classList.add("hidden");
});

// ==================== INICIALIZAÇÃO ====================
document.addEventListener("DOMContentLoaded", () => {
  populateReportTable();
});
