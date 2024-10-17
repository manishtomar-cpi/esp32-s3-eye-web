

# NetStick - Client (React Frontend)

This directory contains the **client-side** of the **NetStick** application, built using **React** and styled using **Tailwind CSS**.

## Folder Structure

```bash
client/
├── public/                         # Static files that are publicly accessible (index.html, favicon, etc.)
├── src/                            # Source code for the React app
│   ├── assets/                     # Static assets like images, fonts, etc.
│   ├── components/                 # Reusable React components
│   ├── context/                    # React Context for global state management
│   ├── hooks/                      # Custom React hooks for sharing logic
│   ├── pages/                      # Page-level components (HomePage.js, etc.)
│   ├── services/                   # External services (e.g., API calls)
│   ├── utils/                      # Utility functions that can be reused across the app
│   ├── App.css                     # CSS file for styling the main App component
│   ├── App.js                      # Main React component (defines app structure)
│   ├── index.css                   # Global styles, including Tailwind imports
│   ├── index.js                    # Entry point for the React app (where the app is rendered)
│   ├── router.js                   # Manages routes using React Router
│   ├── theme.js                    # Optional theme management for styling
├── .gitignore                      # Git ignore file for excluding node_modules, sensitive files
├── package.json                    # NPM dependencies and project scripts
├── package-lock.json               # Locked dependency tree
├── tailwind.config.js              # Tailwind CSS configuration file
├── postcss.config.js               # PostCSS configuration for processing Tailwind
└── README.md                       # Documentation for the project
```

### Explanation of Key Directories and Files

- **public/**: Contains static assets that are served directly without processing. This includes `index.html`, which is the template for your single-page application.
  
- **src/**: Contains all the source code for your React application.
  - **assets/**: Store static assets like images, logos, fonts, or icons.
  - **components/**: Reusable components that can be used across different pages or parts of the app (e.g., buttons, cards, etc.).
  - **context/**: Files to manage global state using React's Context API.
  - **hooks/**: Custom React hooks for reusable logic (e.g., managing form inputs, data fetching, etc.).
  - **pages/**: Contains page-level components, such as `HomePage.js`, that represent the main pages of app (e.g., Home, About, Dashboard).
  - **services/**: Contains services that handle API requests or interact with external services.
  - **utils/**: Utility functions and helper methods used throughout the app (e.g., data formatting or token management).
  - **App.js**: The main component where the overall structure of app is defined. It includes the router to navigate between pages.
  - **App.css**: Contains styles specific to the `App.js` component. With Tailwind CSS, this file is used sparingly.
  - **index.js**: The entry point of the app. This file renders the React app to the DOM. It also wraps the app in `BrowserRouter` for routing and imports the global `index.css` file for styling.
  - **router.js**: Manages client-side routing using React Router. Defines the routes for different pages.
  
- **tailwind.config.js**: Configuration file for Tailwind CSS, which determines the files Tailwind should scan for class usage and allows you to extend or customize the Tailwind theme.
  
- **postcss.config.js**: Configures **PostCSS** to handle Tailwind CSS processing.

- **package.json**: Contains metadata about the project (e.g., name, version) as well as the list of dependencies, scripts, and configurations for your React app.

### Tailwind CSS Setup

This project uses **Tailwind CSS** for styling. The necessary Tailwind setup is already configured in the `index.css` file with the following:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### NPM Scripts

In the project directory, you can run the following scripts:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br>
Your app is ready to be deployed!

#### `npm run lint`

Runs ESLint across your code to check for any code-style violations.

#### `npm install`

Installs all the project dependencies listed in `package.json`.

### How to Start the Application


1. **Navigate to the `client/` folder**:

   ```bash
   cd netstick/client
   ```

2. **Install dependencies**:

   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

3. **Start the development server**:

   Once all dependencies are installed, run the following command to start the development server:

   ```bash
   npm start
   ```

   This will start the app on [http://localhost:3000](http://localhost:3000).

4. **Access the app**:

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the running application.


