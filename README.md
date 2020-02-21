# crispy-enigma
SalesLoft Engineering Offline Excercise

## To run this app.
* Create a database in postgresql.
* Add the following ENV variables to a .env file
```
API_HOST="https://api.salesloft.com/v2/"
API_KEY=your_api_key
DB_URL=urltoyourdb # eg: postgresql://localhost/crispydb
PGHOST=host
PGDATABASE=dbname
PGUSER=user_with_db_access
```
* go to `./backend`
* run `npm install`
* run `npm run migrate` to create all tables needed.
* run `npm run populate` to get the data loaders and crunching going, this will take up to a few minutes.
* run `npm start` to run your server, it will bind to port 3000
* on a different terminal window or tab go to `/frontend`
* run `npm install`
* run `npm start` to get the client running, it will bind to port 8080.
