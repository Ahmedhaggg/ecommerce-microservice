# User Service API Documentation

## Base URL

`/api/v1/users`

### Endpoints

1. **Login**
    - `POST /login`
    - Request Body:
        ```json
        {
        	"email": "user@example.com",
        	"password": "password123"
        }
        ```
    - Response:
      `json
     {
       "token": "jwt-token"
     }
     `
      ...
