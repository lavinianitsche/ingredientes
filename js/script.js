// esperar liberação do norberto
// array - ingredientesDisponiveis
// string ingrediteProcurado

let ingredientes = [];

function cadastrar() {

    const nome = document.getElementById('nomeIngrediente');
    let name = nome.value.trim();
    
    if (name === "" || name.length < 3) {
        mensagem('crud', name === "" ? "erro: nome não pode estar vazio" : "erro: nome deve ter no mínimo 3 letras", 'error');
        nome.focus();
        nome.value = "";
        
        return;
        
    } else {
        mensagem('crud', `ingrediente ${name} cadastrado com sucesso`, 'success')
        console.log(name);
        nome.value = "";

        return;
    }

    
    // ingredientes[indice] = nome;
    // console.log(`ingrediente: ${nome} cadastrado no índice ${indice} com sucesso`)
    
    
    // ingredientes = document.getElementById('nomeIngrediente').value.trim();
    // console.log(ingredientes);
    
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
