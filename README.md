# DAILY BACKEND

- This backend serves as the backbone for the Daily App, offering essential APIs and hosting the frontend. To ensure smooth operation, follow the steps below.

## Requirements
- Nodejs >= 16.17.1

## Setup virtual env (Optional)
### Setup `asdf`
- See how to install [asdf](https://asdf-vm.com/guide/getting-started.html)
- Install nodejs with required version 
  ```
  asdf install nodejs <version>
  ```
- Apply nodejs
  ```
  asdf local nodejs <version>
  ```


> [!WARNING]
> asdf will create `.tool-versions` file in order to determine nodejs version.

## How to connect to local database

- Connect to `prisma`

```
$ npm install @prisma/client
$ npx prisma init
```

- Install `sql` on terminal and create new user

```
$ CREATE USER 'user'@'localhost' IDENTIFIED BY 'password'
$ GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' WITH GRANT OPTION;
$ FLUSH PRIVILEGES;
```

- CREATE DATABASE `daily`

```
$ CREATE DATABASE daily;
```

- Change `DATABASE_URL` on .env to `mysql://daily:password@localhost:3306/daily`

- Create / Modify `models` on file `schema.prisma`
- Migrate

```
$ npx prisma migrate dev --preview-feature
```

- Run `prisma-cli`:

```
$ npx prisma studio
```

## How to run

### Local setup

- **Install packages**
  ```
  $ npm install
  ```

- **Configure Environment**
 
  Create a .env file from the provided .env.example and update the values accordingly.
  ```
  $ cp .env.example .env
  $ export $(grep -v '^#' .env | xargs)
  ```

- **Initialize models database with Prisma**
  ```
  $ npx primsa db push
  ```

- **Run the Application**
  ```
  $ npm start
  ```

### Setup for deployment
- Just copy file `out/` build from **Frontend** to workspace.
- Run as local.
