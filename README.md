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

#### ✅ TST-0001 - Login Válido

- **Funcionalidade:** Tela de Login  
- **Descrição:** Verificar login com usuário válido  
- **Dados de Entrada:**  
  - Usuário: standard_user  
  - Senha: secret_sauce  
- **Passos:**  
  1. Acessar o site: https://www.saucedemo.com  
  2. Informar usuário  
  3. Informar senha  
  4. Clicar no botão Login  
- **Resultado Esperado:** Usuário autenticado e redirecionado para tela de produtos  

#### ❌ TST-0002 - Login Inválido

- **Funcionalidade:** Tela de Login  
- **Descrição:** Verificar login com usuário válido e senha inválida  
- **Dados de Entrada:**  
  - Usuário: standard_user  
  - Senha: 123  
- **Passos:**  
  1. Acessar o site: https://www.saucedemo.com  
  2. Informar usuário  
  3. Informar senha  
  4. Clicar no botão Login  
- **Resultado Esperado:** Pop-up de erro e permanência na tela de login  

#### 🚫 TST-0003 - Login Bloqueado

- **Funcionalidade:** Tela de Login  
- **Descrição:** Verificar login com usuário bloqueado  
- **Dados de Entrada:**  
  - Usuário: locked_out_user  
  - Senha: secret_sauce  
- **Passos:**  
  1. Acessar o site: https://www.saucedemo.com  
  2. Informar usuário  
  3. Informar senha  
  4. Clicar no botão Login  
- **Resultado Esperado:** Pop-up informando que o usuário está bloqueado  

#### 🔓 TST-0004 - Logout

- **Funcionalidade:** Logout  
- **Descrição:** Verificar logout do sistema  
- **Pré-condição:** Usuário logado  
- **Passos:**  
  1. Clicar no menu lateral  
  2. Clicar em Logout  
- **Resultado Esperado:** Usuário deslogado e redirecionado para tela de login  

---

### 2. 🛒 Carrinho

Testes relacionados à adição e remoção de produtos no carrinho de compras.

#### ➕ TST-0005 - Adicionar item ao carrinho

- **Funcionalidade:** Tela do carrinho  
- **Descrição:** Verificar inclusão de item ao carrinho  
- **Pré-condição:** Usuário logado e na tela de produtos  
- **Passos:**  
  1. Escolher produtos e clicar em "Add to cart"  
  2. Clicar no carrinho e verificar itens  
- **Resultado Esperado:** Itens adicionados e contador atualizado  

#### ➖ TST-0006 - Remover item do carrinho

- **Funcionalidade:** Tela do carrinho  
- **Descrição:** Verificar remoção de item do carrinho  
- **Pré-condição:** Usuário logado e na tela do carrinho  
- **Passos:**  
  1. Clicar em "Remove" nos itens desejados  
- **Resultado Esperado:** Itens removidos e contador atualizado  

---

### 3. 🛍️ Compra

Testes relacionados à finalização de uma compra com sucesso.

#### 🧾 TST-0007 - Finalizar compra

- **Funcionalidade:** Tela do checkout  
- **Descrição:** Verificar finalização de compra  
- **Pré-condição:** Usuário logado e com itens no carrinho  
- **Passos:**  
  1. Clicar em Checkout  
  2. Preencher dados do cliente  
  3. Clicar em Continue  
  4. Validar overview  
  5. Clicar em Finish  
- **Resultado Esperado:** Compra realizada com sucesso e mensagem de agradecimento exibida  

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
- Certifique-se de que os nomes dos produtos estejam corretos no sistema sob teste (ex: "Sauce Labs Backpack").

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