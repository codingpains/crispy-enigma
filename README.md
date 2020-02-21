# crispy-enigma
SalesLoft Engineering Offline Excercise

## To run this app.
* Create a database in postgresql.
* go to `./backend`
* Add the following ENV variables to your `.env` file
```
API_HOST="https://api.salesloft.com/v2/"
API_KEY=your_api_key
DB_URL=urltoyourdb # eg: postgresql://localhost/crispydb
PGHOST=host
PGDATABASE=dbname
PGUSER=user_with_db_access
```
* run `npm install`
* run `npm run migrate` to create all tables needed.
* run `npm run populate` to get the data loaders and crunching going, this will take up to a few minutes.
* run `npm start` to run your server, it will bind to port 3000
* on a different terminal window or tab go to `./frontend`
* Add the following ENV variables to your `.env` file
```
  API_HOST="http://localhost:3000"
```
* run `npm install`
* run `npm start` to get the client running, it will bind to port 8080.
* You're all set

# Problems to solve.

## See all people available in SalesLoft API.

This first problem seems to be very straight forward. It is just a request to the API to get a page
of people, provide next and previous buttons to request the adjacent pages of people.
The problem to solve here is that we can't perform such request from the browser because CORS policy.

### Solution.

Provide a proxy endpoint in the backend that sanitizes the request and gets the information from the actual API.
Respond with all the needed data to perform follow up request for next or previous.

## Compute all emails and get a letter frequency count.

This problem is more interesting, first because if we compute this on demand it will take forever to produce a result.
The larger the email set, the longer it will take and this will end in a timeout or just in very bad user experience.

### Solution.

Here we can have two options, one is to compute only on the first request and then cache such result and serve the cached
result in the next requests. This is still bad because the first person to request this will run into the afore mentioned
problems.

A better solution is to pre-compute those email letter counts and just read from a pre aggregated table the result, this ends up
in an instant response for our users with very accurate results.
The follow up problem to solve is to keep that table up to date within a given tolerance for delayed information.

## Compute all people and get possible duplications.

This is the hardest problem, we can start with the previous solution and go with pre computation because this is even more expensive than counting letters. This requirement implies that we need to compare each person to all other people.

While there are ways to do this in an efficient way, like using a map/reduce approach, or keeping all people grouped in a way that
we can guarantee that each new person just needs to fit into a certain group (by hashing them for instance) to find possible duplications, the time to solve this problem is not nearly enough to get to such optimal solution.

So instead I will just compute all combinations of **emails**, each email against all remaining emails. I will not compute agains past emails because those are already taken into account.

The most interesting part of this problem is how to determine that an email is a potential duplicate. To do this I thought of checking all changes needed in the account name part of an email, that is just the part before the `@domain.X`, that are needed to reach a different account name, if those changes are lower than a given threshold provided by me as a heuristic, then it is a potential duplicated.

For that we can either compute all possibilities in a recursive manner using backtracking to check that each outcome is the word we are looking for, counting all changes needed for that result and then picking the smallest count, using that as our response to compare against the give threshold. This is way too expensive to compute.

After a little research I found an algorithm that produces such number called Levenshtein Distance, and there is a way to implement this with Dynamic Programming in bottom up technique that is very efficient, so I implemented that algorithm and that
finds the duplicated emails.
