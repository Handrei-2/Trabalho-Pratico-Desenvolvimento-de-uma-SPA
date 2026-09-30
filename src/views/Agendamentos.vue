<template>
  <div>
    <div class="page-header">
      <div>
        <h1>Agendamentos</h1>
        <p class="subtitle">
          Organize os horários dos seus atendimentos.
        </p>
      </div>

      <button class="btn" @click="abrirNovoAgendamento">
        + Novo agendamento
      </button>
    </div>

    <!-- FILTROS -->
    <div class="filters">

      <div class="form-group">
        <label>Data</label>

        <input
          v-model="filtroData"
          type="date"
        />
      </div>

      <div class="form-group">
        <label>Status</label>

        <select v-model="filtroStatus">
          <option value="">Todos</option>
          <option value="Agendado">Agendado</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      <button
        class="btn-secondary filter-button"
        @click="limparFiltros"
      >
        Limpar filtros
      </button>

    </div>

    <!-- TABELA -->
    <div class="table-container">
      <table>

        <thead>
          <tr>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="agendamento in agendamentosFiltrados"
            :key="agendamento.id"
          >
            <td>
              <strong>{{ nomeCliente(agendamento.clienteId) }}</strong>
            </td>

            <td>
              {{ nomeServico(agendamento.servicoId) }}
            </td>

            <td>
              {{ formatarData(agendamento.data) }}
            </td>

            <td>
              {{ agendamento.horario }}
            </td>

            <td>
              <span
                class="status-badge"
                :class="statusClass(agendamento.status)"
              >
                {{ agendamento.status }}
              </span>
            </td>

            <td class="actions">

              <button
                class="btn-edit"
                @click="editarAgendamento(agendamento)"
              >
                Editar
              </button>

              <button
                class="btn-delete"
                @click="excluirAgendamento(agendamento.id)"
              >
                Excluir
              </button>

            </td>
          </tr>

          <tr v-if="agendamentosFiltrados.length === 0">
            <td colspan="6" class="empty">
              Nenhum agendamento encontrado.
            </td>
          </tr>

        </tbody>

      </table>
    </div>

    <!-- MODAL -->
    <Modal
      :show="modalAberto"
      :title="
        modoEdicao
          ? 'Editar agendamento'
          : 'Novo agendamento'
      "
      @close="fecharModal"
    >

      <form @submit.prevent="salvarAgendamento">

        <div class="form-group">
          <label>Cliente *</label>

          <select v-model="form.clienteId">
            <option value="">
              Selecione um cliente
            </option>

            <option
              v-for="cliente in clientes"
              :key="cliente.id"
              :value="cliente.id"
            >
              {{ cliente.nome }}
            </option>
          </select>

          <small v-if="erros.cliente">
            {{ erros.cliente }}
          </small>
        </div>

        <div class="form-group">
          <label>Serviço *</label>

          <select v-model="form.servicoId">
            <option value="">
              Selecione um serviço
            </option>

            <option
              v-for="servico in servicos"
              :key="servico.id"
              :value="servico.id"
            >
              {{ servico.nome }} -
              {{ formatarPreco(servico.preco) }}
            </option>
          </select>

          <small v-if="erros.servico">
            {{ erros.servico }}
          </small>
        </div>

        <div class="form-row">

          <div class="form-group">
            <label>Data *</label>

            <input
              v-model="form.data"
              type="date"
            />

            <small v-if="erros.data">
              {{ erros.data }}
            </small>
          </div>

          <div class="form-group">
            <label>Horário *</label>

            <input
              v-model="form.horario"
              type="time"
            />

            <small v-if="erros.horario">
              {{ erros.horario }}
            </small>
          </div>

        </div>

        <div class="form-group">
          <label>Status</label>

          <select v-model="form.status">
            <option value="Agendado">Agendado</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <div class="form-group">
          <label>Observações</label>

          <textarea
            v-model="form.observacoes"
            rows="3"
            placeholder="Observações do atendimento..."
          ></textarea>
        </div>

        <div
          v-if="erroConflito"
          class="alert-error"
        >
          {{ erroConflito }}
        </div>

        <div class="form-actions">

          <button
            type="button"
            class="btn-secondary"
            @click="fecharModal"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="btn"
          >
            {{ modoEdicao
              ? 'Salvar alterações'
              : 'Agendar atendimento'
            }}
          </button>

        </div>

      </form>
    </Modal>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import Modal from '../components/Modal.vue'

const agendamentos = ref([])
const clientes = ref([])
const servicos = ref([])

const modalAberto = ref(false)
const modoEdicao = ref(false)

const filtroData = ref('')
const filtroStatus = ref('')

const erroConflito = ref('')

const form = reactive({
  id: null,
  clienteId: '',
  servicoId: '',
  data: '',
  horario: '',
  status: 'Agendado',
  observacoes: ''
})

