// Pegando cores do CSS
const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
const primaryHover = getComputedStyle(document.documentElement).getPropertyValue('--color-primary-hover').trim();
const success = getComputedStyle(document.documentElement).getPropertyValue('--color-success').trim();
const warning = getComputedStyle(document.documentElement).getPropertyValue('--color-warning').trim();
const info = getComputedStyle(document.documentElement).getPropertyValue('--color-info').trim();

// Gráfico de Barras
new Chart(document.getElementById('salesChart'), {
  type: 'bar',
  data: {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
    datasets: [
      { label: 'Vendas', data: [45000,52000,48000,55000,49000,65000], backgroundColor: primary },
      { label: 'Meta', data: [50000,50000,50000,50000,50000,60000], backgroundColor: primaryHover }
    ]
  },
  options: { 
    responsive: true,
    plugins: { legend: { labels: { color: '#f8fafc' } } },
    scales: { 
      x: { ticks: { color: '#f8fafc' } }, 
      y: { ticks: { color: '#f8fafc' } } 
    } 
  }
});

// Gráfico de Pizza
new Chart(document.getElementById('deptChart'), {
  type: 'pie',
  data: {
    labels: ['Financeiro','TI','RH','Vendas'],
    datasets: [{ data: [30,25,15,30], backgroundColor: [primary, primaryHover, warning, info] }]
  },
  options: { 
    responsive: true, 
    plugins: { legend: { labels: { color: '#f8fafc' } } } 
  }
});
