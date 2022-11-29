const form = document.getElementById('formulario');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach(element => {
    criarItem(element);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];
    const existe = itens.find(element => element.nome === nome.value);
    
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaQuantidade(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criarItem(itemAtual);
        
        itens.push(itemAtual);
    };

    localStorage.setItem('itens', JSON.stringify(itens));
    
    nome.value = '';
    quantidade.value = '';
});

function criarItem(item) {
    const li = document.createElement('li');
    const strong = document.createElement('strong');

    strong.innerHTML = item['quantidade'];
    strong.dataset.id = item['id'];

    li.classList.add('item');
    li.appendChild(strong);
    li.innerHTML += item['nome'];
    li.appendChild(botaoDeleta(item['id']));

    lista.appendChild(li);
};

function atualizaQuantidade(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
};

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function() {
        deletaItem(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaItem(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);
    
    localStorage.setItem('itens', JSON.stringify(itens));
}