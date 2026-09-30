<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Clientes</h1>
        <p class="subtitle">
          Cadastre e gerencie os clientes da empresa.
        </p>
      </div>

      <button class="btn" @click="abrirNovoCliente">
        + Novo cliente
      </button>
    </div>

    <!-- BUSCA -->
    <div class="search-box">
      <input
        v-model="busca"
        type="text"
        placeholder="Pesquisar cliente..."
      />
    </div>

    <!-- TABELA -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="cliente in clientesFiltrados" :key="cliente.id">
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.telefone }}</td>
            <td>{{ cliente.email }}</td>

            <td class="actions">
              <button
                class="btn-edit"
                @click="editarCliente(cliente)"
              >
                Editar
              </button>

              <button
                class="btn-delete"
                @click="excluirCliente(cliente.id)"
              >
                Excluir
              </button>
            </td>
          </tr>

          <tr v-if="clientesFiltrados.length === 0">
            <td colspan="4" class="empty">
              Nenhum cliente encontrado.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <Modal
      :show="modalAberto"
      :title="modoEdicao ? 'Editar cliente' : 'Novo cliente'"
      @close="fecharModal"
    >
      <form @submit.prevent="salvarCliente">

        <div class="form-group">
          <label>Nome *</label>

          <input
            v-model="form.nome"
            type="text"
            placeholder="Digite o nome"
          />

          <small v-if="erros.nome">
            {{ erros.nome }}
          </small>
        </div>

        <div class="form-group">
          <label>Telefone *</label>

          <input
            v-model="form.telefone"
            type="text"
            placeholder="(88) 99999-9999"
          />

          <small v-if="erros.telefone">
            {{ erros.telefone }}
          </small>
        </div>

        <div class="form-group">
          <label>E-mail *</label>

          <input
            v-model="form.email"
            type="email"
            placeholder="cliente@email.com"
          />

          <small v-if="erros.email">
            {{ erros.email }}
          </small>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="fecharModal"
          >
            Cancelar
          </button>

          <button type="submit" class="btn">
            {{ modoEdicao ? 'Salvar alterações' : 'Cadastrar' }}
          </button>
        </div>

      </form>
    </Modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Modal from '../components/Modal.vue'

const clientes = ref([])
const busca = ref('')
const modalAberto = ref(false)
const modoEdicao = ref(false)

const form = reactive({
  id: null,
  nome: '',
  telefone: '',
  email: ''
})

const erros = reactive({
  nome: '',
  telefone: '',
  email: ''
})

onMounted(() => {
  const dados = localStorage.getItem('clientes')

  if (dados) {
    clientes.value = JSON.parse(dados)
  }
})

const clientesFiltrados = computed(() => {
  const termo = busca.value.toLowerCase()

  return clientes.value.filter(cliente =>
    cliente.nome.toLowerCase().includes(termo) ||
    cliente.email.toLowerCase().includes(termo) ||
    cliente.telefone.includes(termo)
  )
})

function abrirNovoCliente() {
  limparFormulario()

  modoEdicao.value = false
  modalAberto.value = true
}

function editarCliente(cliente) {
  form.id = cliente.id
  form.nome = cliente.nome
  form.telefone = cliente.telefone
  form.email = cliente.email

  limparErros()

  modoEdicao.value = true
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  limparFormulario()
}

function limparFormulario() {
  form.id = null
  form.nome = ''
  form.telefone = ''
  form.email = ''

  limparErros()
}

function limparErros() {
  erros.nome = ''
  erros.telefone = ''
  erros.email = ''
}

function validarFormulario() {
  limparErros()

  let valido = true

  if (!form.nome.trim()) {
    erros.nome = 'O nome é obrigatório.'
    valido = false
  }

  if (!form.telefone.trim()) {
    erros.telefone = 'O telefone é obrigatório.'
    valido = false
  } else if (form.telefone.length < 10) {
    erros.telefone = 'Digite um telefone válido.'
    valido = false
  }

  if (!form.email.trim()) {
    erros.email = 'O e-mail é obrigatório.'
    valido = false
  } else if (!form.email.includes('@')) {
    erros.email = 'Digite um e-mail válido.'
    valido = false
  }

  return valido
}

function salvarCliente() {
  if (!validarFormulario()) {
    return
  }

  if (modoEdicao.value) {
    const index = clientes.value.findIndex(
      cliente => cliente.id === form.id
    )

    if (index !== -1) {
      clientes.value[index] = {
        ...form
      }
    }
  } else {
    clientes.value.push({
      id: Date.now(),
      nome: form.nome,
      telefone: form.telefone,
      email: form.email
    })
  }

  salvarNoStorage()

  fecharModal()
}

function excluirCliente(id) {
  const confirmar = confirm(
    'Tem certeza que deseja excluir este cliente?'
  )

  if (!confirmar) {
    return
  }

  clientes.value = clientes.value.filter(
    cliente => cliente.id !== id
  )

  salvarNoStorage()
}

function salvarNoStorage() {
  localStorage.setItem(
    'clientes',
    JSON.stringify(clientes.value)
  )
}
</script>