// Vai guardar todos os itens do carrinho
const itensCarrinho = {}

function addCarrinho(itemNome, itemPreco) {
    // Verifica se o item adicionado já existe no carrinho
    if (itensCarrinho[itemNome]) {
        // A quantidade do produto vai aumentar
        itensCarrinho[itemNome].quantidade++
        // O preço vai aumentar
        itensCarrinho[itemNome].precoTotal += itemPreco
        // Para mostrar a nova quantidade
        itensCarrinho[itemNome].liItem.querySelector(".quantidade").innerHTML = itensCarrinho[itemNome].quantidade;
        // Para mostrar o novo preço
        itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2)
    } else {
        const liItem = document.createElement("li")
        liItem.innerHTML = `
        <div class="item">
            <span>${itemNome}</span>
            <button class="remove" onclick="removeCarrinho('${itemNome}', ${itemPreco})">-</button>
            <span class="quantidade">1</span>
            <button class="add" onclick="addCarrinho('${itemNome}', ${itemPreco})">+</button>
            <span class="preco-total">R$${itemPreco.toFixed(2)}</span>
        </div>  
        `

        document.getElementById("itens-lista").appendChild(liItem)
        itensCarrinho[itemNome] = {
            quantidade: 1,
            precoTotal: itemPreco,
            liItem: liItem
        }
    }
    // calcula o valor total
    let precoTotal = 0
    for (let itemNome in itensCarrinho) {
        precoTotal += itensCarrinho[itemNome].precoTotal
    }

    // atualiza o valor total
    document.getElementById("preco-total").innerHTML = "Valor Total R$" + precoTotal.toFixed(2)
    updateCarrinho()
}

function removeCarrinho(itemNome, itemPreco) {
    if (itensCarrinho[itemNome]) {
        if (itensCarrinho[itemNome].quantidade > 1) {
            itensCarrinho[itemNome].quantidade--
            itensCarrinho[itemNome].precoTotal -= itemPreco
            itensCarrinho[itemNome].liItem.querySelector(".quantidade").innerHTML = itensCarrinho[itemNome].quantidade
            itensCarrinho[itemNome].liItem.querySelector(".preco-total").innerHTML = "R$" + itensCarrinho[itemNome].precoTotal.toFixed(2)
        } else {
            document.getElementById("itens-lista").removeChild(itensCarrinho[itemNome].liItem)
            delete itensCarrinho[itemNome]
            document.getElementById("preco-total").innerHTML = "Valor Total: R$ 0.00"
        }
        updateCarrinho()
        document.getElementById("preco-total").innerHTML = "Valor Total: R$" + precoTotal.toFixed(2)
        updateCarrinho()
    }
}
function updateCarrinho() {
    let cont = 0;
    for (let item in itensCarrinho) {
        cont += itensCarrinho[item].quantidade;
    }
    document.getElementById("cont-carrinho").innerHTML = cont
}



function limparCarrinho() {
    document.getElementById("itens-lista").innerHTML = ""
    document.getElementById("preco-total").innerHTML = "Valor Total: R$ 0.00"
    for (let itemNome in itensCarrinho) {
        delete itensCarrinho[itemNome]
    }

    updateCarrinho()
}

function toggleCarrinho() {
    const itensCarrinhoDiv = document.getElementById("carrinho-itens")
    if (itensCarrinhoDiv.style.display === "none") {
        itensCarrinhoDiv.style.display = "block"
    } else {
        itensCarrinhoDiv.style.display = "none"
    }
}

function buscarProduto() {
    const buscarInput = document.getElementById("buscar-input");
    const produtos = document.getElementsByClassName("produto");

    const termoBusca = buscarInput.value.toLowerCase();

    for (let i = 0; i < produtos.length; i++) {
        const produtoNome = produtos[i].querySelector("h3").innerText.toLowerCase();

        if (produtoNome.includes(termoBusca)) {
            produtos[i].style.display = "block";
        } else {
            produtos[i].style.display = "none";
        }
    }
}

  