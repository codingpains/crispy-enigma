# crispy-enigma
SalesLoft Engineering Offline Excercise

## To run this app.
* Create a database in postgresql.
* go to `./backend`
* Add the following ENV variables to your `.env` file with the real values you need.
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
result in the next requests. This is still bad because the first person to request this will run into the aforementioned
problems.

A better solution is to pre-compute those email letter counts and just read from a pre aggregated table the result, this ends up
in an instant response for our users with very accurate results.
The follow up problem to solve is to keep that table up to date within a given tolerance for delayed information.

## Compute all people and get possible duplications.

This is the hardest problem, we can start with the previous solution and go with pre computation because this is even more expensive than counting letters. This requirement implies that we need to compare each person to all other people.

While there are ways to do this in an efficient way, like using a map/reduce approach, or keeping all people grouped in a way that
we can guarantee that each new person just needs to fit into a certain group (by hashing them for instance) to find possible duplications, the time to solve this problem is not nearly enough to get to such optimal solution.

So instead I will just compute all combinations of **emails**, each email against all remaining emails. I will not compute against past emails because those are already taken into account.

The most interesting part of this problem is how to determine that an email is a potential duplicate. To do this I thought of checking all changes needed in the account name part of an email, that is just the part before the `@domain.X`, that are needed to reach a different account name, if those changes are lower than a given threshold provided by me as a heuristic, then it is a potential duplicated.

For that we can either compute all possibilities in a recursive manner using backtracking to check that each outcome is the word we are looking for, counting all changes needed for that result and then picking the smallest count, using that as our response to compare against the given threshold.
This is way too expensive to compute, we are talking exponential time O(3^n) where n is the amount of emails and 3 is stands for the 3 possibilities on each letter: keep, remove or swap.

After a little research I found an algorithm that produces such number called Levenshtein Distance, and there is a way to implement this with Dynamic Programming in bottom up technique and is very efficient, so I implemented that algorithm and that
finds the duplicated emails.

## Pending work or improvements.

I did not solve the problem of keeping the aggregated tables updated, all the information on this implementation is calculated
in the data load process.

Every person record in the people table contains a column called `update_on` using that information and an additional `updater` worker we can keep all records fresh.

### The updater worker would:

1. Get all people that need update.
2. Request them all in groups of 100 (maximum allowed by the API).
3. Look for any missing person and invoke the removal process.
4. The call the update process on each existing person.

### The removal process would:

1. Get the email letters count and subtract each from the aggregation table.
2. Remove any duplicated records found.
3. Remove itself from any other duplicated record.
4. Delete this person from the people table, or mark as deleted if feeling paranoid.

### The updater process would.

1. Check if there is a difference in the email from our current record.
2. If not, just update all changed relevant information.
3. If email changed, get deltas on email letters and update them.
4. Destroy duplication records, remove itself from other duplication records.
5. Recompute this record's potential duplication.
