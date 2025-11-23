import { neonGET, neonINSERT } from "../api.js";

export async function init() {
    loadProdutos();

    document.getElementById("btnAddProd").addEventListener("click", async () => {
        const nome = prompt("Nome do produto:");
        if (!nome) return;

        await neonINSERT("produtos", { nome });
        loadProdutos();
    });
}

async function loadProdutos() {
    const data = await neonGET("produtos");
    const tbody = document.querySelector("#tblProdutos tbody");
    tbody.innerHTML = "";

    data.forEach(p => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td><button onclick="alert('Futuro: editar')">Editar</button></td>
        `;

        tbody.appendChild(tr);
    });
}
