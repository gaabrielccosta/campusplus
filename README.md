# Matriculas - Aplicação sobre Estudantes de IES

Este projeto é uma aplicação desenvolvida para gerenciar informações sobre estudantes matriculados nos cursos das Instituições de Ensino Superior (IES) do Brasil. A aplicação utiliza React no frontend e Spring Boot no backend, com o objetivo de demonstrar a integração dessas tecnologias no contexto de um projeto acadêmico da matéria de Projeto e Arquitetura de Software.

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Spring Boot
- **Banco de Dados**: Postgress
- **Ferramentas de Build**: Maven

## Instalação

### Pré-requisitos

Antes de começar, verifique se você tem os seguintes requisitos instalados:

- Java 8 ou superior
- Maven
- Node.js (para o frontend)
- npm ou yarn (gerenciadores de pacotes para o frontend)

### Backend (Spring Boot)

1. Clone o repositório:

    ```bash
    git clone https://github.com/JoaoBufon/matriculas.git
    cd matriculas
    ```

2. Navegue até a pasta do backend e execute:

    ```bash
    ./mvnw spring-boot:run
    ```

O servidor backend estará disponível na URL `http://localhost:8080`.

### Frontend (React)

1. Acesse a pasta do frontend:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    yarn
    ```

3. Execute a aplicação:

    ```bash
    yarn start
    ```

O frontend estará disponível na URL `http://localhost:3000`.

## Funcionalidades

- Gerenciamento de estudantes matriculados.
- Exibição de cursos disponíveis nas IES.
- Cadastro e listagem de estudantes e suas matrículas.

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests para sugestões ou melhorias. Toda contribuição é bem-vinda!

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
