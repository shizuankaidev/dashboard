// ======================= MOCK / API =======================
// ======================= MOCK / API =======================
async function fetchDashboardData() {
  try {
    await new Promise(res => setTimeout(res, 500));

    // pega todas as cores definidas em :root
    const root = getComputedStyle(document.documentElement);

    const identidade = {
      primary: root.getPropertyValue("--color-primary").trim(),
      primaryHover: root.getPropertyValue("--color-primary-hover").trim(),
      secondary: root.getPropertyValue("--color-secondary").trim(),
      accent: root.getPropertyValue("--color-accent").trim(),
      bg: root.getPropertyValue("--color-bg").trim(),
      bg2: root.getPropertyValue("--color-bg2").trim(),
      text: root.getPropertyValue("--color-text").trim(),
      success: root.getPropertyValue("--color-success").trim(),
      danger: root.getPropertyValue("--color-danger").trim(),
      warning: root.getPropertyValue("--color-warning").trim(),
      info: root.getPropertyValue("--color-info").trim()
    };

    return {
      empresa: {
        nome: "MeuSite Inc.",
        id: "12.345.678/0001-99",
        endereco: "Rua Fictícia, 123 - São Paulo",
        telefone: "(11) 98765-4321",
        email: "contato@meusite.com",
        logo: "../assets/logo.svg"
      },
      identidade, // agora vem direto do CSS 🎨
      preferencias: {
        tema: "arch",
        idioma: "pt",
        data: "dd/mm/yyyy",
        notificacoes: { email:true, push:false, sms:false }
      },
      api: { url:"https://api.meusite.com", key:"123ABC456DEF" },
      integracoes: { webhook:"" },
      privacidade: { gdpr:true, anonymize:false },
      seguranca: { sessionTimeout:30, twoFA:true },
      relatorios: { total: 2847, ativos:1245, downloads:342, performance:98.5 },
      resumoDia: { relatorios:25, downloads:17, acessos:8, novosUsuarios:3 },
      equipe: [
        { nome: "Alice", email: "alice@empresa.com", cargo: "Admin" },
        { nome: "Bob", email: "bob@empresa.com", cargo: "Dev" },
        { nome: "Carlos", email: "carlos@empresa.com", cargo: "Analista" }
      ]
    };
  } catch(err) {
    console.error("Erro ao carregar dados:", err);
    return null;
  }
}

// ======================= CONFIGURAÇÕES =======================
let appConfig = {
  empresa: {},
  identidade: {},
  preferencias: {},
  api: {},
  integracoes: {},
  privacidade: {},
  seguranca: {},
  equipe: [],
  relatorios:{},
  resumoDia:{}
};

// ======================= INICIALIZAÇÃO =======================
async function initDashboard() {
  const data = await fetchDashboardData();
  if(!data) return alert("Erro ao carregar dados da API");
  appConfig = { ...appConfig, ...data };
  carregarConfigNaUI();
  renderCharts();
  bindEvents();
}

// ======================= CARREGAR CONFIG NA UI =======================
function carregarConfigNaUI() {
  const empresa = appConfig.empresa;
  const getById = id => document.getElementById(id);

  if(getById("companyName")) getById("companyName").value = empresa.nome || "";
  if(getById("companyId")) getById("companyId").value = empresa.id || "";
  if(getById("companyAddress")) getById("companyAddress").value = empresa.endereco || "";
  if(getById("companyPhone")) getById("companyPhone").value = empresa.telefone || "";
  if(getById("companyEmail")) getById("companyEmail").value = empresa.email || "";
  if(getById("logoPreview")) getById("logoPreview").src = empresa.logo || "../assets/logo.svg";

  // Identidade Visual
  Object.entries(appConfig.identidade).forEach(([key, value]) => {
    const input = document.querySelector(`input[data-var="--color-${key}"]`);
    if(input) input.value = value;
  });
  aplicarIdentidadeVisual();

  // Preferências
  if(getById("themeSelect")) getById("themeSelect").value = appConfig.preferencias.tema || "arch";
  if(getById("userLanguage")) getById("userLanguage").value = appConfig.preferencias.idioma || "pt";
  if(getById("dateFormat")) getById("dateFormat").value = appConfig.preferencias.data || "dd/mm/yyyy";

  if(getById("notifyEmail")) getById("notifyEmail").checked = appConfig.preferencias.notificacoes?.email || false;
  if(getById("notifyPush")) getById("notifyPush").checked = appConfig.preferencias.notificacoes?.push || false;
  if(getById("notifySms")) getById("notifySms").checked = appConfig.preferencias.notificacoes?.sms || false;

  // API e Integrações
  if(getById("apiUrl")) getById("apiUrl").value = appConfig.api.url || "";
  if(getById("apiKey")) getById("apiKey").value = appConfig.api.key || "";
  if(getById("webhookUrl")) getById("webhookUrl").value = appConfig.integracoes.webhook || "";

  // Privacidade e Segurança
  if(getById("gdprCompliance")) getById("gdprCompliance").checked = appConfig.privacidade.gdpr || false;
  if(getById("anonymizeLogs")) getById("anonymizeLogs").checked = appConfig.privacidade.anonymize || false;
  if(getById("sessionTimeout")) getById("sessionTimeout").value = appConfig.seguranca.sessionTimeout || 30;
  if(getById("twoFactorAuth")) getById("twoFactorAuth").checked = appConfig.seguranca.twoFA || false;

  // Equipe e KPIs
  renderEmployees();
  renderKPIs();
}

