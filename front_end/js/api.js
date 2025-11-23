const API_URL = "https://ep-silent-sunset-ae8s7qbr.apirest.c-2.us-east-2.aws.neon.tech/neondb/rest/v1";
const API_KEY = "pck_bt1s0jyz134f4sb3baqrcdmksn772mnay9s1bk1fd6g9g";

// JWT do usuário autenticado (não vamos usar login agora)
let JWT = "";

// GET genérico
async function neonGet(table, filter = "") {
    const url = `${API_URL}/${table}${filter}`;
    const headers = {
        "apikey": API_KEY
    };

    if (JWT) headers["Authorization"] = `Bearer ${JWT}`;

    const res = await fetch(url, { headers });
    return res.json();
}

// INSERT genérico
async function neonInsert(table, data) {
    const headers = {
        "apikey": API_KEY,
        "Content-Type": "application/json"
    };

    if (JWT) headers["Authorization"] = `Bearer ${JWT}`;

    const res = await fetch(`${API_URL}/${table}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });

    return res.json();
}
