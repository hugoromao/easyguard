# EasyGuard: Gerador de senhas seguras e memoráveis

<p align="center"><img src="./public/survey1.png" alt="EasyGuard" height="200" /></p>

Este repositório está vinculado ao artigo "Construção e teste de app gamificado gerador de senhas seguras e memoráveis: Um estudo exploratório em cibersegurança", de Hugo Lima Romão e Marcelo Henrique Oliveira Henklain.

Resumo do Artigo: _"Embora o uso de serviços on-line tenha aumentado substancialmente na última década, a força das senhas criadas pelos usuários se manteve em níveis preocupantes. O objetivo deste estudo foi desenvolver e avaliar a eficiência de aplicativo gamificado em relação ao desenvolvimento do comportamento de “projetar senhas fortes”. Avaliamos os aspectos da ferramenta a partir de um estudo com cinco participantes durante o período de nove dias. Em comparação com os algoritmos de geração de senhas convencionais, verificamos que as senhas geradas por nossa aplicação desempenharam 40,89% melhor em teste de memorização, 12,19% melhor em teste de digitação e 15,63% melhor em teste combinado. Nossa abordagem se mostrou promissora no ensino de técnicas que combinam senhas fortes e mais memoráveis."_

## Resumo

O gerador de senhas EasyGuard oferece uma estratégia para a criação de senhas fortes e memoráveis a partir de entradas significativas do usuário. Nosso objetivo principal com essa aplicação é o desenvolvimento do comportamento de “Projetar senhas fortes”. Nesse repositório, apresentamos os links de acesso e
instalação, os procedimentos para execução do projeto em máquina local e as configurações utilizadas durante a coleta de dados.

## Acesso público ao EasyGuard

O projeto proposto é disponibilizado de duas formas. A primeira, na Internet, como uma aplicação web, a partir do endereço <https://easyguard.vercel.app>. A segunda forma é por meio da instalação de um aplicativo Android, disponível no endereço <https://play.google.com/store/apps/details?id=app.hugoromao.gamified_password_generator.twa>.

## Executando o projeto localmente

### Requisitos

- Node.js 18.20.3 ou mais recente.

Clone e acesse a pasta do projeto em sua máquina:

```
git clone https://github.com/hugoromao/easyguard
cd easyguard
```

Instale as dependências do projeto:

```
npm install
```

Inicie o servidor web em versão de desenvolvimento:

```
npm run dev
```

Você pode acessar a aplicação a partir do endereço http://localhost:3000/. Por padrão a aplicação utiliza a porta 3000.

### Passos adicionais para execução dos testes descritos no artigo

Utilizamos uma sessão especial na aplicação para condução dos testes que envolvem a avaliação das senhas geradas e conhecimento sobre senhas fortes. Isso envolve a configuração de um servidor de banco de dados para o armazenamento dos resultados. Os códigos a seguir descrevem o passo a passo necessário para reprodução dos testes utilizados no artigo.

### Requisitos

- Docker 26.1.1 ou mais recente
- Docker Compose v2.27.0 ou mais recente

Construa a imagem e suba o container Docker utilizando o Docker Compose. Certifique-se de que a porta 5400 está disponível:

```
docker compose build
docker compose up -d
```

Crie um arquivo `.env` e adicione o seguinte conteúdo:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5400/postgres?schema=public"
```

Execute os seguintes comandos para gerar os tipos e as tabelas do banco:

```
npx prisma generate
npx prisma migrate deploy
```

Inicie o servidor web em versão de desenvolvimento. Por padrão a aplicação utiliza a porta 3000:

```
npm run dev
```

Você pode acessar a aplicação a partir do endereço http://localhost:3000/. Os formulários dos testes podem ser acessados pela página de configurações a partir do botão “Avaliação em laboratório” ou em http://localhost:3000/estudo.
