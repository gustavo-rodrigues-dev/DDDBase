[![Linux Status](https://travis-ci.org/gustavobeavis/DDDBase.svg?branch=master)](https://travis-ci.org/gustavobeavis/DDDBase)
[![Windows status](https://ci.appveyor.com/api/projects/status/jl9q4md2o764optc?svg=true)](https://ci.appveyor.com/project/gustavobeavis/dddbase)
[![Coverage Status](https://coveralls.io/repos/github/gustavobeavis/DDDBase/badge.svg?branch=master)](https://coveralls.io/github/gustavobeavis/DDDBase?branch=master)
[![codebeat badge](https://codebeat.co/badges/e9a671f2-8bc0-41ff-95bd-24d404f547cb)](https://codebeat.co/projects/github-com-gustavobeavis-dddbase-master)
[![Daviid Dependencies](https://david-dm.org/gustavobeavis/DDDBase.svg)](https://david-dm.org/gustavobeavis/DDDBase)
[![Daviid Dependencies](https://david-dm.org/gustavobeavis/DDDBase/dev-status.svg)](https://david-dm.org/gustavobeavis/DDDBase?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/gustavobeavis/DDDBase/badge.svg?targetFile=package.json)](https://snyk.io/test/github/gustavobeavis/DDDBase?targetFile=package.json)

# DDD Boilerplate

Esse projeto tem o objetivo de demonstrar uma arquitetura ONION na prática, com algumas estratégias mais flexíveis de exposição, podendo ser servida como uma aplicação server convencional, serverless, e em breve cli.

Esse projeto é dividido em dois grandes blocos, a primeira, na camada de Domain, onde são resolvidas todas as regras de negócio da API, sem nenhuma interferência de agentes externos diretamente, exceto pelo uso das Repositories, que abstraem toda a regra de persistência da aplicação. Já o segundo pilar, consiste numa camada de Infraestructure modular, que contem uma camada de dados e de abstração, podendo facilmente interoperar com diferentes modalidades de Banco de dados, e também uma camada de middleware http, onde, temos agentes incomuns tanto na exposição da aplicação como serverless assim como numa aplicação server convencional, flexibilizando o processo de tomada de decisão ou mudança de escopo.

## Estrutura

- database
    - migrations
    - seeders
- log
- public
- server
- src
    - config
    - domain
        - ownBusiness
            - controllers
        - exceptions
-  infrastructure
    - factories
    - http
        - middlewares
            - common
            - server
                - middlewares
                - routes
            - serverless
                - middlewares
                - routes
    - repositories
        - exceptions
        - relational
            - schemas
        - ownRepository,js

- test
    - functional
    - unit
    
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

### ser/config
Nessa pasta, encontra-se todas as configurações da aplicação, responsáveis por habilitar ou desabilitar funções, ou mesmo, configurações de serviço
### src/domain
Nessa camada estarão todas as regras pertinentes ao negócio, incluindo seus controladores excessões, podendo ter diretórios auxiliares para lidar com camadas de validação, transformação, etc. Mas lembre-se que essa camada não deve abstrair camada de dados, ela deve usa-la conforme a regra, assim como não deve abstrair camadas de exposição do serviço, rotas, e afins. Sua finalidade e concentrar regras de negócio.

### src/infrastructure/http/
Nessa camada, estão todos os middlewares de exposição do serviço, podendo ter um ou vários, no nosso caso, temos um middleware comum, com configurações que atendem tanto aplicações Server/Container convencional, assim com um middleware de exposição preparado para AWS Lambda. é nessa camada onde vamos expor nossas rotas, assim como definir middlewares de segurança e transformação de dados vinda da camada HTTP.

### src/infrastructure/factories
Nessa sessão encontram-se todos os wrapers, fatories e singletons de configuração e uso de recursos da aplicação já atendendo as expectativas do serviço, como instancia do datasource e do logger.

### test/functional
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
