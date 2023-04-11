# Healthify_backend
Healthify Backend is the server-side component of the Healthify app, a comprehensive healthcare solution that consists of two parts: one for the user and one for hospital management. The backend is responsible for handling user authentication, managing appointments and prescriptions, and providing hospital management with access to patient information.

# About The App
The HealthiFy App is a comprehensive healthcare solution that consists of two parts: one for the user and one for hospital management. The user part of the app is designed to help people find nearby hospitals and doctors in a new city. Users can search for hospitals based on their location, city, or hospital name, and book an appointment at the hospital of their choice.

Once an appointment request is made, the hospital management app receives an update and can either accept or reject the request. If the request is accepted, a doctor is assigned to the user, who can then provide a prescription for the user's condition.

The user part of the app also includes a unique profile card with a QR code. The QR code can be scanned by the hospital management app to get more details about the user. Additionally, users can keep track of their ongoing medications or medications they have previously taken.

# Features
- User authentication and authorization  
- Appointment and prescription management  
- Patient information management  
- Hospital information management
- API endpoints for app integration  

# Getting started

# Installation
To install the dependencies, run the following command: `npm install`

# Usage
To start the application, run the following command: `npm start`  
The application will start listening on the port specified in the environment variable PORT (default is 4000).  

Before running the application, make sure to set the following environment variables:  
`DB_URI` = The DB_URI environment variable should contain the MongoDB connection string.  
`PORT` = Give a port number (eg: 4000,3000)  
`JWT_SECRET` = Give a string  
`JWT_EXPIRE` = Give a number and add 'd' at the end (eg - 5d,6d)  
`COOKIE_EXPIRE` = Give a Number  

# API Endpoints
Base URL: `DOMAIN-NAME/api/v1`  
The Healthify Backend provides the following API endpoints:  

# USER Endpoints
Common prefix: `/user`  

`POST /register`: Register the user.  
`POST /login` : Login the user.  
`GET /logout` : Logout the user.  
`GET /details/:u_id` : Gets the detail of the user.  
`PUT /details/:u_id`: Updates the detail of the user.  
`POST /reqApt` : Request an appointment at a particular hospital.  
`GET /searchHospital` : Gets the hospitals according to the querry.  


# HOSPITAL Endpoints
Common prefix: `/hospital`  

`POST /register`: Register the hospital.  
`POST /login` : Login the hospital.  
`GET /logout` : Logout the hospital.  
`GET /details/:h_id` : Gets the detail of the hospital.  
`PUT /details/:h_id`: Updates the detail of the hospital.  
`GET /all-appointment/:h_id` : Get all new appointments request in the hospital.  
`POST /resApt/:apt_id` : Respond to the appointment, Accept and appoint doctor to user or reject it.  



`This project is under development and not finished yet. So it might have some errors`






