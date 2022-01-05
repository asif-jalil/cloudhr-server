# Simple Blog API
This is node js api for blog where user can register and login. And simple post management system.

The entire application is contained within the `src/app.js` file.
You will find all configuration in `src/config/` folder
Data is defined on `src/db/db.js` file

### Install
```
npm install
```
### Env
Copy all from `src/.env.example` to your `.env` and define your configuration

### Run the app
Run your apache server as well as mysql. You can use xampp for this purpose. Then create your database which you defined on `.env` file
```
npm run dev // for development server
npm start // for production
```
# REST API
---
The REST API to the example app is described below.
## User Registration
#### Request
`POST /users/register/`
```
{"name": String, "email": String, "password": String}
```
#### Response
```
{"error":false, "data":null, "token":"eyJhbGciO...", "message":"registration completed"}
```
## User Login
#### Request
`POST /users/login/`
```
{"email": String, "password": String}
```
#### Response
```
{"error":false, "data":null, "token":"eyJhbGciO...", "message": "login successful"}
```
## Get User
#### Request
`POST /users/:id`

#### Response
```
 {"id": 1, "name": "Asif", "posts": [{...},{...}]}
```
## Create Post
#### Request
`POST /posts/:userId`
> ***token*** will be provided on ***header*** that you get after login or registration (Ex: `'token': 'eyJhbGciO...'`)
```
{
    "title": "Hello Bangladesh",
    "body": "There is a new post about bangladesh",
    "category": "Getting Started"
}
```
#### Response
```
{
    "id": 12,
    "title": "Hello Bangladesh",
    "body": "There is a new post about bangladesh",
    "category": "Getting Started",
    "userId": "1",
    "updatedAt": "2021-12-27T19:31:18.967Z",
    "createdAt": "2021-12-27T19:31:18.967Z"
}
```
## Get All Post
#### Request
`GET /posts/`
#### Response
```
[
    {
        "id": 1,
        "title": "Hello Bangladesh",
        "body": "There is a new post about bangladesh",
        "category": "Getting Started",
        "createdAt": "2021-12-27T19:31:18.000Z",
        "updatedAt": "2021-12-27T19:31:18.000Z",
        "userId": 1,
        "user": {
            "id": 1,
            "name": "Asif"
        }
    },
    {...},
    ....
]
```
## Get Specific Post
#### Request
`GET /posts/single/:id`
#### Response
```
{
    "id": 12,
    "title": "Hello Bangladesh",
    "body": "There is a new post about bangladesh",
    "category": "Getting Started",
    "createdAt": "2021-12-27T19:31:18.000Z",
    "updatedAt": "2021-12-27T19:31:18.000Z",
    "userId": 1,
    "user": {
        "id": 1,
        "name": "Asif"
    }
}
```
## Get Post By Pagination
#### Request
`GET /posts/pagination?page=1&posts=3` or `GET /posts/pagination` <br />
Here `page=1` & `posts=3` is default value. If you don't pass any query, default value will be applied
#### Response
```
[{...}, {...}, {...}]
```
## Update Post
#### Request
`PUT /posts/:id`
> ***token*** will be provided on ***header*** that you get after login or registration (Ex: `'token': 'eyJhbGciO...'`)
```
{ "title": "This is Post 1"}
```
#### Response
```
{"message": "Your post has been updated successfully"}
```
## Delete Post
#### Request
`DELETE /posts/:id`
> ***token*** will be provided on ***header*** that you get after login or registration (Ex: `'token': 'eyJhbGciO...'`)
#### Response
```
{"message": "Your post has been deleted successfully"}
```

**voilà. Have a fun!**
