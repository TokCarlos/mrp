// ============================================
// SECURITY – PROTEGE PÁGINAS INTERNAS DO MRP
// ============================================

import { getJWT, logout } from "./auth.js";

async function validateAccess() {
    const token = getJWT();

    if (!token || token.trim() === "") {
        console.warn("Nenhum JWT encontrado. Redirecionando para login.");
        window.location.href = "login.html";
        return;
    }

    let payload = {};
    try {
        payload = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        console.error("JWT inválido:", e);
        logout();
        return;
    }

    if (payload.exp && (payload.exp * 1000) < Date.now()) {
        console.warn("JWT expirado. Fazendo logout.");
        logout();
        return;
    }

    if (payload.role !== "admin") {
        console.warn("Acesso negado: usuário não é admin.");
        window.location.href = "acesso_negado.html";
        return;
    }

    console.log("Acesso permitido →", payload.email);
}

validateAccess();
