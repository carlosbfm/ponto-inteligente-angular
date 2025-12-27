# Ponto Inteligente - Frontend Angular

Este projeto representa o frontend de um sistema de controle de ponto eletrônico, desenvolvido em **Angular** focado em produtividade, segurança e integração com APIs RESTful.

## 🚀 Tecnologias e Padrões
* **Angular Moderno**: Uso de **Standalone Components** para uma arquitetura mais leve.
* **Lazy Loading**: Carregamento sob demanda de rotas para otimização de performance.
* **Angular Material**: Interface baseada em componentes profissionais (SnackBar, Tabelas, Formulários).
* **RxJS**: Gerenciamento reativo de dados e requisições HTTP.

## 🔒 Segurança de Rotas (Guards)
O sistema utiliza **Guards Funcionais** (`CanActivateFn`) para garantir a integridade do acesso:

* **AuthGuard**: Protege as rotas internas. Caso o usuário não possua um token válido, ele é redirecionado ao login com a mensagem "Por favor, faça o login" via `MatSnackBar`.
* **AdminGuard**: Valida se o usuário autenticado possui o perfil `ROLE_ADMIN` antes de permitir o acesso às funcionalidades de gestão.

[Image of Angular router navigation guard flow with login redirect]

## 🛠️ Configuração de Desenvolvimento e CORS
Para evitar erros de **CORS** (Cross-Origin Resource Sharing) durante o desenvolvimento, o projeto utiliza um **Servidor Proxy**:

1.  **Arquivo `proxy.conf.json`**: Redireciona chamadas feitas para `/api` para o backend no `localhost:8080`.
2.  **Ambientes Dinâmicos**: O `environment.development.ts` está configurado para utilizar o prefixo `/api`, permitindo que o Angular intercepte as requisições e resolva a comunicação entre portas diferentes.

[Image of Angular proxy server architecture]

## 🏃 Como Rodar o Projeto
1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor com o proxy ativo:
    ```bash
    npm start
    ```
    *Nota: O comando `npm start` foi configurado para rodar `ng serve --proxy-config proxy.conf.json`.*

## 📂 Estrutura de Pastas
* `src/app/autenticacao`: Fluxos de Login e Cadastro (PF/PJ).
* `src/app/funcionario`: Visualização de lançamentos e registro de ponto.
* `src/app/admin`: Edição, exclusão e gestão de pontos.
* `src/app/shared`: Serviços base, modelos de dados e guardas de segurança.

## 📄 Funcionalidades Implementadas
- [x] Autenticação via JWT.
- [x] Cadastro de Pessoa Física e Jurídica.
- [x] Lançamento de pontos com localização temporal.
- [x] Listagem paginada de registros.
- [x] Proteção hierárquica de rotas.