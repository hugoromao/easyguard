# EasyGuard: Gerador de senhas seguras e memoráveis

<p align="center"><img src="./public/survey1.png" alt="EasyGuard" height="200" /></p>

Este repositório está vinculado ao artigo "Construção e Teste de App Gamificado Gerador de Senhas Fortes e Memoráveis: Um Estudo Exploratório", de Hugo Lima Romão, Marcelo Henrique Oliveira Henklain, Felipe Leite Lobo e Eduardo Luzeiro Feitosa.

Resumo do Artigo: _"Ciberataques têm aumentado progressivamente conforme nossas vidas tornam-se mais digitais. Contribuem para esse cenário os comportamentos inseguros de usuários. Dentre eles, destaca-se o uso de senhas fracas. Para lidar com esse problema, desenvolvemos o sistema web e o app EasyGuard. Neste estudo, nós caracterizamos essa ferramenta em termos das tecnologias que adota, de suas funcionalidades e das estratégias de gamificação que emprega, para gerar senhas seguras e memoráveis a partir de inputs fornecidos pelo usuário, produzindo a cada senha criada reforçadores que ensinem o comportamento de projetar senhas fortes e que o tornem mais recorrente."_

## Resumo

O gerador de senhas EasyGuard oferece uma estratégia para a criação de senhas fortes e memoráveis a partir de entradas significativas do usuário. Nosso objetivo principal com essa aplicação é o desenvolvimento do comportamento de “Projetar senhas fortes”. Sabendo que esse é um comportamento custoso para o usuário, utilizamos elementos presentes em jogos para reforçar os comportamentos de interagir com a aplicação e projetar senhas fortes. Nesse repositório, apresentamos os links de acesso e instalação e os procedimentos para execução do projeto em máquina local.

## Acesso público ao EasyGuard

O projeto proposto é disponibilizado de duas formas. A primeira, na Internet, como uma aplicação web, a partir do endereço <https://easyguard.vercel.app>. A segunda forma é por meio da instalação de um aplicativo Android, disponível no endereço <https://play.google.com/store/apps/details?id=app.hugoromao.gamified_password_generator.twa>.

## Executando o projeto localmente

O código desenvolvido consiste em um sistema web. Em adição, disponibilizamos a ferramenta como app Android a partir da loja Google Play Store, que permite que [Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) (PWAs) sejam publicadas a partir da funcionalidade [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity). Dessa forma, as etapas a seguir abordam apenas a instalação e execução do servidor web em máquina local.

### Ambiente de execução

- Sistema Operacional: Ubuntu 20.04
- Navegadores: Google Chrome

### Dependências

- Node.js 18.20.3 ou mais recente.
- Npm 10.7.0 ou mais recente.
- Git 2.4.3 ou mais recente.

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

Você pode acessar a aplicação a partir do endereço http://localhost:3000. Por padrão a aplicação utiliza a porta 3000. A instalação foi bem sucedida caso a seguinte tela apareça em seu navegador.

<img src="./public/screen.png" alt="Tutorial"/>

A Google Play Store permite que PWAs sejam publicadas como aplicativos Android. Para publicar este projeto como um aplicativo Android, utilize o seguinte link: <https://developers.google.com/codelabs/pwa-in-play>.
