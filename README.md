# Muso API

## # Node Express Prisma Restful API

Set up MVC using Node, Express,Prisma (PostgreSQL) , JWT and bcrypt.
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

>> Folder Structure
___
 * routers
    * /middleware
        * AuthMid.ts
        * ErrorMid.ts
    * authRouter.ts
    * testRouter.ts
 * controllers
   * AuthController.ts
   * TestController.ts
 * models
   * ApiResponse.ts (response format)
 * utils
   * Define.ts (all constant value)
   * DB_Define.ts (all SQL+DB constant value)
   * Helper.ts (all helper functions)
 * server.ts
 * package.json
 * .env

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


