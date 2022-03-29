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
7. Click on Firestore Database under the created project (on the sidebar)
 NB: This is where you will view your data
8. Click on rules, edit the rules
9. Change the line `allow read, write: if false;` to `allow read, write: if true;`
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
2. Run the application with `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
