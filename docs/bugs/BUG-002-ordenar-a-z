# BUG-002 — Ordenação de produtos de Z a A não é aplicada

## Informações do defeito

| Campo | Descrição |
|---|---|
| ID | BUG-002 |
| Título | A opção de ordenação "Name (Z to A)" não é aplicada |
| Área afetada | Inventário / Ordenação de produtos |
| Tipo | Bug funcional |
| Usuário afetado | `problem_user` |
| Severidade | Média |
| Prioridade | Média |
| Status | Aberto |

## Ambiente

| Item | Informação |
|---|---|
| Aplicação | Sauce Demo |
| URL | https://www.saucedemo.com/ |
| Navegador | Google Chrome v151 |
| Ferramenta de automação | Cypress |
| Data da execução | 27/08/2026 |

## Pré-condições

- Acessar a aplicação Sauce Demo.
- Realizar login com o usuário `problem_user`.
- Estar na página de inventário de produtos.
- A opção padrão de ordenação deve estar em `Name (A to Z)`.

## Passos para reproduzir

1. Acessar a página de inventário.
2. Localizar o campo de ordenação de produtos.
3. Selecionar a opção `Name (Z to A)`.
4. Verificar o valor selecionado no campo de ordenação.
5. Verificar a ordem dos produtos exibidos na lista.

## Resultado esperado

- O campo de ordenação deve assumir o valor `za`.
- A opção `Name (Z to A)` deve permanecer selecionada.
- Os produtos devem ser exibidos em ordem alfabética decrescente, de Z a A.

## Resultado atual

Após selecionar a opção `Name (Z to A)`, o campo de ordenação permanece com o valor `az`, correspondente à opção `Name (A to Z)`.

Como consequência, a lista de produtos não é ordenada de Z a A.

## Evidência automatizada

Código utilizado:

```javascript
cy.get('[data-test="product-sort-container"]')
  .select('za')
  .should('have.value', 'za')
```

Resultado observado no Cypress:

```text
AssertionError: Timed out retrying after 11000ms:
expected <select.product_sort_container> to have value 'za',
but the value was 'az'
```

## Impacto

O usuário não consegue utilizar a ordenação de produtos de Z a A. Isso dificulta a localização de produtos na lista e torna a funcionalidade de ordenação inconsistente.

## Observações

- O defeito foi identificado durante testes automatizados com o usuário `problem_user`.
- O mesmo cenário deve ser executado com `standard_user` para verificar se o problema também ocorre para o usuário padrão.
- Caso o teste seja aprovado com `standard_user`, o defeito deve ser registrado como específico do perfil `problem_user`.

## Evidências anexadas

- Screenshot da falha do Cypress.
- Vídeo da reprodução do cenário.