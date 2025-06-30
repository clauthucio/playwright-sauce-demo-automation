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
| ❌ Não deve logar com senha incorreta     | Garante que o sistema rejeita login com credenciais inválidas.           |
| 🚫 Não deve logar com usuário bloqueado   | Verifica que usuários bloqueados recebem a mensagem adequada.            |
| 🔓 Deve deslogar                          | Após login bem-sucedido, verifica se o logout funciona corretamente.     |

---

### 2. 🛒 Carrinho

Testes relacionados à adição e remoção de produtos no carrinho de compras.

| Cenário                                  | Descrição                                                                 |
|-----------------------------------------|---------------------------------------------------------------------------|
| ➕ Adicionar item ao carrinho            | Adiciona dois produtos ao carrinho e verifica o contador de itens.       |
| ➖ Remover item do carrinho              | Remove um item do carrinho e verifica se o badge de quantidade é zerado. |

---

### 3. 🛍️ Compra

Testes relacionados à finalização de uma compra com sucesso.

| Cenário                     | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| 🧾 Finalizar compra         | Simula o processo completo de checkout, incluindo inserção de dados do cliente e confirmação da compra. |

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