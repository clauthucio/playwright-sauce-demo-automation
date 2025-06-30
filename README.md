# 🧪 Testes Automatizados com Playwright

Este projeto contém testes end-to-end automatizados usando [Playwright](https://playwright.dev/) para validar funcionalidades críticas de um sistema de e-commerce. Os testes cobrem fluxos de login, gerenciamento de carrinho e finalização de compras.

## 🔧 Tecnologias

- [Playwright](https://playwright.dev/)
- TypeScript
- Arquitetura orientada a páginas (Page Object Model)
- Fixtures com dados de teste

---

## 📁 Estrutura dos Testes

Os testes estão organizados em três suítes principais:

### 1. 🔐 Login

Testes relacionados ao processo de autenticação do usuário.

| Cenário                                   | Descrição                                                                 |
|------------------------------------------|---------------------------------------------------------------------------|
| ✅ Deve logar                             | Verifica se um usuário válido consegue fazer login com sucesso.           |
**TST-0001 - Login Válido**
**Funcionalidade:** Tela de Login
**Descrição:** Verificar login com usuário válido
**Dados de Entrada:**
- Usuário: standard_user
- Senha: secret_sauce
**Passos:**
- Acessar o site: https://www.saucedemo.com
- Informar usuário
- Informar senha
- Clicar no botão Login
**Resultado Esperado:** Usuário autenticado e logado no sistema
**Pós-condição:** Usuário redirecionado para tela de produtos

| ❌ Não deve logar com senha incorreta     | Garante que o sistema rejeita login com credenciais inválidas.           |
**TST-0002 - Login Inválido**
**Funcionalidade:** Tela de Login
**Descrição:** Verificar login com usuário válido e senha inválida
**Dados de Entrada:**
- Usuário: standard_user
- Senha: 123
**Passos:**
- Acessar o site: https://www.saucedemo.com
- Informar usuário
- Informar senha
- Clicar no botão Login
**Resultado Esperado:** Pop-up informando que usuário e/ou senha não são válidos
**Pós-condição:** Permanecer na tela de login

| 🚫 Não deve logar com usuário bloqueado   | Verifica que usuários bloqueados recebem a mensagem adequada.            |
**TST-0003 - Login Bloqueado**
**Funcionalidade:** Tela de Login
**Descrição:** Verificar login com usuário bloqueado
**Dados de Entrada:**
- Usuário: locked_out_user
- Senha: secret_sauce
**Passos:**
- Acessar o site: https://www.saucedemo.com
- Informar usuário
- Informar senha
- Clicar no botão Login
**Resultado Esperado:** Pop-up informando que usuário está bloqueado
**Pós-condição:** Permanecer na tela de login

| 🔓 Deve deslogar                          | Após login bem-sucedido, verifica se o logout funciona corretamente.     |
**TST-0004 - Logout**
**Funcionalidade:** Logout
**Descrição:** Verificar logout do sistema
**Pré-condição:**
- Usuário logado
**Passos:**
- Clicar no menu lateral
- Clicar em Logout
**Resultado Esperado:** Usuário deslogado com sucesso do sistema
**Pós-condição:** Usuário redirecionado para tela de login

---

### 2. 🛒 Carrinho

Testes relacionados à adição e remoção de produtos no carrinho de compras.

| Cenário                                  | Descrição                                                                 |
|-----------------------------------------|---------------------------------------------------------------------------|
| ➕ Adicionar item ao carrinho            | Adiciona dois produtos ao carrinho e verifica o contador de itens.       |
**TST-0005 - Adiciona item ao carrinho**
**Funcionalidade:** Tela do carrinho
**Descrição:** Verificar inclusão de item ao carrinho
**Pré-condição:**
- Usuário logado
- Usuário na tela de produtos
**Passos:**
- Escolher um ou mais itens e clicar em add to cart
- Clicar no carrinho e conferir se o item foi adicionado
**Resultado Esperado:** Item adicionado ao carrinho
**Pós-condição:** Item adicionado ao carrinho e contador de itens incrementado

| ➖ Remover item do carrinho              | Remove um item do carrinho e verifica se o badge de quantidade é zerado. |
**TST-0006 - Remove item ao carrinho**
**Funcionalidade:** Tela do carrinho
**Descrição:** Verificar remoção de item do carrinho
**Pré-condição:**
- Usuário logado
- Usuário na tela do carrinho
**Passos:**
- Escolher um ou mais itens e clicar em Remove e conferir se o(s) item(ns) foi(ram) removido(s)
**Resultado Esperado:** Item removido do carrinho
**Pós-condição:** Item removido do carrinho e contador de itens reduzido

---

### 3. 🛍️ Compra

Testes relacionados à finalização de uma compra com sucesso.

| Cenário                     | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| 🧾 Finalizar compra         | Simula o processo completo de checkout, incluindo inserção de dados do cliente e confirmação da compra. |
**TST-0007 - Finalizar compra**
**Funcionalidade:** Tela do checkout
**Descrição:** Verificar finalização de compra
**Pré-condição:**
- Usuário logado
- Usuário na tela do carrinho
**Passos:**
- Clicar no botão Checkout
- Preencher os dados do cliente
- Clicar no botão Continue
- Validar overview
- Clicar em Finish
**Resultado Esperado:** Compra realizada com sucesso
**Pós-condição:** É apresentado uma tela de agradecimento pela compra

---

## 📂 Fixtures

- **`users.json`**: Contém usuários válidos, inválidos e bloqueados.
- **`customers.json`**: Dados de clientes utilizados no preenchimento do formulário de checkout.

---

## 🧱 Page Objects

As interações com a interface do sistema são encapsuladas nas seguintes classes:

- `LoginPage`: Login, mensagens de erro e redirecionamento.
- `ProductPage`: Adição/remoção de produtos, logout e navegação.
- `CartPage`: Validação do carrinho e remoção de itens.
- `CheckoutPage`: Preenchimento do formulário de compra e validação do fluxo.

---

## ▶️ Executando os Testes

```bash
# Instalar dependências
npm install

# Executar todos os testes
npx playwright test
```

---

## 📝 Notas

- Os testes assumem que a aplicação está rodando e acessível.
- A autenticação é baseada em dados mockados nos arquivos de fixtures.
- Certifique-se de que os nomes dos produtos estejam corretos no sistema sob teste (ex: `"Sauce Labs Backpack"`).

---

## 📌 Requisitos

- Node.js
- NPM ou Yarn
- Playwright instalado (`npx playwright install`)

---

## 👨‍💻 Autor
 - Desenvolvido por Clauthucio Chaves

 ---
 
Este projeto foi desenvolvido como exercício de automação de testes com Playwright, utilizando boas práticas como page objects e separação de dados via fixtures.