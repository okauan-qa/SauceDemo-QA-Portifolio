# BUG-003 — Ordenação de produtos do menor para o maior preço não é aplicada

## Informações do defeito

| Campo | Descrição |
|---|---|
| ID | BUG-003 |
| Título | A opção de ordenação "Price (low to high)" não é aplicada |
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
3. Selecionar a opção `Price (low to high)`.
4. Verificar o valor selecionado no campo de ordenação.
5. Verificar a ordem dos preços dos produtos exibidos na lista.

## Resultado esperado

- O campo de ordenação deve assumir o valor `lohi`.
- A opção `Price (low to high)` deve permanecer selecionada.
- Os produtos devem ser exibidos em ordem crescente de preço, do menor para o maior.

## Resultado atual

Após selecionar a opção `Price (low to high)`, o campo de ordenação permanece com o valor `az`, correspondente à opção `Name (A to Z)`.

Como consequência, a lista de produtos permanece ordenada alfabeticamente de A a Z, em vez de ser ordenada pelo menor preço para o maior preço.

## Evidência automatizada

Código utilizado:

```javascript
cy.get('[data-test="product-sort-container"]')
  .select('lohi')
  .should('have.value', 'lohi')
```

Resultado observado no Cypress:

```text
AssertionError: Timed out retrying after 11000ms:
expected <select.product_sort_container> to have value 'lohi',
but the value was 'az'
```

## Impacto

O usuário não consegue ordenar os produtos por preço crescente. Isso dificulta a comparação de valores e a localização dos produtos mais baratos, prejudicando a experiência de compra.

## Observações

- O defeito foi identificado durante testes automatizados com o usuário `problem_user`.
- O mesmo cenário foi executado com o usuário `standard_user` e o teste foi concluído com sucesso.
- O comportamento indica um defeito específico do perfil `problem_user`.

## Evidências anexadas

- [Screenshot da falha no Cypress](../evidencias/images/problem-userBUG-003.png)
- [Vídeo da reprodução do defeito](../evidencias/images/problem-userBUG-003.mp4)