// =============================================
// SPA ENGINE – Loader de Módulos MRP JPL
// =============================================

import { logout } from "./auth.js";

const app = document.getElementById("app");

// ---------------------------------------------
// Evento do botão de logout
// ---------------------------------------------
document.getElementById("btnLogout").addEventListener("click", logout);

// ---------------------------------------------
// Carrega módulo inicial (dashboard)
// ---------------------------------------------
loadModule("dashboard");

// ---------------------------------------------
// Listener para os menus
// ---------------------------------------------
document.querySelectorAll("nav.menu a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const module = link.dataset.module;
        if (module) loadModule(module);
    });
});

// ---------------------------------------------
// Função principal para carregar módulos
// ---------------------------------------------
async function loadModule(moduleName) {
    try {
        // Carrega HTML
        const htmlResp = await fetch(`pages/${moduleName}.html`);
        const html = await htmlResp.text();
        app.innerHTML = html;

        // Carrega JS
        import(`./pages/${moduleName}.js`)
            .then(module => {
                if (module.init) module.init();
            })
            .catch(err => {
                console.warn("Módulo sem JS específico:", moduleName);
            });

    } catch (err) {
        console.error("Erro ao carregar módulo:", moduleName, err);
        app.innerHTML = `<p>Erro ao carregar módulo: ${moduleName}</p>`;
    }
}
