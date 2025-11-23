/* ============================================================
   utils.js – Funções utilitárias globais para o sistema JPL
============================================================ */

/* -------------------------------
   1) LOG DE DEBUG (ligar/desligar)
--------------------------------*/
const DEBUG = true;
function logDebug(tag, data) {
    if (DEBUG) console.log(`[DEBUG] ${tag}:`, data);
}


/* -------------------------------
   2) ALERTA PADRONIZADO (toast)
--------------------------------*/
function toast(msg, tipo = "info") {
    alert(msg); 
    // Futuro: substituir por um toast visual moderno
}


/* -------------------------------
   3) FORMATAÇÃO DE DATAS
--------------------------------*/
function formatarDataISO() {
    return new Date().toISOString().split("T")[0];
}

function formatarDataHora() {
    const d = new Date();
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}


/* -------------------------------
   4) STORAGE – ACESSO SEGURO
--------------------------------*/
function storageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function storageGet(key, fallback = null) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function storageRemove(key) {
    localStorage.removeItem(key);
}


/* -------------------------------
   5) CARREGAR HTML EXTERNO 
      (para páginas internas)
--------------------------------*/
async function loadHTML(targetId, filePath) {
    try {
        const resp = await fetch(filePath);
        const html = await resp.text();
        document.getElementById(targetId).innerHTML = html;
    } catch (err) {
        console.error("Erro ao carregar HTML:", err);
        toast("Erro ao carregar conteúdo.");
    }
}


/* -------------------------------
   6) FETCH SEGURO (para Neon API)
--------------------------------*/
async function apiRequest(url, method = "GET", body = null) {
    const opts = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (body) opts.body = JSON.stringify(body);

    try {
        const resp = await fetch(url, opts);
        if (!resp.ok) throw new Error(`Erro API (${resp.status})`);

        return await resp.json();
    } catch (e) {
        console.error("API ERROR:", e);
        toast("Erro ao consultar servidor.");
        return null;
    }
}


/* -------------------------------
   7) GERAR ID ÚNICO LOCAL
--------------------------------*/
function gerarIdLocal(prefix = "ID") {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}


/* -------------------------------
   8) ROLE / PERMISSÕES (helpers)
--------------------------------*/
function userHasPermission(perm) {
    const permissoes = storageGet("permissoes", []);
    return permissoes.includes(perm);
}
