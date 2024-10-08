# My Node.js Application

## Brief Summary
This application is a simple Node.js service that connects to a MySQL database to store and retrieve names. It provides a RESTful API with endpoints for listing names and adding new names.

## Main Endpoint
- **GET** `/`
  - Description: Returns a list of names stored in the database.
  - Example Response:
    ```html
    <h1>Full Cycle Rocks!</h1>
    <ul>
        <li>Vinicius</li>
    </ul>
    ```

## Add Name Endpoint
- **POST** `/add`
  - Description: Adds a new name to the database.
  - Request Body Example:
    ```json
    {
        "name": "Vinicius"
    }
    ```
  - Example Response:
    ```json
    {
        "message": "Name added successfully",
        "name": "Vinicius"
    }
    ```
