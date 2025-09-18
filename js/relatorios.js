

/* ===================== RELATÓRIOS ===================== */
const reports = [
  {id:"#1024", nome:"Relatório Financeiro", tipo:"Financeiro", dept:"Financeiro", data:"2025-09-16", status:"Concluído", tamanho:"2.4 MB", conteudo:"Conteúdo do relatório financeiro mockado."},
  {id:"#1025", nome:"Relatório de Vendas", tipo:"Analítico", dept:"Vendas", data:"2025-09-15", status:"Em Progresso", tamanho:"3.1 MB", conteudo:"Relatório de vendas mockado."},
  {id:"#1026", nome:"Relatório de RH", tipo:"Usuário", dept:"RH", data:"2025-09-10", status:"Pendente", tamanho:"1.8 MB", conteudo:"Relatório de RH mockado."},
  {id:"#1027", nome:"Relatório de Sistema", tipo:"Técnico", dept:"TI", data:"2025-09-12", status:"Concluído", tamanho:"2.7 MB", conteudo:"Relatório técnico mockado."},
  {id:"#1028", nome:"Relatório Operacional", tipo:"Operacional", dept:"Vendas", data:"2025-09-17", status:"Em Progresso", tamanho:"2.0 MB", conteudo:"Relatório operacional mockado."}
];

const tableBody = document.getElementById("reportTable");
const modal = document.getElementById("reportModal");
const closeModalBtn = document.getElementById("closeReportModalBtn");
const downloadBtn = document.getElementById("downloadReportBtn");
const editBtn = document.getElementById("editReportBtn");
const editSection = document.getElementById("editReportSection");
const editTitle = document.getElementById("editReportTitle");
const editContent = document.getElementById("editReportContent");
const saveBtn = document.getElementById("saveReportBtn");
const cancelEditBtn = document.getElementById("cancelEditReportBtn");
const modalTitle = document.getElementById("modalTitle");
const modalTipo = document.getElementById("modalTipo");
const modalPeriodo = document.getElementById("modalPeriodo");
const modalData = document.getElementById("modalData");
const modalTamanho = document.getElementById("modalTamanho");

let currentReport = null;

// Renderiza tabela
function renderTable() {
  tableBody.innerHTML = "";
  reports.forEach((r,index)=>{
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-800/80 transition";
    tr.innerHTML = `
      <td class="px-4 py-3">${r.id}</td>
      <td class="px-4 py-3 font-semibold">${r.nome}</td>
      <td class="px-4 py-3">${r.tipo}</td>
      <td class="px-4 py-3">${r.data}</td>
      <td class="px-4 py-3"><span class="badge ${r.status==="Concluído"?"bg-green-600/80":r.status==="Em Progresso"?"bg-yellow-600/80":"bg-red-600/80"} text-white">${r.status}</span></td>
      <td class="px-4 py-3 text-center space-x-2">
        <button class="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition" onclick="openModal(${index})">✏️ Editar</button>
        <button class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg transition" onclick="downloadReport(${index})">⬇ ${r.tamanho}</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Abre modal
function openModal(index){
  currentReport = reports[index];
  modalTitle.textContent = currentReport.nome;
  modalTipo.textContent = `Tipo: ${currentReport.tipo}`;
  modalPeriodo.textContent = `Período: Mensal`;
  modalData.textContent = `Data: ${currentReport.data}`;
  modalTamanho.textContent = `Tamanho: ${currentReport.tamanho}`;
  editTitle.value = currentReport.nome;
  editContent.value = currentReport.conteudo;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  editSection.classList.add("hidden");
}

// Fecha modal
function closeModal(){
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  editSection.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

// Toggle edição
editBtn.addEventListener("click", ()=> editSection.classList.toggle("hidden"));

// Salvar alterações
saveBtn.addEventListener("click", ()=>{
  if(!currentReport) return;
  currentReport.nome = editTitle.value;
  currentReport.conteudo = editContent.value;
  renderTable();
  editSection.classList.add("hidden");
  openModal(reports.indexOf(currentReport));
});

// Cancelar edição
cancelEditBtn.addEventListener("click", ()=> editSection.classList.add("hidden"));

// Download mock
function downloadReport(index){
  const r = reports[index];
  const blob = new Blob([r.conteudo], {type:"text/plain"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${r.nome}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// Inicializa tabela
renderTable();