const erros = reactive({
  cliente: '',
  servico: '',
  data: '',
  horario: ''
})

onMounted(() => {
  carregarDados()
})

function carregarDados() {
  const dadosAgendamentos =
    localStorage.getItem('agendamentos')

  const dadosClientes =
    localStorage.getItem('clientes')

  const dadosServicos =
    localStorage.getItem('servicos')

  if (dadosAgendamentos) {
    agendamentos.value = JSON.parse(dadosAgendamentos)
  }

  if (dadosClientes) {
    clientes.value = JSON.parse(dadosClientes)
  }

  if (dadosServicos) {
    servicos.value = JSON.parse(dadosServicos)
  }
}

const agendamentosFiltrados = computed(() => {
  return agendamentos.value.filter(agendamento => {

    const dataOk =
      !filtroData.value ||
      agendamento.data === filtroData.value

    const statusOk =
      !filtroStatus.value ||
      agendamento.status === filtroStatus.value

    return dataOk && statusOk
  })
})

function abrirNovoAgendamento() {
  limparFormulario()

  carregarDados()

  modoEdicao.value = false
  modalAberto.value = true
}

function editarAgendamento(agendamento) {
  form.id = agendamento.id
  form.clienteId = agendamento.clienteId
  form.servicoId = agendamento.servicoId
  form.data = agendamento.data
  form.horario = agendamento.horario
  form.status = agendamento.status
  form.observacoes = agendamento.observacoes

  limparErros()
  erroConflito.value = ''

  carregarDados()

  modoEdicao.value = true
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  limparFormulario()
}

function limparFormulario() {
  form.id = null
  form.clienteId = ''
  form.servicoId = ''
  form.data = ''
  form.horario = ''
  form.status = 'Agendado'
  form.observacoes = ''

  limparErros()

  erroConflito.value = ''
}

function limparErros() {
  erros.cliente = ''
  erros.servico = ''
  erros.data = ''
  erros.horario = ''
}

function validarFormulario() {
  limparErros()
  erroConflito.value = ''

  let valido = true

  if (!form.clienteId) {
    erros.cliente = 'Selecione um cliente.'
    valido = false
  }

  if (!form.servicoId) {
    erros.servico = 'Selecione um serviço.'
    valido = false
  }

  if (!form.data) {
    erros.data = 'Informe a data.'
    valido = false
  }

  if (!form.horario) {
    erros.horario = 'Informe o horário.'
    valido = false
  }

  if (!valido) {
    return false
  }

  if (existeConflito()) {
    erroConflito.value =
      'Já existe um agendamento para este horário.'

    return false
  }

  return true
}

function existeConflito() {
  return agendamentos.value.some(agendamento => {

    if (agendamento.id === form.id) {
      return false
    }

    return (
      agendamento.data === form.data &&
      agendamento.horario === form.horario &&
      agendamento.status !== 'Cancelado'
    )
  })
}

function salvarAgendamento() {
  if (!validarFormulario()) {
    return
  }

  const dados = {
    id: form.id || Date.now(),
    clienteId: Number(form.clienteId),
    servicoId: Number(form.servicoId),
    data: form.data,
    horario: form.horario,
    status: form.status,
    observacoes: form.observacoes.trim()
  }

  if (modoEdicao.value) {
    const index = agendamentos.value.findIndex(
      agendamento => agendamento.id === form.id
    )

    if (index !== -1) {
      agendamentos.value[index] = dados
    }
  } else {
    agendamentos.value.push(dados)
  }

  localStorage.setItem(
    'agendamentos',
    JSON.stringify(agendamentos.value)
  )

  fecharModal()
}

function excluirAgendamento(id) {
  const confirmar = confirm(
    'Tem certeza que deseja excluir este agendamento?'
  )

  if (!confirmar) {
    return
  }

  agendamentos.value =
    agendamentos.value.filter(
      agendamento => agendamento.id !== id
    )

  localStorage.setItem(
    'agendamentos',
    JSON.stringify(agendamentos.value)
  )
}

function nomeCliente(id) {
  const cliente = clientes.value.find(
    cliente => Number(cliente.id) === Number(id)
  )

  return cliente
    ? cliente.nome
    : 'Cliente não encontrado'
}

function nomeServico(id) {
  const servico = servicos.value.find(
    servico => Number(servico.id) === Number(id)
  )

  return servico
    ? servico.nome
    : 'Serviço não encontrado'
}

function formatarData(data) {
  if (!data) {
    return ''
  }

  const [ano, mes, dia] = data.split('-')

  return `${dia}/${mes}/${ano}`
}

function formatarPreco(preco) {
  return Number(preco).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function statusClass(status) {
  if (status === 'Concluído') {
    return 'status-success'
  }

  if (status === 'Cancelado') {
    return 'status-danger'
  }

  return 'status-warning'
}

function limparFiltros() {
  filtroData.value = ''
  filtroStatus.value = ''
}
</script>