  // Uso do Sistema - Hoje
  const usageCtx = document.getElementById('usageChart').getContext('2d');
  const usageChart = new Chart(usageCtx, {
    type: 'line',
    data: {
      labels: ['00:00','04:00','08:00','12:00','16:00','20:00'],
      datasets: [
        { label: 'Usuários Ativos', data: [10,25,45,70,50,30], borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.2)', tension: 0.3, fill: true },
        { label: 'Downloads', data: [5,15,20,35,25,10], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)', tension: 0.3, fill: true }
      ]
    },
    options: { responsive:true, plugins:{ legend:{ position:'top' } } }
  });

  // Performance do Sistema
  const performanceCtx = document.getElementById('performanceChart').getContext('2d');
  const performanceChart = new Chart(performanceCtx, {
    type: 'line',
    data: {
      labels: ['01/06','08/06','15/06','22/06','29/06'],
      datasets: [
        { label: 'Tempo de Resposta (ms)', data: [120,115,112,118,110], borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.2)', tension: 0.3, yAxisID: 'y' },
        { label: 'Disponibilidade (%)', data: [99.5,99.7,99.9,99.8,99.9], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', tension: 0.3, yAxisID: 'y1' }
      ]
    },
    options: { responsive:true, plugins:{ legend:{ position:'top' } }, scales:{ y:{ type:'linear', position:'left', beginAtZero:true }, y1:{ type:'linear', position:'right', beginAtZero:true } } }
  });

  // Usuários por Departamento (Horizontal Bar)
    const deptCtx = document.getElementById('deptChart').getContext('2d');
  new Chart(deptCtx, {
    type: 'bar',
    data: {
      labels: ['Vendas','Financeiro','Marketing','RH'],
      datasets: [{
        label: 'Usuários',
        data: [45,32,28,23],
        backgroundColor:['#3b82f6','#10b981','#f59e0b','#8b5cf6'],
        borderRadius: 12,
        barPercentage: 0.7
      }]
    },
    options:{
      indexAxis:'y',
      responsive:true,
      plugins:{ legend:{ display:false } },
      scales:{ x:{ beginAtZero:true } }
    }

    
  });
