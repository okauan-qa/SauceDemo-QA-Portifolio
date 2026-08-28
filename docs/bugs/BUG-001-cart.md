# BUG-001 — Nem todos os produtos são adicionados ao carrinho

## Informações do defeito

| Campo | Descrição |
|---|---|
| ID | BUG-001 |
| Título | Nem todos os produtos são adicionados ao carrinho ao clicar em todos os botões "Add to cart" |
| Área afetada | Inventário / Carrinho |
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
| Navegador | Google Chrome v151|
| Ferramenta de automação | Cypress |
| Data da execução | 27/08/2026 |

## Pré-condições

- Acessar a aplicação Sauce Demo.
- Realizar login com o usuário `problem_user`.
- Estar na página de inventário.
- O carrinho deve estar vazio.

## Passos para reproduzir

1. Na página de inventário, localizar todos os botões `Add to cart`.
2. Clicar em todos os botões disponíveis.
3. Verificar o estado dos botões após os cliques.
4. Verificar a quantidade exibida no ícone do carrinho.
5. Abrir o carrinho e conferir os produtos adicionados.

## Resultado esperado

- Todos os produtos disponíveis devem ser adicionados ao carrinho.
- Todos os botões `Add to cart` devem ser alterados para `Remove`.
- Nenhum botão `Add to cart` deve permanecer disponível.
- O ícone do carrinho deve exibir a quantidade total de produtos adicionados.
- Todos os produtos selecionados devem estar presentes no carrinho.

## Resultado atual

Após clicar em todos os botões `Add to cart`, alguns produtos permanecem com o botão `Add to cart`.

O teste automatizado identificou que ainda existem 3 botões com o atributo iniciado por `add-to-cart`, indicando que parte dos produtos não foi adicionada ao carrinho.

## Evidência automatizada

Código utilizado para validar que não restaram botões de adição:

```javascript
cy.get('[data-test="inventory-container"]')
  .find('[data-test^="add-to-cart"]')
  .should('have.length', 0)
```

Resultado observado:

```text
Esperado: 0 botões "Add to cart".
Resultado atual: 3 botões "Add to cart".
```

## Impacto

O usuário pode acreditar que adicionou todos os produtos desejados, mas alguns itens não são incluídos no carrinho. Isso pode impedir a compra dos produtos pretendidos e prejudicar a experiência de compra.

## Observações

- O defeito foi identificado durante a execução de testes automatizados com o usuário `problem_user`.
- O mesmo cenário foi executado com o usuário `standard_user` e o teste foi concluído com sucesso.

## Evidências anexadas

- Screenshot da execução com falha no Cypress.
- Vídeo da reprodução do cenário.