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

This project demonstrates a practical microservices architecture. Each service is independently deployable and communicates with others via kafka and tcp. The services are containerized using Docker and orchestrated using Kubernetes. CI/CD is implemented using github actions.

## Architecture

```mermaid
graph TD;
    UserService -->|Async (Kafka)| EmailService;
    ProductService -->|Async (Kafka)| InventoryService;
    OrderService -->|SAGA Pattern| UserService;
    OrderService -->|SAGA Pattern| InventoryService;
    OrderService -->|SAGA Pattern| PaymentService;
    OrderService -->|SAGA Pattern| EmailService;
```

#### **Services Overview**

```markdown
## Services Overview

1. **User Service**: Handles user authentication, user profile management and employee management.
2. **Product Service**: Manages product catalog.
3. **Order Service**: Processes customer orders.
4. **Email Service**: Sends emails for account verification and order notifications.
5. **Payment Service**: Handles payment processing.
6. **Inventory Service**: Manages product stock and inventory.

All services communicate asynchronously using Kafka or synchronously using REST APIs OR SAGA PATTERN.
```

## Tech Stack

### Backend

-   Node.js
-   Express.js
-   Nest.js
-   Kafka (Syncrouns communication)
-   Redis (Caching)
-   MongoDB (Product Service)
-   PostgreSQL (User, Inventory, Payment and Order Services)

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
    git clone https://github.com/Ahmedhaggg/ecommerce-microservice.git
    ```

---

### **5. API Documentation**

Use Postman for API documentation.

````markdown
## API Documentation

### Running Tests

Run unit tests for any service:

```bash
cd services/user-service
npm run test
```
````

---

## Communication

-   **Async Communication**: Services use RabbitMQ to exchange messages.
-   **Sync Communication**: REST APIs are used for direct communication.

## Database Design

-   **Product Service**: MongoDB (NoSQL, flexible for user data).
-   **Order Service**: PostgreSQL (relational database for transactional consistency).
    ...

```

```
