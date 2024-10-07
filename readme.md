# App: Gym Check-Ins

Projeto desenvolvido em conjunto com a equipe da [@Rocketseat](https://github.com/rocketseat-education) com o objetivo de trabalhar design patterns, inversão de dependência, testes automatizados e um pouquinho dos princípios da programação como o SOLID.

## Tecnologias e Ferramentas Utilizadas
<div style="display: flex">
  <img src="https://cdn.iconscout.com/icon/free/png-256/free-node-js-logo-icon-download-in-svg-png-gif-file-formats--nodejs-programming-language-pack-logos-icons-1174925.png?f=webp&w=256" alt="NodeJS" width="40" height="40">
  <img src="https://avatars.githubusercontent.com/u/24939410?v=4" alt="Fastify" width="40" height="40">
  <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/287/square_480/prismaHD.png" alt="Prisma" width="40" height="40">
  <img src="https://miro.medium.com/v2/resize:fit:1080/1*9l9kbbiuFHWVqcjUJZcdYw.png" alt="Zod" width="40" height="40">
  <img src="https://images.opencollective.com/vitest/2b17c7a/logo/256.png" alt="Vitest" width="40" height="40">
</div>

* NodeJS (TypeScript)
* Fastify
* Prisma
* Zod
* Vitest

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não-Funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
