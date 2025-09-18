   // Gráfico de Barras
    new Chart(document.getElementById('salesChart'), {
      type: 'bar',
      data: {
        labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
        datasets: [
          { label: 'Vendas', data: [45000,52000,48000,55000,49000,65000], backgroundColor: '#1793d1' },
          { label: 'Meta', data: [50000,50000,50000,50000,50000,60000], backgroundColor: '#22c55e' }
        ]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: '#f8fafc' } } }, scales: { x: { ticks: { color: '#f8fafc' } }, y: { ticks: { color: '#f8fafc' } } } }
    });

    // Gráfico de Pizza
    new Chart(document.getElementById('deptChart'), {
      type: 'pie',
      data: {
        labels: ['Financeiro','TI','RH','Vendas'],
        datasets: [{ data: [30,25,15,30], backgroundColor: ['#1793d1','#22c55e','#eab308','#a855f7'] }]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: '#f8fafc' } } } }
    });