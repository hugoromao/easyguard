# EasyGuard: Gerador de senhas seguras e memoráveis

<p align="center"><img src="./public/survey1.png" alt="EasyGuard" height="200" /></p>

Este repositório está vinculado ao artigo "Construção e Teste de App Gamificado Gerador de Senhas Fortes e Memoráveis: Um Estudo Exploratório", de Hugo Lima Romão, Marcelo Henrique Oliveira Henklain, Felipe Leite Lobo e Eduardo Luzeiro Feitosa.

Resumo do Artigo: _"O objetivo deste estudo foi desenvolver e avaliar a eficiência de app gamificado em relação ao desenvolvimento do comportamento de “projetar senhas fortes”. Avaliamos sua eficiência em um estudo com 10 participantes, durante nove dias. Em comparação com o algoritmo de geração de senhas convencional, verificamos que as senhas geradas por nosso app desempenharam 40,89\% melhor em teste de memorização, 12,19\% melhor em teste de digitação e 15,63\% melhor em teste combinado. Nossa abordagem se mostrou promissora no ensino de técnicas que combinam senhas fortes e mais memoráveis."_

## Resumo

O gerador de senhas EasyGuard oferece uma estratégia para a criação de senhas fortes e memoráveis a partir de entradas significativas do usuário. Nosso objetivo principal com essa aplicação é o desenvolvimento do comportamento de “Projetar senhas fortes”. Nesse repositório, apresentamos os links de acesso e
instalação, os procedimentos para execução do projeto em máquina local e as configurações utilizadas durante a coleta de dados.

## Acesso público ao EasyGuard

O projeto proposto é disponibilizado de duas formas. A primeira, na Internet, como uma aplicação web, a partir do endereço <https://easyguard.vercel.app>. A segunda forma é por meio da instalação de um aplicativo Android, disponível no endereço <https://play.google.com/store/apps/details?id=app.hugoromao.gamified_password_generator.twa>.

## Executando o projeto localmente

### Dependências

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
