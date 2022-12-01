# Getting Started with Bazaar React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Before you begin working on this project, you must install all of the dependencies using `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Git and GitHub Workflow
![indir (4)](https://user-images.githubusercontent.com/20026295/204996353-f14cb5f6-c983-4070-8ce4-0175f27f74e0.png)



## Project Folder Structure

```
src
├── config
├── assests
├── components
├── context
├── hooks
├── pages
├── utils
├── App.tsx
├── index.tsx
└── react-app-env.d.ts
```

### config

This folder is for storing all config files for backend interactions.

### assets

The assets folder contains all images, css files, font files, etc. for our project. Pretty much anything that isn't code related will be stored in this folder.

### components

`components` folder is further broken down into subfolders. These subfolders are really useful since they help keep our components organized into different sections instead of just being one massive blob of components.

### context

The `context` folder stores all our React context files that are used across multiple pages.

### hooks

It will only store the global hooks that are used across multiple pages.

### pages

This folder should contain one folder for each page in our application. Inside of those page specific folders should be a single root file that is our page `(generally index.js)` alongside all the files that are only applicable to that page.

### utils

This folder is for storing all utility functions such as formatters.

## Dependencies

- **React:** Core library for developing Front-end applications.

- **styled-components:** `styled-components` allows you to write actual CSS code to style your components.

- **TypeScript:** TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- **react-router-dom:** React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.
