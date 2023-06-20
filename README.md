# App

GymPass style app.

## Functional Requirements

- [ ] Must be possible to register;
- [ ] Must be possible to authenticate;
- [ ] Must be possible to get the profile of a logged in user;
- [ ] Must be possible to get the number of check-ins performed by the logged in user;
- [ ] Must be possible for the user to obtain their check-in history;
- [ ] Must be possible for the user to search for nearby gyms;
- [ ] Must be possible for the user to search for gyms by name;
- [ ] Must be possible for the user to check-in at a gym;
- [ ] Must be possible to validate a user's check-in;
- [ ] Must be possible to register a gym;

## Business Rules

- [ ] The user must not be able to register with a duplicate email;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if they are not close (100m) to the gym;
- [ ] The check-in can only be validated up to 20 minutes after it is created;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## Non-functional Requirements

- [ ] The user's password needs to be encrypted;
- [ ] The application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);