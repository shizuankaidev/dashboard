// ======================= MOCK DE DADOS =======================
const mockEmployees = [
  {
    id: 1,
    nome: "João Silva",
    cargo: "Vendas",
    pontos: 45,
    horasExtras: 12,
    vendasMes: 320,
    desempenho: "Excelente",
    nota: 8,
    hoursData: [8,7,9,8,6],
    extraHoursData: [1,2,0,1,1],
    salesData: [300,320,280,350,400],
    salesMeta: [350,350,350,350,350]
  },
  {
    id: 2,
    nome: "Maria Souza",
    cargo: "Financeiro",
    pontos: 38,
    horasExtras: 8,
    vendasMes: 0,
    desempenho: "Bom",
    nota: 7,
    hoursData: [7,8,7,6,8],
    extraHoursData: [0,1,0,0,1],
    salesData: [0,0,0,0,0],
    salesMeta: [0,0,0,0,0]
  },
  {
    id: 3,
    nome: "Carlos Lima",
    cargo: "Marketing",
    pontos: 29,
    horasExtras: 5,
    vendasMes: 200,
    desempenho: "Médio",
    nota: 6,
    hoursData: [6,6,7,5,5],
    extraHoursData: [0,0,1,0,0],
    salesData: [180,200,220,190,210],
    salesMeta: [200,200,200,200,200]
  }
];

// ======================= DOM READY =======================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('employeeModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const editBtn = document.getElementById('editBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const editSection = document.getElementById('editSection');
  const employeeView = document.getElementById('employeeView');
  const reportView = document.getElementById('reportView');
  const sendReportBtn = document.getElementById('sendReportBtn');
  const cancelReportBtn = document.getElementById('cancelReportBtn');
  const performanceBar = document.getElementById('performanceBar');

  let hoursChartInstance = null;
  let salesChartInstance = null;
  let employees = []; // Array que será preenchido pela API ou mock

  // ======================= CARREGAR DADOS =======================
  async function loadEmployees() {
    try {
      // Tente buscar da API
      const res = await fetch('/api/employees');
      if(!res.ok) throw new Error('API não disponível');
      employees = await res.json();
    } catch (err) {
      // Fallback para mock
      employees = mockEmployees;
      console.warn('Usando mock de funcionários:', err);
    }
    renderEmployeeCards();
  }

  // ======================= RENDERIZAÇÃO DOS CARDS =======================
  function renderEmployeeCards() {
    const section = document.querySelector('section.grid');
    section.innerHTML = ''; // limpa os cards

    employees.forEach(emp => {
      const card = document.createElement('div');
      card.className = "p-6 bg-[var(--color-accent)]/90 backdrop-blur-xl rounded-3xl shadow-2xl card-hover flex flex-col justify-between";
      card.innerHTML = `
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">${emp.nome.split(" ").map(w=>w[0]).join("").substring(0,2)}</div>
          <div>
            <h4 class="text-xl font-bold">${emp.nome}</h4>
            <span class="text-sm text-gray-400">${emp.cargo}</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <div class="flex justify-between items-center"><span>Pontos Batidos</span><span class="font-semibold text-green-400">${emp.pontos}</span></div>
          <div class="flex justify-between items-center"><span>Horas Extras</span><span class="font-semibold text-yellow-400">${emp.horasExtras}h</span></div>
          <div class="flex justify-between items-center"><span>Vendas do Mês</span><span class="font-semibold text-blue-400">${emp.vendasMes}</span></div>
          <div class="flex justify-between items-center"><span>Desempenho</span><span class="font-semibold text-purple-400">${emp.desempenho}</span></div>
        </div>
        <button onclick="openEmployeeModal(${emp.id})" class="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition rounded-xl shadow-lg font-semibold">🔍 Detalhes</button>
      `;
      section.appendChild(card);
    });
  }

  // ======================= ABRIR MODAL =======================
  window.openEmployeeModal = function(id) {
    const emp = employees.find(e => e.id === id);
    if(!emp) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    employeeView.classList.remove('hidden');
    reportView.classList.add('hidden');
    editSection.classList.add('hidden');

    // Atualiza barra de performance
    if(performanceBar) {
      performanceBar.style.width = (emp.nota * 10) + '%';
      performanceBar.textContent = `${emp.nota}/10`;
    }

    // Preenche dados básicos do modal
    const initialsDiv = employeeView.querySelector(".w-24.h-24");
    if(initialsDiv) initialsDiv.textContent = emp.nome.split(" ").map(w=>w[0]).join("").substring(0,2);

    const nameHeading = employeeView.querySelector("h3") || employeeView.querySelector("h4");
    if(nameHeading) nameHeading.textContent = emp.nome;

    const cargoSpan = employeeView.querySelector("span");
    if(cargoSpan) cargoSpan.textContent = emp.cargo;

    // Preenche inputs de edição
    document.getElementById('editName').value = emp.nome;
    document.getElementById('editCargo').value = emp.cargo;
    document.getElementById('editPontos').value = emp.pontos;
    document.getElementById('editHoras').value = emp.horasExtras;

    renderCharts(emp);
  };

  // ======================= RENDERIZA GRÁFICOS =======================
  function renderCharts(emp){
    const hoursCtx = document.getElementById('hoursChart').getContext('2d');
    const salesCtx = document.getElementById('salesChart').getContext('2d');

    if(hoursChartInstance) hoursChartInstance.destroy();
    if(salesChartInstance) salesChartInstance.destroy();

    hoursChartInstance = new Chart(hoursCtx, {
      type: 'bar',
      data: {
        labels: ['Seg','Ter','Qua','Qui','Sex'],
        datasets: [
          {label:'Horas Trabalhadas', data: emp.hoursData, backgroundColor:'#22c55e'},
          {label:'Horas Extras', data: emp.extraHoursData, backgroundColor:'#eab308'}
        ]
      },
      options:{ responsive:true, plugins:{ legend:{ position:'top' } } }
    });

    salesChartInstance = new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['Jan','Fev','Mar','Abr','Mai'],
        datasets: [
          {label:'Vendas', data: emp.salesData, borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.2)', tension:0.3, fill:true},
          {label:'Meta', data: emp.salesMeta, borderColor:'#f59e0b', borderDash:[5,5], fill:false, tension:0.3}
        ]
      },
      options:{ responsive:true, plugins:{ legend:{ position:'top' } } }
    });
  }

  // ======================= FECHAR MODAL =======================
  function closeEmployeeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    editSection.classList.add('hidden');
    employeeView.classList.remove('hidden');
    reportView.classList.add('hidden');
  }

  closeBtn.addEventListener('click', closeEmployeeModal);
  document.addEventListener('keydown', e => { if(e.key==="Escape") closeEmployeeModal(); });

  // ======================= EDITAR =======================
  editBtn.addEventListener('click', ()=> editSection.classList.toggle('hidden'));
  cancelEditBtn.addEventListener('click', ()=> editSection.classList.add('hidden'));

  // ======================= RELATÓRIO =======================
  sendReportBtn.addEventListener('click', ()=>{
    employeeView.classList.add('hidden');
    reportView.classList.remove('hidden');
  });
  cancelReportBtn.addEventListener('click', ()=>{
    reportView.classList.add('hidden');
    employeeView.classList.remove('hidden');
  });

  // ======================= INICIALIZA =======================
  loadEmployees();
});
