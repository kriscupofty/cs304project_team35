### Hospital-Resident Matching Service System

#### Prerequisites

- MySQL
- Node.js

#### Configuration
Assuming Node and MySQL has been installed, MySQL server started and the `root` password set according
to `app/connection.js`, connect to the server by running the command below and entering the password

```
mysql -uroot -p
```

Then create the database and exit:
```
mysql> create database cs304project;

mysql> exit
```

To initialize the database, make sure `require('./init-db.js')` is not commented out in `app/server.js`.
To not seed the database or stop adding more rows to tables with an auto increment primary key, comment out `require('./seed-db.js')` in `app/init-db.js`.
#### Launching the app

```
node app/server.js
```

Log in at http://localhost:1234 by using the right accounts in `app/seed-db.js` or by signing up.







