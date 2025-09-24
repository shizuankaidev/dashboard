window.addEventListener("DOMContentLoaded", () => {

  // ======================= SIDEBAR =======================
  function initSidebar() {
    const sidebar = document.getElementById("sidebar");

    // Estilo base do sidebar
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

    // Conteúdo do sidebar
    sidebar.innerHTML = `
      <div class="sidebar-header flex items-center justify-between p-4 border-b border-gray-700">
        <div class="flex items-center gap-2">
          <img src="../assets/logo.svg" style="width: 64px;">
          <h1 class="text-xl font-semibold">@python-MeuSite</h1>
        </div>
        <button id="closeSidebarBtn" class="close-sidebar bg-[var(--color-primary)] text-[var(--color-text)] rounded-md px-2 py-1 hover:opacity-80">✖</button>
      </div>
      <nav class="flex-1 px-4 py-6">
        <ul class="space-y-3">
          <li><a href="../index.html">📊 Dashboard</a></li>
          <li><a href="/pages/relatorios.html">📑 Relatórios</a></li>
          <li class=""><a href="/pages/analytics.html">📈 Analytics</a></li>
          <li><a href="/pages/funcionarios.html">👥 Usuários</a></li>
          <li><a href="/pages/config.html">⚙️ Configurações</a></li>
        </ul>
      </nav>
    `;

    // Botão fechar
    document.getElementById("closeSidebarBtn").addEventListener("click", () => {
      sidebar.style.transform = "translateX(-100%)";
    });

    // Botão abrir (hamburguer)
    const menuContainer = document.getElementById("MenuContainer");
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "toggle-sidebar text-white rounded-md px-2 py-1 hover:opacity-80";
    toggleBtn.textContent = "☰";
    toggleBtn.style.backgroundColor = "var(--color-primary)";
    menuContainer.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      sidebar.style.transform =
        sidebar.style.transform === "translateX(0px)"
          ? "translateX(-100%)"
          : "translateX(0)";
    });

    // Página ativa
    let currentPage = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();

    // se não tiver nada no path (tipo quando a URL termina com "/"), forçar para "index"
    if (currentPage === "" || currentPage === "index") {
      currentPage = "index";
    }
    console.log(currentPage)

    sidebar.querySelectorAll("nav a").forEach(link => {
      let linkPage = link.getAttribute("href").split("/").pop().replace(".html", "").toLowerCase();

      // Tratamento especial para o Dashboard
      if (linkPage === "index" && currentPage === "index") {
        link.classList.add("active");
      } else if (linkPage === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // ======================= USER MENU =======================
  function initUserMenu() {
    const header = document.querySelector("header");

    // Dados do usuário
    const userName = "Pedro Silva";
    const userEmail = "pedro.silva@email.com";
    const userInitials = userName.split(" ").map(n => n[0]).join("");

    // Verifica se está na index ou em outra página
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();
    const isIndex = (currentPage === "" || currentPage === "index");

    // Define os caminhos corretos
    const basePath = isIndex ? "pages/" : "../pages/";

    // Estrutura do menu
    const userMenuContainer = document.createElement("div");
    userMenuContainer.className = "user-menu-container ml-auto relative";
    userMenuContainer.innerHTML = `
      <div id="userMenu" class="cursor-pointer">
        <div class="user-initials bg-[var(--color-primary)] text-[var(--color-text)] rounded-full w-10 h-10 flex items-center justify-center">
          ${userInitials}
        </div>
      </div>
      <div id="userDropdown" class="user-dropdown hidden absolute right-0 mt-2 w-48 bg-[var(--color-accent)] rounded-lg shadow-lg z-50">
        <div class="px-4 py-3 border-b border-gray-700">
          <p class="font-semibold text-[var(--color-text)]">${userName}</p>
          <p class="text-[var(--color-text)] text-sm">${userEmail}</p>
        </div>
        <ul class="flex flex-col">
          <li><a href="${basePath}perfil.html" class="px-4 py-2 hover:bg-[var(--color-primary)] rounded">👤 Perfil</a></li>
          <li><a href="${basePath}config.html" class="px-4 py-2 hover:bg-[var(--color-primary)] rounded">⚙️ Configurações</a></li>
          <li><a href="${basePath}login.html" class="px-4 py-2 hover:bg-[var(--color-primary)] rounded">🚪 Sair</a></li>
        </ul>
      </div>
    `;
    header.appendChild(userMenuContainer);

    const userMenu = document.getElementById("userMenu");
    const userDropdown = document.getElementById("userDropdown");

    // Toggle dropdown
    userMenu.addEventListener("click", () => {
      userDropdown.classList.toggle("hidden");
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener("click", e => {
      if (!userMenuContainer.contains(e.target)) {
        userDropdown.classList.add("hidden");
      }
    });
  }

  // ======================= FOOTER =======================
  function initFooter() {
    const footer = document.querySelector("footer");

    footer.classList.add("bg-[var(--color-primary)]", "text-[var(--color-text-Dackground)]", "mt-auto", "w-full");

    footer.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <!-- Logo e Empresa -->
        <div class="flex items-center gap-4">
          <img src="../assets/logo.svg" alt="Logo" class="w-16 h-16 rounded-lg shadow-lg">
          <div>
            <p class="font-bold text-lg">@python-MeuSite Inc.</p>
            <p class="text-sm">Rua Fictícia, 123 - São Paulo</p>
          </div>
        </div>

        <!-- Contato -->
        <div class="text-center md:text-left">
          <p class="text-sm">📞 (11) 98765-4321 | ✉️ contato@python-MeuSite.com</p>
          <p class="text-xs">ID: 12.345.678/0001-99</p>
        </div>

        <!-- Redes Sociais -->
        <div class="flex gap-4">
          <a href="#" class="hover:text-[var(--color-primary)] transition font-semibold">Facebook</a>
          <a href="#" class="hover:text-[var(--color-primary)] transition font-semibold">Twitter</a>
          <a href="#" class="hover:text-[var(--color-primary)] transition font-semibold">LinkedIn</a>
        </div>
      </div>

      <div class="bg-[var(--color-primary)] text-[var(--color-text)] text-lg text-center py-4">
        &copy; 2025 @python-MeuSite Inc. Todos os direitos reservados.
      </div>
    `;
  }

  // Inicializa o footer quando a página carrega
  window.addEventListener("DOMContentLoaded", initFooter);


  // ======================= INICIALIZA =======================
  initSidebar();
  initUserMenu();
  initFooter();
});
