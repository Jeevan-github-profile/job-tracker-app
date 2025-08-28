### Job Application Tracker
A React + Firebase web app in order to track your job applications in real-time. Securely sign-in, add new applications and update statuses for those applications and manage your job search effectively and efficiently

## Features:
# 1. User Authentication:
  Google or anonymous login with Firebase Auth
  
# 2. Real-time Database:
  Stores application in Firebase with live updates
  
# 3. Secue and Private:
  Each user's data is accessible only to them
  
# 4. Responsive UI:
Clean and intuitive interface with input formsand status management

## Features:
1. Ananymous Firebase Authentication (where users are signed in automatically)
2. Add, update and delete job applications
3. Clean and responsive UI
4. Status tracking - Applied, Interview, Offer, Rejected

## Tech Stack Used:
1. Frontend:  React, Vite
2. Backend / Database: Firebase Firestore
3. Authentication: Firebase Anonymous Auth
4. Styling: Tailwind CSS / Custom CSS

## Project Structure:
job-tracker-app/
│
├─ src/
│ ├─ App.jsx # Main React component
│ ├─ firebase.js # Firebase initialization
│ └─ index.css # Global styles
│
├─ .env.local # Firebase config keys (never commit secrets!)
├─ package.json # Project dependencies
└─ vite.config.js # Vite configuration

## Setup Instructions:

# 1. Clone the repository
git clone your-repo-url (In place of repo URL, copy the actual URL of this repository)
cd job-tracker-app

# 2. Install the dependencies:
npm install

# 3. Configure Firebase:
(i) Create a Firebase project
(ii) Enable **Firestore** and **Anonymous Authentication**
(iii) Copy your Firebase config keys into .env.local:
  VITE_FIREBASE_API_KEY=your_api_key_here
  VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
Also, while copying do not use any quotes for the copied text and make sure to not leave any spaces

# 4. Run the developement server
Open terminal in VS Code or any other suitable app and type:
npm run dev

# 5. Open your browser:
Visit http://localhost:5173 to see the app in action.

## Usage 
1. Add a new job application by filling in the **Company** , **Position** , **Status**, and **Date Applied** fields, then click on the button **Add Application**
2. Update the status of the application from the drop-down menu
3. Delete Applications using the **Delete** button.

   
## See the live demo
See the live demo of the project at https://www.youtube.com/watch?v=deooHJuRQAU (Copy and paste the link in browser to see the video)
