window.onload = () => {
  // ===== SIDEBAR =====
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="px-6 py-6 flex items-center gap-2 border-b border-gray-700">
      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-xl">RH</div>
      <h1 class="text-xl font-semibold">@python-MeuSite</h1>
    </div>
    <nav class="flex-1 px-4 py-6">
      <ul class="space-y-3">
        <li><a href="../index.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">📊 Dashboard</a></li>
        <li><a href="/pages/relatorios.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">📑 Relatórios</a></li>
        <li><a href="/pages/analytics.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">📈 Analytics</a></li>
        <li><a href="/pages/funcionarios.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">👥 Usuários</a></li>
        <li><a href="/pages/config.html" class="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-700 transition">⚙️ Configurações</a></li>
      </ul>
    </nav>
  `;
// ===== SIDEBAR ACTIVE LINK =====
const currentPage = window.location.pathname
  .split("/").pop()      // pega só o último segmento da URL
  .replace(".html", "")  // remove .html
  .toLowerCase();

const links = document.querySelectorAll("#sidebar nav a");
links.forEach(link => {
  const linkPage = link.getAttribute("href")
    .split("/").pop()      // pega só o nome do arquivo
    .replace(".html", "")  // remove .html
    .toLowerCase();

  if (linkPage === currentPage) {
    link.classList.add("bg-[var(--color-primary)]", "text-white", "shadow");
    link.classList.remove("hover:bg-gray-700");
  }
});


  // ===== FOOTER =====
  const footer = document.createElement("footer");
  footer.className = "bg-[var(--color-secondary)]/90 backdrop-blur-lg text-white mt-10 pt-10 pb-6";
  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-xl">RH</div>
          <h2 class="text-xl font-semibold text-white">@python-MeuSite</h2>
        </div>
        <p class="text-sm text-gray-400">Plataforma inteligente para relatórios e análises de desempenho.</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Navegação</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="dashboard.html" class="hover:text-[var(--color-primary)] transition">📊 Dashboard</a></li>
          <li><a href="relatorios.html" class="hover:text-[var(--color-primary)] transition">📑 Relatórios</a></li>
          <li><a href="analytics.html" class="hover:text-[var(--color-primary)] transition">📈 Analytics</a></li>
          <li><a href="funcionarios.html" class="hover:text-[var(--color-primary)] transition">👥 Usuários</a></li>
          <li><a href="config.html" class="hover:text-[var(--color-primary)] transition">⚙️ Configurações</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-semibold mb-4 text-white">Contato</h3>
        <ul class="space-y-3 text-sm">
          <li>📍 São Paulo - Brasil</li>
          <li>📧 suporte@@python-MeuSite.com</li>
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
      © 2025 @python-MeuSite. Todos os direitos reservados.
    </div>
  `;
  document.body.appendChild(footer);

  // ===== HEADER USER MENU =====
  const headerContainer = document.querySelector("header");
  const userName = "Pedro Silva"; 
  const userEmail = "pedro.silva@email.com"; 
  const userInitials = userName.split(" ").map(n => n[0]).join("");

  const userMenuContainer = document.createElement("div");
  userMenuContainer.id = "userMenuContainer";
  userMenuContainer.className = "relative";

  userMenuContainer.innerHTML = `
    <div id="userMenu" class="flex items-center gap-2 cursor-pointer select-none">
      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md">
        ${userInitials}
      </div>
      <span class="hidden sm:block text-white font-semibold"></span>
    </div>
    <div id="userDropdown" class="absolute right-0 mt-2 w-56 bg-[var(--color-accent)] rounded-2xl shadow-lg backdrop-blur-lg border border-gray-700 hidden flex-col overflow-hidden z-50">
      <div class="px-4 py-3 border-b border-gray-700">
        <p class="font-semibold text-white">${userName}</p>
        <p class="text-gray-400 text-sm">${userEmail}</p>
      </div>
      <ul class="flex flex-col bg-[var(--color-accent)] backdrop-blur-lg rounded-2xl shadow-lg border border-gray-700 overflow-hidden w-56">

  <li>
    <a href="perfil.html" class="flex items-center gap-3 px-4 py-3 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 rounded-xl transition-all duration-300">
      👤 Perfil
    </a>
  </li>
  <li>
    <a href="config.html" class="flex items-center gap-3 px-4 py-3 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 rounded-xl transition-all duration-300">
      ⚙️ Configurações
    </a>
  </li>
  <li>
    <a href="login.html" class="flex items-center gap-3 px-4 py-3 text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-xl transition-all duration-300">
      🚪 Sair
    </a>
  </li>
</ul>

    </div>
  `;

  headerContainer.appendChild(userMenuContainer);

  const userMenu = document.getElementById("userMenu");
  const userDropdown = document.getElementById("userDropdown");

  userMenu.addEventListener("click", () => {
    userDropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!userMenuContainer.contains(e.target)) {
      userDropdown.classList.add("hidden");
    }
  });
};
