// =======================================================
// AUTENTICAÇÃO REAL – STACKAUTH + JPL MRP
// =======================================================

const STACK_PROJECT_ID = "f222b83c-8fa8-4478-9e48-07788ec1a1cf";
const STACK_PUBLIC_KEY = "pck_9gb9q365vq8fstakva7xq8am01ercjn6cx1mj14x86ha8";
const STACK_BASE = "https://api.stack-auth.com/api/v1";

// Salvar token local
export function saveJWT(token) {
    localStorage.setItem("stack_jwt", token);
}

// Recupera o token
export function getJWT() {
    return localStorage.getItem("stack_jwt") || "";
}

// Logout padrão corporativo
export function logout() {
    localStorage.removeItem("stack_jwt");
    window.location.href = "login.html";
}

// Login REAL via StackAuth
export async function loginUser(email, password) {
    const payload = { email, password };

    const res = await fetch(`${STACK_BASE}/auth/login/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-stack-project-id": STACK_PROJECT_ID,
            "x-stack-publishable-client-key": STACK_PUBLIC_KEY,
            "x-stack-access-type": "client"
        },
        body: JSON.stringify(payload)
    });

    let data = {};
    try { data = await res.json(); } catch (e) {}

    if (data?.tokens?.access_token) {
        saveJWT(data.tokens.access_token);
    }

    return data;
}
