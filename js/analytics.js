// ===================== PEGANDO CORES DO CSS =====================
const getColors = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--color-primary').trim(),
    primaryHover: style.getPropertyValue('--color-primary-hover').trim(),
    accent: style.getPropertyValue('--color-accent').trim(),
    success: style.getPropertyValue('--color-success').trim(),
    warning: style.getPropertyValue('--color-warning').trim(),
    info: style.getPropertyValue('--color-info').trim(),
    text: style.getPropertyValue('--color-text').trim(),
    textShadow: style.getPropertyValue('--text-shadow').trim()
  };
};

// ===================== MOCK DE DADOS =====================
const mockData = {
  usage: {
    labels: ['00:00','04:00','08:00','12:00','16:00','20:00'],
    datasets: [
      { label: 'Usuários Ativos', data: [10,25,45,70,50,30] },
      { label: 'Downloads', data: [5,15,20,35,25,10] }
    ]
  },
  performance: {
    labels: ['01/06','08/06','15/06','22/06','29/06'],
    datasets: [
      { label: 'Tempo de Resposta (ms)', data: [120,115,112,118,110], yAxisID: 'y' },
      { label: 'Disponibilidade (%)', data: [99.5,99.7,99.9,99.8,99.9], yAxisID: 'y1' }
    ]
  },
  dept: {
    labels: ['Vendas','Financeiro','Marketing','RH'],
    datasets: [
      { label: 'Usuários', data: [45,32,28,23] }
    ]
  }
};

// ===================== FUNÇÃO DE FETCH =====================
async function fetchAnalyticsData() {
  try {
    // Futuro endpoint: const res = await fetch('/api/analytics'); return await res.json();
    return mockData;
  } catch (err) {
    console.error('Erro ao buscar dados da API:', err);
    return mockData;
  }
}

// ===================== VARIÁVEIS GLOBAIS =====================
let usageChart, performanceChart, deptChart;

// ===================== FUNÇÃO PARA RENDERIZAR GRÁFICOS =====================
async function renderCharts() {
  const colors = getColors();
  const data = await fetchAnalyticsData();

  // ----------------- USO DO SISTEMA -----------------
  const usageCtx = document.getElementById('usageChart').getContext('2d');
  if (usageChart) usageChart.destroy();
  usageChart = new Chart(usageCtx, {
    type: 'line',
    data: {
      labels: data.usage.labels,
      datasets: [
        {
          label: data.usage.datasets[0].label,
          data: data.usage.datasets[0].data,
          borderColor: colors.success,
          backgroundColor: `${colors.success}33`,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2
        },
        {
          label: data.usage.datasets[1].label,
          data: data.usage.datasets[1].data,
          borderColor: colors.info,
          backgroundColor: `${colors.info}33`,
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: 'easeOutQuart' },
      plugins: {
        legend: { labels: { color: colors.text } },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: colors.accent,
          titleColor: colors.primary,
          bodyColor: colors.text
        }
      },
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: { 
          ticks: { color: colors.text },
          grid: { color: `${colors.text}22` }
        },
        y: { 
          ticks: { color: colors.text },
          beginAtZero: true,
          grid: { color: `${colors.text}22` }
        }
      }
    }
  });

  // ----------------- PERFORMANCE -----------------
  const performanceCtx = document.getElementById('performanceChart').getContext('2d');
  if (performanceChart) performanceChart.destroy();
  performanceChart = new Chart(performanceCtx, {
    type: 'line',
    data: {
      labels: data.performance.labels,
      datasets: [
        {
          label: data.performance.datasets[0].label,
          data: data.performance.datasets[0].data,
          borderColor: colors.warning,
          backgroundColor: `${colors.warning}33`,
          fill: true,
          tension: 0.4,
          yAxisID: 'y',
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2
        },
        {
          label: data.performance.datasets[1].label,
          data: data.performance.datasets[1].data,
          borderColor: colors.success,
          backgroundColor: `${colors.success}33`,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1',
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: 'easeOutQuart' },
      plugins: {
        legend: { labels: { color: colors.text } },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: colors.accent,
          titleColor: colors.primary,
          bodyColor: colors.text
        }
      },
      interaction: { mode: 'nearest', intersect: false },
      scales: {
        x: { 
          ticks: { color: colors.text },
          grid: { color: `${colors.text}22` }
        },
        y: { 
          type: 'linear', position: 'left', beginAtZero: true,
          ticks: { color: colors.text },
          grid: { color: `${colors.text}22` }
        },
        y1: { 
          type: 'linear', position: 'right', beginAtZero: true,
          ticks: { color: colors.text },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });

  // ----------------- DEPARTAMENTOS -----------------
  const deptCtx = document.getElementById('deptChart').getContext('2d');
  if (deptChart) deptChart.destroy();
  deptChart = new Chart(deptCtx, {
    type: 'bar',
    data: {
      labels: data.dept.labels,
      datasets: [{
        label: data.dept.datasets[0].label,
        data: data.dept.datasets[0].data,
        backgroundColor: [colors.primary, colors.primaryHover, colors.warning, colors.info],
        borderRadius: 12,
        barPercentage: 0.6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000, easing: 'easeOutQuart' },
      plugins: {
        legend: { labels: { color: colors.text } },
        tooltip: {
          backgroundColor: colors.accent,
          titleColor: colors.primary,
          bodyColor: colors.text
        }
      },
      scales: {
        x: { 
          beginAtZero: true,
          ticks: { color: colors.text },
          grid: { color: `${colors.text}22` }
        },
        y: { 
          ticks: { color: colors.text },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

// ===================== INICIALIZAÇÃO =====================
window.addEventListener('DOMContentLoaded', () => renderCharts());
