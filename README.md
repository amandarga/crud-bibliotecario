## CRUD Biblioteca

## Pre-requisitos
Para a execução desse projeto localmente, você precisará instalar:
<ul>
  <li>Node.js (versão 14+)</li>
  <li>MySQL (instalado e configurado)</li>
  <li>Navegador Web (para ter acesso a interface</li>
</ul>

---

## Instalação e Configuração

### 1. Clonar o repositório

```bash
git clone https://github.com/amandarga/crud-bibliotecario.git
cd crud-bibliotecario
```
### 2. Configurar o banco de dados no MySQL
 - Crie um banco de dados chamado crud-cdd no MySQL
 - Execute o script sql "CREATE CDD" disponibilizado para criar a tabela na pasta banco-de-dados.
 - (OPCIONAL) Execute o script "INSERT CDD" para inserir algumas colunas

### 3. Configurar o backend
- Instale as dependencias do projeto
```bash
cd backend
npm install
```
- Edite o arquivo .env com as configurações do ambiente
```.env
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=crud_cdd
```
O servidor irá rodar na porta 3000

- Inicie o servidor
```bash
node server.js
```

### 4. Execute o frontend
- Abra o arquivo index.html que está na pasta frontend com o seu navegador
- Com isso a interface irá se conectar com o backend
