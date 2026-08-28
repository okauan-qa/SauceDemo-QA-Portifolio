# BUG-004 — Ordenação de produtos do maior para o menor preço não é aplicada

## Informações do defeito

| Campo | Descrição |
|---|---|
| ID | BUG-004 |
| Título | A opção de ordenação "Price (high to low)" não é aplicada |
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
3. Selecionar a opção `Price (high to low)`.
4. Verificar o valor selecionado no campo de ordenação.
5. Verificar a ordem dos preços dos produtos exibidos na lista.

## Resultado esperado

- O campo de ordenação deve assumir o valor `hilo`.
- A opção `Price (high to low)` deve permanecer selecionada.
- Os produtos devem ser exibidos em ordem decrescente de preço, do maior para o menor.

## Resultado atual

Após selecionar a opção `Price (high to low)`, o campo de ordenação permanece com o valor `az`, correspondente à opção `Name (A to Z)`.

Como consequência, a lista de produtos permanece ordenada alfabeticamente de A a Z, em vez de ser ordenada pelo maior preço para o menor preço.

## Evidência automatizada

Código utilizado:

```javascript
cy.get('[data-test="product-sort-container"]')
  .select('hilo')
  .should('have.value', 'hilo')
```

Resultado observado no Cypress:

```text
AssertionError: Timed out retrying after 11000ms:
expected <select.product_sort_container> to have value 'hilo',
but the value was 'az'
```

## Impacto

O usuário não consegue ordenar os produtos por preço decrescente. Isso dificulta a comparação de valores e a localização dos produtos mais caros, prejudicando a experiência de compra.

## Observações

- O defeito foi identificado durante testes automatizados com o usuário `problem_user`.
- O mesmo cenário foi executado com o usuário `standard_user` e o teste foi concluído com sucesso.
- O comportamento indica um defeito específico do perfil `problem_user`.

## Evidências anexadas

- [Screenshot da falha no Cypress](evidences/images/problem-userBUG-004.png)
- [Vídeo da reprodução do defeito](evidences/videos/problem-userBUG-004.mp4) 