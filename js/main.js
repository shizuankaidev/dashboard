window.onload = () => {
  // Sidebar
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="px-6 py-6 flex items-center gap-2 border-b border-gray-700">
      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-xl">RH</div>
      <h1 class="text-xl font-semibold">ReportHub</h1>
    </div>
    <nav class="flex-1 px-4 py-6">
      <ul class="space-y-3">
        <li><a href="dashboard.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">📊 Dashboard</a></li>
        <li><a href="relatorios.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">📑 Relatórios</a></li>
        <li><a href="analytics.html" class="flex items-center gap-2 p-2 rounded-xl bg-[var(--color-primary)] text-white shadow">📈 Analytics</a></li>
        <li><a href="funcionarios.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">👥 Usuários</a></li>
        <li><a href="config.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">⚙️ Configurações</a></li>
      </ul>
    </nav>
  `;

  // Footer
  const footer = document.createElement("footer");
  footer.className = "bg-[var(--color-secondary)]/90 backdrop-blur-lg text-white mt-10 pt-10 pb-6";
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-xl">RH</div>
          <h2 class="text-xl font-semibold text-white">ReportHub</h2>
        </div>
        <p class="text-sm text-gray-400">Plataforma inteligente para relatórios e análises de desempenho.</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Navegação</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-[var(--color-primary)] transition">📊 Dashboard</a></li>
          <li><a href="relatorios.html" class="hover:text-[var(--color-primary)] transition">📑 Relatórios</a></li>
          <li><a href="#" class="hover:text-[var(--color-primary)] transition">📈 Analytics</a></li>
          <li><a href="#" class="hover:text-[var(--color-primary)] transition">👥 Usuários</a></li>
          <li><a href="#" class="hover:text-[var(--color-primary)] transition">⚙️ Configurações</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Contato</h3>
        <ul class="space-y-3 text-sm">
          <li>📍 São Paulo - Brasil</li>
          <li>📧 suporte@reporthub.com</li>
          <li>📞 +55 (11) 99999-9999</li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Inscreva-se</h3>
        <p class="text-sm text-gray-400 mb-3">Receba novidades e relatórios exclusivos:</p>
        <form class="flex gap-2">
          <input type="email" placeholder="Seu email" class="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-[var(--color-primary)] focus:outline-none text-white text-sm">
          <button class="px-4 py-2 bg-[var(--color-primary)] hover:bg-blue-700 rounded-lg text-white text-sm transition">Enviar</button>
        </form>
      </div>
    </div>
    <div class="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
      © 2025 ReportHub. Todos os direitos reservados.
    </div>
  `;
  document.body.appendChild(footer);
};
