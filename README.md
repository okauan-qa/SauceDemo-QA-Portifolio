# Automação de Testes E2E — Sauce Demo com Cypress

Projeto de portfólio para prática de **Quality Assurance (QA)** e automação de testes End-to-End (E2E) utilizando Cypress e JavaScript.

A aplicação testada é o [Sauce Demo](https://www.saucedemo.com/), um ambiente de demonstração de e-commerce utilizado para estudos de testes manuais e automatizados.

## Objetivo

Automatizar e validar os principais fluxos da aplicação Sauce Demo, identificando comportamentos esperados e defeitos funcionais em diferentes perfis de usuários.

O projeto também reúne documentação de bugs, evidências de falha e organização de casos de teste para demonstrar práticas de QA.

## Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| JavaScript | Linguagem utilizada na automação |
| Cypress | Framework de automação de testes E2E |
| Node.js | Ambiente de execução |
| Git | Versionamento do projeto |
| GitHub | Hospedagem do repositório e documentação |
| Visual Studio Code | Editor de código utilizado |
| Google Chrome | Navegador utilizado na execução dos testes |

## Aplicação testada

- **Nome:** Sauce Demo
- **URL:** [https://www.saucedemo.com/](https://www.saucedemo.com/)
- **Tipo:** Aplicação web de e-commerce para fins de demonstração e testes.

## Escopo dos testes

Os cenários automatizados abrangem:

- Login com credenciais válidas
- Login com usuário bloqueado
- Testes com o perfil `problem_user`
- Exibição e interação com produtos
- Adição de produtos ao carrinho
- Remoção de produtos do carrinho
- Validação da quantidade exibida no carrinho
- Ordenação de produtos por nome e preço
- Preenchimento dos dados do checkout
- Validações de campos obrigatórios
- Identificação e documentação de defeitos

## Usuários de teste

| Usuário | Senha | Finalidade |
|---|---|---|
| `standard_user` | `secret_sauce` | Fluxos funcionais esperados |
| `locked_out_user` | `secret_sauce` | Validação de usuário bloqueado |
| `problem_user` | `secret_sauce` | Identificação de comportamentos inconsistentes |

> Os problemas documentados para `problem_user` são descritos como específicos desse perfil quando o mesmo cenário é aprovado com `standard_user`.

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── locked-out-user.cy.js
│   │   └── problem-user.cy.js
│   │
│   ├── fixtures/
│   └── support/
│
├── docs/
│   ├── bugs/
│   │   ├── BUG-001-add-itens-carrinho.md
│   │   ├── BUG-002-ordenacao-z-a-nao-aplicada.md
│   │   ├── BUG-003-ordenacao-menor-maior-preco-nao-aplicada.md
│   │   ├── BUG-004-ordenacao-maior-menor-preco-nao-aplicada.md
│   │   └── BUG-005-campo-sobrenome-nao-aceita-texto.md
│   │
│   └── evidencias/
│       ├── images/
│       └── videos/
│
├── .gitignore
├── cypress.config.js
├── package.json
└── README.md
```

## Como executar o projeto

### Pré-requisitos

Antes de executar os testes, tenha instalado:

- Node.js
- npm
- Git
- Visual Studio Code, opcional mas recomendado

Verifique as versões instaladas:

```bash
node -v
npm -v
git --version
```

### Clonar o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd NOME_DO_SEU_PROJETO
```

### Instalar dependências

```bash
npm install
```

O Cypress deve ser instalado como dependência de desenvolvimento do projeto. [416][417]

### Abrir o Cypress

Para abrir a interface gráfica do Cypress:

```bash
npx cypress open
```

Depois:

1. Selecione **E2E Testing**.
2. Escolha o navegador desejado.
3. Selecione o arquivo de teste, por exemplo `problem-user.cy.js`.
4. Acompanhe a execução dos cenários.

### Executar os testes pelo terminal

Para executar todos os testes:

```bash
npx cypress run
```

Para executar apenas os testes do arquivo `problem-user.cy.js`:

```bash
npx cypress run --spec "cypress/e2e/problem-user.cy.js"
```

> O modo `cypress run` é indicado para gerar evidências, como screenshots automáticos em falhas e vídeos da execução, quando essas opções estão habilitadas na configuração.

## Exemplos de cenários automatizados

### Adicionar todos os produtos ao carrinho

O cenário seleciona todos os botões disponíveis de adição, clica neles e valida se todos os produtos foram incluídos no carrinho.

```javascript
it('Deve adicionar todos os itens da lista ao carrinho', () => {
  cy.get('[data-test^="add-to-cart"]')
    .should('have.length.gt', 2)
    .click({ multiple: true })

  cy.get('[data-test="inventory-container"]')
    .find('[data-test^="add-to-cart"]')
    .should('have.length', 0)
})
```

### Validar ordenação de Z a A

O cenário tenta selecionar a opção de ordenação de produtos por nome, de Z para A.

```javascript
it('Deve ordenar a lista de Z a A', () => {
  cy.get('[data-test="product-sort-container"]')
    .select('za')
    .should('have.value', 'za')
})
```

### Validar campo Last Name no checkout

O cenário verifica se o campo de sobrenome aceita e mantém um valor válido durante o checkout.

```javascript
it('Deve preencher os dados pessoais no checkout', () => {
  cy.contains('button', 'Add to cart').click()
  cy.get('.shopping_cart_link').click()
  cy.contains('button', 'Checkout').click()

  cy.get('#first-name')
    .type('Kauan')
    .should('have.value', 'Kauan')

  cy.get('#last-name')
    .type('Brito')
    .should('have.value', 'Brito')
})
```

## Bugs documentados

| ID | Descrição | Usuário afetado | Severidade | Documentação |
|---|---|---|---|---|
| BUG-001 | Nem todos os produtos são adicionados ao carrinho | `problem_user` | Média | [Abrir relatório](docs/bugs/BUG-001-add-itens-carrinho.md) |
| BUG-002 | Ordenação de produtos de Z a A não é aplicada | `problem_user` | Média | [Abrir relatório](docs/bugs/BUG-002-ordenacao-z-a-nao-aplicada.md) |
| BUG-003 | Ordenação do menor para o maior preço não é aplicada | `problem_user` | Média | [Abrir relatório](docs/bugs/BUG-003-ordenacao-menor-maior-preco-nao-aplicada.md) |
| BUG-004 | Ordenação do maior para o menor preço não é aplicada | `problem_user` | Média | [Abrir relatório](docs/bugs/BUG-004-ordenacao-maior-menor-preco-nao-aplicada.md) |
| BUG-005 | Campo `Last Name` não aceita texto no checkout | `problem_user` | Alta | [Abrir relatório](docs/bugs/BUG-005-campo-sobrenome-nao-aceita-texto.md) |

> Os bugs foram identificados durante a execução de cenários automatizados com `problem_user`. Quando aplicável, os mesmos cenários foram comparados com `standard_user` para identificar se o comportamento era específico do perfil.

## Evidências

As evidências geradas durante os testes estão organizadas em:

```text
docs/evidencias/images/
docs/evidencias/videos/
```

Cada relatório de bug possui links diretos para screenshots e vídeos relacionados à falha encontrada.

## Boas práticas aplicadas

- Utilização de seletores `data-test` para maior estabilidade dos testes
- Criação de asserções para validar comportamentos esperados
- Uso de `.should()` para validações automáticas
- Uso de `have.value` para validar valores inseridos em campos
- Uso de `not.exist` e `have.length` para validar elementos removidos ou não exibidos
- Testes organizados por funcionalidade e perfil de usuário
- Documentação individual para cada defeito identificado
- Registro de ambiente, pré-condições, passos, resultados esperados, resultados atuais e evidências
- Uso de Git para versionamento das alterações

## Próximas melhorias

- Configurar execução automática dos testes com GitHub Actions
- Adicionar relatório automatizado de execução de testes

## Autor

**Kauan Brito**

Projeto desenvolvido para fins de estudo, aprendizado e construção de portfólio na área de Quality Assurance e automação de testes.