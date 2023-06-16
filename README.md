# Project Name

> Chuck Norris Joke app

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)

## General Information

-  The Chuck Norris Joke app is a backend application that provides authentication, user management, and a feature to fetch and send random jokes to logged-in users. 
-  The application allows users to sign up and log in securely using authentication tokens (JWT). Once logged in, users can fetch random Joke from external API and send it to user.
-  The app uses NestJS as the backend framework and PostgreSQL as the database, Axios for making requests to external APIs and Nodemailer for sending email.

## Technologies Used

- NestJS 
- TypeORM
- ESLint
- Nodemailer
- Axios
- JWT
- bycript

## Features

- Authentication: Implements user authentication using JWT (JSON Web Tokens) for managing user sessions and securing the endpoints.
- User: Enables users to create accounts and store in a model that includes unique email, hashed password, first name, last name and date.
- Search Jokes: The application provides an authorized endpoint to fetch a random joke from the Chuck Norris API (https://api.chucknorris.io/). The fetched joke is then sent to the logged-in user.
- Email Notifications: The application incorporates email notification functionality using the Nodemailer library. The app utilizes a configured email service, such as Gmail. The configuration includes setting up the necessary SMTP (Simple Mail Transfer Protocol) credentials, such as the email provider's server address, port number, authentication details, and secure connection settings.
- Error Handling: Implements error handling mechanisms to handle exceptions and provide informative error messages to users. Handles validation errors, authentication failures, and other potential errors that may occur during application execution.
- Testing: Includes some test suite to verify the functionality and integrity of the application. 

## Setup

In orded to run this project first clone this repository with following command:
1. Clone this repository by running the following command:

     ```bash
   git clone https://github.com/Sliskovic/ChuckNorrisJokeApp

2. Navigate to the project's directory:
   
     ```bash
   cd ChuckNorrisJokeApp

3. Create a .env file in the root directory of the project.
  Fill in the .env file with the required configuration data and secrets. For example: [^.env]
     [^.env]:   ```bash
        # APPLICATION
        APP_PORT=3000
        NODE_ENV=development
        # DATABASE
        DB_USER=postgres
        DB_PASSWORD=postgres
        DB_NAME=postgres
        DB_HOST=db
        DB_PORT=5432
        POSTGRES_PASSWORD=postgres

        # JWT
        JWT_SECRET=secret
        JWT_EXP=1h

        # STMP
        MAIL_HOST=smtp.gmail.com
        SMTP_USERNAME=<your-email.@gmail.com>
        SMTP_PASSWORD=<your-password-third-app-password>

        # API
        API_URL=https://api.chucknorris.io/jokes/random 

4. Install the project dependencies with the following commands:
     ```bash
     npm install

5. Before starting the application, create a Docker volume for PostgreSQL data by executing the following command:
    ```bash
    docker volume create pgdata 

6. Run the project using Docker Compose. Start the containers by running the following command:
    ```bash
    docker-compose up --build
  
7. Once the application is up and running, you can access it by opening your web browser and visiting the following URLs:
   - NestJS application: http://localhost:3000 
   - Adminer (database management tool): http://localhost:8080 
   - Swagger (testing endpoints) http://localhost:3000/api 



