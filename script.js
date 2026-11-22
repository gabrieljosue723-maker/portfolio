/*   1. MENU DE NAVEGAÇÃO PARA TELEMÓVEIS */
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-link");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

  document.body.classList.toggle("menu-open", isOpen);
});

navItems.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

/* Fecha o menu ao clicar fora dele. */
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMenu();
  }
});

/* Fecha o menu com a tecla Escape. */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* 2. DESTAQUE DA SECÇÃO ATUAL NA NAVEGAÇÃO */
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");

          navItems.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", isCurrent);
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* 3. BOTÃO VOLTAR AO TOP */
const backToTop = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================================================
   4. ANO AUTOMÁTICO NO RODAPÉ
   ========================================================= */
document.querySelector("#current-year").textContent = new Date().getFullYear();

/* 5. FECHAR MENU SE A JANELA VOLTAR AO TAMANHO DE DESKTOP */
window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});
