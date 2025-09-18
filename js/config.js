// ======================= CONFIGURAÇÕES MOCADAS =======================
let appConfig = {
  empresa: {
    nome: "ReportHub Inc.",
    id: "12.345.678/0001-99",
    endereco: "Rua Fictícia, 123 - São Paulo",
    telefone: "(11) 98765-4321",
    email: "contato@reporthub.com",
    logo: "../assets/logo.svg"
  },
  identidade: {
    primary: "#7c4dff",
    secondary: "#0f111a",
    accent: "#1c1f2a",
    success: "#22c55e",
    danger: "#ef4444",
    warning: "#facc15",
    info: "#7c4dff"
  },
  preferencias: {
    tema: "arch",
    idioma: "pt",
    data: "dd/mm/yyyy",
    notificacoes: { email: true, push: false, sms: true }
  },
  api: {
    url: "https://api.reporthub.com/v1",
    key: "API_KEY_123456"
  },
  integracoes: {
    webhook: "https://meuservidor.com/webhook"
  },
  privacidade: {
    gdpr: true,
    anonymize: false
  },
  seguranca: {
    sessionTimeout: 30,
    twoFA: true
  },
  equipe: [
    { nome: "Alice", email: "alice@empresa.com", cargo: "Admin" },
    { nome: "Bob", email: "bob@empresa.com", cargo: "Dev" },
    { nome: "Carlos", email: "carlos@empresa.com", cargo: "Analista" }
  ]
};

// ======================= DOM READY =======================
document.addEventListener("DOMContentLoaded", () => {
  renderFooter();
  carregarConfigNaUI();
  bindEvents();
  console.log("✅ Configurações carregadas.");
});

// ======================= UI RENDER =======================


function renderFooter() {
  const footer = document.querySelector("footer");
  footer.innerHTML = `
    <p class="text-sm">© ${new Date().getFullYear()} ReportHub. Todos os direitos reservados.</p>
    <p class="text-xs opacity-70">Versão 1.0.0</p>
  `;
}

function carregarConfigNaUI() {
  // Empresa
  document.getElementById("companyName").value = appConfig.empresa.nome;
  document.getElementById("companyId").value = appConfig.empresa.id;
  document.getElementById("companyAddress").value = appConfig.empresa.endereco;
  document.getElementById("companyPhone").value = appConfig.empresa.telefone;
  document.getElementById("companyEmail").value = appConfig.empresa.email;

  // Preview da logo
  const logoPreview = document.getElementById("logoPreview");
  logoPreview.src = appConfig.empresa.logo;

  // Identidade Visual
  Object.keys(appConfig.identidade).forEach(key => {
    const input = document.getElementById(key + "Color");
    if(input) input.value = appConfig.identidade[key];
  });

  // Preferências
  document.getElementById("themeSelect").value = appConfig.preferencias.tema;
  document.getElementById("userLanguage").value = appConfig.preferencias.idioma;
  document.getElementById("dateFormat").value = appConfig.preferencias.data;
  document.getElementById("notifyEmail").checked = appConfig.preferencias.notificacoes.email;
  document.getElementById("notifyPush").checked = appConfig.preferencias.notificacoes.push;
  document.getElementById("notifySms").checked = appConfig.preferencias.notificacoes.sms;

  // API
  document.getElementById("apiUrl").value = appConfig.api.url;
  document.getElementById("apiKey").value = appConfig.api.key;

  // Integrações
  document.getElementById("webhookUrl").value = appConfig.integracoes.webhook;

  // Privacidade & Segurança
  document.getElementById("gdprCompliance").checked = appConfig.privacidade.gdpr;
  document.getElementById("anonymizeLogs").checked = appConfig.privacidade.anonymize;
  document.getElementById("sessionTimeout").value = appConfig.seguranca.sessionTimeout;
  document.getElementById("twoFactorAuth").checked = appConfig.seguranca.twoFA;

  renderEmployees();
}

