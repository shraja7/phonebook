# Phonebook Application

The Phonebook Application is a web-based contact management system that allows users to add, search, view, update, and delete contacts in a phonebook. It is built using React for the frontend and a simple JSON server as the backend.

## Features

- Add Contacts: Users can add new contacts by entering their name and phone number.
- Search Contacts: The application provides a search functionality to find contacts based on their name or phone number.
- Display Contacts: All the added contacts are displayed in a list format, showing the name and phone number.
- Update Contacts: Users can edit the name or phone number of existing contacts.
- Delete Contacts: Contacts can be deleted from the phonebook.
- Notification Component: Displays success or error messages for various operations.

## Getting Started

1. Clone the repository.
2. Install the required dependencies for both the frontend and backend using `npm install` in the root directory.
3. Start the frontend application with `npm start`.
4. Start the JSON server for the backend by navigating to the `backend` directory and running `npm start`.
5. Access the application in your web browser at `http://localhost:3000`.

## Notification Component

The Phonebook Application includes a Notification component to display success or error messages for different operations. The component highlights the message with different colors based on the success or error type.

## Backend Integration

The backend for this application is implemented using a simple JSON server with a `db.json` file to simulate a database.

- The `db.json` file contains an array of contacts, each having properties like `id`, `name`, and `phone`.
- The JSON server provides a RESTful API to perform CRUD operations on the `db.json` file.

## License

This project is licensed under the MIT License. You can find more details in the [LICENSE](./LICENSE) file.
