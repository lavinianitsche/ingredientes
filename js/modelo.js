// Array para armazenar os ingredientes
let ingredientes = [];

// Função para atualizar a lista exibida na tela
function atualizarLista() {
    const listaDiv = document.getElementById('listaIngredientes');
    listaDiv.innerHTML = '';
    
    if (ingredientes.length === 0) {
        listaDiv.innerHTML = '<div style="text-align: center; color: #999;">Nenhum ingrediente cadastrado</div>';
        return;
    }
    
    ingredientes.forEach((ingrediente, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <span>${index}. ${ingrediente}</span>
            <button onclick="deletarPorIndice(${index})" style="background: #ff6b6b; padding: 5px 10px; font-size: 0.8rem;">✗</button>
        `;
        listaDiv.appendChild(itemDiv);
    });
}

// Função para deletar por índice (usada pelos botões da lista)
function deletarPorIndice(indice) {
    if (indice >= 0 && indice < ingredientes.length) {
        ingredientes.splice(indice, 1);
        atualizarLista();
        mostrarMensagem('crud', `Ingrediente removido com sucesso!`, 'success');
    }
}

// Função para mostrar mensagens
function mostrarMensagem(tipo, mensagem, status) {
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
    }, 3000);
}

// Função principal do exercício: verificar ingrediente (de acordo com o enunciado)
function verificarIngrediente() {
    // Pega os valores diretamente do HTML (já que não posso mudar a chamada)
    const ingredientesDisponiveis = ingredientes;
    const ingredienteProcurado = document.getElementById('buscarIngrediente').value.trim();
    
    if (ingredienteProcurado === '') {
        mostrarMensagem('busca', 'Por favor, digite o nome do ingrediente para verificar', 'error');
        return;
    }
    
    // Converte para minúsculo para busca case-insensitive
    const ingredienteLower = ingredienteProcurado.toLowerCase();
    
    // Procura pelo ingrediente no array (case-insensitive)
    let indiceEncontrado = -1;
    for (let i = 0; i < ingredientesDisponiveis.length; i++) {
        if (ingredientesDisponiveis[i].toLowerCase() === ingredienteLower) {
            indiceEncontrado = i;
            break;
        }
    }
    
    // Se encontrou (índice diferente de -1)
    if (indiceEncontrado !== -1) {
        const mensagem = `Ingrediente encontrado na posição (índice) ${indiceEncontrado}!`;
        mostrarMensagem('busca', `✅ ${mensagem}`, 'success');
    } 
    // Se não encontrou, adiciona ao final da lista
    else {
        ingredientesDisponiveis.push(ingredienteProcurado);
        atualizarLista();
        const mensagem = "Ingrediente não encontrado, adicionado à lista!";
        mostrarMensagem('busca', `📝 ${mensagem}`, 'success');
    }
    
    // Limpa o campo de busca
    document.getElementById('buscarIngrediente').value = '';
}

// Função para cadastrar ingrediente
function cadastrar() {
    const nomeInput = document.getElementById('nomeIngrediente');
    const indiceInput = document.getElementById('indiceIngrediente');
    const nomeIngrediente = nomeInput.value.trim();
    const indiceIngrediente = indiceInput.value.trim();
    
    if (nomeIngrediente === '') {
        mostrarMensagem('crud', 'Por favor, digite o nome do ingrediente para cadastrar', 'error');
        return;
    }
    
    // Verificar se o ingrediente já existe
    const existe = ingredientes.find(ing => ing.toLowerCase() === nomeIngrediente.toLowerCase());
    if (existe) {
        mostrarMensagem('crud', `O ingrediente "${nomeIngrediente}" já está cadastrado!`, 'error');
        nomeInput.value = '';
        indiceInput.value = '';
        return;
    }
    
    // // Se o índice foi fornecido
    // if (indiceIngrediente !== '') {
    //     const indice = parseInt(indiceIngrediente);
    //     if (isNaN(indice) || indice < 0 || indice > ingredientes.length) {
    //         mostrarMensagem('crud', 'Índice inválido! Use um número entre 0 e ' + ingredientes.length, 'error');
    //         return;
    //     }
    //     ingredientes.splice(indice, 0, nomeIngrediente);
    //     mostrarMensagem('crud', `✅ Ingrediente "${nomeIngrediente}" cadastrado no índice ${indice}!`, 'success');
    // } else {
    //     // Adicionar no final
    //     ingredientes.push(nomeIngrediente);
    //     mostrarMensagem('crud', `✅ Ingrediente "${nomeIngrediente}" cadastrado com sucesso!`, 'success');
    // }
    
    nomeInput.value = '';
    indiceInput.value = '';
    atualizarLista();
}

// Função para deletar ingrediente
function deletar() {
    const indiceInput = document.getElementById('indiceIngrediente');
    const indice = parseInt(indiceInput.value.trim());
    
    if (isNaN(indice) || indiceInput.value.trim() === '') {
        mostrarMensagem('crud', 'Por favor, digite o índice do ingrediente para deletar', 'error');
        return;
    }
    
    if (indice < 0 || indice >= ingredientes.length) {
        mostrarMensagem('crud', `Índice inválido! Digite um número entre 0 e ${ingredientes.length - 1}`, 'error');
        indiceInput.value = '';
        return;
    }
    
    const removido = ingredientes.splice(indice, 1);
    mostrarMensagem('crud', `✅ Ingrediente "${removido[0]}" removido com sucesso!`, 'success');
    indiceInput.value = '';
    atualizarLista();
}

// Função para alterar ingrediente (CORRIGIDA - usando o campo indiceNovo)
function alterar() {
    const novoNomeInput = document.getElementById('novoNome');
    const indiceNovoInput = document.getElementById('indiceNovo');
    const novoNome = novoNomeInput.value.trim();
    const indice = parseInt(indiceNovoInput.value.trim());
    
    if (novoNome === '') {
        mostrarMensagem('crud', 'Por favor, digite o novo nome do ingrediente', 'error');
        return;
    }
    
    if (isNaN(indice) || indiceNovoInput.value.trim() === '') {
        mostrarMensagem('crud', 'Por favor, digite o índice do ingrediente para alterar', 'error');
        return;
    }
    
    if (indice < 0 || indice >= ingredientes.length) {
        mostrarMensagem('crud', `Índice inválido! Digite um número entre 0 e ${ingredientes.length - 1}`, 'error');
        indiceNovoInput.value = '';
        return;
    }
    
    // Verificar se o novo nome já existe (exceto se for o mesmo ingrediente)
    const existe = ingredientes.find((ing, i) => i !== indice && ing.toLowerCase() === novoNome.toLowerCase());
    if (existe) {
        mostrarMensagem('crud', `O ingrediente "${novoNome}" já está cadastrado!`, 'error');
        novoNomeInput.value = '';
        indiceNovoInput.value = '';
        return;
    }
    
    const nomeAntigo = ingredientes[indice];
    ingredientes[indice] = novoNome;
    mostrarMensagem('crud', `✅ Ingrediente alterado de "${nomeAntigo}" para "${novoNome}"!`, 'success');
    novoNomeInput.value = '';
    indiceNovoInput.value = '';
    atualizarLista();
}

// Inicializar com alguns ingredientes de exemplo
ingredientes = ['Açúcar', 'Farinha', 'Ovos', 'Leite', 'Manteiga'];
atualizarLista();