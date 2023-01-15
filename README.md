# Muso API

Set up API using Node, Express,Prisma (PostgreSQL) , JWT and bcrypt.
___ 

>> Tech Stack
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

># Deployments

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

>> how to deploy

```javascript
  //build the project
  npm run build
  //serve locally
  npm run serve 
  //serve in dev mode
  npm run dev
```