// ======================= EMPLOYEES =======================
function renderEmployees() {
  const tbody = document.getElementById("employeeTable");
  if(!tbody) return;
  tbody.innerHTML = appConfig.equipe.map((emp,index) => `
    <tr>
      <td>${emp.nome}</td>
      <td>${emp.email}</td>
      <td>${emp.cargo}</td>
      <td><button onclick="removerFuncionario(${index})" class="text-red-400 hover:text-red-600 transition">🗑️</button></td>
    </tr>
  `).join("");
}
function adicionarFuncionario(){
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

// ======================= KPIs =======================
function renderKPIs(){
  document.querySelectorAll(".kpi-relatorios").forEach(el => el.textContent = appConfig.relatorios.total || 0);
  document.querySelectorAll(".kpi-ativos").forEach(el => el.textContent = appConfig.relatorios.ativos || 0);
  document.querySelectorAll(".kpi-downloads").forEach(el => el.textContent = appConfig.relatorios.downloads || 0);
  document.querySelectorAll(".kpi-performance").forEach(el => el.textContent = (appConfig.relatorios.performance || 0) + "%");

  const resumo = appConfig.resumoDia || {};
  if(document.querySelector(".resumo-relatorios")) document.querySelector(".resumo-relatorios").textContent = resumo.relatorios || 0;
  if(document.querySelector(".resumo-downloads")) document.querySelector(".resumo-downloads").textContent = resumo.downloads || 0;
  if(document.querySelector(".resumo-acessos")) document.querySelector(".resumo-acessos").textContent = resumo.acessos || 0;
  if(document.querySelector(".resumo-novos")) document.querySelector(".resumo-novos").textContent = resumo.novosUsuarios || 0;
}

// ======================= IDENTIDADE VISUAL =======================
function aplicarIdentidadeVisual() {
  const root = document.documentElement;
  const identidade = appConfig.identidade;

  Object.keys(identidade).forEach(key => {
    const input = document.querySelector(`input[data-var="--color-${key}"]`);
    if(input){
      root.style.setProperty(`--color-${key}`, input.value);
      root.style.setProperty(`--glow-${key}`, hexToRgba(input.value,0.67));
    }
  });

  root.style.setProperty("--color-primary-hover", lightenColor(identidade.primary,30));
  root.style.setProperty("--bg-card", `color-mix(in srgb, ${identidade.accent} 90%, transparent)`);
  root.style.setProperty("--shadow-card", `0 0 12px ${hexToRgba(identidade.accent,0.67)},0 6px 15px ${identidade.accent}`);
}

function hexToRgba(hex, alpha){
  const r = parseInt(hex.substr(1,2),16);
  const g = parseInt(hex.substr(3,2),16);
  const b = parseInt(hex.substr(5,2),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function lightenColor(hex, amount){
  const num = parseInt(hex.slice(1),16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.min(255,r); g = Math.min(255,g); b = Math.min(255,b);
  return `rgb(${r},${g},${b})`;
}

// ======================= CHARTS =======================
let salesChart, deptChart;
function renderCharts(){
  const salesCtx = document.getElementById("salesChart")?.getContext("2d");
  const deptCtx = document.getElementById("deptChart")?.getContext("2d");

  if(salesCtx){
    salesChart = new Chart(salesCtx,{
      type: 'bar',
      data: {
        labels: ["Janeiro","Fevereiro","Março","Abril","Maio"],
        datasets:[{ label: "Vendas", data: [65,59,80,81,56], backgroundColor: appConfig.identidade.primary }]
      },
      options: { responsive:true, plugins:{legend:{display:false}}}
    });
  }

  if(deptCtx){
    deptChart = new Chart(deptCtx,{
      type: 'pie',
      data:{
        labels:["Financeiro","Vendas","TI","RH"],
        datasets:[{
          label:"Departamentos",
          data:[30,25,25,20],
          backgroundColor:[
            appConfig.identidade.primary,
            appConfig.identidade.secondary,
            appConfig.identidade.accent,
            appConfig.identidade.info
          ]
        }]
      },
      options:{responsive:true, plugins:{legend:{position:'bottom'}}}
    });
  }
}

// ======================= EVENTOS =======================
function bindEvents(){
  document.querySelectorAll('input[type="color"]').forEach(input => input.addEventListener("input",aplicarIdentidadeVisual));

  const getById = id => document.getElementById(id);

  if(getById("saveSettingsBtn")) getById("saveSettingsBtn").addEventListener("click", salvarConfig);
  if(getById("exportConfigBtn")) getById("exportConfigBtn").addEventListener("click", exportarConfig);
  if(getById("importConfigBtn")) getById("importConfigBtn").addEventListener("click", importarConfig);
  if(getById("resetConfigBtn")) getById("resetConfigBtn").addEventListener("click", resetarConfig);
  if(getById("regenApiKeyBtn")) getById("regenApiKeyBtn").addEventListener("click", regenerarApiKey);
  if(getById("testWebhookBtn")) getById("testWebhookBtn").addEventListener("click", testarWebhook);

  const logoInput = getById("companyLogo");
  if(logoInput){
    logoInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = () => { 
          if(getById("logoPreview")) getById("logoPreview").src = reader.result;
          appConfig.empresa.logo = reader.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if(getById("addEmployeeBtn")) getById("addEmployeeBtn").addEventListener("click", adicionarFuncionario);
}

// ======================= AÇÕES =======================
function salvarConfig(){ alert("✅ Configurações salvas!"); console.log(appConfig); }
function exportarConfig(){ alert("📦 Exportar JSON"); }
function importarConfig(){ alert("📥 Importar JSON"); }
function resetarConfig(){ location.reload(); }
function regenerarApiKey(){ alert("🔑 Nova API Key gerada!"); }
function testarWebhook(){ alert("📡 Teste webhook!"); }

// ======================= INICIAR =======================
window.addEventListener("DOMContentLoaded", initDashboard);
