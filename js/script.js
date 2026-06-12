// esperar liberação do norberto
// array - ingredientesDisponiveis
// string ingrediteProcurado

let ingredientes = [];

function atualizarLista() {
    const listaDiv = document.getElementById('listaIngredientes');
    listaDiv.innerHTML = "";
    
    if (ingredientes.length === 0) {
        listaDiv.innerHTML = '<div style="text-align: center; color: #999;">Nenhum ingrediente cadastrado</div>';
        return;
    }
    
    ingredientes.forEach((ingrediente, indice) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <span>${indice}. ${ingrediente}</span>
            <button onclick="deletarPorIndice(${indice})" style="background: #ff6b6b; padding: 5px 10px; font-size: 0.8rem;">x</button>
        `;
        listaDiv.appendChild(itemDiv);
    });
}

function cadastrar() {

    const nome = document.getElementById('nomeIngrediente');
    let name = nome.value.toLowerCase().trim();
    name = name.replaceAll(" ", "");
    
    if (name === "" || name.length < 3) {
        mensagem('crud', name === "" ? "erro: nome não pode estar vazio" : "erro: nome deve ter no mínimo 3 letras", 'error');
        nome.focus();
        nome.value = "";
        
        return;
        
    } else if (ingredientes.includes(name)) {
        mensagem('crud', `erro: o ingrediente "${name}" já foi cadastrado`, 'error');
        nome.focus();
        return;
    } else {
        ingredientes.push(name);
        let indice = ingredientes.length - 1;
        mensagem('crud', `ingrediente ${name} cadastrado com sucesso no índice ${indice}`, 'success')
        console.log(`nome: ${name}, índice: ${indice}`);
        nome.value = "";
        atualizarLista();

        return;
    }
    
}

function mensagem(tipo, mensagem, status) {
    const elemento = document.getElementById(`mensagem${tipo === 'busca' ? 'Busca' : 'Crud'}`);
    elemento.innerHTML = mensagem;
    elemento.style.background = status === 'success' ? '#c8e6c9' : '#ffcdd2';
    elemento.style.color = status === 'success' ? '#2e7d32' : '#c62828';
    elemento.style.borderLeftColor = status === 'success' ? '#4caf50' : '#f44336';
    
    setTimeout(() => {
        elemento.innerHTML = '';
        elemento.style.background = '#e1f5fe';
        elemento.style.color = '#0277bd';
        elemento.style.borderLeftColor = '#4fc3f7';
    }, 4000);
}