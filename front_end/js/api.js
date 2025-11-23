// =======================================================
// API REAL – NEON REST
// =======================================================

import { getJWT } from "./auth.js";

const API_URL = "https://ep-silent-sunset-ae8s7qbr.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1";

// SELECT
export async function neonGET(table, params = {}) {
    const token = getJWT();
    const url = new URL(`${API_URL}/${table}`);

    Object.keys(params).forEach(k => url.searchParams.append(k, params[k]));

    const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    return await res.json();
}

// INSERT
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

    return await res.json();
}
