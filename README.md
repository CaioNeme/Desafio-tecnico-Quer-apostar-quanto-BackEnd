# Desafio Técnico - Quer apostar quanto?

### Proposta do Projeto:

Apostar com os amigos e amigas no resultado de um jogo de futebol nunca foi novidade, afinal, a rivalidade faz parte do jogo. Entretanto, essa realidade ganhou uma nova dimensão nos últimos anos. Inúmeros aplicativos diferentes surgiram com essa proposta, onde o fluxo (simplificado) basicamente é:

- Uma série de eventos esportivos que vão acontecer aparecem para o usuário;
- O usuário faz uma aposta dentro de um evento esportivo (por exemplo, em quem será o vencedor entre uma partida de futebol do Flamengo contra o Botafogo).
- O evento esportivo acontece e, caso o usuário tenha acertado, recebe um valor.

##

### Funcionalidades e Rotas:

- ###### POST /participants

  - Cria um participante com determinado saldo inicial.
  - Entrada:

  ```js
  {
    name: string;
    balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
  }
  ```

  - Saida

  ```js
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    balance: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
  }
  ```

- ###### POST /games

  - Cria um novo jogo, com placar inicial 0x0 e marcado como não finalizado.
  - Entrada:

  ```js
  {
    homeTeamName: string;
    awayTeamName: string;
  }
  ```

  - Saída:

  ```js
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number; // inicialmente 0
    awayTeamScore: number; // inicialmente 0
    isFinished: boolean; // inicialmente false
  }
  ```

- ###### POST /bets

  - Cadastra uma aposta de um participante em um determinado jogo. O valor da aposta deve ser descontado imediatamente do saldo do participante.
  - Entrada:

  ```js
  {
    homeTeamScore: number;
    awayTeamScore: number;
    amountBet: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
    gameId: number;
    participantId: number;
  }
  ```

  - Saída:

  ```js
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamScore: number;
    awayTeamScore: number;
    amountBet: number; // representado em centavos, ou seja, R$ 10,00 -> 1000
    gameId: number;
    participantId: number;
    status: string; // podendo ser PENDING, WON ou LOST
    amountWon: number || null; // nulo quando a aposta ainda está PENDING; number caso a aposta já esteja WON ou LOST, com o valor ganho representado em centavos
  }
  ```

- ###### POST /games/:id/finish

  - Finaliza um jogo e consequentemente atualiza todas as apostas atreladas a ele, calculando o valor ganho em cada uma e atualizando o saldo dos participantes ganhadores.
  - Entrada:

  ```js
  {
    homeTeamScore: number;
    awayTeamScore: number;
  }
  ```

  - Saída:

  ```js
  {
    id: number;
    createdAt: string;
    updatedAt: string;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
  }
  ```

- ###### GET /participants

  - Retorna todos os participantes e seus respectivos saldos.
  - Saída:

  ```js
  [
    {
      id: number,
      createdAt: string,
      updatedAt: string,
      name: string,
      balance: number, // representado em centavos, ou seja, R$ 10,00 -> 1000
    },
    {...}
  ]
  ```

- ###### GET /games
  - Retorna todos os jogos cadastrados.
  - Saída:
  ```js
    [
      {
        id: number,
        createdAt: string,
        updatedAt: string,
        homeTeamName: string,
        awayTeamName: string,
        homeTeamScore: number,
        awayTeamScore: number,
        isFinished: boolean,
      },
      {...}
    ]
  ```
- ###### GET /games/:id

  - Retorna os dados de um jogo junto com as apostas atreladas a ele.
  - Saída:
    ```js
    {
      id: number,
      createdAt: string,
      updatedAt: string,
      homeTeamName: string,
      awayTeamName: string,
      homeTeamScore: number,
      awayTeamScore: number,
      isFinished: boolean,
      bets: [
        {
          id: number,
          createdAt: string,
          updatedAt: string,
          homeTeamScore: number,
          awayTeamScore: number,
          amountBet: number, // representado em centavos, ou seja, R$ 10,00 -> 1000
          gameId: number,
          participantId: number,
          status: string, // podendo ser PENDING, WON ou LOST
          amountWon: number || null, // nulo quando a aposta ainda está PENDING; number caso a aposta já esteja WON ou LOST, com o valor ganho representado em centavos
        },
        {...}
      ]
    }
    ```

##

### Tecnologias:

- TypeScript;
- Node + Express;
- Prisma (ORM);
- Postgres;
- Jest e Supertest.

##

### Como rodar o projeto:

1. Clone esse repositório.
2. Instale as dependências `npm i`.
3. Crie um banco de dados PostgreSQL com o nome que desejar.
4. Configure o `.env`,`.env.development` e `.env.test` usando o arquivo `.env.example`.
5. Execute todas as migrações `npm run dev:migration:run`.
6. Seed do Banco `npm run dev:seed`.
7. Rode o back-end usando o comando `npm run dev`.

##

### Como Rodar os testes:

1. Clone esse repositório.
2. Instale as dependências `npm i`.
3. Crie um banco de dados PostgreSQL com o nome que desejar.
4. Configure o `.env`,`.env.development` e `.env.test` usando o arquivo `.env.example`.
5. Aplique as migrações `npm run test:migration:run`.
6. Rode os tests `npm run test`

##

### Build:

```bash
  npm run build
  npm start
```

### Implementações futuras:

- Rotas novas que retornem estatísticas dos jogos e/ou apostas.
- Filtro de buscas via `query string` para as rotas GET (ex: filtrar status dos jogos, nome do time, etc).
- Paginação via _query string_ para rotas que retornam muitos resultados.
- Documentação das rotas implementadas com o Swagger (ou plataformas semelhantes).
- Dockerizar o projeto (Docker + Docker Compose).

##

### Colaboradores

- <a href="https://github.com/CaioNeme"> Caio Neme </a>

##

### Deploy

<a href="https://querapostarapi.onrender.com/health">Clique Aqui!</a>
