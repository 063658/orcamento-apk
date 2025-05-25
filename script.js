function salvarOrcamento(event) {
  event.preventDefault();

  const orcamento = {
    nome: document.getElementById('nome').value,
    endereco: document.getElementById('endereco').value,
    tipo: document.getElementById('tipo').value,
    descricao: document.getElementById('descricao').value,
    valor: document.getElementById('valor').value,
    id: Date.now()
  };

  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
  orcamentos.push(orcamento);
  localStorage.setItem('orcamentos', JSON.stringify(orcamentos));

  document.getElementById('form-orcamento').reset();
  mostrarOrcamentos();
}

function mostrarOrcamentos() {
  const lista = document.getElementById('lista-orcamentos');
  lista.innerHTML = '';
  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];

  orcamentos.forEach(o => {
    const div = document.createElement('div');
    div.className = 'orcamento';
    div.innerHTML = `
      <p><strong>Nome:</strong> ${o.nome}</p>
      <p><strong>Endereço:</strong> ${o.endereco}</p>
      <p><strong>Tipo:</strong> ${o.tipo}</p>
      <p><strong>Descrição:</strong> ${o.descricao}</p>
      <p><strong>Valor:</strong> ${o.valor}</p>
      <button onclick="excluirOrcamento(${o.id})">Excluir</button>
      <button class="editar" onclick="editarOrcamento(${o.id})">Editar</button>
    `;
    lista.appendChild(div);
  });
}

function excluirOrcamento(id) {
  let orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
  orcamentos = orcamentos.filter(o => o.id !== id);
  localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
  mostrarOrcamentos();
}

function editarOrcamento(id) {
  const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
  const orcamento = orcamentos.find(o => o.id === id);

  if (orcamento) {
    document.getElementById('nome').value = orcamento.nome;
    document.getElementById('endereco').value = orcamento.endereco;
    document.getElementById('tipo').value = orcamento.tipo;
    document.getElementById('descricao').value = orcamento.descricao;
    document.getElementById('valor').value = orcamento.valor;

    excluirOrcamento(id);
  }
}

document.getElementById('form-orcamento').addEventListener('submit', salvarOrcamento);
document.addEventListener('DOMContentLoaded', mostrarOrcamentos);
