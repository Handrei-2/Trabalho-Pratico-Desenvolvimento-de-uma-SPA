# Trabalho-Pratico-Desenvolvimento-de-uma-SPA

O **AgendaFácil** permite que uma empresa organize seus atendimentos em um único sistema.

A aplicação possibilita:

- Cadastrar e gerenciar clientes;
- Cadastrar e gerenciar serviços;
- Criar e gerenciar agendamentos;
- Alterar informações cadastradas;
- Excluir registros;
- Pesquisar clientes e serviços;
- Filtrar agendamentos;
- Validar informações dos formulários;
- Impedir conflitos de horários;
- Armazenar os dados no navegador utilizando `localStorage`.

Por ser uma SPA, a navegação entre as áreas acontece sem a necessidade de recarregar a página.

---

## Objetivo

O objetivo do projeto é desenvolver uma aplicação web simples, intuitiva e responsiva para auxiliar empresas e prestadores de serviços no controle de sua agenda.

A aplicação busca substituir métodos manuais, como cadernos, planilhas e mensagens, proporcionando uma maneira mais organizada de controlar os atendimentos.

---

## Funcionalidades

### Clientes

Permite:

- Cadastrar clientes;
- Informar nome, telefone e e-mail;
- Visualizar clientes cadastrados;
- Pesquisar clientes;
- Editar clientes;
- Excluir clientes;
- Validar os campos obrigatórios.

### Serviços

Permite:

- Cadastrar serviços;
- Informar nome;
- Informar descrição;
- Informar preço;
- Informar duração;
- Visualizar serviços em cards;
- Pesquisar serviços;
- Editar serviços;
- Excluir serviços;
- Validar preço e duração.

### Agendamentos

Permite:

- Criar agendamentos;
- Selecionar cliente;
- Selecionar serviço;
- Definir data;
- Definir horário;
- Definir status;
- Adicionar observações;
- Editar agendamentos;
- Excluir agendamentos;
- Filtrar por data;
- Filtrar por status;
- Validar os campos obrigatórios;
- Impedir dois agendamentos no mesmo horário.

### Armazenamento

Os dados são armazenados utilizando o:

text
localStorage

Dessa forma, os registros permanecem disponíveis mesmo depois que a página é atualizada.

Observação: o localStorage é utilizado neste projeto como solução de armazenamento local para fins acadêmicos. Em uma aplicação real, seria recomendado utilizar uma API e um banco de dados.

🛠️ Tecnologias utilizadas
Vue.js

O Vue.js foi escolhido como framework principal por permitir a criação de interfaces reativas e baseadas em componentes.

A aplicação possui várias áreas independentes, como clientes, serviços e agendamentos, tornando a utilização de componentes reutilizáveis adequada para o projeto.

Vue Router

Utilizado para realizar a navegação entre as diferentes páginas da aplicação sem recarregar o navegador.

Rotas utilizadas:

/               → Dashboard
/clientes       → Clientes
/servicos       → Serviços
/agendamentos   → Agendamentos
JavaScript

Utilizado para implementar:

Regras de negócio;
Validações;
CRUD;
Filtros;
Manipulação dos dados;
Integração com o localStorage.
HTML

Utilizado para estruturar os componentes e formulários da aplicação.

CSS

Utilizado para:

Estilização;
Layout;
Responsividade;
Tabelas;
Cards;
Formulários;
Modais;
Botões;
Estados dos agendamentos.
LocalStorage

Utilizado para armazenar localmente:

clientes
servicos
agendamentos
 Componentes reutilizáveis

O projeto possui componentes reutilizáveis para evitar repetição de código.

Navbar

Arquivo:

src/components/Navbar.vue

Responsável pela navegação principal da aplicação.

Modal

Arquivo:

src/components/Modal.vue

Componente utilizado para exibir os formulários de cadastro e edição.

StatCard

Arquivo:

src/components/StatCard.vue

Componente utilizado para apresentar informações resumidas no Dashboard.

 Requisitos

Para executar o projeto, é necessário ter instalado:

Node.js
npm

É recomendado utilizar uma versão recente do Node.js.

Para verificar se o Node.js está instalado:

node --version

Para verificar o npm:

npm --version
 Instalação

Clone o projeto ou abra a pasta do projeto no terminal.

Instale as dependências:

npm install

Caso o Vue Router ainda não esteja instalado:

npm install vue-router
 Executando o projeto

Para iniciar o servidor de desenvolvimento:

npm run dev

Depois, acesse no navegador o endereço apresentado pelo terminal.

Normalmente:

http://localhost:5173
 Testando a aplicação
1. Cadastrar um cliente

Acesse:

Clientes

Clique em:

+ Novo cliente

Preencha:

Nome: João Silva
Telefone: (88) 99999-1111
E-mail: joao@email.com

Clique em:

Cadastrar

O cliente deverá aparecer na tabela.

2. Cadastrar um serviço

Acesse:

Serviços

Clique em:

+ Novo serviço

Exemplo:

Nome: Corte de cabelo
Descrição: Corte masculino
Preço: 30
Duração: 30 minutos

Depois clique em:

Cadastrar serviço
3. Criar um agendamento

Acesse:

Agendamentos

Clique em:

+ Novo agendamento

Selecione:

Cliente: João Silva
Serviço: Corte de cabelo
Data: 01/10/2026
Horário: 09:00
Status: Agendado

Depois clique em:

Agendar atendimento
 Validações

A aplicação possui validações para evitar informações inválidas.

Clientes

Os seguintes campos são obrigatórios:

Nome
Telefone
E-mail

Também é realizada uma validação básica do formato do e-mail e telefone.

Serviços

São validados:

Nome
Preço
Duração

O preço não pode ser negativo e a duração precisa ser maior que zero.

Agendamentos

São obrigatórios:

Cliente
Serviço
Data
Horário

Além disso, o sistema verifica se já existe outro agendamento no mesmo horário.

Agendamentos cancelados não bloqueiam o horário.

 Operações CRUD

O sistema implementa operações de CRUD.

Operação	Descrição
Create	Cadastro de clientes, serviços e agendamentos
Read	Exibição dos registros cadastrados
Update	Edição dos registros
Delete	Exclusão dos registros
 Responsividade

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela.

São considerados:

Computadores;
Notebooks;
Tablets;
Smartphones.

Em telas menores, o menu de navegação é adaptado e os elementos da interface são reorganizados.

 Interface

A aplicação possui:

Dashboard;
Menu de navegação;
Cards;
Tabelas;
Formulários;
Modais;
Botões de ação;
Indicadores de status;
Filtros;
Mensagens de validação.

A interface foi projetada para ser simples e intuitiva, facilitando o uso por funcionários de uma empresa ou prestadores de serviços.

🧠 Justificativa da escolha do Vue.js

O Vue.js foi escolhido devido à necessidade de desenvolver uma aplicação de página única com uma interface dinâmica.

Entre as características que justificam sua utilização estão:

Arquitetura baseada em componentes;
Reatividade dos dados;
Facilidade de integração com JavaScript;
Suporte ao Vue Router;
Organização das telas em componentes e views;
Atualização da interface sem recarregar a página;
Facilidade para implementar formulários e interações.

A arquitetura baseada em componentes também permite reutilizar elementos como o menu de navegação e os modais de formulário.
