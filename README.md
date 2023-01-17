# Memory-lane
A MERN stack social media web app that helps in posting our memories. 

## Functionalities
- **Authentication:** Users can easily login or sign up to their account using their email and password or through their Google account.
- **Posting:** Users can create a post with images and post them. They can also update and delete their posts later.
- **Likes:** Users can like posts and unlike posts they have already liked.

## Technical features
- **Primary tech stack:** ReactJS is used to build the frontend of the web app, Bootstrap is used for styling the UI, Express.js and NodeJS for the backend, and MongoDB for data storage.
- **Authentication:** JSON Web Tokens (JWT) are used for authentication, with tokens set to expire in 1 hour. Users' passwords are stored securely using bcrypt.
- **State management:** Redux is used to maintain a global store that helps in state management. Redux-thunk allows for dispatching async actions like API calls.
- **Toast notifications:** Toast notifications are displayed when posts are created or delted sucessfully. Its also used to display errors that may occur during signin or creation of posts.
- **Routing:** React router is used for client-side routing between pages.
- **Google Login:** Google login is implemented using @react-oauth/google npm package, which is based on the new Google Identity Services SDK. 
- **Uploading images:** Images are uploaded using react-filebase64 npm package, which converts the uploaded image to base64 format.
- **Hosting:** The frontend is hosted using Netlify and the backend using Render. (Note: The backend runs on the free tier version of Render. This can cause a response delay of up to 30 seconds for the first request that comes in after a period of inactivity.)
