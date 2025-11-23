// ============================================
// API CLIENT – NEON REST + STACK AUTH
// ============================================

const API_URL = "https://ep-silent-sunset-ae8s7qbr.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1";

// JWT do usuário autenticado (será carregado do localStorage)
function getJWT() {
    return localStorage.getItem("stack_jwt") || "";
}

// ------------------------------------------------------------
// GET genérico (SELECT)
// ------------------------------------------------------------
export async function neonGET(table, params = {}) {
    const token = getJWT();

    const url = new URL(`${API_URL}/${table}`);

    // Adiciona filtros estilo PostgREST
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });

    const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        throw new Error(`Erro GET em ${table}: ${res.status}`);
    }

    return await res.json();
}

// ------------------------------------------------------------
// INSERT genérico (POST)
// ------------------------------------------------------------
export async function neonINSERT(table, data) {
    const token = getJWT();

    const res = await fetch(`${API_URL}/${table}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error(`Erro POST em ${table}: ${res.status}`);
    }

    return await res.json();
}

// ------------------------------------------------------------
// UPDATE genérico (PATCH)
// ------------------------------------------------------------
export async function neonUPDATE(table, filter = {}, data) {
    const token = getJWT();

    const url = new URL(`${API_URL}/${table}`);
    Object.keys(filter).forEach(key => {
        url.searchParams.append(key, filter[key]);
    });

    const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error(`Erro PATCH em ${table}: ${res.status}`);
    }

    return await res.json();
}

// ------------------------------------------------------------
// DELETE genérico (DELETE)
// ------------------------------------------------------------
export async function neonDELETE(table, filter = {}) {
    const token = getJWT();

    const url = new URL(`${API_URL}/${table}`);
    Object.keys(filter).forEach(key => {
        url.searchParams.append(key, filter[key]);
    });

    const res = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error(`Erro DELETE em ${table}: ${res.status}`);
    }

    return await res.json();
}
