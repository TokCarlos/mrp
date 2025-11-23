auth.js// ============================================
// AUTH CLIENT – STACK AUTH + FRONT-END MRP
// ============================================

// Dados do seu projeto Stack Auth
const STACK_PROJECT_ID = "f222b83c-8fa8-4478-9e48-07788ec1a1cf";
const STACK_PUBLIC_KEY = "pck_dw10n0zsne82ndgk9j9ecd5rheekhq3vxgkfpygb7krer";

// Endpoints oficiais do Stack Auth
const STACK_BASE = "https://api.stack-auth.com/api/v1";


// ------------------------------------------------------------
// Salvar e carregar JWT
// ------------------------------------------------------------
export function saveJWT(token) {
    localStorage.setItem("stack_jwt", token);
}

export function getJWT() {
    return localStorage.getItem("stack_jwt") || "";
}

export function logout() {
    localStorage.removeItem("stack_jwt");
    window.location.href = "login.html";
}


// ------------------------------------------------------------
// Registrar novo usuário
// ------------------------------------------------------------
export async function registerUser(email, password) {
    const res = await fetch(`${STACK_BASE}/auth/register/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-stack-project-id": STACK_PROJECT_ID,
            "x-stack-publishable-client-key": STACK_PUBLIC_KEY
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    return data;
}


// ------------------------------------------------------------
// Login de usuário
// ------------------------------------------------------------
export async function loginUser(email, password) {
    const res = await fetch(`${STACK_BASE}/auth/login/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-stack-project-id": STACK_PROJECT_ID,
            "x-stack-publishable-client-key": STACK_PUBLIC_KEY
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data?.tokens?.access_token) {
        saveJWT(data.tokens.access_token);
    }

    return data;
}


// ------------------------------------------------------------
// Validar JWT via JWKS (opcional, mas recomendado)
// ------------------------------------------------------------
export async function validateJWT(token) {
    try {
        const res = await fetch(
            `${STACK_BASE}/projects/${STACK_PROJECT_ID}/validate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-stack-project-id": STACK_PROJECT_ID,
                    "x-stack-publishable-client-key": STACK_PUBLIC_KEY
                },
                body: JSON.stringify({ token })
            }
        );

        return await res.json();
    } catch (e) {
        console.error("Erro ao validar JWT:", e);
        return null;
    }
}
