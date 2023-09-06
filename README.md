Backend Development Applications Assignment
This repository contains the code for a simple Backend API Development project with TypeScript.

Description
This project serves as an assignment for Backend Development Applications. It includes the implementation of a RESTful API using Express.js, TypeScript, and MongoDB. The API allows you to perform basic CRUD (Create, Read, Update, Delete) operations on tasks.

Features
• Create new tasks with a title and description.
• Retrieve a list of tasks.
• Update task details, including title and description.
• Delete tasks.
• Validation of input data using Zod.

Prerequisites
Before running the application, make sure you have the following installed:

• Node.js
• npm (Node Package Manager)
• MongoDB (You can use a local or cloud-based MongoDB instance)

Routes

• Create a new task:

POST http://localhost:3007/tasks/create
Body: {
"title": "Task Title",
"description": "Task Description"
}

• Retrieve a list of tasks:

GET http://localhost:3007/tasks

• Update a task (replace :id with the task ID):

PUT http://localhost:3007/tasks/updateOne/:id
Body: {
"title": "Updated Title",
"description": "Updated Description"
}

• Delete a task (replace :id with the task ID):

DELETE http://localhost:3007/tasks/deleteOne/:id
