// ============================================
// PRODUTOS – MÓDULO SPA (CRUD COMPLETO)
// ============================================

import { neonGET, neonINSERT, neonUPDATE, neonDELETE } from "../api.js";

// --------------------------------------------
// Função de inicialização chamada pelo SPA
// --------------------------------------------
export function init() {
    configurarEventos();
    carregarProdutos();
}

// --------------------------------------------
// Configurar botões do módulo
// --------------------------------------------
function configurarEventos() {
    const btnNovo = document.getElementById("btnNovoProduto");
    const btnSalvar = document.getElementById("btnSalvar");
    const btnCancelar = document.getElementById("btnCancelar");

    if (btnNovo) btnNovo.addEventListener("click", abrirNovo);
    if (btnSalvar) btnSalvar.addEventListener("click", salvarProduto);
    if (btnCancelar) btnCancelar.addEventListener("click", fecharModal);
}

// --------------------------------------------
// LISTAGEM
// --------------------------------------------
async function carregarProdutos() {
    const tbody = document.getElementById("tabelaProdutos");
    if (!tbody) return;

    tbody.innerHTML = "";

    try {
        const dados = await neonGET("produtos");

        dados.forEach(prod => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${prod.id}</td>
                <td>${prod.cod}</td>
                <td>${prod.nome}</td>
                <td>${prod.tipo ?? "-"}</td>
                <td>${prod.modelo ?? "-"}</td>
                <td>
                    <button class="btn-edit" data-id="${prod.id}" data-cod="${prod.cod}" 
                            data-nome="${prod.nome}" data-tipo="${prod.tipo ?? ""}" 
                            data-modelo="${prod.modelo ?? ""}">
                        Editar
                    </button>

                    <button class="btn-del" data-id="${prod.id}">
                        Excluir
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        // Eventos dos botões dentro da tabela
        tbody.querySelectorAll(".btn-edit").forEach(btn => {
            btn.addEventListener("click", () => {
                editarProduto(
                    btn.dataset.id,
                    btn.dataset.cod,
                    btn.dataset.nome,
                    btn.dataset.tipo,
                    btn.dataset.modelo
                );
            });
        });

        tbody.querySelectorAll(".btn-del").forEach(btn => {
            btn.addEventListener("click", () => excluirProduto(btn.dataset.id));
        });

    } catch (e) {
        console.error("Erro ao carregar produtos:", e);
    }
}

// --------------------------------------------
// NOVO PRODUTO
// --------------------------------------------
function abrirNovo() {
    document.getElementById("modalTitulo").textContent = "Novo Produto";
    document.getElementById("prodId").value = "";
    document.getElementById("prodCod").value = "";
    document.getElementById("prodNome").value = "";
    document.getElementById("prodTipo").value = "";
    document.getElementById("prodModelo").value = "";

    abrirModal();
}

// --------------------------------------------
// EDITAR PRODUTO
// --------------------------------------------
function editarProduto(id, cod, nome, tipo, modelo) {
    document.getElementById("modalTitulo").textContent = "Editar Produto";

    document.getElementById("prodId").value = id;
    document.getElementById("prodCod").value = cod;
    document.getElementById("prodNome").value = nome;
    document.getElementById("prodTipo").value = tipo;
    document.getElementById("prodModelo").value = modelo;

    abrirModal();
}

// --------------------------------------------
// SALVAR (INSERT ou UPDATE)
// --------------------------------------------
async function salvarProduto() {
    const id = document.getElementById("prodId").value;
    const cod = document.getElementById("prodCod").value.trim();
    const nome = document.getElementById("prodNome").value.trim();
    const tipo = document.getElementById("prodTipo").value.trim();
    const modelo = document.getElementById("prodModelo").value.trim();

    if (!cod || !nome) {
        alert("Código e Nome são obrigatórios.");
        return;
    }

    try {
        if (id) {
            await neonUPDATE("produtos", { id: `eq.${id}` }, { cod, nome, tipo, modelo });
        } else {
            await neonINSERT("produtos", { cod, nome, tipo, modelo });
        }
    } catch (e) {
        alert("Erro ao salvar: " + e.message);
        console.error(e);
    }

    fecharModal();
    carregarProdutos();
}

// --------------------------------------------
// EXCLUIR
// --------------------------------------------
async function excluirProduto(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
        await neonDELETE("produtos", { id: `eq.${id}` });
    } catch (e) {
        alert("Erro ao excluir: " + e.message);
        console.error(e);
    }

    carregarProdutos();
}

// --------------------------------------------
// MODAL
// --------------------------------------------
function abrirModal() {
    document.getElementById("modalProduto").classList.remove("hidden");
}
function fecharModal() {
    document.getElementById("modalProduto").classList.add("hidden");
}
