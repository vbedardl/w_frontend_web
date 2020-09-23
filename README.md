# Web Admin (Walter)

The Web Admin Panel has access to a User Management tab and a Package Management tab.

## User Management Tab

This tab allows to create user. With name, email and their unit number, a random password is generated. The new user can then login into his mobile app using his new credentials.
The Admin can also delete users from the system.

## Package Management Tab

This tab allow to list packages that have been droped at the reception but that haven't been picked up yet. The admin can then, when presented with a proof, give the package to its owner and mark the package in the system as "Picked up".

### How it works

The Web Admin Panel was built using create-react-app. It is connected to a Graphql/Prisma server.

### Screenshots

## Dependencies

- @apollo/client: ^3.2.0
- @material-ui/core: ^4.11.0
- @material-ui/icons: ^4.9.1
- @testing-library/jest-dom: ^4.2.4
- @testing-library/react: ^9.5.0
- @testing-library/user-event: ^7.2.1
- generate-password: ^1.5.1
- graphql: ^15.3.0
- material-table: ^1.69.0
- react: ^16.13.1
- react-dom: ^16.13.1
- react-scripts: 3.4.3

## Getting Started

- Install all dependencies using `npm install` command
- Clone the w_backend from https://github.com/vbedardl/w_backend and run the development server using `npm start`
- On a separate terminal, run development build using `npm start` from project root folder

## Current Functionality

- Create a user
- Delete a user
- Update a package

- Get a list of users
- Get a list of unpicked packages

## Further Development

- Adding code input on page load that requires the Admin password to open the session. The code would be requested after x minutes of innactivity.
- Adding live search bar to Users tab and Packages tab to facilitate search
