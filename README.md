# Task Management System

## Overview
The Task Management System is a web-based application designed to help individuals and teams organize, track, 
and manage their tasks efficiently. Whether you're working on personal projects or collaborating with a team, 
this system provides a streamlined approach to task management.

## Features
- **User Authentication:** Secure user registration and login functionality.
- **Task Creation:** Create tasks with detailed descriptions, due dates, and priority levels.
- **Notifications:** Receive notifications for upcoming deadlines, task assignments, and changes in task status.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Notifications:** Webhook Callback
- **Deployment:** Docker

## Getting Started
1. Clone the repository: `git clone https://github.com/casontek/task-management-system.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. Access the application via the provided URL (default: `http://localhost:7000`)
5. Access the api documentation via (default: `http://localhost:7000/api/doc`).
6. To run test make sure your environment file is included
7. Run test : `npm test`

## Build and run with docker
1. delete the node_module folder if exist on the project directory
2. docker build `docker built -t task-manager-app`
3. run app `docker run -p 7000:7000 task-manager-app`

## Usage
1. Register a new account or log in with existing credentials.
2. Create new tasks by providing necessary details such as title, description, tags, etc.
3. Update, delete and fetch an existing Task.


## Contact
For any inquiries or support, please contact [chika.agbokings@gmail.com](mailto:chika.agbokings@gmail.com).
