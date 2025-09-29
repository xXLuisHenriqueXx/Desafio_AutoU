# Desafio Categorizador de Email

Esse projeto consiste em um categorizador de e-mail com auxílio de IA, para o desafio proposto pela empresa AutoU.

## Funcionalidades

- Upload de arquivos .pdf ou .txt
- Inserção de texto puro
- Análise do e-mail com base no conteúdo
- Categorização e resposta automática para o e-mail enviado

## Tecnologias

- Vite
- TailwindCSS
- TypeScript
- Python
- FastAPI

## Como executar

Clone o repositório com o comando:

```
git clone https://github.com/xXLuisHenriqueXx/Desafio_AutoU.git

cd Desafio_AutoU
```

#### Frontend

Acesse a pasta do frontend com o comando:

```
cd frontend
```

Instale as dependências com o comando:

```
npm install
```

Execute o server de desenvolvimento com o comando:

```
npm run dev
```

#### Backend

Acesse a pasta do backend com o comando:

```
cd backend
```

Crie um arquivo .env na base do projeto com a chave OPENAI_API_KEY

```
OPENAI_API_KEY=sua_chave
```

Construa o container com o comando:

```
docker compose up --build -d
```

Acesse o projeto em https://frontend-production-20f6.up.railway.app/ no seu navegador.

## Estrutura do projeto

backedn/
- app/ - arquivos de funcionamento do backend

frontend/
- assets/ - arquivos de imagem
- src/ - arquivos de dom com TS
- index.html - arquivo de marcação que define o site
