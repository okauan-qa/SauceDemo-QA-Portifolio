# BUG-005 — Campo Last Name não aceita texto no checkout

## Informações do defeito

| Campo | Descrição |
|---|---|
| ID | BUG-005 |
| Título | Campo `Last Name` permanece vazio após o preenchimento |
| Área afetada | Checkout / Your Information |
| Tipo | Bug funcional |
| Usuário afetado | `problem_user` |
| Severidade | Alta |
| Prioridade | Alta |
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
- Adicionar ao menos um produto ao carrinho.
- Estar na tela do carrinho.
- O carrinho deve possuir ao menos um item.

## Passos para reproduzir

1. Adicionar um produto ao carrinho.
2. Clicar no ícone do carrinho.
3. Clicar no botão `Checkout`.
4. No campo `First Name`, informar `Kauan`.
5. No campo `Last Name`, informar `Brito`.
6. Verificar o valor preenchido no campo `Last Name`.

## Resultado esperado

- O campo `First Name` deve aceitar e manter o valor `Kauan`.
- O campo `Last Name` deve aceitar e manter o valor `Brito`.
- O usuário deve conseguir preencher todos os dados obrigatórios para prosseguir com o checkout.

## Resultado atual

Após informar o valor `Brito` no campo `Last Name`, o campo permanece vazio.

O Cypress identificou que o campo `#last-name` não contém o valor informado após a execução do comando `.type('Brito')`.

## Evidência automatizada

Código utilizado:

```javascript
cy.get('#first-name')
  .type('Kauan')
  .should('have.value', 'Kauan')

cy.get('#last-name')
  .type('Brito')
  .should('have.value', 'Brito')
```

Resultado observado no Cypress:

```text
AssertionError: Timed out retrying after 11000ms:
expected <input#last-name.input_error.form_input> to have value 'Brito',
but the value was ''
```

## Impacto

O campo `Last Name` é obrigatório no fluxo de checkout. Como o usuário não consegue preencher o sobrenome, não é possível prosseguir corretamente para as próximas etapas e finalizar a compra.

## Observações

- O defeito foi identificado durante testes automatizados com o usuário `problem_user`.
- O mesmo cenário deve ser executado com o usuário `standard_user` para confirmar se a falha é específica desse perfil ou ocorre para todos os usuários.
- O comportamento é reproduzível durante a execução do teste automatizado.

## Evidências anexadas

- [Screenshot da falha no Cypress](evidences/images/problem-userBUG-005.png)
- [Vídeo da reprodução do defeito](evidences/videos/problem-userBUG-005.mp4) 