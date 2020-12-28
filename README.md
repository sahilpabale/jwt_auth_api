# jwt_auth_api

> **An API built with Express.js and PostgreSQL DB. JWT is used for Authentication.**

## Instructions

1.  `Clone the repo`

2.  Run `npm install`

3.  Make `.env` and add these variables

    a. `DATABASE_URL = {YOUR_PG_DB_URI}`

    b. `JWT_SECRET = {YOUR_SECRET}`

    c. `MAIL_HOST = {YOUR_MAIL_SERVER_HOSTNAME}`

    d. `MAIL_USER = {MAIL_SERVER_USERNAME}`

    e. `MAIL_PASS = {MAIL_SERVER_PASSWORD}`

    f. `APP_URL = {localhost/hosted_app_url}`

## API Endpoints

`GET /api` - Simple Home Page of API

`POST /api/register` - Pass user creds in body and register the user

`POST /api/login` - Pass the login creds in body and if it's correct, response will contain a JWT Token

`GET /api/dashboard` - This is a protected route and user with correct auth token will only be Authorized to visit this route

`GET /api/verify/:token` - On registering, the user will be required to verify his/her email so this url with token as its param will be sent through email, which the user needs to verify and then only the user will be able to login
