# Scrapbook App

## Install instructions:

### prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

## Step by step

- Clone this repository
  - `git clone git@github.com:netojose/scrapbook.git`
- Go to directory
  - `cd scrapbook`
- Create a `.env` file using `.env.example` file as sample
  - You can keep the exmaple file values, they will work. You also should to have creedentials for sendgrid email service to send emails, but I will send a key I generated for this test, please look these credentials on my email.
- Run docker
  - `docker-compose up -d`
- After everything is running, run API database migrations:
  - `docker exec -it server_container npm --prefix /app run db:migrate`

After this, you will have a GraphQL playground to explode the API, at: http://localhost:8000/graphql

The application is http://localhost:3000

If you have any questions about the proccess above, please contact me.

---

## Used technologies:

- React
- Apollo Client
- Apollo Server
- Typescript
- GraphQL
- Create-react-app
- eslint
- prettier
- Redux toolkit
- Docker
- Sendgrid
- class-validator
- dataloader
- MySQL
- Sequelize
- Sequelize-typescript
- Type-graphql
- Typedi

## Important notes

I used the Apollo Client to make the requests, but then I noticed that the integration between it and the Redux toolkit was not very good. I should have used something simpler to make requests, because Apollo Client is a complete solution for fetching data, and sharing this task with the Redux toolkit required more code, mainly to catch validation errors, as each library handles very differently (I believe that if I write middleware for Redux, I can solve it in an elegant way). That would be a refactoring that I would do.

Another point: I didn't write the unit and integration tests. I believe they are important, I always do them. But as it was a lot of work and little time to perform, I had to prioritize the delivery, and then I can add the tests.

The Docker orchestration also lacks a build for production, so far it only has this version to run in development environment (but obviously, it is extremely important, to contact minified files to the client, and to run javascript on the node, instead of using an extra layer for typescript, among other optimizations). Again, the result of a lack of time.

Another point to be resolved is an improvement in authentication. Currently there is the ability to have protected routes, but I need to watch when the server triggers an authentication error (because of an expired or invalid token, for example).

One last thing I will do as an improvement is to add more error handling to the client. Currently, it is handling data entry errors, but other things can happen, and the application should be prepared for all exceptions.
