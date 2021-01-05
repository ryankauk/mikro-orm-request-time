This repository is a reproduction for mikro-orm accumulative find execution time during parallel requests.

Step 1. Install

```bash
yarn install
```

Step 2. Start the server

```bash
yarn dev
```

Step 3. Run autocanon

**MikroORM**

```bash
yarn stats http://localhost:5999/myEntity/mikro-orm -c 1000
```

**Mongoose**

```bash
yarn stats http://localhost:5999/myEntity/mongoose -c 1000
```

You will see the time logs on the server of the time it takes for mikro-orm to execute the query.
