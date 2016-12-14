# GrowLog
GrowLog is an application that allows gardeners to track and manage the life cycle of their plants from seed purchase to harvest. It features a searchable seed inventory, the ability to schedule gardening activities, and the ability to generate reports.  

## Features
**Login/Logout | Seeds | Activities | Reports**

Login/Logout using Google Email Account

**Seeds**
Add, Edit, Complete and Delete information about seed inventory in searchable database  

**Activities**
Add, Edit, Complete and Delete Planting, Watering, Weeding, Harvesting, and Other Activities and Issues  

**Reports**
Generate Report of Inventory

##Technologies Used
Angular 1.5.8  
Express 4.14.0  
Jquery 3.1.1  
Knex 0.12.6  
Moment 2.16.0  
Passport-google-oauth2 0.1.6  
PostgreSQL 6.1.0  

## Instructions
Run *npm install* in the terminal to download dependencies listed in package.json  
To use Google OAuth:  
go to *https://console.developers.google.com*, create a new project,   
Create an **.env** file which includes the following information:  
AUTHORIZATION_URL, TOKEN_URL, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, and SECRET  
PostgreSQL database setup information can be found in **database.sql**  
Type *npm start* in the terminal to start the server connection  
Enter *localhost:3000* in the browser address bar  
Type *Control + C* in the terminal to quit the server connection  

## Authors
- Laura Abend
- Ally Boyd
- Elisa Lee
- Jackie Torborg
- Alexander Whitaker
