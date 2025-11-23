// ============================================
// AUTH CLIENT – STACK AUTH + FRONT-END MRP
// ============================================

// Dados do seu projeto Stack Auth
const STACK_PROJECT_ID = "f222b83c-8fa8-4478-9e48-07788ec1a1cf";
const STACK_PUBLIC_KEY = "pck_dw10n0zsne82ndgk9j9ecd5rheekhq3vxgkfpygb7krer";

// Endpoint base
const STACK_BASE = "https://api.stack-auth.com/api/v1";


// ------------------------------------------------------------
// JWT STORAGE
// ------------------------------------------------------------
export function saveJWT(token) {
    if (!token) return;
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
// Registrar usuário (não será usado agora, mas mantemos ok)
// ------------------------------------------------------------
export async function registerUser(email, password) {
    email = (email || "").trim();
    password = (password || "").trim();

    const res = await fetch(`${STACK_BASE}/auth/register/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-stack-project-id": STACK_PROJECT_ID,
            "x-stack-publishable-client-key": STACK_PUBLIC_KEY
        },
        body: JSON.stringify({ email, password })
    });

    let data = {};
    try { data = await res.json(); } catch {}

    return data;
}


// ------------------------------------------------------------
// Login do usuário
// ------------------------------------------------------------
export async function loginUser(email, password) {
    email = (email || "").trim();
    password = (password || "").trim();

    const res = await fetch(`${STACK_BASE}/auth/login/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-stack-project-id": STACK_PROJECT_ID,
            "x-stack-publishable-client-key": STACK_PUBLIC_KEY
        },
        body: JSON.stringify({ email, password })
    });

    let data = {};
    try { data = await res.json(); } catch {}

    // Salva token se existir
    if (data?.tokens?.access_token) {
        saveJWT(data.tokens.access_token);
    }

    return data;
}


// ------------------------------------------------------------
// Validação de JWT (servidor)
// ------------------------------------------------------------
export async function validateJWT(token) {
    if (!token) return null;

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

        let data = {};
        try { data = await res.json(); } catch {}

        return data;
    } catch (e) {
        console.error("Erro ao validar JWT:", e);
        return null;
    }
}