function renderEmployees() {
  const tbody = document.getElementById("employeeTable");
  tbody.innerHTML = "";
  appConfig.equipe.forEach((emp, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${emp.nome}</td>
        <td>${emp.email}</td>
        <td>${emp.cargo}</td>
        <td>
          <button onclick="removerFuncionario(${index})" class="text-red-400 hover:text-red-600 transition">🗑️</button>
        </td>
      </tr>
    `;
  });
}

// ======================= EVENTOS =======================
function bindEvents() {
  // Botões principais
  document.getElementById("saveSettingsBtn").addEventListener("click", salvarConfig);
  document.getElementById("exportConfigBtn").addEventListener("click", exportarConfig);
  document.getElementById("importConfigBtn").addEventListener("click", importarConfig);
  document.getElementById("resetConfigBtn").addEventListener("click", resetarConfig);

  // API & Integrações
  document.getElementById("regenApiKeyBtn").addEventListener("click", regenerarApiKey);
  document.getElementById("testWebhookBtn").addEventListener("click", testarWebhook);

  // Funcionários
  document.getElementById("addEmployeeBtn").addEventListener("click", adicionarFuncionario);

  // Logo Preview
  const logoInput = document.getElementById("companyLogo");
  const logoPreview = document.getElementById("logoPreview");
  logoInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => { 
        logoPreview.src = reader.result;
        appConfig.empresa.logo = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Inputs de cor
  const root = document.documentElement;
  const colorInputs = document.querySelectorAll('input[type="color"]');

  function addAlpha(hex, alpha){
    const r = parseInt(hex.substr(1,2),16);
    const g = parseInt(hex.substr(3,2),16);
    const b = parseInt(hex.substr(5,2),16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function lighten(hex, amount){
    const num = parseInt(hex.slice(1),16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    r = Math.min(255,r); g = Math.min(255,g); b = Math.min(255,b);
    return `rgb(${r},${g},${b})`;
  }

  function applyColors(){
    colorInputs.forEach(input=>{
      const key = input.id.replace("Color","");
      root.style.setProperty(`--color-${key}`, input.value);
      root.style.setProperty(`--glow-${key}`, addAlpha(input.value,0.67));
      if(key==="primary") root.style.setProperty(`--color-primary-hover`, lighten(input.value,30));
    });
  }

  colorInputs.forEach(input => input.addEventListener("input", applyColors));
  applyColors();
}

// ======================= AÇÕES =======================
function salvarConfig() {
  appConfig.empresa = {
    nome: document.getElementById("companyName").value,
    id: document.getElementById("companyId").value,
    endereco: document.getElementById("companyAddress").value,
    telefone: document.getElementById("companyPhone").value,
    email: document.getElementById("companyEmail").value,
    logo: appConfig.empresa.logo
  };
  Object.keys(appConfig.identidade).forEach(key=>{
    const input = document.getElementById(key+"Color");
    if(input) appConfig.identidade[key] = input.value;
  });
  appConfig.preferencias = {
    tema: document.getElementById("themeSelect").value,
    idioma: document.getElementById("userLanguage").value,
    data: document.getElementById("dateFormat").value,
    notificacoes:{
      email: document.getElementById("notifyEmail").checked,
      push: document.getElementById("notifyPush").checked,
      sms: document.getElementById("notifySms").checked
    }
  };
  appConfig.api.url = document.getElementById("apiUrl").value;
  appConfig.api.key = document.getElementById("apiKey").value;
  appConfig.integracoes.webhook = document.getElementById("webhookUrl").value;
  appConfig.privacidade.gdpr = document.getElementById("gdprCompliance").checked;
  appConfig.privacidade.anonymize = document.getElementById("anonymizeLogs").checked;
  appConfig.seguranca.sessionTimeout = parseInt(document.getElementById("sessionTimeout").value);
  appConfig.seguranca.twoFA = document.getElementById("twoFactorAuth").checked;

  alert("✅ Configurações salvas com sucesso!");
  console.log("📦 Config atualizada:", appConfig);
}

function exportarConfig() {
  const blob = new Blob([JSON.stringify(appConfig,null,2)],{type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url;
  a.download="config.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importarConfig() {
  const input = document.createElement("input");
  input.type="file";
  input.accept="application/json";
  input.onchange = e => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = evt=>{
      try{
        appConfig = JSON.parse(evt.target.result);
        carregarConfigNaUI();
        alert("✅ Configurações importadas com sucesso!");
      } catch(err){
        alert("❌ Arquivo inválido!");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function resetarConfig() {
  if(confirm("Tem certeza que deseja resetar as configurações?")) location.reload();
}

function regenerarApiKey() {
  appConfig.api.key = "API_" + Math.random().toString(36).substring(2,15);
  document.getElementById("apiKey").value = appConfig.api.key;
  alert("🔑 Nova API Key gerada!");
}

function testarWebhook() {
  alert("📡 Testando webhook em: " + appConfig.integracoes.webhook);
  // Futuro: fetch(appConfig.integracoes.webhook, { method: "POST", body: JSON.stringify({ test: true }) })
}

function adicionarFuncionario() {
  const nome = prompt("Nome do funcionário:");
  const email = prompt("Email do funcionário:");
  const cargo = prompt("Cargo:");
  if(nome && email && cargo){
    appConfig.equipe.push({nome,email,cargo});
    renderEmployees();
  }
}

function removerFuncionario(index){
  if(confirm("Remover funcionário?")){
    appConfig.equipe.splice(index,1);
    renderEmployees();
  }
}
