// ======================
// Pegando cores do root
// ======================
const rootStyles = getComputedStyle(document.documentElement);

const colors = {
  primary: rootStyles.getPropertyValue('--color-primary').trim(),
  primaryHover: rootStyles.getPropertyValue('--color-primary-hover').trim(),
  secondary: rootStyles.getPropertyValue('--color-secondary').trim(),
  accent: rootStyles.getPropertyValue('--color-accent').trim(),
  success: rootStyles.getPropertyValue('--color-success').trim(),
  warning: rootStyles.getPropertyValue('--color-warning').trim(),
  info: rootStyles.getPropertyValue('--color-info').trim(),
  text: rootStyles.getPropertyValue('--color-text').trim(),
  textBackground: rootStyles.getPropertyValue('--color-text-background').trim()
};

// ======================
// Gráfico de Barras: Vendas vs Meta
// ======================
new Chart(document.getElementById('salesChart'), {
  type: 'bar',
  data: {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun'],
    datasets: [
      {
        label: 'Vendas',
        data: [45000, 52000, 48000, 55000, 49000, 65000],
        backgroundColor: colors.primary,
        borderRadius: 8,
        barPercentage: 0.6
      },
      {
        label: 'Meta',
        data: [50000, 50000, 50000, 50000, 50000, 60000],
        backgroundColor: colors.primaryHover,
        borderRadius: 8,
        barPercentage: 0.6
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: colors.text }
      },
      tooltip: {
        backgroundColor: colors.accent,
        titleColor: colors.text,
        bodyColor: colors.text
      }
    },
    scales: {
      x: {
        ticks: { color: colors.text },
        grid: { color: colors.accent + "50" } // leve transparência
      },
      y: {
        ticks: { color: colors.text },
        grid: { color: colors.accent + "50" }
      }
    }
  }
});

// ======================
// Gráfico de Pizza: Distribuição por Departamento
// ======================
new Chart(document.getElementById('deptChart'), {
  type: 'pie',
  data: {
    labels: ['Financeiro','TI','RH','Vendas'],
    datasets: [{
      data: [30, 25, 15, 30],
      backgroundColor: [colors.primary, colors.primaryHover, colors.warning, colors.info],
      borderColor: colors.secondary,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: colors.text,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: colors.accent,
        titleColor: colors.text,
        bodyColor: colors.text
      }
    }
  }
});
