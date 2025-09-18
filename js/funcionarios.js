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
  const performanceBar = document.getElementById('performanceBar'); // barra de nota

  // Abrir modal
  window.openEmployeeModal = function(id) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    employeeView.classList.remove('hidden');
    reportView.classList.add('hidden');
    editSection.classList.add('hidden');

    // Exemplo: atualizar nota do funcionário (0 a 10)
    let nota = 8; // valor dinâmico ou do banco
    if (performanceBar) {
      performanceBar.style.width = (nota * 10) + '%';
      performanceBar.textContent = `${nota}/10`;
    }
  }

  // Fechar modal
  function closeEmployeeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    editSection.classList.add('hidden');
    employeeView.classList.remove('hidden');
    reportView.classList.add('hidden');
  }

  closeBtn.addEventListener('click', closeEmployeeModal);
  document.addEventListener('keydown', e => { if (e.key === "Escape") closeEmployeeModal(); });

  // Abrir edição
  editBtn.addEventListener('click', () => editSection.classList.toggle('hidden'));
  cancelEditBtn.addEventListener('click', () => editSection.classList.add('hidden'));

  // Abrir envio de relatório
  sendReportBtn.addEventListener('click', () => {
    employeeView.classList.add('hidden');
    reportView.classList.remove('hidden');
  });
  cancelReportBtn.addEventListener('click', () => {
    reportView.classList.add('hidden');
    employeeView.classList.remove('hidden');
  });

  // Inicializar gráficos Chart.js
  const hoursChart = new Chart(document.getElementById('hoursChart'), {
    type: 'bar',
    data: {
      labels: ['Seg','Ter','Qua','Qui','Sex'],
      datasets: [
        {label:'Horas Trabalhadas', data:[8,7,9,8,6], backgroundColor:'#22c55e'},
        {label:'Horas Extras', data:[1,2,0,1,1], backgroundColor:'#eab308'}
      ]
    }
  });

  const salesChart = new Chart(document.getElementById('salesChart'), {
    type: 'line',
    data: {
      labels: ['Jan','Fev','Mar','Abr','Mai'],
      datasets: [
        {label:'Vendas', data:[300,320,280,350,400], borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.2)'},
        {label:'Meta', data:[350,350,350,350,350], borderColor:'#f59e0b', borderDash:[5,5]}
      ]
    }
  });
});
