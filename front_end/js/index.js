/* ============================================================
   PERMISSÕES (EMBUTIDAS – SEM FETCH)
   (Mantido exatamente como estava)
============================================================ */

const PERMISSIONS_DATA = {
    usuarios: [
        { user: "admin", pass: "123", permissoes: ["op", "estoque", "corte", "compras"] },
        { user: "pcp", pass: "2025", permissoes: ["op", "corte"] },
        { user: "almox", pass: "abc", permissoes: ["estoque", "compras"] },
        { user: "visitante", pass: "000", permissoes: [] }
    ]
};


/* ============================================================
   MENU BUBBLE (dropdown ao clicar)
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    // Evita erro no login.html (não tem menu)
    if (!document.querySelector("nav")) return;

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        const button = item.querySelector(".menu-btn");
        const submenu = item.querySelector(".submenu-bubble");

        if (!button || !submenu) return;

        button.addEventListener("click", function (e) {
            e.stopPropagation();

            document.querySelectorAll(".submenu-bubble").forEach(other => {
                if (other !== submenu) other.style.display = "none";
            });

            document.querySelectorAll(".menu-btn").forEach(btn => {
                if (btn !== button) btn.classList.remove("active");
            });

            const aberto = submenu.style.display === "block";

            if (aberto) {
                submenu.style.display = "none";
                button.classList.remove("active");
            } else {
                submenu.style.display = "block";
                button.classList.add("active");
            }
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".submenu-bubble").forEach(menu => {
            menu.style.display = "none";
        });

        document.querySelectorAll(".menu-btn").forEach(btn => {
            btn.classList.remove("active");
        });
    });
});


/* ============================================================
   SISTEMA DE CARREGAMENTO DE PÁGINAS
============================================================ */

function loadPage(page) {
    const content = document.getElementById("content-area");

    // Evita erro no login.html
    if (!content) return;

    let html = "";

    switch (page) {

        /* === PRODUTOS === */
        case "produtos_list":
            html = `<h2>Lista de Produtos</h2>
                    <p>Aqui ficará a listagem de produtos cadastrados.</p>`;
            break;

        case "produtos_cad":
            html = `<h2>Cadastro de Produto</h2>
                    <p>Formulário para cadastrar novos produtos.</p>`;
            break;

        case "produtos_tipo":
            html = `<h2>Tipos de Produtos</h2>
                    <p>Página para configurar categorias / tipos.</p>`;
            break;

        /* === OBRAS === */
        case "obras_nova":
            html = `<h2>Nova Obra</h2>
                    <p>Formulário de abertura de obra.</p>`;
            break;

        case "obras_consultar":
            html = `<h2>Consultar Obras</h2>
                    <p>Listagem e status das obras registradas.</p>`;
            break;

        /* === ORDENS DE PRODUÇÃO === */
        case "op_nova":
            html = `<h2>Criar Ordem de Produção</h2>
                    <p>Interface para geração de O.P.</p>`;
            break;

        case "op_lista":
            html = `<h2>Lista de O.P</h2>
                    <p>Página para visualizar todas as ordens emitidas.</p>`;
            break;

        /* === ESTOQUE === */
        case "estoque_materiais":
            html = `<h2>Materiais em Estoque</h2>
                    <p>Tabela com os materiais disponíveis.</p>`;
            break;

        case "estoque_critico":
            html = `<h2>Estoque Crítico</h2>
                    <p>Materiais abaixo do nível mínimo.</p>`;
            break;

        case "estoque_hist":
            html = `<h2>Histórico de Movimentações</h2>
                    <p>Entradas e saídas registradas.</p>`;
            break;

        /* === CONTROLE DE CORTE === */
        case "corte_tubos":
            html = `<h2>Controle de Corte – Tubos</h2>
                    <p>Apontamento de cortes e remanescentes.</p>`;
            break;

        case "corte_chapas":
            html = `<h2>Controle de Corte – Chapas</h2>
                    <p>Registro e monitoramento de chapas cortadas.</p>`;
            break;

        case "corte_relatorios":
            html = `<h2>Relatórios de Corte</h2>
                    <p>Exportação de relatórios consolidados.</p>`;
            break;

        /* === COMPRAS === */
        case "compras_necessidades":
            html = `<h2>Necessidades de Compras</h2>
                    <p>Materiais que precisam ser repostos.</p>`;
            break;

        case "compras_pedidos":
            html = `<h2>Pedidos de Compras</h2>
                    <p>Listagem de pedidos realizados.</p>`;
            break;

        case "compras_forn":
            html = `<h2>Fornecedores</h2>
                    <p>Cadastro e controle de fornecedores.</p>`;
            break;

        /* === DEFAULT === */
        default:
            html = `<h2>JPL Metalúrgica – Sistema Interno</h2>
                    <p>Dashboard inicial (em construção).</p>`;
    }

    content.innerHTML = html;
}


/* ============================================================
   CORREÇÃO DO HEADER EM CASO DE ZOOM
============================================================ */

function fixHeaderZoom() {
    const header = document.querySelector("header");
    if (!header) return;

    const zoom = window.devicePixelRatio || 1;
    header.style.transform = `scale(${1 / zoom})`;
    header.style.transformOrigin = "top left";
    header.style.width = `${100 * zoom}%`;
}

window.addEventListener("resize", fixHeaderZoom);
window.addEventListener("load", fixHeaderZoom);


/* ============================================================
   AJUSTE DE ESPAÇO ABAIXO DO HEADER
============================================================ */

function ajustarEspacoAbaixoDoHeader() {
    const header = document.querySelector("header");
    if (!header) return;

    const alturaHeader = header.getBoundingClientRect().height;

    document.documentElement.style.setProperty(
        "--header-height",
        `${alturaHeader}px`
    );
}

window.addEventListener("load", ajustarEspacoAbaixoDoHeader);
window.addEventListener("resize", ajustarEspacoAbaixoDoHeader);


/* ============================================================
   LOGIN / PERMISSÕES
============================================================ */

function logar() {
    const user = document.getElementById("loginUser")?.value.trim();
    const pass = document.getElementById("loginPass")?.value.trim();
    const msg  = document.getElementById("loginMsg");

    if (!user || !pass) {
        if (msg) {
            msg.innerHTML = "Preencha usuário e senha.";
            msg.style.color = "red";
        }
        return;
    }

    const lista = PERMISSIONS_DATA.usuarios || [];
    const found = lista.find(u => u.user === user && u.pass === pass);

    if (!found) {
        if (msg) {
            msg.innerHTML = "Usuário ou senha incorretos.";
            msg.style.color = "red";
        }
        return;
    }

    localStorage.setItem("usuario_logado", found.user);
    localStorage.setItem("permissoes", JSON.stringify(found.permissoes || []));

    window.location.href = "index.html";
}

function validarAcesso() {
    const path = window.location.pathname.toLowerCase();

    if (path.includes("login.html")) return;

    const user = localStorage.getItem("usuario_logado");

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const permissoes = JSON.parse(localStorage.getItem("permissoes") || "[]");

    document.querySelectorAll(".menu-btn[data-perm]").forEach(btn => {
        const perm = btn.getAttribute("data-perm");

        if (!permissoes.includes(perm)) {
            btn.classList.add("menu-locked");

            const submenu = btn.parentElement.querySelector(".submenu-bubble");
            if (submenu) submenu.remove();
        }
    });
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

window.addEventListener("load", validarAcesso);
