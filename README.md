# App

GymPass style app.

## Functional Requirements

- [x] Must be possible to register;
- [x] Must be possible to authenticate;
- [x] Must be possible to get the profile of a logged in user;
- [x] Must be possible to get the number of check-ins performed by the logged in user;
- [x] Must be possible for the user to obtain their check-in history;
- [x] Must be possible for the user to search for nearby gyms (up to 10Km);
- [x] Must be possible for the user to search for gyms by name;
- [x] Must be possible for the user to check-in at a gym;
- [x] Must be possible to validate a user's check-in;
- [x] Must be possible to register a gym;

## Business Rules

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot make 2 check-ins on the same day;
- [x] The user cannot check-in if they are not close (100m) to the gym;
- [x] The check-in can only be validated up to 20 minutes after it is created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## Non-functional Requirements

- [x] The user's password needs to be encrypted;
- [x] The application data needs to be persisted in a PostgreSQL database;
- [x] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);

## App Setup

To setup your dev environment do the following steps:

1. Clone the repository
2. Install the dependencies with `npm install`
3. Create a `.env` file based on the `.env.dist` file, just copy/paste
4. Start the local server with `npm run start:dev`

It will be running on `http://localhost:3333` unless you specify a `PORT` in your `.env` file.

## Tests

To setup the tests you need to run, inside `prisma/vitest-environment-prisma`:

```bash
npm link
```

and then on the root folder:

```bash
npm link vitest-environment-prisma
```

if you have a permission error, try running with `sudo`.

## Integrating with a Frontend Client

If you need to integrate with a frontend client, you may have noticed that the refreshToken is not being set in the browser's cookies, to solve this problem, we will illustrate the solution using Axios:

On the server, add the credentials property as true:
```
app.register(cors, {
  origin: true,
  credentials: true,
})
```

On the api create or Axios requests, add the withCredentials as true:
```
const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})
```