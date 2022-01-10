# Cloud HR API
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
## Emplpoyee Count
#### Request
`GET /employees/count/`

#### Response
```
Number
```
## Create Employee
#### Request
`POST /employees/create/`
```
{"email": Email, "firstName": String, "lastName": String}
```
#### Response
```
{"status":200, "message": "String"}
```
## Create Bulk Employee
#### Request
`POST /employees/createbulk/`
```
A CSV file have to provide
```
#### Response
```
{"status":200, "message": "String"}
```

## Get Employee
#### Request
`GET /employees/view/`

#### Response
```
[{"id": String, "firstName": String, "lastName": String, "email": Email}, ....]
```

## Search Employee
#### Request
`GET /employees/search/`

#### Response
```
[{"id": String, "firstName": String, "lastName": String, "email": Email}, ....]
```

**voilà. Have a fun!**
