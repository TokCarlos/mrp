// =======================================================
// SEGURANÇA – BLOQUEIO DE ACESSO E VALIDAÇÃO DE TOKEN
// =======================================================

import { getJWT, logout } from "./auth.js";

async function validateAccess() {

    const token = getJWT();
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        if (!payload.exp || payload.exp * 1000 < Date.now()) {
            logout();
        }

    } catch (e) {
        logout();
    }
}

validateAccess();

export {};
