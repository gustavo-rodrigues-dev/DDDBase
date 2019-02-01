[![Linux Status](https://travis-ci.org/gustavobeavis/DDDBase.svg?branch=master)](https://travis-ci.org/gustavobeavis/DDDBase)
[![Windows status](https://ci.appveyor.com/api/projects/status/jl9q4md2o764optc?svg=true)](https://ci.appveyor.com/project/gustavobeavis/dddbase)
[![Maintainability](https://api.codeclimate.com/v1/badges/9b85c68febc056b5e377/maintainability)](https://codeclimate.com/github/gustavobeavis/DDDBase/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9b85c68febc056b5e377/test_coverage)](https://codeclimate.com/github/gustavobeavis/DDDBase/test_coverage)
[![Daviid Dependencies](https://david-dm.org/gustavobeavis/DDDBase.svg)](https://david-dm.org/gustavobeavis/DDDBase)
[![Daviid Dependencies](https://david-dm.org/gustavobeavis/DDDBase/dev-status.svg)](https://david-dm.org/gustavobeavis/DDDBase?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/gustavobeavis/DDDBase/badge.svg?targetFile=package.json)](https://snyk.io/test/github/gustavobeavis/DDDBase?targetFile=package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


# DDD Boilerplate
Esse projeto tem o objetivo de demonstrar uma arquitetura HEXAGONAL na prática, com algumas estratégias mais flexíveis de exposição, seja ela HTTP ou gRPC, no caso de HTTP, a exposição pode ser feita tanto como uma aplicação Server convencional assim como uma aplicação Lambda (HTTP)

Esse projeto tem como objetivo demonstrar alguns conceitos de arquitetura de software, de modo que a camada de negocio e dominio não se preocupe com onde e como os dados serão persistidos, assim como ela também não se preocupe com a forma que será exposta, uma vez que todo software tem como final streams de entrada e saída, (readables e writables streams), portanto no nosso caso implementamos uma exposição utilizando HTTP e outra GRPC afim de demonstrar que um dominio bem implementado não precisa de uma refatoração para passar a atender em outro protocolo, assim como um dominio bem implementado não precisa ser vinculado ao banco ou forma que o dado será persistido e sim em seus repositórios que fornecem uma camada de funções para acessar esses registros.

## Estrutura

- database
    - migrations
    - seeders
- log
- server
    - nginx
- src
    - config
        - domain
            - common
    - exceptions
    - infrastructure
        - repositories
        - services
        - store
            - document
            - graph
            - keyvalue
            - relational
    - lib
    - presentation
        - grpc
            - proto
            - routes
            - server
            - middlewares
        - http
            - common
                - routes
            - server
                - middlewares
                - routes
            - serverless
                - middlewares
                - routes
- test
    - e2e
        - fixtures
        - grpc
        - http
    - unit
        - domain
        - infraestructure


### database/migrations
Pasta destinada as Database Migrations que nos permitem controlar a versão do banco de dados, evitando a necessidade de escrever scripts SQL diretamente e executá-los em ferramentas de administração. Com as Database Migrations (ou Schema Migrations), alterações incrementais nas bases de dados são feitas de forma gerenciada. 

no caso do Sequelize que é a lib default, a referência de codificação é essa:
http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-model-and-migration- 

### database/seeders
Assim como a migrations, também servem para inserções incrementais no banco, mas ao invés de estrutura, os seeders são destinados a dados pelos quais queremos inserir, como cargas iniciais.

No caso do Sequelize, que é o ORM default do projeto, a referência de como usar é essa:
http://docs.sequelizejs.com/manual/tutorial/migrations.html#creating-first-seed
  
### server
Nessa pastas, estão todas as configurações do servidor, que serão utilizadas nos containers da aplicação

### src/config
Nessa pasta, encontra-se todas as configurações da aplicação, responsáveis por habilitar ou desabilitar funções, ou mesmo, configurações de serviço
### src/domain
Nessa camada estarão todas as regras pertinentes ao negócio, incluindo seus controladores excessões, podendo ter diretórios auxiliares para lidar com camadas de validação, transformação, etc. Mas lembre-se que essa camada não deve abstrair camada de dados, ela deve usa-la conforme a regra, assim como não deve abstrair camadas de exposição do serviço, rotas, e afins. Sua finalidade e concentrar regras de negócio.

### src/presentation/http/
Nessa camada, estão todos os middlewares de exposição do serviço, podendo ter um ou vários, no nosso caso, temos um middleware comum, com configurações que atendem tanto aplicações Server/Container convencional, assim com um middleware de exposição preparado para AWS Lambda. é nessa camada onde vamos expor nossas rotas, assim como definir middlewares de segurança e transformação de dados vinda da camada HTTP.

### src/presentation/grpc/
Nessa camada, temos a exposição GRPC, assim como HTTP, ela tem seus proprios routes, configs e middlewares, de modo que está desacoplada a camada de deominio.

### test/e2e
Sessão responsável por conter todos os testes de integração, ou seja, os testes das rotas propriamente ditas, por ser um projeto BDD, nessa sessão recomenda-se um arquivo por arquivo de rota, de modo que você implemente o teste de todos ou dos principais comportamentos por rota.

### test/unit
Área responsável por conter todos os testes unitários do projeto, ou seja, todas as classes e funções utilitárias de modo individual. 

## Configuração de ambiente

### Inicio
Para Instalar todas as dependências do projeto, assim como já executar as configurações do serviço, como construção do banco de dados, basta executar os comando abaixo, seguindo a mesma sequência.

```bash
npm install
```

```bash
docker-compose up postgress
```
Para rodar todos os migrations
```bash
npm run db:migrate
```

Para rodar todos os seeders
```bash
npm run db:seeder
```

### Executando a aplicação em Container
Essa modalidade consiste em executar a aplicação utilizando o docker-compose já com um banco de dados Postgress, um Proxy reverso com nginx, e exposto tanto pelo Proxy, Aplicação interna e ainda com o modo debug já configurado. Lembrando que isso deve ser feito após a etapa anterior, assim como para executar a aplicação baseada em Lambda, você pode pular essa etapa.

** Para executar a aplicação ** 
```bash
docker-compose up
```

** Acessos **
- aplicação com nginx: http://localhost:8080 
- aplicação: http://localhost:3000
- Debug
    - porta: 5858

### Executando a aplicação em modo Serverless com AWS SAM
Para executar a aplicação internamente simulando uma invocação handler, é necessário que você instale o AWS SAM CLI no seu computador https://docs.aws.amazon.com/pt_br/lambda/latest/dg/sam-cli-requirements.html

Feito isso, basta executar a aplicação, lembrando que caso tenha optado pelo banco de dados em container, você terá que executar esse comando primeiro.

**Instalando**
```bash
npm run build:serverless
```
Esse comando além de instalar, já move os arquivos para os seus respectivos diretórios;

**Inicializando**
```bash
sam local start-api --debug-port 5858
```
ou 
```bash
sam local start-api
```

### Teste
Para execução de testes unitários e funcionais

```bash
npm test
```

Para verificar a cobertura de teste
```bash
npm run cover
```

### lint
Para verificar se o código está dentro do padrão standard js

```bash
npm run lint
```

Para verificar e corrigir automaticamente para o padrão standard js, caso não corrija ele aponta onde deve ajustar

```bash
npm run lint:fix
```

### Debug

Caso você use [VSCode](https://code.visualstudio.com/docs/editor/debugging) você pode usar a configuração abaixo e depurar em tempo de execução 

**.vscode/launch.json**
```json
{
    "version": "0.2.0",
    "configurations": [
    {
        "type": "node",
        "request": "launch",
        "name": "Launch via NPM",
        "runtimeExecutable": "npm",
        "runtimeArgs": [
            "run",
            "debug"
        ],
        "port": 9229
    },
    {
        "name": "Attach to SAM Local",
        "type": "node",
        "request": "attach",
        "address": "localhost",
        "port": 5858,
        "localRoot": "${workspaceRoot}/dist",
        "remoteRoot": "/var/task",
        "protocol": "inspector"
    }
  ]
}
```
### Documentação da API
**./swagger.yml**

**[Postman](https://www.getpostman.com/collections/b7677f62b2f8847a7193)**

### Referências
 - Palestra sobre DDD e Node.JS [Slides - meetup](https://www.slideshare.net/gustavobeavis/indo-alem-domvcnodejs)
 - [Implementing SOLID and the onion architecture in Node.js](https://dev.to/remojansen/implementing-the-onion-architecture-in-nodejs-with-typescript-and-inversifyjs-10ad)
- [12 Fator](https://12factor.net/pt_br/)
- [System design primer](https://github.com/donnemartin/system-design-primer/)
- [P of EAA](https://martinfowler.com/books/eaa.html)
## License

  [MIT](LICENSE)
