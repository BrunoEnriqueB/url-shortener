# URL Shortener

## Sumário

- [URL Shortener](#url-shortener)
  - [Sumário](#sumário)
  - [Sobre o Projeto](#sobre-o-projeto)
  - [Requisitos do Projeto](#requisitos-do-projeto)
    - [Requisitos Funcionais](#requisitos-funcionais)
    - [Requisitos Não Funcionais](#requisitos-não-funcionais)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Dependências (Docker)](#dependências-docker)
  - [Como Executar Localmente](#como-executar-localmente)
  - [Hospedagem](#hospedagem)
  - [Melhorias](#melhorias)

## Sobre o Projeto

Este projeto é um sistema de encurtador de URLs desenvolvido em [Node.js](https://nodejs.org/en). Ele permite que qualquer pessoa encurte URLs, enquanto usuários autenticados podem gerenciar suas URLs encurtadas. O sistema também conta as visitas para cada URL encurtada e oferece uma API REST para interações.

## Requisitos do Projeto

Nas listas abaixo estão os requisitos funcionais e não funcionais do projeto. Cada item da lista possui um emoji de :white_check_mark: e :x:, que servem para representar qual requisito foi implementado no projeto e qual não foi.

### Requisitos Funcionais

1. :white_check_mark: **Cadastro e Autenticação de Usuários**: O sistema deve permitir o cadastro de usuários e a autenticação via e-mail e senha, retornando um Bearer token.
2. :white_check_mark: **Encurtamento de URLs**: O sistema deve encurtar URLs para no máximo 6 caracteres, com um único endpoint que aceite requisições autenticadas e não autenticadas. O resultado deve ser o URL encurtado, incluindo o domínio.
3. :white_check_mark: **Associação de URLs a Usuários Autenticados**: Qualquer um pode solicitar uma url encurtada. Quando uma URL é encurtada por um usuário autenticado, o sistema deve registrar que a URL pertence a ele.
4. :white_check_mark: **Listagem de URLs com Contagem de Cliques**: Usuários autenticados podem listar suas URLs encurtadas, com a contagem de cliques de cada uma.
5. :white_check_mark: **Edição de URLs**: Usuários autenticados podem atualizar o endereço de destino das URLs encurtadas que possuem.
6. :white_check_mark: **Exclusão Lógica de URLs**: Usuários autenticados podem excluir logicamente suas URLs, utilizando um campo de data de exclusão. Se o campo de exclusão estiver preenchido, a URL é considerada inativa e não deve ser acessível.
7. :white_check_mark: **Contabilização de Acessos**: Cada acesso a uma URL encurtada deve ser contabilizado no sistema.

### Requisitos Não Funcionais

1. :white_check_mark: **Uso da Última Versão Estável do Node.js**: O sistema deve ser construído usando a versão mais recente e estável do Node.js.
2. :white_check_mark: **API REST com Maturidade Nível 2**: A API deve seguir o padrão REST com maturidade nível 2, abrangendo boas práticas de arquitetura.
3. :white_check_mark: **Exclusão Lógica de Registros**: As URLs excluídas logicamente devem ter um campo de data de exclusão e não devem estar acessíveis para leitura ou escrita.
4. :x: **Escalabilidade Vertical**: O sistema deve ser desenvolvido para ser capaz de escalar verticalmente, considerando o ambiente de execução.
5. :white_check_mark: **Logging**: O sistema deve ter um sistema de logs implementado, incluindo logs de erro e informações de uso.
6. :white_check_mark: **Persistência de Dados**: Deve ser usado um banco de dados relacional para armazenamento de informações.
7. :white_check_mark: **Containerização com Docker e Orquestração com Docker Compose**: O sistema deve ser containerizado para facilitar a implantação e a execução do ambiente local.
8. :white_check_mark: **Documentação da API**: A API deve estar documentada com ferramentas como OpenAPI ou Swagger.
9. :white_check_mark: **Validação de Entrada**: Deve haver validação de entrada em todos os lugares necessários para garantir a segurança e integridade dos dados.
10. :x: **Instrumentação para Observabilidade**: Implementação (ou abstração) de logs, métricas e rastreamento para monitoramento do sistema, podendo utilizar ferramentas como Elastic, Datadog, ou Prometheus.
11. :x: **Suporte a Multi-Tenancy (Opcional)**: A arquitetura deve ser adaptável para um cenário multi-tenant (multi-inquilino) caso seja necessário.

## Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/en)**: Plataforma de execução de código JavaScript do lado do servidor.
- **[Express](https://expressjs.com/)**: Framework para criar APIs REST de forma rápida e simples.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[PostgreSQL](https://www.postgresql.org/)**: Banco de dados relacional para armazenamento de dados.
- **[Docker e Docker Compose](https://www.docker.com/)**: Ferramentas para containerização e gerenciamento do ambiente de desenvolvimento.
- **[Winston](https://www.npmjs.com/package/winston)**: Biblioteca de logging para gerenciar e estruturar logs da aplicação.
- **[Jest](https://www.npmjs.com/package/jest)**: Framework de testes para garantir qualidade do código.

## Dependências (Docker)

O projeto utiliza Docker e Docker Compose para simplificar a configuração do ambiente. Os principais serviços definidos no `docker-compose.yml` incluem:

- **database**: Serviço [PostgreSQL](https://www.postgresql.org/) para armazenamento persistente dos dados.
- **api**: Serviço da [API Node.js](https://nodejs.org/en) com todas as dependências instaladas e configuradas.

## Como Executar Localmente

1. **Pré-requisitos**: Certifique-se de ter Docker e Docker Compose instalados no seu sistema.

2. **Configuração de Variáveis de Ambiente**: Copie o arquivo `.env.example` e renomeie-o para `.env`:

   ```bash
   cp .env.example .env

   ```

3. **Iniciar o Docker Compose**: Com todos os arquivos configurados e o Docker em execução, inicie os contêineres com o seguinte comando:

   ```bash
   docker-compose up --build -d

   ```

4. **Acessando a API**: API estará disponível em http://localhost:3000. Agora você pode fazer requisições para os endpoints definidos.

5. **Acessando a documentação**: Uma documentação da API estará disponível em http://localhost:3000/api-docs. Por ela, é possível ver as rotas, seu tipo de requisição e os dados necessários.

6. **Para Encerrar o Projeto**: Para interromper e remover os contêineres, utilize:

   ```bash
   docker-compose down

   ```

## Hospedagem

Este sistema está atualmente hospedado em URL: https://url-shortener-1-23st.onrender.com/api-docs.

## Melhorias

Esse projeto tem um potencial para escalar tanto de forma vertical quanto horizontal, além disso, existem pontos de melhoria de código também, algumas que posso citar são:

- Sistema de cache: utilizar uma tecnologia de cache, como Redis, para diminuir a latencia de resposta na hora de acessar a url;
- Mais testes: Aumentar a quantidade de testes unitários e implementar testes de integração. Além de utilizar testes de carga para entender a capacidade de acesso e tempo de resposta da aplicação;
- Por ser um pequeno projeto, não foi construido com a preocupação de "colisão de urls". Portanto, implementar um algoritmo que evite isso seria necessário em um cenário mais escalável;
