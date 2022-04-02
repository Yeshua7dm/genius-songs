# Getting Started with this App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The database was set up with [Firebase](https://firebase.google.com).

## Setting Up the App
To set up this app, you need to have either node(npm) or yarn on your machine
### Install the Dependencies
run 'npm install' or 'yarn install'
This will install all the dependencies found in the package.json file

### Set Up Firebase
The backend part of this App was set up using google's firebase firestore.
Google's firebase helps frontend developers focus solely on the frontend and not have to start writing APIs for CRUD applications

1. Go to [Firebase](https://firebase.google.com)
2. Sign in with your Gmail address to get started
2. Create a new project and then go to the created project
3. Copy the SDK settings generated for your new project
4. Create a .env file in the root folder of the app
5. Copy the .env__ file data into your .env file
6. Replace the comments on the lines with the actual values from the SDK settings

With this done, your firebase App is ready to go, one last thing though
1. Click on Firestore Database under the created project (on the sidebar)
 NB: This is where you will view your data
2. Click on rules, edit the rules
3. Change the line `allow read, write: if false;` to `allow read, write: if true;`
This will allow you access to CRUD data in your database


## Get Rapid API Creds
To get data from Rapid API, you will need the APP Key.
To get that
1. 0pen [Genius Rapid API](https://rapidapi.com/brianiswu/api/genius/)
2. Copy the values of the Header Parameters
3. Paste them into the specified variables in your generated .env file
4. The HOST should be copied to REACT_APP_RAPID_HOST and the KEY to REACT_APP_RAPID_KEY

This is important as the credentials are needed to fetch data from rapidAPI

## Run Project
Ensure that you have carried out the sections above before running the project
 Then do the following
1. Change the REACT_APP_INTERVAL in the .env file to 60000 so that it runs every minute not every 10 seconds


### This project will be run from docker
1. First ensure you have docker installed on your machine.
2. cd to the application folder in your terminal and type in `docker-compose up`.
This will load up the **docker-compose.yml** file whoch will build the app from the **Dockerfile** in the root folder and create a service named *react-ui* with a container **songs-ui**.

3. Run `docker-compose build` to build the app in the application into your docker installation

3. Run `docker-compose up` to get the app running and then view in [localhost](http://localhost:3000)

4. The app should run successfully at this point

### To close the app and stop docker-compose
Run `docker-compose stop`




cheers!