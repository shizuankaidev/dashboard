window.addEventListener("DOMContentLoaded", () => {

  // ======================= SIDEBAR =======================
  function initSidebar() {
    const sidebar = document.getElementById("sidebar");

    Object.assign(sidebar.style, {
      position: "fixed",
      top: "0",
      left: "0",
      height: "100vh",
      width: "20rem",
      transform: "translateX(-100%)",
      transition: "transform 0.3s ease",
      zIndex: "9999",
      backgroundColor: "var(--color-secondary)",
      backdropFilter: "blur(10px)",
      overflowY: "auto"
    });

    sidebar.innerHTML = `
      <div class="sidebar-header flex items-center justify-between p-4 border-b border-gray-700">
        <div class="flex items-center gap-2">
          <div class="user-logo">RH</div>
          <h1 class="text-xl font-semibold">@python-MeuSite</h1>
        </div>
        <button id="closeSidebarBtn" class="close-sidebar text-white rounded-md px-2 py-1 hover:opacity-80">✖</button>
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

    document.getElementById("closeSidebarBtn").addEventListener("click", () => {
      sidebar.style.transform = "translateX(-100%)";
    });

    const menuContainer = document.getElementById("MenuContainer");
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-sidebar text-white rounded-md px-2 py-1 hover:opacity-80";
    toggleBtn.textContent = "☰";
    toggleBtn.style.backgroundColor = "var(--color-primary)";
    menuContainer.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      sidebar.style.transform = sidebar.style.transform === "translateX(0px)" ? "translateX(-100%)" : "translateX(0)";
    });

    const currentPage = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();
    sidebar.querySelectorAll("nav a").forEach(link => {
      const linkPage = link.getAttribute("href").split("/").pop().replace(".html", "").toLowerCase();
      link.classList.toggle("active", linkPage === currentPage);
    });
  }

  // ======================= USER MENU =======================
  function initUserMenu() {
    const header = document.querySelector("header");
    const userName = "Pedro Silva";
    const userEmail = "pedro.silva@email.com";
    const userInitials = userName.split(" ").map(n => n[0]).join("");

    const userMenuContainer = document.createElement("div");
    userMenuContainer.className = "user-menu-container ml-auto relative";
    userMenuContainer.innerHTML = `
      <div id="userMenu" class="user-menu flex items-center gap-2 cursor-pointer select-none">
        <div class="user-initials">${userInitials}</div>
      </div>
      <div id="userDropdown" class="user-dropdown hidden absolute right-0 mt-2 w-48 bg-[var(--color-accent)] rounded-lg shadow-lg z-50">
        <div class="px-4 py-3 border-b border-gray-700">
          <p class="font-semibold text-white">${userName}</p>
          <p class="text-gray-400 text-sm">${userEmail}</p>
        </div>
        <ul class="flex flex-col">
          <li><a href="perfil.html" class="px-4 py-2 hover:bg-[var(--color-primary)] rounded">👤 Perfil</a></li>
          <li><a href="config.html" class="px-4 py-2 hover:bg-[var(--color-primary)] rounded">⚙️ Configurações</a></li>
          <li><a href="pages/login.html" class="px-4 py-2 hover:bg-[var(--color-primary)] rounded">🚪 Sair</a></li>
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

  // ======================= INICIALIZA =======================
  initSidebar();
  initUserMenu();
});
