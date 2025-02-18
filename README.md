# Task Management System

## Overview

A full-stack **Task Management System** that allows users to perform CRUD operations for tasks, providing functionality such as adding, editing, viewing, and deleting tasks. The app uses **JWT** for secure user authentication, and **Docker Compose** for containerization, including a **PostgreSQL** database and two application containers (API and Frontend).

### Key Features:
- **User Authentication:**
  - Register, Login, and Logout with **JWT** authentication.
- **Task CRUD Operations:**
  - Create, Read, Update, and Delete tasks.
- **Responsive Frontend:**
  - Built with **Angular 17** and styled using **Angular Material** and **Tailwind CSS**.
- **Containerized Setup:**
  - The application is containerized using **Docker Compose** with **PostgreSQL** as the database.
  
## Technologies Used

- **Backend:** 
  - **.NET 9 API** for handling RESTful API requests and task management logic.
  - **JWT** for secure authentication and authorization.
  - **Entity Framework Core** for ORM and PostgreSQL database interaction.
  
- **Frontend:**
  - **Angular 17** for the frontend framework.
  - **Angular Material** for UI components.
  - **Tailwind CSS** for styling.

- **Database:**
  - **PostgreSQL** for data storage.

- **Containerization:**
  - **Docker Compose** for running the full-stack application in containers.

## Getting Started

### Prerequisites

Ensure the following are installed before proceeding:
- **Docker** and **Docker Compose**.
- **.NET SDK 9** (for local development without Docker).
- **Node.js** and **npm** (for Angular).

### Setup

#### 1. Clone the repository:
```bash
git clone https://github.com/your-repository-url.git
cd task-management-system


#### 2. Docker Setup

If you prefer to use Docker, follow these steps to run the app in containers.

- Make sure you have Docker installed on your system.
- Run the following command to start the application using **Docker Compose**:

```bash
docker-compose up --build

This command will:
1. **Build** and **start** the backend and frontend containers.
2. **Set up** the PostgreSQL database container.
3. Expose the following ports:
   - Backend: `5259` (API)
   - Frontend: `4200` (Angular app)

Once the containers are up and running, you should be able to access the following:

- **Frontend**: [http://localhost:4200](http://localhost:4200) – The Angular app will be available here.
- **Backend**: [http://localhost:5259/api/v1](http://localhost:5259/api/v1) – The .NET API will be accessible here.

To stop the containers, run:

```bash
docker-compose down
### 3. Local Setup (Without Docker)

If you want to run the application locally without Docker, follow these steps:

#### Backend (API):

1. **Navigate to the Backend directory** (`/TaskManagementApi`).

2. **Build and run the .NET API:**

    ```bash
    dotnet build
    dotnet run
    ```

3. **Update the connection string** for local development in `appsettings.json`:

    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Host=localhost;Port=5432;Database=TaskManagementDb;Username=utss;Password=AaBbCc12345@"
    }
    ```

    This ensures that the application connects to your local PostgreSQL database.

#### Frontend (Angular):

1. **Navigate to the Frontend directory** (`/task-manager-app`).

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the Angular app:**

    ```bash
    ng serve
    ```

    The frontend will be available at [http://localhost:4200](http://localhost:4200).

---

### Database Setup

- **Using Docker:** The PostgreSQL database is automatically set up when using **Docker Compose**, and the backend is configured to connect to it.
  
- **Local Setup:** If you are running the backend locally, ensure the database is running on `localhost:5432` or update the connection string accordingly.

---

### API Endpoints

Here are the available API endpoints:

- **POST** `/api/auth/register` – Register a new user.
  
- **POST** `/api/auth/login` – Login and receive a JWT token.

- **GET** `/api/tasks` – Retrieve all tasks.

- **POST** `/api/tasks` – Create a new task.

- **PUT** `/api/tasks/{id}` – Update an existing task.

- **DELETE** `/api/tasks/{id}` – Delete a task.

