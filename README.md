# Task App

This project has been built as an assignment for an internship.\

# To setup node modules for the application

In order to run the app on your local device clone the app.\

do\

### `cd client`

### `npm i`

This will install all the node modules for client side.\

Similarly, browse to server folder and install node modules for server side.\

(Assuming you are still in client folder.)\

### `cd ..`

### `cd server`

### `npm i`

## To run the application

To start the server (backend).\

### `cd server`

### `npm run dev`

To start the client (frontend).\

### `cd client`

### `npm run start`

## Features

On starting the app you will be see the login page, as initially there will be no token in local storage.\

You can register as a new user or login as test user through.\

email : johndoe@gmail.com \
password: 123456

After loging in you will be redirected to the home page where you can see all the tasks added by all the users.\
You can add tasks from the `create task` button on the navbar.\
Currently you can edit or delete only tasks created by you.\
But the backend server has endpoints designed such that multiple users can edit a task.\
The functionality will be added to the frontend side soon.\

### Possible errors

After loggin in or registering.... there might be an error for `_id` cannot be null.\
just reload the app from the refresh button on your browser...this error will be resolved soon.\
