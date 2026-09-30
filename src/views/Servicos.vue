<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Serviços</h1>
        <p class="subtitle">
          Cadastre e gerencie os serviços oferecidos.
        </p>
      </div>

      <button class="btn" @click="abrirNovoServico">
        + Novo serviço
      </button>
    </div>

    <!-- PESQUISA -->
    <div class="search-box">
      <input
        v-model="busca"
        type="text"
        placeholder="Pesquisar serviço..."
      />
    </div>

    <!-- SERVIÇOS -->
    <div class="service-grid">

      <div
        v-for="servico in servicosFiltrados"
        :key="servico.id"
        class="service-card"
      >
        <div class="service-card-header">
          <div class="service-icon">
            🔧
          </div>

          <div class="service-actions">
            <button
              class="icon-button"
              title="Editar"
              @click="editarServico(servico)"
            >
              ✏️
            </button>

            <button
              class="icon-button delete-icon"
              title="Excluir"
              @click="excluirServico(servico.id)"
            >
              🗑️
            </button>
          </div>
        </div>

        <h3>{{ servico.nome }}</h3>

        <p class="service-description">
          {{ servico.descricao || 'Sem descrição cadastrada.' }}
        </p>

        <div class="service-info">
          <span>
            ⏱️ {{ servico.duracao }} min
          </span>

          <strong>
            {{ formatarPreco(servico.preco) }}
          </strong>
        </div>
      </div>

    </div>

    <div
      v-if="servicosFiltrados.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">🔧</div>

      <h3>Nenhum serviço encontrado</h3>

      <p>
        Cadastre seu primeiro serviço para começar.
      </p>
    </div>

    <!-- MODAL -->
    <Modal
      :show="modalAberto"
      :title="modoEdicao ? 'Editar serviço' : 'Novo serviço'"
      @close="fecharModal"
    >
      <form @submit.prevent="salvarServico">

        <div class="form-group">
          <label>Nome do serviço *</label>

          <input
            v-model="form.nome"
            type="text"
            placeholder="Ex.: Corte de cabelo"
          />

          <small v-if="erros.nome">
            {{ erros.nome }}
          </small>
        </div>

        <div class="form-group">
          <label>Descrição</label>

          <textarea
            v-model="form.descricao"
            rows="3"
            placeholder="Descrição do serviço"
          ></textarea>
        </div>

        <div class="form-row">

          <div class="form-group">
            <label>Preço *</label>

            <input
              v-model="form.preco"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
            />

            <small v-if="erros.preco">
              {{ erros.preco }}
            </small>
          </div>

          <div class="form-group">
            <label>Duração (minutos) *</label>

            <input
              v-model="form.duracao"
              type="number"
              min="1"
              placeholder="60"
            />

            <small v-if="erros.duracao">
              {{ erros.duracao }}
            </small>
          </div>

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
            {{ modoEdicao ? 'Salvar alterações' : 'Cadastrar serviço' }}
          </button>
        </div>

      </form>
    </Modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Modal from '../components/Modal.vue'

const servicos = ref([])
const busca = ref('')
const modalAberto = ref(false)
const modoEdicao = ref(false)

const form = reactive({
  id: null,
  nome: '',
  descricao: '',
  preco: '',
  duracao: ''
})

const erros = reactive({
  nome: '',
  preco: '',
  duracao: ''
})

onMounted(() => {
  const dados = localStorage.getItem('servicos')

  if (dados) {
    servicos.value = JSON.parse(dados)
  }
})

const servicosFiltrados = computed(() => {
  const termo = busca.value.toLowerCase()

  return servicos.value.filter(servico =>
    servico.nome.toLowerCase().includes(termo)
  )
})

function abrirNovoServico() {
  limparFormulario()

  modoEdicao.value = false
  modalAberto.value = true
}

function editarServico(servico) {
  form.id = servico.id
  form.nome = servico.nome
  form.descricao = servico.descricao
  form.preco = servico.preco
  form.duracao = servico.duracao

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
  form.descricao = ''
  form.preco = ''
  form.duracao = ''

  limparErros()
}

function limparErros() {
  erros.nome = ''
  erros.preco = ''
  erros.duracao = ''
}

function validarFormulario() {
  limparErros()

  let valido = true

  if (!form.nome.trim()) {
    erros.nome = 'O nome do serviço é obrigatório.'
    valido = false
  }

  if (
    form.preco === '' ||
    Number(form.preco) < 0
  ) {
    erros.preco = 'Informe um preço válido.'
    valido = false
  }

  if (
    form.duracao === '' ||
    Number(form.duracao) <= 0
  ) {
    erros.duracao = 'Informe uma duração válida.'
    valido = false
  }

  return valido
}

function salvarServico() {
  if (!validarFormulario()) {
    return
  }

  const dados = {
    id: form.id || Date.now(),
    nome: form.nome.trim(),
    descricao: form.descricao.trim(),
    preco: Number(form.preco),
    duracao: Number(form.duracao)
  }

  if (modoEdicao.value) {
    const index = servicos.value.findIndex(
      servico => servico.id === form.id
    )

    if (index !== -1) {
      servicos.value[index] = dados
    }
  } else {
    servicos.value.push(dados)
  }

  salvarNoStorage()
  fecharModal()
}

function excluirServico(id) {
  const confirmar = confirm(
    'Tem certeza que deseja excluir este serviço?'
  )

  if (!confirmar) {
    return
  }

  servicos.value = servicos.value.filter(
    servico => servico.id !== id
  )

  salvarNoStorage()
}

function salvarNoStorage() {
  localStorage.setItem(
    'servicos',
    JSON.stringify(servicos.value)
  )
}

function formatarPreco(preco) {
  return Number(preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
</script>