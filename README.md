# Muso API

Set up API using Node, Express,Prisma (PostgreSQL) , JWT and bcrypt.
___ 

## Tech Stack
 * NODE JS 
 * TypeScript
 * Express JS
 * Prisma(PostgreSQL)
 * JWT+Http Only Cookie+bcryptJS(Auth)

___
```javascript
/**
 * @design Tshepang Maila
 */
```

## Deployments

>> scripts in package.json
```json
"scripts": {
    "build": "rm -r dist/* &&  tsc",
    "clean": "rm -r dist/*",
    "start": "node dist/server.js",
    "p-init": "prisma init",
    "p-mg": "prisma migrate dev --name init && prisma generate",
    "p-generate": "prisma generate",
    "dev": "nodemon server.ts"
  },

```

## How To Build & Run

Would have loved to use docker-compose the two services but because of time was not able to achieve that.

### 1 Create Database

- Make sure you have a .env file in the project root
- Then run the following command to spin up a postgres container
```
$ docker-compose up --build
```

### 2 Build & Run Server

- To migrate prisma db schemas & generate db objects
```
$ npm run p-mg
```

- Build typescipt 
```
$ npm run build
```

- If everything worked perfect, Run server
```
$ npm run start
```

## Test API with Postman

To test the API please look for  ``` Muso API.postman_collection.json ``` in the root directory.


I utiliaze two collection variables that are need by subsequest requests. namely ```saved_track_id ``` & ```saved_playlist_id ```, They are set after a response has been received from ```Tracks/Create Track``` & ```Playlists/Create Playlist``` requests.

So if you want to test fully and correctly, please do the requests by order they appear.
