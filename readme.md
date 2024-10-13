11.09.2024

# Zapier
to automate anything
Automate as fast as you can type
Make your tools work harder for you. Build automated workflows with triggers and actions

## WebHooks
A webhook is a way to send data from one application to another when a specific event occurs. Webhooks are commonly used to trigger actions in other applications, such as sending an email or updating a database.

must be asynchronous and divided into multiple steps.

## Getting Started
Create a new folder(hooks) and initialise it with package.json, tsconfig.json, install express

```bash
npm install express @types/express
```

initialise the backend routes

install `prisma` and initialise it `npx prisma init`, this will create a prisma folder with a schema.prisma file
create a schema in the schema.prisma file
now what is in the schema.prisma file-> a client, a db, User table, Zap table, Trigger table, Action table, AvailableAction table, AvailableTrigger table, ZapRun table and ZapRunOutbox table

run locally postgres using docker in `hooks` folder - `docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres`.
add a database url in the .env file-> DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres" 
now migrate the database `npx prisma migrate dev`, give the name-> 'init'

go to index.ts and add the following code and generate the client-> `npx prisma generate`

add a start script in the package.json file
```json
"scripts": {
    "start": "ts -b && node src/index.ts"
  }
``````

now to see the whole database go to zapier/hooks-> `npx prisma studio`

12.09.2024

let's say a webhook added in github, this service was created yesterday, which will be hit stored in triggerstate

create a new processor, hence create a new folder by the name. initialise a new typescript project.
for now we have to copy the code from the zapier/hooks folder and paste it in the processor folder.ideally we should use a monorepo.

install the following packages
`npm install prisma
npx prisma init
`

copy over the db schema from hooks/schema.prisma to processor/prisma/schema.prisma, and generate the client-> `npx prisma generate`

run kafka locally using docker in `processor` folder - `docker run -p 9092:9092 apache/kafka:3.7.1`

create a new topic in the kafka container, name it-> zapier-webhooks
go to terminal get the pid for kafka container and get into it's own bash -> `docker exec -it e00c3f83725b /bin/bash`
after getting into bash, start the topic -> ``./kafka-topics.sh --create -topic zap-events -bootstrap-server localhost:9092``

to publish events into it-> first install kafka-js -> `npm install kafkajs`, add code to index.ts

check for the database using the prisma studio-> `npx prisma studio`

now run the kafka-console-consumer ->  
``````docker exec -it e00c3f83725b /bin/bash
cd /opt/kafka/bin
./kafka-console-consumer.sh --topic zap-events --from-beginning --bootstrap-server localhost:9092``````

`hooks`-> `npx prisma migrate dev`


## Kafka Processor
figure out, how much of processing is done in the processor, and how much is done in the hooks.
```bash
mkdir worker
cd worker
npm install prisma
npx prisma init
npm init -y
npx tsc --init

npm install kafkajs @solana/web3.js nodemailer bs58 --save-dev @types/node @prisma/client
npm i --save-dev @types/nodemailer

```

add index.ts, email.ts, parser.ts, solana.ts file.

```bash
npx prisma generate
npm run start
```


13.09.2024
```bash
mkdir primary-backend
cd primary-backend
npm init -y
npx tsc --init
```

again that same old bullshit
install express -> `npm i express @types/express`

add code as index.ts, add router, and add user router and zap router in it

add prisma-> `npm install prisma`

run the prisma init command-> `npx prisma init`

create a schema.prisma file in the root folder and add the db url from .env in hooks folder to this one(primary-backend/.env), copy the schema from hooks/schema.prisma

get the backend done, install zod, typechecking via zod/types and the user authentication
now to test-> run postgres locally using docker in `primary-backend` folder - `docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres`.

13.10,2024
`frontend` folder in next
install axios
