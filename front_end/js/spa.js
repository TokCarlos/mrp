// =======================================================
// SPA LOADER — CARREGA PÁGINAS E MÓDULOS INTERNOS
// =======================================================

import { logout } from "./auth.js";

const app = document.getElementById("app");

// Botão de logout
document.getElementById("btnLogout").addEventListener("click", logout);

// Eventos do menu superior
document.querySelectorAll("nav.menu a").forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        loadModule(a.dataset.module);
    });
});

// Carrega módulos HTML + JS
async function loadModule(moduleName) {
    try {
        const html = await (await fetch(`pages/${moduleName}.html`)).text();
        app.innerHTML = html;

        try {
            const jsModule = await import(`./pages/${moduleName}.js`);
            if (jsModule.init) jsModule.init();
        } catch (err) {
            console.log("JS opcional não encontrado:", moduleName);
        }

    } catch (e) {
        app.innerHTML = "<p>Erro ao carregar o módulo.</p>";
    }
}

// Módulo inicial
loadModule("dashboard");
