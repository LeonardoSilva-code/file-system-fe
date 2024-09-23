
# File System Front-end

Este projeto foi gerado usando o Angular CLI na versão 15.0.3. Ele é projetado para gerenciar e interagir com um sistema de arquivos por meio de uma aplicação front-end.


## Rodando localmente

### Pré-requisitos

- Node.js (versão 16.x ou superior)
- Angular CLI (versão 15.x)
- Um navegador da web (Google Chrome, Firefox, etc.)


Clonar o repositório:

```bash
 git clone https://github.com/LeonardoSilva-code/file-system-fe.git
 cd file-system-fe
```
Instalar dependências:
```bash
npm install
```
Para iniciar o servidor de desenvolvimento, execute o seguinte comando:
```bash
npm run start
```

### Rodando utilizando docker
Faça build da imagem
```bash
docker build -t file-system-fe .
```

Rode o container na porta 4200
```bash
docker run -p 4200:4200 file-system-fe
```

Acessar o sistema: O sistema será executado localmente no endereço:
```bash
http://localhost:4200
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`apiUrl: "http://localhost:8080"`

