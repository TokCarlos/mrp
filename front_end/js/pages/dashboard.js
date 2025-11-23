import { neonGET } from "../api.js";

export async function init() {

    const produtos = await neonGET("produtos");
    const ordens = await neonGET("ordens_producao");
    const estoque = await neonGET("estoque");

    document.getElementById("kpi-produtos").innerText = produtos.length;
    document.getElementById("kpi-ordens").innerText = ordens.length;
    document.getElementById("kpi-estoque").innerText = estoque.length;
}
