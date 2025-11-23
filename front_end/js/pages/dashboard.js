import { neonGET } from "../api.js";

export function init() {
    carregarKPIs();
    carregarResumo();
}

async function carregarKPIs() {
    const produtos = await count("produtos");
    const processos = await count("processos");
    const estoque = await count("estoque");
    const ordens = await count("ordens");

    document.querySelector("#kpiProdutos .kpi-value").textContent = produtos;
    document.querySelector("#kpiProcessos .kpi-value").textContent = processos;
    document.querySelector("#kpiEstoque .kpi-value").textContent = estoque;
    document.querySelector("#kpiOrdens .kpi-value").textContent = ordens;
}

async function carregarResumo() {
    const tbody = document.getElementById("previewTableBody");

    const categorias = [
        ["Produtos", "produtos"],
        ["Processos", "processos"],
        ["Estoque", "estoque"],
        ["Ordens", "ordens"],
    ];

    tbody.innerHTML = "";

    for (const [nome, tabela] of categorias) {
        const total = await count(tabela);

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${nome}</td>
            <td>${total > 0 ? "Ativo" : "Vazio"}</td>
            <td>${total}</td>
        `;
        tbody.appendChild(tr);
    }
}

async function count(tabela) {
    try {
        const res = await neonGET(tabela, { select: "count(*)" });
        return res[0].count || 0;
    } catch {
        return 0;
    }
}
