# FLAME: Foundation for Learning Assistance and Management Environment

FLAME is a comprehensive tool designed to facilitate and manage the learning process. It offers a suite of features that support both educators and students by providing an intuitive and efficient environment for learning and management.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

FLAME (Foundation for Learning Assistance and Management Environment) aims to streamline the educational process by integrating modern technologies into a cohesive platform. It combines the power of React, Express, Node.js, and MongoDB to deliver a robust and scalable solution for educational institutions.

## Features

- **User Management**: Manage user roles and permissions for students, teachers, and administrators.
- **Batch Management**: Create, update, and manage batches with ease.
- **Solve Questions**: Assign and track assignments and their deadlines.
- **Interactive Dashboard**: A centralized dashboard to view all relevant information at a glance.
- **Scalability**: Built with scalability in mind to support growing educational needs.
- **Modern Tech Stack**: Utilizes React for the frontend and Express with Node.js for the backend, with MongoDB as the database.

## Installation

To get started with FLAME, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/fab-c14/FLAME.git
    cd FLAME
    ```

2. **Install backend dependencies**:
    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies**:
    ```sh
    cd ../flame-frontend
    npm install
    ```

4. **Set up environment variables**: Create a `.env` file in the `backend` directory and configure the required environment variables. Example:
    ```
    MONGO_URI=your_mongo_db_uri
    SECRET_KEY=your_secret_key
    ```

5. **Run the backend server**:
    ```sh
    cd backend
    npm start
    ```

6. **Run the frontend server**:
    ```sh
    cd ../flame-frontend
    npm start
    ```

## Usage

Once the servers are up and running, you can access the application in your web browser at `http://localhost:3000`. From there, you can log in or sign up, manage, measure student performance, batches, community, questions, and interact with the dashboard.

## Examples
> wait i will add some examples later here
## Contributing

We welcome contributions from the community! To contribute to FLAME:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
    ```sh
    git checkout -b feature-name
    ```
3. Make your changes and commit them with clear and descriptive messages.
4. Push your changes to your forked repository.
    ```sh
    git push origin feature-name
    ```
5. Create a pull request to the main repository.

Please ensure your code follows our coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or support, please open an issue in the repository or contact us directly at plesim18@gmail.com
---

Thank you for using FLAME! We hope it helps you create a better learning environment.
