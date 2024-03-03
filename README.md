# Template Back-End

<!-- TOC -->

- [Template Back-End](#template-back-end)
  - [Descrição](#descrição)
  - [Pré requisitos](#pré-requisitos)
  - [Instalação](#instalação)
  - [Cadastrando o módulo no **Core**](#cadastrando-o-módulo-no-core)
  - [Iniciando a aplicação](#iniciando-a-aplicação)
    - [Development](#development)
    - [Debug](#debug)
  - [Testes](#testes)
    - [Executando testes unitários](#executando-testes-unitários)
- [Conhecendo o **Template**](#conhecendo-o-template)
  - [Principais Tecnologias utilizadas](#principais-tecnologias-utilizadas)
  - [Documentação dos endpoints com Swagger OpenAPI](#documentação-dos-endpoints-com-swagger-openapi)
  - [Rota de login usando token do **Core**](#rota-de-login-usando-token-do-core)
  - [Rota para carregar as permissões do Template](#rota-para-carregar-as-permissões-do-template)
  - [Migrações](#migrações)

## Descrição

**Modelo** de projeto backend para servir de guia e base para todos os projetos futuros dos módulos do **Core**.

## Pré requisitos

1. Node v16 instalado;
2. Conexão com Banco de dados Microsoft SQLServer;
3. Conexão com uma instância do **Core** (para funcionamento adequado das rotas de login e verify);

## Instalação

1. Instale o gerenciador de pacotes do yarn, caso já tenha instalado ignore este passo:

```bash
$ npm install --global yarn
```

2. Execute o yarn para instalar todas as dependências:

```bash
$ yarn install
```

3. Crie o banco do projeto com o Microsoft SQLServer.

4. Na raiz do projeto há um arquivo de exemplo: (`.env.example`) com os dados necessários a serem preenchidos:

**Exemplo:**

```
* APP_PORT=porta-da-api;
* DATABASE_PORT=porta-do-banco;
* DATABASE_HOST=endereco-do-banco;
* DATABASE_USER=usuario-do-banco;
* DATABASE_PASSWORD=senha-do-banco;
* DATABASE_NAME=nome-do-banco;
* JWT_SECRET=senha-token-jwt;
* CORE_API_BASE_URL=url-core-backend;
```

_Obs: Preencha os dados do **DATABASE** conforme o passo **3**._

## Cadastrando o módulo no **Core**

1. Para cadastrar um novo módulo ao **Core** pode seguir os passos da [documentação](https://denso2.gitlab.io/core/documentacao/docs/visao-geral/novo-modulo).
2. Após cadastrado um novo módulo, certifique-se de adicionar ao menos 1 permissão do módulo cadastrado para poder acessá-lo, [mais informações](https://denso2.gitlab.io/core/documentacao/docs/visao-geral/permissoes-de-usuarios).
3. Certifique-se de que o código (coluna **name**) gerado no cadastro é o mesmo do NAME_MODULE presente no arquivo:

```
src/common/constants.ts
```

## Iniciando a aplicação

### Development

```bash
$ yarn start:dev
```

### Debug

```bash
$ yarn start:debug
```

## Testes

### Executando testes unitários

```bash
$ yarn run test
```

# Conhecendo o **Template**

## Principais Tecnologias utilizadas

1. [NestJs](https://docs.nestjs.com) - Framework para backend para desenvolvimento em TypeScript em cima do Node.js.<br>
2. [TypeORM](https://typeorm.io) - ORM para fazer o mapeamento relacional das entidades com as tabelas do banco de dados do projeto e as operações de persistência, consulta e migrações.<br>
3. [Passport JWT](http://www.passportjs.org/docs) - Modulo de autenticação de endpoints utilizando Json Web Token. Funciona por cima de api's com arquitetura RESTful.<br>
4. [JestJS](https://jestjs.io/docs/getting-started) - Framework de teste unitário de código aberto em JavaScript.<br>
5. [Swagger OpenAPI](https://docs.nestjs.com/openapi/introduction) - Módulo para gerar documentação automatizada dos endpoints da api.<br>

## Documentação dos endpoints com Swagger OpenAPI

Para consultar a documentação do OpenAPI:

- Inicie a aplicação;
- Rota utilizada para consultar documentação no **Template**: **{host}**/api
  <br></br>

**Exemplo:**:

```
http://localhost:8080/api
```

A documentação do OpenAPI mapeia:
<br></br>

- Todo os endpoints.
- Seus possíveis retornos.
- E os schemas dos objetos exibindo todas as propriedades e tipos.

Para mais informações consultar a documentação do [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction)

## Rota de login usando token do **Core**

Rota utilizada para login no **Template**: **{host}**/auth/login

**Exemplo:**

```
http://localhost:8080/auth/login
```

Utilizasse o token gerado no **Core** no body da requisição do login do **Template**.
Feita a requisição são realizadas verificações das informações contidas no token que contém:

```
{
  "employee_code": "nucleo_dnaz",
  "iat": 1670866056,
  "exp": 1670952456,
  "iss": "nucleo-api"
}
```

Para verificar a veracidade do token, o nível de acesso e o usuário que está acessando o **Template** são feitas requisiçõe ao **Core**, com a finalidade de:

1. Carregar as permissões de acesso que o usuário tem das funcionalidades do **Template**.
2. Verificar a existência do usuário no sistema **Core** e registrar na base de dados do **Template**.

Ao finalizar é gerado o token de acesso do **Template**.

## Rota para carregar as permissões do Template

Rota utilizada pelo **Core** para carregar as permissões das funcionalidades ao se cadastrar um novo módulo: **{host}**/feature
<br></br>
**Exemplo:**

```
http://localhost:4000/feature
```

Esta rota é publica e pode ser feita requisição nem necessidade de um token de autenticação.

**Exemplo:** da lista de permissões carregada:

```
[
    {
        "name": "PERMISSION_X",
        "pretty_name": "permissão x",
        "description": "O usuário possui a permissão x"
    },
    {
        "name": "PERMISSION_Y",
        "pretty_name": "permissão y",
        "description": "O usuário possui a permissão y"
    },
    {
        "name": "PERMISSION_Z",
        "pretty_name": "permissão z",
        "description": "O usuário possui a permissão z"
    }
]
```

## Migrações

O **Template** usa migrações utilizando **TypeORM**, onde foi configurado que ao inciar o projeto sempre rode novas migrações que ainda não foram executadas.
<br>Para tal há o registro de migrações na tabela **migrations**, que persiste cada nova migração no projeto impedindo que há mesma execute novamente.

| Colunas   | Descrição                                                              |
| --------- | ---------------------------------------------------------------------- |
| id        | identificador unico do registro                                        |
| timestamp | data e horário em que ocorreu a migração, representado em milisegundos |
| name      | nome do arquivo da migração                                            |

É possível adicionar novas migrações, executando o comando no terminal:

```bash
$ yarn migration:create
```

Será adicionado um novo arquivo de migração em:

```
src/database/migrations/
```

O arquivo apresentará essa estrutura no nome:

```
1672773909349-migration.ts
```

- O prefixo númerico é o timestamp de quando foi gerado o arquivo, representado em milisegundos.
- **migration** é o nome da migração, esse valor pode ser renomeado com um resumo da alteração que será feita no banco de dados.
  <br></br>

O arquivo já estará com a estrutura utilizado pelo **TypeORM**,
sendo necessário inserir as irformações da alteração que será feita no banco de dados e renomear o arquivo.
Para mais informações, [TypeORM Migrations](https://typeorm.io/migrations).
