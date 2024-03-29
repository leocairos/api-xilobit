# Xilolite SA - Chatbot Agent API

API (Backend) Dialogflow Chatbot Agent.


## ToDo

[ ] Bakend configuration to external acsess
[ ] Bakend configuration to default intent response


## Deploy Backend

* Instalar node
* clonar repositorio do git dentro do servidor
  * criar certificado: $ ssh-keygen
  * $ cat ~/.ssh/id_rsa.pub
  * Copia a chave publica (txt) e informa no github
    - profile >> settings >> SSH and GPG Keys >> new SSH Keys
    - informa title e cola a key
  * $ mkdir app (in /home)
  * $ cd app
  * $ git clone git@github.com:leocairos/api-xilobit.git
  * $ cd api-xilobit
  * $ yarn
  * $ yarn build

* ajustar ormconfig.json
  * $ cp ormconfig.example ormconfig.json
  * $ vim ormconfig.json
  * alterar port, username, database, entities, migrations, cli
    * dist ao inves de src
    * js ao inves de ts

* Testar build
  * $ node dist/shared/infra/http/server.js

* Mantendo aplicação no ar
  * Ajustar cada container para inicializar automaticamente
    * $ docker ps
    * $ docker update --restart=unless-stopped IDCONTAINER

  * instalar pm2: $ sudo npm install -g pm2
  * executar API-Xilobit com PM2
    * $ pm2 start dist/shared/infra/http/server.js --name api-xilobit

    *  pm2 start pm2-config.json
    *  pm2 delete pm2-config.json

    * comandos pm2
      * pm2 list
      * pm2 monit
      * pm2 log NAMEAPP
      * pm2 stop NAMEAPP
      * pm2 delete NAMEAPP

  * automatizar start do PM2:
    * $ pm2 startup systemd
    * $ sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/leonardo.sampaio


## Remover dependencias não utilizadas

$ yarn global add depcheck


Run it and find the unused dependencies:

$ npx depcheck
