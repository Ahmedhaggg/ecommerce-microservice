# Microservices Application

This is an ecommerce microservices-based application comprising six services: User Service (authentication and profile), Product Service, Order Service, Email Service, Payment Service, and Inventory Service. The application uses RabbitMQ for asynchronous communication. The Application uses Saga pattern on the distributed trancations and runs on a Kubernetes cluster. User Service, Order Service

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Services Overview](#services-overview)
4. [Tech Stack](#tech-stack)
5. [Setup Instructions](#setup-instructions)
6. [API Documentation](#api-documentation)
7. [CI/CD Pipeline](#ci-cd-pipeline)
8. [Contributing](#contributing)

## Overview

This project demonstrates a practical microservices architecture. Each service is independently deployable and communicates with others via RabbitMQ. The services are containerized using Docker and orchestrated using Kubernetes.

## Architecture

```mermaid
graph TD;
    UserService -->|Async (RabbitMQ)| EmailService;
    UserService -->|REST API| ProductService;
    ProductService -->|Async (RabbitMQ)| InventoryService;
    OrderService -->|REST API| PaymentService;
    OrderService -->|Async (RabbitMQ)| InventoryService;
```

#### **Services Overview**

```markdown
## Services Overview

1. **User Service**: Handles user authentication and profile management.
2. **Product Service**: Manages product catalog.
3. **Order Service**: Processes customer orders.
4. **Email Service**: Sends emails for account verification and order notifications.
5. **Payment Service**: Handles payment processing.
6. **Inventory Service**: Manages product stock and inventory.

All services communicate asynchronously using RabbitMQ or synchronously using REST APIs.
```

## Tech Stack

### Backend

-   Node.js
-   Express.js
-   RabbitMQ
-   Redis (for Email Service caching)
-   MongoDB (User and Product Services)
-   MySQL (Order and Payment Services)

### DevOps

-   Docker
-   Kubernetes
-   Helm
-   GitHub Actions for CI/CD

## Setup Instructions

### Prerequisites

1. Install [Docker](https://www.docker.com/).
2. Install [Kubernetes](https://kubernetes.io/) or set up a local cluster using Minikube or Kind.
3. Install [Helm](https://helm.sh/).

### Steps to Run Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/microservices-app.git
    cd microservices-app
    ```

---

### **5. API Documentation**

Use Swagger or Postman for API documentation. Include links in the README.

```markdown
## API Documentation

### User Service

-   **Base URL**: `/api/v1/users`
-   **Endpoints**:
    -   `POST /login`: User login.
    -   `POST /register`: User registration.
    -   `GET /profile`: Fetch user profile.

Full documentation is available [here](docs/api-docs/user-service.md).
```

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Make your changes and commit them.
4. Open a pull request.

### Code Style

-   Use Prettier for formatting.
-   Follow the ESLint configuration in the project.

### Running Tests

Run unit tests for any service:

```bash
cd services/user-service
npm test
```

---

### **8. `docs/` Directory**

Create detailed sub-documents for specific topics.

#### Example: `docs/architecture.md`

```markdown
# Architecture

## Communication

-   **Async Communication**: Services use RabbitMQ to exchange messages.
-   **Sync Communication**: REST APIs are used for direct communication.

## Database Design

-   **User Service**: MongoDB (NoSQL, flexible for user data).
-   **Order Service**: MySQL (relational database for transactional consistency).
    ...
```
