window.addEventListener("DOMContentLoaded", () => {

  function initSidebar() {
    const sidebar = document.getElementById("sidebar");

    // Conteúdo da sidebar
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="flex items-center gap-2">
          <div class="user-logo">RH</div>
          <h1 class="text-xl font-semibold">@python-MeuSite</h1>
        </div>
        <button id="closeSidebarBtn" class="close-sidebar text-white rounded-md px-2 py-1 transition-colors duration-200 hover:opacity-80">✖</button>
      </div>
      <nav class="flex-1 px-4 py-6">
        <ul class="space-y-3">
          <li><a href="../index.html">📊 Dashboard</a></li>
          <li><a href="/pages/relatorios.html">📑 Relatórios</a></li>
          <li><a href="/pages/analytics.html">📈 Analytics</a></li>
          <li><a href="/pages/funcionarios.html">👥 Usuários</a></li>
          <li><a href="/pages/config.html">⚙️ Configurações</a></li>
        </ul>
      </nav>
    `;

    const closeBtn = document.getElementById("closeSidebarBtn");
    closeBtn.style.backgroundColor = "var(--color-primary)";

    // Sidebar sempre visível no desktop
    if (window.innerWidth >= 768) sidebar.classList.add("show");

    // Links ativos
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();
    sidebar.querySelectorAll("nav a").forEach(link => {
      const linkPage = link.getAttribute("href").split("/").pop().replace(".html", "").toLowerCase();
      link.classList.toggle("active", linkPage === currentPage);
    });

    // Toggle mobile
    const menuContainer = document.getElementById("MenuContainer");
    const oldToggle = menuContainer.querySelector(".toggle-sidebar");
    if (oldToggle) oldToggle.remove();

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-sidebar  text-white rounded-md px-2 py-1 transition-colors duration-200 hover:opacity-80";
    toggleBtn.textContent = "☰";
    toggleBtn.style.backgroundColor = "var(--color-primary)";
    menuContainer.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => sidebar.classList.toggle("show"));
    closeBtn.addEventListener("click", () => sidebar.classList.remove("show"));

    // Atualiza sidebar ao redimensionar
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) sidebar.classList.add("show");
      else sidebar.classList.remove("show");
    });
  }

  function initUserMenu() {
    const header = document.querySelector("header");
    const userName = "Pedro Silva";
    const userEmail = "pedro.silva@email.com";
    const userInitials = userName.split(" ").map(n => n[0]).join("");

    // Remove menu antigo se existir
    const oldMenu = header.querySelector(".user-menu-container");
    if (oldMenu) oldMenu.remove();

    const userMenuContainer = document.createElement("div");
    userMenuContainer.className = "user-menu-container ml-auto relative";
    userMenuContainer.innerHTML = `
      <div id="userMenu" class="user-menu flex items-center gap-2 cursor-pointer select-none">
        <div class="user-initials">${userInitials}</div>
      </div>
      <div id="userDropdown" class="user-dropdown hidden">
        <div class="px-4 py-3 border-b">
          <p class="font-semibold text-white">${userName}</p>
          <p class="text-gray-400 text-sm">${userEmail}</p>
        </div>
        <ul class="flex flex-col">
          <li><a href="perfil.html">👤 Perfil</a></li>
          <li><a href="config.html">⚙️ Configurações</a></li>
          <li><a href="pages/login.html">🚪 Sair</a></li>
        </ul>
      </div>
    `;
    header.appendChild(userMenuContainer);

    const userMenu = document.getElementById("userMenu");
    const userDropdown = document.getElementById("userDropdown");

    userMenu.addEventListener("click", () => userDropdown.classList.toggle("show"));
    document.addEventListener("click", e => {
      if (!userMenuContainer.contains(e.target)) userDropdown.classList.remove("show");
    });
  }

  // Inicializa sidebar e menu do usuário
  initSidebar();
  initUserMenu();
});
